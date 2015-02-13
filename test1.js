var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

var WIDTH = 200;

// ======>> Plane building
var plane = new THREE.Mesh(new THREE.PlaneGeometry(WIDTH,WIDTH), new THREE.MeshLambertMaterial());
scene.add(plane);
// plane.rotation.x = -1.57;
plane.rotation.x = -Math.PI/2;
// console.log(plane)
// ======>> End of Plane

// ======>> Line building
var geometryLine = new THREE.Geometry();
var materialLine = new THREE.LineBasicMaterial({color: 'green'});   
var size = WIDTH, step = 3;

for ( var i = - size; i <= size; i += step){
    geometryLine.vertices.push(new THREE.Vector3( - size, - 0.05, i ));
    geometryLine.vertices.push(new THREE.Vector3( size, - 0.05, i ));

    geometryLine.vertices.push(new THREE.Vector3( i, - 0.05, - size ));
    geometryLine.vertices.push(new THREE.Vector3( i, - 0.05, size ));

var line = new THREE.Line( geometryLine, materialLine, THREE.LinePieces);
// scene.add(line);
}
// ======>> End of Line

// ======>> Add light source
var directionalLight = new THREE.DirectionalLight(0xffffff,2);
directionalLight.position.set(7,5,0);
scene.add(directionalLight);

// ======>> Cube building
var geometry = new THREE.BoxGeometry( 0.6, 0.6, 0.6 );
var geometry2 = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
var material = new THREE.MeshLambertMaterial( { color: 'blue' } );
var cube = new THREE.Mesh( geometry, material );
var cube2 = new THREE.Mesh( geometry, material );
scene.add( cube );
scene.add( cube2 );
// ======>> End of Cube

// ======>> Bullets building
var geometry2 = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
var material2 = new THREE.MeshLambertMaterial( { color: 'red' } );
var bullet = new THREE.Mesh( geometry2, material );
var bullet2 = new THREE.Mesh( geometry2, material2 );
// scene.add( bullet )
// scene.add( bullet2 )


// ======>> End of Bullets


// ======>> Modifing positions

cube.position.x = 7;
// cube.position.y = -3;
// bullet.position.x = 7;
// bullet2.position.x = 7;
// bullet.position.y = -3;

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
    scene.add(bullet2);
    firing = true;
    setTimeout(function(){
      scene.remove(bullet2);
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
  camera.lookAt(scene.position)
  // camera.quaternion.x = 0.2
  // camera.quaternion.y = 0
  // camera.quaternion.z = Math.cos(-timer);
  // camera.quaternion.y = Math.sin(-timer)
  // camera.quaternion.x = Math.cos(timer)
  // camera.quaternion.w = 0.9238795292366129
  // camera.quaternion.w = Math.sin(timer)
  // console.log(camera.quaternion)


  renderer.render( scene, camera );
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








