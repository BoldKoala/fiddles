function bulletExplosion(x, y, z){

    var cubes = [];
    var cubeGeometry = new THREE.BoxGeometry( 0.02, 0.02, 0.02 )
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: "orange"
    });

    function cubeMove(cube){
      var randomDirection = {
        dx : (2 * Math.random() - 1)/4,
        dy : (2 * Math.random() - 1)/4,
        dz : (2 * Math.random() - 1)/4
      }

      cube.position.x += randomDirection.dx;
      cube.position.y += randomDirection.dy;
      cube.position.z += randomDirection.dz;
    }
    
    for (var i = 0; i < 50; i++){
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;
      cubes.push(cube);
      map.scene.add(cube);
    }

    setInterval(function(){
      for (var i = 0; i < cubes.length; i++){
        cubeMove(cubes[i])
      }
    }, 10)

    setTimeout(function(){
      clearInterval(cubeMove);
      for (var i = 0; i < cubes.length; i++){        
        map.scene.remove(cubes[i]);
      }
    }, 150)
}