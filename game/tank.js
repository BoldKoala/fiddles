function Tank(x,y,z,color,speed) {
	var tank = {};

	tank.x = x;
	tank.y = y;
	tank.z = z;
	tank.color = color;
	tank.speed = speed;
	tank.firedBullets = [];


	tank.material = {
		tank: new THREE.MeshLambertMaterial({ color: tank.color })
	}
	// ======>> Cube building
	tank.tanker = new THREE.Mesh(new THREE.BoxGeometry(tank.x, tank.y, tank.z), tank.material.tank );

	// Position Cube
	tank.tanker.position.y = tank.y/2;

	// Tank fire
	tank.fire = function(direction){
		var bullet = Bullet(-Math.sin(direction), -Math.cos(direction), 2, tank.tanker.position)

		tank.firedBullets.push(bullet)
		map.scene.add(tank.firedBullets[tank.firedBullets.length - 1].bulleter)
		tank.firedBullets[tank.firedBullets.length - 1].bulleter.position.x = tank.tanker.position.x;
		tank.firedBullets[tank.firedBullets.length - 1].bulleter.position.y = tank.tanker.position.y;
		tank.firedBullets[tank.firedBullets.length - 1].bulleter.position.z = tank.tanker.position.z;

		setTimeout(function(){
			map.scene.remove(tank.firedBullets[0].bulleter)
			tank.firedBullets.splice(0,1);
		}, 2000)
	}

	// ======>> End of Cube

	// ======>> Bullets building
	// var geometry2 = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
	// var material2 = new THREE.MeshLambertMaterial( { color: 'red' } );
	// var bullet = new THREE.Mesh( geometry2, material );
	// var bullet2 = new THREE.Mesh( geometry2, material2 );
	return tank;
}
