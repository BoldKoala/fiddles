var tank = {};

tank.material = {
	tank: new THREE.MeshLambertMaterial({ color: 'blue' })
}
// ======>> Cube building
tank = new THREE.Mesh(new THREE.BoxGeometry( 0.6, 0.6, 0.6 ), tank.material.tank );
map.scene.add( tank );
// ======>> End of Cube

// ======>> Bullets building
// var geometry2 = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
// var material2 = new THREE.MeshLambertMaterial( { color: 'red' } );
// var bullet = new THREE.Mesh( geometry2, material );
// var bullet2 = new THREE.Mesh( geometry2, material2 );
