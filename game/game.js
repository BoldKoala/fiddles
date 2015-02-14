var map = Map(30,30,3,5);
var tank = Tank(1,1,1, 'blue', 0.1);
var tankRed = Tank(1,1,1, 'red', 0.1);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({antialias: true});
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

//Add tank to map
map.scene.add( tank.tanker );
map.scene.add( tankRed.tanker );

//Initialize Camera position

camera.position.y = 40;
camera.position.z = 0; 
//Set renderer size
renderer.setSize( WIDTH, HEIGHT );
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.BasicShadowMap;

//Append canvas element to body;
document.body.appendChild( renderer.domElement );

//direction system

var speed = 0;
var spin = 0
var direction = 0;
var fire = false;



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
}
render();
