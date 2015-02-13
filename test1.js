var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// ======>> For MouseMoveEvent===============
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


function onDocumentMouseMove( event ){
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
    // mouseX = event.clientX;
    // mouseY = event.clientY;
}
document.addEventListener('mousemove', onDocumentMouseMove, false); 

// ======>> For MouseMoveEvent===============


// ======>> Plane building
var plane = new THREE.Mesh(new THREE.PlaneGeometry(30,30), new THREE.MeshLambertMaterial());
scene.add(plane);
// plane.rotation.x = -1.57;
plane.rotation.x = -Math.PI/2;
// console.log(plane)
// ======>> End of Plane

// ======>> Line building
var geometryLine = new THREE.Geometry();
var materialLine = new THREE.LineBasicMaterial({color: 'green'});   
var size = 30, step = 3;

for ( var i = - size; i <= size; i += step){
    geometryLine.vertices.push(new THREE.Vector3( - size, - 0.05, i ));
    geometryLine.vertices.push(new THREE.Vector3( size, - 0.05, i ));

    geometryLine.vertices.push(new THREE.Vector3( i, - 0.05, - size ));
    geometryLine.vertices.push(new THREE.Vector3( i, - 0.05, size ));

var line = new THREE.Line( geometryLine, materialLine, THREE.LinePieces);
scene.add(line);
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
var material2 = new THREE.MeshLambertMaterial( { color: 0x00ff01 } );
var bullet = new THREE.Mesh( geometry2, material );
var bullet2 = new THREE.Mesh( geometry2, material );
// scene.add( bullet )
// scene.add( bullet2 )


// ======>> End of Bullets


// ======>> Modifing positions

cube.position.x = 12;
// cube.position.y = -3;
// bullet.position.x = 7;
// bullet2.position.x = 7;
// bullet.position.y = -3;

// camera.position.y = 8;
// camera.position.z = 8;
// camera.position.y = -10;
// camera.position = cube.position;
// camera.position.y = cube.position + 2;

// ======>> End of Modifing positions

camera.rotation.order = "YXZ";

var firing = false;
window.onkeydown = function(d){
  console.log(d.keyCode);
  if(d.keyCode === 38){
    cube.position.x--;
  }
  if(d.keyCode === 40){
    cube.position.x++;
  }
  if(d.keyCode === 39){
    cube.position.z--;
  }
  if(d.keyCode === 37){
    cube.position.z++;
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

  // camera.position.z = Math.cos(timer) * 10;
  // camera.position.x = Math.sin(timer) * 10;
  directionalLight.position.set(-camera.position.x, camera.position.y, camera.position.z);
  camera.position.x = cube.position.x;
  camera.position.y = cube.position.y + 3;
  camera.position.z = cube.position.z;

  // camera.rotation.x += ( mouseX - camera.position.x ) * 0.002;
  // camera.rotation.y += ( mouseY - camera.position.y ) * 0.002;

  // camera.lookAt(scene.position)
  // camera.lookAt({x: cube.position.x - 10, y: cube.position.y + 5, z: cube.position.z})
  camera.lookAt({x: mouseY, y: cube.position.y + 2, z: mouseX})
  renderer.render( scene, camera );
}
render();
// ======>> End of render and animation

















