function Bullet(dir1, dir2, speed, position) {
  var bullet = {};

  bullet.radius = 0.1;
  bullet.speed = speed;
  bullet.zSpeed = dir1 * speed;
  bullet.xSpeed = dir2 * speed;
  bullet.isHit = false;
  bullet.hitTower = false;

  bullet.material = {
    bullet: new THREE.MeshBasicMaterial({ color: 'orange' })
  };

  // ======>> Bullet building
  bullet.bulleter = new THREE.Mesh(new THREE.SphereGeometry(bullet.radius), bullet.material.bullet );

  bullet.move = function(){
    if (!this.hitTower){
      this.bulleter.position.z += this.zSpeed/10;
      this.bulleter.position.x += this.xSpeed/10;
    }
    // this.hitTower = false;
  };

  bullet.hit = function(tanks,towers,cb){
    if(tanks[tanks._id] && tanks[tanks._id].tanker){
      for(var tank in tanks){
        if(tank !== '_id' && tanks[tank].tanker){
          var dx = Math.abs(tanks[tank].tanker.position.x - this.bulleter.position.x) - (tanks[tank].x*5)/2.5;
          var dy = Math.abs(tanks[tank].tanker.position.y - this.bulleter.position.y) - (tanks[tank].x*5)/2.5;
          var dz = Math.abs(tanks[tank].tanker.position.z - this.bulleter.position.z) - (tanks[tank].x*5)/2.5;
          if(dx < tanks[tank].x && dy < tanks[tank].y && dz < tanks[tank].z && !this.isHit){
            this.isHit = true;
            cb(this._id, tank, this);
          }
        }
      }
      for (var towerKey in towers){
        var dx = Math.abs(towers[towerKey].model.position.x - this.bulleter.position.x);
        var dy = Math.abs(towers[towerKey].model.position.y - this.bulleter.position.y);
        var dz = Math.abs(towers[towerKey].model.position.z - this.bulleter.position.z);
        if(dx < towers[towerKey].collisionSize/1.9 && dy < towers[towerKey].collisionSize/1.9 && dz < towers[towerKey].collisionSize/1.9 && !this.hitTower){
          this.hitTower = true;
          cb(this._id, 'Tower', this);
          // map.scene.remove(this.bulleter)
        }
      }

    }
  }

  return bullet;
}
