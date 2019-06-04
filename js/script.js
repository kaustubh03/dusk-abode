/*
    @Author Kaustubh Saxena
*/
// Global Vars For Scene Camera and Renderer
let scene, camera, renderer;

/*
    Initializer Function
    Contains Logic for 3D World
*/
function init() {
    // New Three.js Scene and Camera Setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
    
    camera.position.set(-900, -200, -900); // Camera Position Setup

    // Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Setup OrbitControls For Movement in 3D World.
    let controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', renderer);
    controls.minDistance = 500;
    controls.maxDistance = 1500;

    // Build Material for 3D World
    let materialMapArray = buildMaterialMap();


    for (let i = 0; i < 6; i++)
        materialMapArray[i].side = THREE.BackSide;

    //Define Skybox For World
    let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    let skybox = new THREE.Mesh(skyboxGeo, materialMapArray);
    
    // Add To Scene
    scene.add(skybox);
    
    animate();
}
function buildMaterialMap (){
    let materialMap = [];
    let textureFt = new THREE.TextureLoader().load('textures/cocoa_ft.jpg');
    let textureBk = new THREE.TextureLoader().load('textures/cocoa_bk.jpg');
    let textureUp = new THREE.TextureLoader().load('textures/cocoa_up.jpg');
    let textureDn = new THREE.TextureLoader().load('textures/cocoa_dn.jpg');
    let textureRt = new THREE.TextureLoader().load('textures/cocoa_rt.jpg');
    let textureLf = new THREE.TextureLoader().load('textures/cocoa_lf.jpg');

    materialMap.push(new THREE.MeshBasicMaterial({ map: textureFt }));
    materialMap.push(new THREE.MeshBasicMaterial({ map: textureBk }));
    materialMap.push(new THREE.MeshBasicMaterial({ map: textureUp }));
    materialMap.push(new THREE.MeshBasicMaterial({ map: textureDn }));
    materialMap.push(new THREE.MeshBasicMaterial({ map: textureRt }));
    materialMap.push(new THREE.MeshBasicMaterial({ map: textureLf }));
    return materialMap;

}
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
init();