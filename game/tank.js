function Tank(x,y,z,color,speed,cb) {
	//Texture function
	var texture = function(i){
		var url = ['./Model/German-Tank/Track.jpg', './Model/German-Tank/Turret.jpg','./Model/German-Tank/Turret 2.jpg','./Model/German-Tank/Body 2.jpg','./Model/German-Tank/Body 1.jpg'];
		return new THREE.MeshLambertMaterial({ 
			map: THREE.ImageUtils.loadTexture(url[i])
		})
	}
	var tank = {};

	tank.x = x;
	tank.y = y;
	tank.z = z;
	tank.color = color;
	tank.speed = speed;
	tank.hp = 10;

	//direction system
	tank.currentSpeed = 0;
	tank.spin = 0
	tank.direction = 0;

	//Fire state
	tank.isFire = false;
	tank.noFire = false;

	tank.material = {
		tank: new THREE.MeshLambertMaterial({ color: tank.color })
	};
	// ======>> Cube building
	var loader = new THREE.ObjectLoader();
	loader.load('./Model/German-Tank/german.json',function(tankmodel){
			tank.tanker = tankmodel;
		  tank.tanker.position.y += 0.5;
		  tank.tanker.children.forEach(function(part,i){
		  	if(i === 1){
					tank.tanker.children[1].material.color.set(tank.color);			
		  	} else if (i < 5){
					tank.tanker.children[i].material = texture(i);		  	
		  	}
		  	tank.tanker.children[i].scale.set(tank.x, tank.y, tank.z);
		  })
		  cb(tank.tanker);
		  // map.scene.add(tank.tanker);
	})
	// Position Cube

	// Tank fire
	tank.fire = function(direction){
		bullet = Bullet(-Math.sin(direction), -Math.cos(direction), 10, this.tanker.position);
		bullet.bulleter.position.x = this.tanker.position.x - Math.cos(direction)*2;
		bullet.bulleter.position.y = this.tanker.position.y;
		bullet.bulleter.position.z = this.tanker.position.z - Math.sin(direction)*2;
		return bullet;
	};

	return tank;
}

