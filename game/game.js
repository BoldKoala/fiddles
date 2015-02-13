var map = Map(300,300,3,3);
var tank = Tank(10,10,10, 'blue', 1);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

//Add tank to map
map.scene.add( tank.tanker );

//Initialize Camera position
camera.position.y = 300;
camera.position.z = 0;
camera.lookAt({x: 0, y: 0, z: 0});
//Set renderer size
renderer.setSize( WIDTH, HEIGHT );

//Append canvas element to body;
document.body.appendChild( renderer.domElement );

//Direction system

var speed = 0;

var direction = 0;

var dx = 0;
var dz = 0;
var dy = 0;




//Add event handler
window.onkeydown = function(d){
  console.log(d.keyCode);
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
    direction += 0.1;
  }
  //A key
  if(d.keyCode === 65){
    direction -= 0.1;
  }
}
window.onkeyup = function(d){
  //W ke
  if(d.keyCode === 87){
    speed = 0;
  }
  //S key
  if(d.keyCode === 83){
    speed = 0;
  }
  //D key
  if(d.keyCode === 68){
    // direction = 0;
  }
  //A key
  if(d.keyCode === 65){
    // direction = 0;  
  }
}


// Start of render and animation
function render() {
  requestAnimationFrame( render );
  var timer = Date.now() * 0.0005

  map.light.position.set(-camera.position.x, camera.position.y, camera.position.z);

  tank.tanker.position.x += Math.cos(direction)*speed;
  tank.tanker.position.z += Math.sin(direction)*speed;
  // tank.tanker.rotation.x = dx;
  tank.tanker.rotation.y = -direction;

  renderer.render( map.scene, camera );
}
render();
