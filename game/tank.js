function Tank(x,y,z,color,speed) {
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
			// console.log(tankmodel);
			// tankmodel.rotation.y = Math.PI/2;
			tank.tanker = tankmodel;
			tank.tanker.rotation.y = Math.PI/2;
		  map.scene.add(tank.tanker);
	})
	// tank.tanker = new THREE.Mesh(new THREE.BoxGeometry(tank.x, tank.y, tank.z), tank.material.tank );

	// Position Cube

	// Tank fire
	tank.fire = function(direction){
		bullet = Bullet(-Math.sin(direction), -Math.cos(direction), 10, this.tanker.position);
		bullet.bulleter.position.x = this.tanker.position.x - Math.cos(direction);
		bullet.bulleter.position.y = this.tanker.position.y;
		bullet.bulleter.position.z = this.tanker.position.z - Math.sin(direction);
		return bullet;
	};

	return tank;
}
