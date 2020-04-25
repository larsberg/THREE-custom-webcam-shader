import * as THREE from 'three'
import CustomMaterial from './CustomMaterial.js'

// // https://github.com/mrdoob/three.js/tree/dev/src/renderers/shaders/ShaderLib
// import vertexShader from './shaders/meshbasic_vert.glsl'
// import fragmentShader from './shaders/meshbasic_frag.glsl'

import {readFileSync} from 'fs'
const vertexShader = readFileSync(__dirname + '/shaders/meshbasic.vert', 'utf8')
const fragmentShader = readFileSync(__dirname + '/shaders/meshbasic.frag', 'utf8')


// container is the html element that we'll add our webgl to
var container = document.querySelector('#container')
var WIDTH = container.clientWidth
var HEIGHT = container.clientHeight


// https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer.domElement
var renderer = new THREE.WebGLRenderer({
	antialias: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );


// scene setup
var clock = new THREE.Clock()
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;


// set up the video texture
var video = document.getElementById( 'video' );
var texture = new THREE.VideoTexture( video );

// create the geometry
var geometry = new THREE.PlaneGeometry(1, 1);
var material = new CustomMaterial({
	map: texture,
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,

	// we pass variables to the shader using 'uniform' values
	uniforms: {
		time: {value: 0},
	}
})

var plane = new THREE.Mesh(geometry, material);
scene.add(plane)


// conect the camera to our video texture
if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

	var constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };

	navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {

		// apply the stream to the video element used in the texture
		video.srcObject = stream;
		video.play();

		// scale the texture to the video aspect ratio
		var aspectRatio = constraints.video.width / constraints.video.height
		plane.scale.set(-aspectRatio, 1, 1)
		plane.scale.multiplyScalar(10)

	} ).catch( function ( error ) {

		console.error( 'Unable to access the camera/webcam.', error );

	} );

} else {

	console.error( 'MediaDevices interface not available.' );

}


// render loop
function update() {
	// we pass variables to the shader using 'uniform' values
	material.uniforms.time.value = clock.getElapsedTime() * 0.5;
}

function draw() {
	renderer.render( scene, camera );
}

function animate() {
	requestAnimationFrame( animate );
	update()
	draw()
}

animate();



// events
window.addEventListener('resize', e => {

	WIDTH = container.clientWidth
	HEIGHT = container.clientHeight
	renderer.setSize( WIDTH, HEIGHT )
	camera.aspect = WIDTH / HEIGHT
	camera.updateProjectionMatrix()

})