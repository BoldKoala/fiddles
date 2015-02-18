function createOBJ(x, y, z) {
  var objUrl = ['./Model/Objects/castle-tower.scene/DRIFTWD.JPG', './Model/Objects/castle-tower.scene/wall.JPG', './Model/Objects/castle-tower.scene/PLATEOX2.JPG', './Model/Objects/castle-tower.scene/STUCCO8.JPG', './Model/Objects/castle-tower.scene/TUTSHNGL.JPG'];
  var OBJTexture = function(i){
    var texture = THREE.ImageUtils.loadTexture(objUrl[i]);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 0.5, 0.5 );

    return new THREE.MeshLambertMaterial({ 
      map: texture
    })
  }

  var OBJ = {};

  var loader = new THREE.ObjectLoader();
  loader.load('./Model/Objects/castle-tower.scene/castle-tower.json',function(OBJModel){
      OBJ.model = OBJModel;
      OBJ.model.scale.set(0.02, 0.02, 0.02);
      OBJ.model.children[0].material  = OBJTexture(3);
      OBJ.model.children[1].material  = OBJTexture(3);
      OBJ.model.children[2].material  = OBJTexture(3);
      OBJ.model.children[3].material  = OBJTexture(3);
      OBJ.model.children[4].material  = OBJTexture(1);
      OBJ.model.children[5].material  = OBJTexture(0);
      OBJ.model.children[6].material  = OBJTexture(1);
      OBJ.model.children[7].material  = OBJTexture(3);
      OBJ.model.children[8].material  = OBJTexture(1);
      OBJ.model.children[9].material  = OBJTexture(2);
      OBJ.model.children[10].material = OBJTexture(4);
      OBJ.model.children[11].material = OBJTexture(3);
      // // OBJ.model.position.y += 0.5;
      // // OBJ.model.children.forEach(function(part,i){
      // // if (i < 5){
      // //     OBJ.model.children[i].material = OBJTexture(i);        
      // //   }
      // //   // OBJ.model.children[i].scale.set(tank.x, tank.y, tank.z);
      // // })
      // OBJ.model.material = OBJ.testMaterial;
      OBJ.model.position.x = x;
      OBJ.model.position.y = y;
      OBJ.model.position.z = z;
      map.scene.add(OBJ.model);
  })
  
  // ======= Collison ========
  OBJ.collisionSize = 3;
  // OBJ.collisionRange = {
  //   xMin: OBJ.model.position.x - collisionSize,
  //   xMax: OBJ.model.position.x - collisionSize,
  //   zMin: OBJ.model.position.z - collisionSize,
  //   zMax: OBJ.model.position.z - collisionSize
  // }

  return OBJ;
}


















