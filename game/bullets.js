function Bullet(dir1, dir2, speed, position) {
  var bullet = {};

  bullet.radius = 0.3;
  bullet.speed = speed;
  bullet.zSpeed = dir1 * speed;
  bullet.xSpeed = dir2 * speed;
  bullet.hit = false;


  bullet.material = {
    bullet: new THREE.MeshLambertMaterial({ color: 'orange' })
  }
  // ======>> Bullet building
  bullet.bulleter = new THREE.Mesh(new THREE.SphereGeometry(bullet.radius), bullet.material.bullet );

  
  bullet.move = function(){
    this.bulleter.position.z += this.zSpeed/10
    this.bulleter.position.x += this.xSpeed/10
  }


  // ======>> End of Bullets

  // ======>> Bullets building
  // var geometry2 = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
  // var material2 = new THREE.MeshLambertMaterial( { color: 'red' } );
  // var bullet = new THREE.Mesh( geometry2, material );
  // var bullet2 = new THREE.Mesh( geometry2, material2 );
  return bullet;
}
