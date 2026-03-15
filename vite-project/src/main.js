import './style.css'
//import orbit controls
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector(".experience-canvas");

//loaders
const textureLoader =new THREE.TextureLoader
// model loader
const dracoLoader = new DRACOLoader();
dracoLoader .setDecoderPath( '/draco/' );
const loader = new GLTFLoader();
loader.setDRACOLoader( dracoLoader );

const textureMap={
  first:{
  day:"",
  night:""
 },
    second:{
  day:"",
  night:""
 },
    third:{
  day:"",
  night:""
 },
    fourth:{
  day:"",
  night:""
 },
};

const loadedTextures={
   day:{},
  night:{} 
}
Object.entries(textureMap),forEach(([key,paths])=>{
  const daytexture=textureLoader.load(paths.day)
  dayTexture.flipY =false
  dayTexture.colorSpace=THREE.SRGBColorSpace
  loadedTextures.day[key]=daytexture;

   const nighttexture=textureLoader.load(paths.day)
  nightTexture.flipY =false
  nightTexture.colorSpace=THREE.SRGBColorSpace
  loadedTextures.day[key]=nighttexture;
})

loader.load("/models/Room_portfolio.glb",(glb)=>{
  glb.scene.traverse(child=>{
    if(child.isMesh){
      Object.keys(textureMap).forEach(key=>{
        if(child.name.includes(key)){
          const material= new three.MeshBasicMaterial({
            map:loadedTextures.day[key]
          });
          child.material = material 
        }
      })
    }
    scene.add(glb.scene)
  })
})
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.update();

// event listener for clicks and texture changes

let isDay = true;// checks for day and night

window.addEventListener("click", () => {

  isDay = !isDay;

  scene.traverse(child => { // goes through the whole hierarchy of files

    if (child.isMesh) { // checks for which objects are meshes using the previous texture map

      Object.keys(textureMap).forEach(key => {

        if (child.name.includes(key)) {

          child.material.map = isDay
            ? loadedTextures.day[key]
            : loadedTextures.night[key];

          child.material.needsUpdate = true;
       controls.update();
        }

      });

    }

  });

});

//Lwazi and pako in the render loop please copy and paste controls.update();  into it and lastly delete this massage after doing so,thank you!
