function Map(x, y, step, brightness) {

	var map = {};

	map.scene      = new THREE.Scene();
	map.x          = x;
	map.y          = y;
	map.step       = step;
	map.brightness = brightness;

	// ====== Materials =======
	map.material = {
		floor : new THREE.MeshLambertMaterial({color: 'blue'}),
		line  : new THREE.LineBasicMaterial({color: 'green'}),
		tank  : new THREE.MeshLambertMaterial({color:'blue'})
	};


	// ====== Floor building ========
	map.floor = new THREE.Mesh(new THREE.PlaneGeometry(map.x,map.y), map.material.floor);
	map.floor.rotation.x = -Math.PI/2;
	map.scene.add(map.floor);

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

	// ====== Grid building =========
	map.line = new THREE.Geometry();

	for( var i = -map.x + 20; i <= map.x - 20; i += map.step ){
	  map.line.vertices.push(new THREE.Vector3( -map.x + 20, -0.1, i ));
	  map.line.vertices.push(new THREE.Vector3( map.x - 20, -0.1, i ));
	  map.line.vertices.push(new THREE.Vector3( i, -0.1, -map.x + 20 ));
	  map.line.vertices.push(new THREE.Vector3( i, -0.1, map.x - 20 ));
		map.scene.add(new THREE.Line( map.line, map.material.line, THREE.LinePieces));
	}
	// map.scene.add(map.line)

	return map;
}




