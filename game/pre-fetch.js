

//Pre-fetch Tower Texture
var TowerTexture = [];

var objUrl = [
  './Model/Objects/castle-tower.scene/DRIFTWD.JPG', 
  './Model/Objects/castle-tower.scene/wall.JPG', 
  './Model/Objects/castle-tower.scene/PLATEOX2.JPG', 
  './Model/Objects/castle-tower.scene/STUCCO8.JPG', 
  './Model/Objects/castle-tower.scene/TUTSHNGL.JPG'
];

var OBJTexture = function(i){
  var texture = THREE.ImageUtils.loadTexture(objUrl[i]);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 0.5, 0.5 );

  return new THREE.MeshLambertMaterial({ 
    map: texture
  })
};

var MapTexture = function(url){
  var mapTexture = THREE.ImageUtils.loadTexture(url);

  return new THREE.MeshLambertMaterial({ 
    map: mapTexture
  })
};

var WallTexture = function(url){
  var mapTexture = THREE.ImageUtils.loadTexture(url);
      mapTexture.wrapS = THREE.RepeatWrapping;
      mapTexture.wrapT = THREE.RepeatWrapping;
      mapTexture.repeat.set( 51, 5 );

  return new THREE.MeshLambertMaterial({ 
    map: mapTexture
  })
};




objUrl.forEach(function(url,i){
  TowerTexture[i] = OBJTexture(i);
});

//Pre-fetch Tower Texture
var TankTexture = [];
var tankUrl = [
  './Model/German-Tank/Track.jpg', 
  './Model/German-Tank/Turret.jpg',
  './Model/German-Tank/Turret 2.jpg',
  './Model/German-Tank/Body 2.jpg',
  './Model/German-Tank/Body 1.jpg'
];

var tankTexture = function(i){
  return new THREE.MeshLambertMaterial({ 
    map: THREE.ImageUtils.loadTexture(tankUrl[i])
  })
}

tankUrl.forEach(function(url,i){
  TankTexture[i] = tankTexture(i);
})