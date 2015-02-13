var map = Map(30,30,3,3);
var tank = Tank(1,1,1, 'blue', 1);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

//Add tank to map
map.scene.add( tank.tanker );

//Initialize Camera position
camera.position.y = 5;
camera.position.z = 0;
//Set renderer size
renderer.setSize( WIDTH, HEIGHT );

//Append canvas element to body;
document.body.appendChild( renderer.domElement );

//Add event handler
window.onkeypress = function(d){
  console.log(d.keyCode);
  if(d.keyCode === 119){
    tank.tanker.position.z -= tank.speed;
    camera.position.z -= tank.speed;
  }
  if(d.keyCode === 115){
    tank.tanker.position.z += tank.speed;
    camera.position.z += tank.speed;
  }
  if(d.keyCode === 100){
    tank.tanker.position.x += tank.speed;
    camera.position.x += tank.speed;
  }
  if(d.keyCode === 97){
    tank.tanker.position.x -= tank.speed;
    camera.position.x -= tank.speed;
  }
}


// Start of render and animation
function render() {
  requestAnimationFrame( render );
  var timer = Date.now() * 0.0005

  map.light.position.set(-camera.position.x, camera.position.y, camera.position.z);

  camera.lookAt(tank.tanker.position);
  renderer.render( map.scene, camera );
}
render();
