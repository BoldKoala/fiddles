var map = Map(3000,3000,3,3);
var tank = Tank(10,10,10, 'blue', 3);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

//Add tank to map
map.scene.add( tank.tanker );

//Initialize Camera position
camera.position.y = 10;
camera.position.z = 20;
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
  // if(d.keyCode === 67){
  //     var counter = 0;
  //     setInterval(function(){
  //       if (counter < 50){
  //         cube.position.y += 0.06
  //         counter++
  //       }

  //       if (counter >= 50 && counter < 100){
  //         cube.position.y -= 0.06
  //         counter++
  //       }
  //     }, 10)
  // }

  // if(d.keyCode === 32){
  //   map.scene.add(bullet2);
  //   firing = true;
  //   setTimeout(function(){
  //     map.scene.remove(bullet2);
  //     bullet2.position.x = cube.position.x;
  //     bullet2.position.z = cube.position.z;
  //     bullet2.position.y = cube.position.y;
  //     firing = false;
  //   },1000)
  // }
}


// Start of render and animation
function render() {
  requestAnimationFrame( render );
  var timer = Date.now() * 0.0005

  // camera.position.z = Math.cos(timer) * 10;
  // camera.position.x = Math.sin(timer) * 10;
  map.light.position.set(-camera.position.x, camera.position.y, camera.position.z);
  // camera.lookAt(map.scene.position)
  renderer.render( map.scene, camera );
}
render();
