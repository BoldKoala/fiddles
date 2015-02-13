function Bullet(x, y, speed, position) {
  var bullet = {};

  bullet.radius = 0.3;
  bullet.speed = speed;


  bullet.material = {
    bullet: new THREE.MeshLambertMaterial({ color: 'green' })
  }
  // ======>> Bullet building
  bullet.bulleter = new THREE.Mesh(new THREE.SphereGeometry(bullet.radius), bullet.material.bullet );

  // Position bullet
  bullet.bulleter.position.x = tank.tanker.position.x;
  bullet.bulleter.position.y = tank.tanker.position.y;
  bullet.bulleter.position.z = tank.tanker.position.z;

  bullet.fire = function(){
    // xSpeed = x * Math.sqrt(speed);
    // ySpeed = y * Math.sqrt(speed); 
    xSpeed = x * speed;
    ySpeed = y * speed;

    setInterval(function(){
      bullet.bulleter.position.z += xSpeed
      bullet.bulleter.position.x += ySpeed
    }, 100)
  }


  // ======>> End of Cube

  // ======>> Bullets building
  // var geometry2 = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
  // var material2 = new THREE.MeshLambertMaterial( { color: 'red' } );
  // var bullet = new THREE.Mesh( geometry2, material );
  // var bullet2 = new THREE.Mesh( geometry2, material2 );
  return bullet;
}
