var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );



// ======>> Add light source
var directionalLight = new THREE.DirectionalLight(0xffffff,2);
directionalLight.position.set(7,5,0);
map.scene.add(directionalLight);


camera.position.y = 8;
camera.position.z = 8;
// camera.position.y = -10;
// camera.position.y = 0;

// ======>> End of Modifing positions

camera.rotation.order = "YXZ";

var firing = false;
window.onkeypress = function(d){
  console.log(d.keyCode);
  if(d.keyCode === 119){
    cube.position.z--;
  }
  if(d.keyCode === 115){
    cube.position.z++;
  }
  if(d.keyCode === 100){
    cube.position.x++;
  }
  if(d.keyCode === 97){
    cube.position.x--;
  }
  if(d.keyCode === 67){
      var counter = 0;
      setInterval(function(){
        if (counter < 50){
          cube.position.y += 0.06
          counter++
        }

        if (counter >= 50 && counter < 100){
          cube.position.y -= 0.06
          counter++
        }
      }, 10)
  }

  if(d.keyCode === 32){
    map.scene.add(bullet2);
    firing = true;
    setTimeout(function(){
      map.scene.remove(bullet2);
      bullet2.position.x = cube.position.x;
      bullet2.position.z = cube.position.z;
      bullet2.position.y = cube.position.y;
      firing = false;
    },1000)
  }
}


// ======>> Start of render and animation
function render() {
  requestAnimationFrame( render );
  var timer = Date.now() * 0.0005

  // cube.rotation.x += 0.04;
  // cube.rotation.y += 0.04;
  // cube.rotation.z += 0.04;

  // bullet.position.y += 0.1;
  if(firing){
    bullet2.position.x -= 0.12;
  }

  // camera.rotation.x += 90* Math.PI/180;
  camera.position.z = Math.cos(timer) * 10;
  camera.position.x = Math.sin(timer) * 10;
  directionalLight.position.set(-camera.position.x, camera.position.y, camera.position.z);
  // camera.position.x = Math.sin(timer) * 10;
  // camera.position.y = Math.cos(timer) * -10;
  // camera.lookAt({x: 0, y: 0, z: 0})
  camera.lookAt(map.scene.position)
  // camera.quaternion.x = 0.2
  // camera.quaternion.y = 0
  // camera.quaternion.z = Math.cos(-timer);
  // camera.quaternion.y = Math.sin(-timer)
  // camera.quaternion.x = Math.cos(timer)
  // camera.quaternion.w = 0.9238795292366129
  // camera.quaternion.w = Math.sin(timer)
  // console.log(camera.quaternion)


  renderer.render( map.scene, camera );
}
render();
// ======>> End of render and animation

// setInterval(function(){
//   cube.position.x += 0.02;
//   bullet.position.y += 0.1;
// }, 10)

// setInterval(function(){
//   cube.position.x = -6;
// }, 7000)


// setInterval(function(){
//   bullet.position.y = 0;
//   bullet.position.x = cube.position.x;
//   bullet2.position.x = cube.position.x;
// }, 1000)

// setInterval(function(){
//   cube.position.x += 0.02;
//   bullet.position.y += 0.1;
// }, 10)








