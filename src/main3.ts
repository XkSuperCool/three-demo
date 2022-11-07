import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const { innerWidth: width, innerHeight: height } = window

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 60)
camera.position.set(0, 0, 40)
scene.add(camera)

const count = 10000
const geometry = new THREE.BufferGeometry()
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i = 0, len = count * 3; i < len; i++) {
	positions[i] = (Math.random() - 0.5) * 60
	colors[i] = Math.random()
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
import star from './xx.png'
import star2 from './xx2.png'
const loader = new THREE.TextureLoader().load(star)
const loader2 = new THREE.TextureLoader().load(star2)
const material = new THREE.PointsMaterial({
	map: loader,
	alphaMap: loader2,
	transparent: true
})
material.vertexColors = true
material.size = 0.5
const mesh = new THREE.Points(geometry, material)
scene.add(mesh)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const axes = new THREE.AxesHelper(10)
scene.add(axes)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.addEventListener('change', () => {
	render();
})

function render() {
	renderer.render(scene, camera)
}

render()

const clock = new THREE.Clock()
function rotate() {
	const t = clock.getElapsedTime()
	mesh.rotation.x = t * 0.3;
	mesh.rotation.y = t * 0.2;
	requestAnimationFrame(rotate)
	render()
}

rotate()