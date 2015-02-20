function Map(x, y, step, brightness) {

	var map = {};

	map.scene      = new THREE.Scene();
	map.x          = x;
	map.y          = y;
	map.step       = step;
	map.brightness = brightness;

	// ====== Materials =======
	map.material = {
		sky : new THREE.MeshBasicMaterial({ 
			map: THREE.ImageUtils.loadTexture('./Model/Map/sky.jpg')
		}),
		floor : MapTexture('./Model/Map/DirtGroundCracks.jpg'),
		wall : WallTexture('./Model/Map/newMapTexture.jpg'),
		line  : new THREE.LineBasicMaterial({color: 'green'}),
		tank  : new THREE.MeshLambertMaterial({color:'blue'})
	};

	// ====== Floor building ========
	map.floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(map.x,map.y), map.material.floor);
	map.floorLeft = new THREE.Mesh(new THREE.PlaneBufferGeometry(map.x,map.y), map.material.floor);
	map.floorRight = new THREE.Mesh(new THREE.PlaneBufferGeometry(map.x,map.y), map.material.floor);
	map.floor.rotation.x = -Math.PI/2;
	map.floorLeft.rotation.x = -Math.PI/2;
	map.floorLeft.position.z += map.y;
	map.floorRight.rotation.x = -Math.PI/2;
	map.floorRight.position.z -= map.y;
	map.scene.add(map.floor);
	map.scene.add(map.floorLeft);
	map.scene.add(map.floorRight);

	// ====== Wall building ========
	map.wall1 = new THREE.Mesh(new THREE.BoxGeometry(1,5,61), map.material.wall);
	map.wall2 = new THREE.Mesh(new THREE.BoxGeometry(1,5,61), map.material.wall);
	map.wall3 = new THREE.Mesh(new THREE.BoxGeometry(61,5,1), map.material.wall);
	map.wall4 = new THREE.Mesh(new THREE.BoxGeometry(61,5,1), map.material.wall);
	map.wall1.position.x += map.x/2;
	map.wall2.position.x -= map.x/2;
	map.wall3.position.z += map.y/2;
	map.wall4.position.z -= map.y/2;
	map.wall1.position.y += 0.5;
	map.wall2.position.y += 0.5;
	map.wall3.position.y += 0.5;
	map.wall4.position.y += 0.5;
	map.scene.add(map.wall1);
	map.scene.add(map.wall2);
	map.scene.add(map.wall3);
	map.scene.add(map.wall4);

	// ====== Sky building ========
	map.sky = new THREE.Mesh(new THREE.SphereGeometry(100,32,32), map.material.sky);
	map.sky.material.side = THREE.DoubleSide;
	map.sky.rotation.x = 14.12;
	map.sky.position.y = -8;
	map.scene.add(map.sky);

	// ======>> Add light source
	map.light  = new THREE.DirectionalLight(0xffffff,map.brightness);
	map.light2 = new THREE.DirectionalLight(0xffffff,map.brightness);
	map.light3 = new THREE.DirectionalLight(0xffffff,map.brightness);
	map.light4 = new THREE.DirectionalLight(0xffffff,map.brightness);
	map.light.position.set(20,10,20);
	map.light2.position.set(-20,10,20);
	map.light3.position.set(-20,10,-20);	
	map.light4.position.set(20,10,-0);	
	map.scene.add(map.light);
	map.scene.add(map.light2);
	map.scene.add(map.light3);
	map.scene.add(map.light4);

	return map;
}




