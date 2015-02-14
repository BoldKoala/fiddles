var map = Map(30,30,3,5);
var tank = Tank(1,1,1, 'blue', 0.1);
var tankRed = Tank(1,1,1, 'red', 0.1);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({antialias: true});
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var socket = io();
  socket.on('message',function(d){
    console.log(d);
  });
  socket.on('broadcast',function(d){
    console.log(d);
  })

  window.sendMsg = function(msg){
    socket.emit('send',msg)
  }

var speed = 0;
var spin = 0
var direction = 0;
var fire = false;

socket.on('move',function(state){
  // if(!isMoving){ 
    tankRed.tanker.position.x = state.x;
    tankRed.tanker.position.y = state.y;
    tankRed.tanker.position.z = state.z;
    tankRed.tanker.rotation.x = state.rx;
    tankRed.tanker.rotation.y = state.ry;
    tankRed.tanker.rotation.z = state.rz;
    // speed = state.speed;
    // spin = state.spin;
    // direction = state.direction;
  // }
})


//Add tank to map
map.scene.add( tank.tanker );
map.scene.add( tankRed.tanker );

//Initialize Camera position

camera.position.y = 40;
camera.position.z = 0; 
// camera.lookAt({x:0, y:0, z:0});

//Set renderer size
renderer.setSize( WIDTH, HEIGHT );
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.BasicShadowMap;

//Append canvas element to body;
document.body.appendChild( renderer.domElement );

//direction system


// var isMoving = false;

//Add event handler
window.onkeydown = function(d){
  // console.log(d.keyCode);
  //W key
  if(d.keyCode === 87){
    speed = -tank.speed;
  }
  //S key
  if(d.keyCode === 83){
    speed = tank.speed;
  }
  //D key
  if(d.keyCode === 68){
    spin = 0.05;
  }
  //A key
  if(d.keyCode === 65){
    spin = -0.05;
  }
  //space
  if (d.keyCode === 32){
    fire = true;
  }
  // isMoving = true;
}
window.onkeyup = function(d){
  //W ke
  if(d.keyCode === 87){
    speed = 0;
  }
  //S ke
  if(d.keyCode === 83){
    speed = 0;
  }
  //D key
  if(d.keyCode === 68){
    spin = 0;
  }
  //A key
  if(d.keyCode === 65){
    spin = 0;  
  }
  //space
  if (d.keyCode === 32){
    fire = false;
  }
  // isMoving = false;
  var pos = {
      x: tank.tanker.position.x,
      y: tank.tanker.position.y,
      z: tank.tanker.position.z,
      rx: tank.tanker.rotation.x,
      ry: tank.tanker.rotation.y,
      rz: tank.tanker.rotation.z,
      speed: speed,
      spin: spin,
      direction: direction
    };
  socket.emit('sync',pos);
}

var noFire = false;


// Start of render and animation
function render() {
  requestAnimationFrame( render );
  var timer = Date.now() * 0.0005

  map.light.position.set(-camera.position.x, camera.position.y, camera.position.z);

  //Firing
  if(!noFire && fire){
    tank.fire();
    noFire = true;
    setTimeout(function(){
      noFire = false;
    },250)
  }

  //Bullets movement and collision check
  for (var i = 0; i < tank.firedBullets.length; i++){
    if (!tank.firedBullets[i].hit && Math.sqrt(Math.pow((tank.firedBullets[i].bulleter.position.x - tankRed.tanker.position.x), 2) + Math.pow((tank.firedBullets[i].bulleter.position.z - tankRed.tanker.position.z), 2))/10 < 0.2){
      console.log("You have hit the red Tank!!!!")
      tank.firedBullets[i].hit = true;
      map.scene.remove(tank.firedBullets[i].bulleter);
    } else if (!tank.firedBullets[i].hit){
      tank.firedBullets[i].move();
    }
  }
  direction += spin;
  tank.tanker.position.x += Math.cos(direction)*speed;
  tank.tanker.position.z += Math.sin(direction)*speed;
  tank.tanker.rotation.y = -direction;

  //FPS
  camera.position.x = tank.tanker.position.x + Math.cos(direction)*5;
  camera.position.y = tank.tanker.position.y + 2;
  camera.position.z = tank.tanker.position.z + Math.sin(direction)*5;
  camera.rotation.y = Math.PI/2-direction;

  renderer.render( map.scene, camera );


  // if(isMoving){
    var pos = {
      x: tank.tanker.position.x,
      y: tank.tanker.position.y,
      z: tank.tanker.position.z,
      rx: tank.tanker.rotation.x,
      ry: tank.tanker.rotation.y,
      rz: tank.tanker.rotation.z,
      speed: speed,
      spin: spin,
      direction: direction
    };
    socket.emit('sync',pos);
  // }
}
render();
