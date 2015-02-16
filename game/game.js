var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
var POV = 'Birdeye';
var LOCK = true;

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );
var renderer = new THREE.WebGLRenderer({antialias: true});

var map = Map(50,50,3,1.2);
var tanks = {};
var bullets = [];

var multiplayer = Multiplayer(map,tanks);
var socket = multiplayer.socket;

//Set renderer size
renderer.setSize( WIDTH, HEIGHT );
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.BasicShadowMap;

//Initialize Camera
camera.position.y = 40;
camera.position.x = 0; 
camera.position.z = 0;
camera.lookAt({x:0, y:0, z:0});

//Append canvas element to body;
document.body.appendChild( renderer.domElement );

//Add control handler
window.onkeydown = function(d){
  //Tank Control
  keyDown(d, tanks);

  //POV Control
  //V key
  if (d.keyCode === 86){
    POV = POV === 'FPS' ? 'Birdeye' : 'FPS';
  } 
};

window.onkeyup = function(d){
  //Tank Control
  keyUp(d,tanks);
};

//Invoke Rendering function
render();

// Start of render and animation
function render() {
  requestAnimationFrame(render);
  timer = Date.now()
  map.light.position.set(-camera.position.x, camera.position.y, camera.position.z);
  updatePosition();
};

function updatePosition() {
  //Calculate bullets movement and collision
  for(var i = 0; i<bullets.length; i++){
    bullets[i].move();
    bullets[i].hit(tanks,function(from, to, bullet){
      if(to === tanks._id){
        console.log(from+" hit "+to);
        multiplayer.hit(from,to);
      }
      map.scene.remove(bullet.bulleter);
    })
  }

  if(tanks._id){
    //Calculate tank movements
    tanks[tanks._id].direction += tanks[tanks._id].spin;
    var tankCollision = false;

    for (var tankKey in tanks){
      if (tankKey !== "_id" && tankKey !== tanks._id){
        if (calculateDistance2(tanks[tanks._id], tanks[tankKey]) <= 1.2){
          tankCollision = false;
        } else if (calculateDistance(tanks[tanks._id], tanks[tankKey]) < 1.2){
          tanks[tanks._id].tanker.position.x -= Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed;
          tanks[tanks._id].tanker.position.z -= Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed;
          // tanks[tankKey].tanker.position.x -= Math.cos(tanks[tanks._id].direction)*0.1;
          // tanks[tankKey].tanker.position.z -= Math.sin(tanks[tanks._id].direction)*0.1;
          // tanks[tanks._id].currentSpeed = 0;
          tankCollision = true;
        }
      }
    }

    // if (!tankCollision && Math.abs(tanks[tanks._id].tanker.position.x + Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed) <= map.x/2){
    if( tanks[tanks._id].direction >= Math.PI ){
      tanks[tanks._id].direction = -Math.PI;
    } else if( tanks[tanks._id].direction <= -Math.PI ){
      tanks[tanks._id].direction = Math.PI;
    }

    if (Math.abs(tanks[tanks._id].tanker.position.x + Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed) <= map.x/2){
      tanks[tanks._id].tanker.position.x += Math.cos(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed;
    }
    if (!tankCollision && Math.abs(tanks[tanks._id].tanker.position.z + Math.sin(tanks[tanks._id].direction)*tanks[tanks._id].currentSpeed) <= map.y/2){
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
      } else if(Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01 && Math.abs(dz) < 0.01){
        LOCK = true;
      } else if(!LOCK){ 
        camera.position.y += dy/20;
        camera.position.x += dx/20; 
        camera.position.z += dz/20; 
        camera.rotation.x += rx/50;
        camera.rotation.y += ry/25;
        camera.rotation.z += rz/50;
      }
    } else if (POV === 'Birdeye') {
      var dx =  0 - camera.position.x;
      var dy =  40 - camera.position.y;
      var dz =  0 - camera.position.z;
      var rz = Math.PI/2 - camera.rotation.z;
      var rx = -Math.PI/2 - camera.rotation.x;
      var ry = 0 - camera.rotation.y;
      LOCK = false;
      if(Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05 && Math.abs(dz) < 0.05){
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

function calculateDistance(tank1, tank2){
  x1 = tank1.tanker.position.x + Math.cos(tank1.direction) * tank1.currentSpeed;
  x2 = tank2.tanker.position.x;
  z1 = tank1.tanker.position.z + Math.sin(tank1.direction) * tank1.currentSpeed;
  z2 = tank2.tanker.position.z;

  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(z1 - z2, 2));
}
function calculateDistance2(tank1, tank2){
  x1 = tank1.tanker.position.x;
  x2 = tank2.tanker.position.x;
  z1 = tank1.tanker.position.z;
  z2 = tank2.tanker.position.z;

  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(z1 - z2, 2));
}
