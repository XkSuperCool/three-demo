import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const { innerWidth: width, innerHeight: height } = window

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
camera.position.set(0, 0, 30)
scene.add(camera)

const sphereGeometry = new THREE.SphereGeometry(5, 30, 30)
const material = new THREE.PointsMaterial({ color: 'red' })
material.size = 0.1
const mesh = new THREE.Points(sphereGeometry, material)
scene.add(mesh)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)
render()

const axes = new THREE.AxesHelper(10)
scene.add(axes) 

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.addEventListener('change', () => {
	render();
})

function render() {
	renderer.render(scene, camera)
}

function rotateX() {
	mesh.rotateY(0.01)
	requestAnimationFrame(rotateX)
	render()
}
rotateX()