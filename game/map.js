function Map(x, y, step, brightness) {

	var map = {};

	map.scene      = new THREE.Scene();
	map.x          = x;
	map.y          = y;
	map.step       = step;
	map.brightness = brightness;

	// ====== Materials =======
	map.material = {
		floor : new THREE.MeshLambertMaterial({color: 'gray'}),
		line  : new THREE.LineBasicMaterial({color: 'green'}),
		tank  : new THREE.MeshLambertMaterial({color:'blue'})
	};


	// ====== Floor building ========
	map.floor = new THREE.Mesh(new THREE.PlaneGeometry(map.x,map.y), map.material.floor);
	map.floor.rotation.x = -Math.PI/2;
	map.scene.add(map.floor);

	// ======>> Add light source
	map.light = new THREE.DirectionalLight(0xffffff,map.brightness);
	map.light.position.set(0,5,0);
	map.scene.add(map.light);

	// ====== Grid building =========
	map.line = new THREE.Geometry();

	for( var i = -map.x; i <= map.x; i += map.step ){
	  map.line.vertices.push(new THREE.Vector3( -map.x, -0.05, i ));
	  map.line.vertices.push(new THREE.Vector3( map.x, -0.05, i ));
	  map.line.vertices.push(new THREE.Vector3( i, -0.05, -map.x ));
	  map.line.vertices.push(new THREE.Vector3( i, -0.05, map.x ));
		// map.scene.add(new THREE.Line( map.line, map.material.line, THREE.LinePieces));
	}

	return map;
}




