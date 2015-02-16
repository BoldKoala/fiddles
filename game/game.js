var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
var POV = 'FPS';
var LOCK = true;

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );
var renderer = new THREE.WebGLRenderer({antialias: true});

var map = Map(50,50,3,1.2);
var tanks = {};
var bullets = [];

var multiplayer = Multiplayer(map,tanks);
var socket = multiplayer.socket;

// // Initialize Camera position
// camera.position.y = 40;
// camera.position.z = 0; 
// camera.lookAt({x:0, y:0, z:0});

//Set renderer size
renderer.setSize( WIDTH, HEIGHT );
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.BasicShadowMap;

//Append canvas element to body;
document.body.appendChild( renderer.domElement );

//Add control handler
window.onkeydown = function(d){
  // console.log(d.keyCode);
  //W key
  if(d.keyCode === 87){
    tanks[tanks._id].currentSpeed = -tanks[tanks._id].speed;
  }
  //S key
  if(d.keyCode === 83){
    tanks[tanks._id].currentSpeed = tanks[tanks._id].speed;
  }
  //D key
  if(d.keyCode === 68){
    tanks[tanks._id].spin = 0.05;
  }
  //A key
  if(d.keyCode === 65){
    tanks[tanks._id].spin = -0.05;
  }
  //space
  if (d.keyCode === 32){
    tanks[tanks._id].isFire = true;
  }

  //c
  if(d.keyCode === 67){
      var counter = 0;
      setInterval(function(){
        if (counter < 50){
          tanks[tanks._id].tanker.position.y += 0.06
          counter++
        }

        if (counter >= 50 && counter < 100){
          tanks[tanks._id].tanker.position.y -= 0.06
          counter++
        }
      }, 10)
  }
}

window.onkeyup = function(d){
  //W ke
  if(d.keyCode === 87){
    tanks[tanks._id].currentSpeed = 0;
  }
  //S ke
  if(d.keyCode === 83){
    tanks[tanks._id].currentSpeed = 0;
  }
  //D key
  if(d.keyCode === 68){
    tanks[tanks._id].spin = 0;
  }
  //A key
  if(d.keyCode === 65){
    tanks[tanks._id].spin = 0;  
  }
  //space
  if (d.keyCode === 32){
    tanks[tanks._id].isFire = false;
  }
}

render();

// Start of render and animation
function render() {
  requestAnimationFrame( render );
  timer = Date.now()
  map.light.position.set(-camera.position.x, camera.position.y, camera.position.z);
  updatePosition();
};

function updatePosition() {
  //Calculate bullets movement and collision
  for(var i = 0; i<bullets.length; i++){
    bullets[i].move();
    bullets[i].hit(tanks,function(from, to, bullet){
      if(from === tanks._id ){
        console.log('Hit ', to);
      }
      if(to === tanks._id){
        console.log(from, ' hit me!');
      }
      map.scene.remove(bullet.bulleter);
    })
  }

  if(tanks._id){
    //Calculate tank movements
    tanks[tanks._id].direction += tanks[tanks._id].spin;
    if (Math.abs(tanks[tanks._id].tanker.position.x + Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed) <= map.x/2){
      tanks[tanks._id].tanker.position.x += Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed;
    }
    if (Math.abs(tanks[tanks._id].tanker.position.z + Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed) <= map.y/2){
      tanks[tanks._id].tanker.position.z += Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed
    }
    tanks[tanks._id].tanker.rotation.y = -tanks[tanks._id].direction;
  
    //FPS
    if(POV === 'FPS'){ 
      var dx = (tanks[tanks._id].tanker.position.x + Math.cos(tanks[tanks._id].direction)*5) - camera.position.x;
      var dy = (tanks[tanks._id].tanker.position.y + 2) - camera.position.y;
      var dz = (tanks[tanks._id].tanker.position.z + Math.sin(tanks[tanks._id].direction)*5) - camera.position.z;
      var rx = 0 - camera.rotation.x;
      var ry = (Math.PI/2-tanks[tanks._id].direction) - camera.rotation.y;
      var rz = 0 - camera.rotation.z;

      if(LOCK){
        camera.position.x = tanks[tanks._id].tanker.position.x + Math.cos(tanks[tanks._id].direction)*5;
        camera.position.y = tanks[tanks._id].tanker.position.y + 2;
        camera.position.z = tanks[tanks._id].tanker.position.z + Math.sin(tanks[tanks._id].direction)*5;
        camera.rotation.x = 0;
        camera.rotation.y = Math.PI/2-tanks[tanks._id].direction;
        camera.rotation.z = 0;
      } else if(dx < 0.01 && dy < 0.01 && dz < 0.01){
        LOCK = true;
      } else if(!LOCK){ 
        camera.position.y += dy/20;
        camera.position.x += dx/20; 
        camera.position.z += dz/20; 
        camera.rotation.x += rx/25;
        camera.rotation.y += ry/25;
        camera.rotation.z += rz/25;
      }
    } else if (POV === 'Birdeye') {
      var dx =  0 - camera.position.x;
      var dy =  40 - camera.position.y;
      var dz =  0 - camera.position.z;
      var rz = Math.PI/2 - camera.rotation.z;
      var rx = -Math.PI/2 - camera.rotation.x;
      var ry = 0 - camera.rotation.y;
      LOCK = false;
      if(dx < 0.1 && dy < 0.1 && dz < 0.1){
        camera.position.y = 40;
        camera.position.x = 0; 
        camera.position.z = 0;
        camera.lookAt({x:0, y:0, z:0});
      } else { 
        camera.position.y += dy/100;
        camera.position.x += dx/100; 
        camera.position.z += dz/100; 
        camera.rotation.y += ry/25;
        camera.rotation.x += rx/25;
        camera.rotation.z += rz/25;
      }
    }

    renderer.render( map.scene, camera );

    //Send tank position and rotation to other players
    multiplayer.sync(
      {
        x: tanks[tanks._id].tanker.position.x,
        y: tanks[tanks._id].tanker.position.y,
        z: tanks[tanks._id].tanker.position.z,
        rx: tanks[tanks._id].tanker.rotation.x,
        ry: tanks[tanks._id].tanker.rotation.y,
        rz: tanks[tanks._id].tanker.rotation.z,
        color:tanks[tanks._id].color,
        id: tanks._id
      }
    );

    //Bullet logics
    if(tanks[tanks._id].isFire && !tanks[tanks._id].noFire){
      tanks[tanks._id].noFire = true;
      var bullet = tanks[tanks._id].fire(tanks[tanks._id].direction);
      bullet._id = tanks._id;
      bullets.push(bullet);
      map.scene.add(bullet.bulleter);
      multiplayer.fire({
        x: bullet.bulleter.position.x,
        y: bullet.bulleter.position.y,
        z: bullet.bulleter.position.z,
        direction: tanks[tanks._id].direction,
        id: bullet._id
      })
      setTimeout(function(){
        tanks[tanks._id].noFire = false;
      },250)
      setTimeout(function(){
        map.scene.remove(bullets.shift().bulleter);
      },1000)
    }
  }
}
