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
	loader.load('./Model/tank1/german.json',function(tankmodel){
			// console.log(tankmodel);
			// tankmodel.rotation.y = Math.PI/2;
			tank.tanker = tankmodel;
			// tank.tanker.rotation.y = Math.PI/2;
			// for (var i = 0; i < tank.tanker.children - 1; i++){
			// 	tank.tanker.children[i].material.color = tank.color;
			// }
		  map.scene.add(tank.tanker);
		  tank.tanker.position.y += 0.5
		  
	})
	// tank.tanker = new THREE.Mesh(new THREE.BoxGeometry(tank.x, tank.y, tank.z), tank.material.tank );

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
