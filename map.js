var map = {};

map.scene = new THREE.Scene();
map.size = 30;
map.step = 3;

// ====== Materials =======
map.material = {
	floor: new THREE.MeshLambertMaterial(),
	line: new THREE.LineBasicMaterial({color: 'green'}),
	tank: new THREE.MeshLambertMaterial({color:'blue'})
};


// ====== Floor building ========
map.floor = new THREE.Mesh(new THREE.PlaneGeometry(map.size,map.size), map.material.floor);
map.floor.rotation.x = -Math.PI/2;
map.scene.add(map.floor);

// ====== Grid building =========
map.line = new THREE.Geometry();

for( var i = -size; i <= size; i += step ){
  map.line.vertices.push(new THREE.Vector3( -size, -0.05, i ));
  map.line.vertices.push(new THREE.Vector3( size, -0.05, i ));
  map.line.vertices.push(new THREE.Vector3( i, -0.05, -size ));
  map.line.vertices.push(new THREE.Vector3( i, -0.05, size ));
	map.scene.add(new THREE.Line( map.line, map.material.line, THREE.LinePieces));
}





