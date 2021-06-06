import {OrbitControls} from './src/controls/OrbitControls.js';

//const script = document.createElement('script')
//script.src = 'src/controls/OrbitControls.js'
//document.head.append(script)

const script1 = document.createElement('script')
script1.src = 'src/coordinate_system.js'
document.head.append(script1)

var scene;
var camera;
var renderer;

var cube;
function createMainScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.lookAt(new THREE.Vector3(0,0,0)); // Set look at coordinate like this

    renderer = new THREE.WebGLRenderer({background: 0xcccccc});
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    renderer.setClearColor( 0xcccccc );

    // controls

    var controls = new OrbitControls( camera, renderer.domElement );
    controls.listenToKeyEvents( window ); // optional

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;


    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;
    camera.rotation.x = 0 * 15 / 360 * (2 * Math.PI);

    camera.set

    return scene;
}

function createCube(coordinateSystem=false) {
    // create a group
    const group = new THREE.Group();

    // Add a geometry
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframeLinewidth: 20, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    group.add(cube);

    if (coordinateSystem) {
        group.add(createCoordinateSystem());
    }
    
    return group;
}

var initialTime = new Date().getTime();
var animationFrameId;
const infoText = $("#info");
function animate() {
    console.log("animation!!");
    animationFrameId = requestAnimationFrame(animate);
    cube.position.x += 0.01;
    //cube.rotation.y += 0.01;
    let currentTime = new Date().getTime();
    let timediff = currentTime - initialTime;
    cube.position.y = Math.sin(timediff / 1000);
    //console.log(cube.position.y);

    // update camera position
    //camera.position.x = cube.position.x;

    infoText.html("Position in x: " + getFormattedValue(cube.position.x) + "<br>" +
        "Position in y: " + getFormattedValue(cube.position.y) + "<br>" +
        "Position in z: " + getFormattedValue(cube.position.z));

    // render the scene
    renderer.render(scene, camera);
}

function getFormattedValue(value, fractionDigits = 6) {
    return (value).toLocaleString(
        undefined, // leave undefined to use the visitor's browser 
        // locale or a string like 'en-US' to override it.
        { minimumFractionDigits: fractionDigits }
    );
}

function checkWebGL() {
    // Check if WebGL is available
    if (WEBGL.isWebGLAvailable()) {
        // Initiate function or other initializations here
        //animate();
        return true;
    } else {
        const warning = WEBGL.getWebGLErrorMessage();
        document.getElementById('container').appendChild(warning);
        return false;
    }
}

function initControls(functionStart, functionStop) {
    // Button for starting and stoping the animation
    const startStoppButton = $("#buttonStartStop");
    const buttonText = $("#buttonStartStopText");

    startStoppButton.click(function () {
        console.log(startStoppButton.text.name);
        switch (buttonText.text()) {
            case "Start":
                console.log("Start");
                buttonText.text("Stop");
                functionStart();
                break;
            case "Stop":
                console.log("Stop");
                buttonText.text("Start");
                functionStop();
                break;
        }
        console.log("button start stopp clicked");
    });
}

const startAnimation = function () {
    //initialTime = new Date().getTime();
    animate();
}

const stopAnimation = function () {
    cancelAnimationFrame(animationFrameId);
}

function main() {
    const WebGlOk = checkWebGL();
    if (!WebGlOk) {
        alert("WebGL not available.");
        return;
    }

    initControls(startAnimation, stopAnimation);

    scene = createMainScene();
    cube = createCube(coordinateSystem=true);
    scene.add(cube);

    //scene.add(createCoordinateSystem());
}

$(document).ready(function () {
    console.log("website is ready");
    main();
});