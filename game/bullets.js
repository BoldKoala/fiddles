function Bullet(dir1, dir2, speed, position) {
  var bullet = {};

  bullet.radius = 0.1;
  bullet.speed = speed;
  bullet.zSpeed = dir1 * speed;
  bullet.xSpeed = dir2 * speed;
  bullet.isHit = false;

  bullet.material = {
    bullet: new THREE.MeshBasicMaterial({ color: 'orange' })
  };

  // ======>> Bullet building
  bullet.bulleter = new THREE.Mesh(new THREE.SphereGeometry(bullet.radius), bullet.material.bullet );

  bullet.move = function(){
    this.bulleter.position.z += this.zSpeed/10;
    this.bulleter.position.x += this.xSpeed/10;
  };

  bullet.hit = function(tanks,cb){
    for(var tank in tanks){
      if(tank !== '_id'){
        var dx = Math.abs(tanks[tank].tanker.position.x - this.bulleter.position.x) - tankSize/2.5;
        var dy = Math.abs(tanks[tank].tanker.position.y - this.bulleter.position.y) - tankSize/2.5;
        var dz = Math.abs(tanks[tank].tanker.position.z - this.bulleter.position.z) - tankSize/2.5;
        if(dx < tanks[tank].x && dy < tanks[tank].y && dz < tanks[tank].z && !this.isHit){
          this.isHit = true;
          cb(this._id, tank, this);
        }
      }
    }
  }

  return bullet;
}
