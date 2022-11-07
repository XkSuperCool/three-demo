import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const { innerWidth: width, innerHeight: height } = window

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
camera.position.set(0, 0, 30)
scene.add(camera)

const box = new THREE.SphereGeometry(4, 20, 20)
const material = new THREE.MeshStandardMaterial()
const mesh = new THREE.Mesh(box, material)
mesh.castShadow = true
mesh.position.y = 4
scene.add(mesh)

const light = new THREE.PointLight('skyblue')
light.castShadow = true
light.shadow.camera.far = 500

const pointMesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 20), new THREE.MeshBasicMaterial({ color: 'skyblue' }))
pointMesh.position.set(10, 10, 20)
pointMesh.add(light)
scene.add(pointMesh)

const directLight = new THREE.DirectionalLight('red')
directLight.position.set(10, 10, 30)
directLight.castShadow = true
// scene.add(directLight)

const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial())
planeMesh.receiveShadow = true
planeMesh.rotateX(-Math.PI / 2)
scene.add(planeMesh)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const clock = new THREE.Clock()
function render() {
	const time = clock.getElapsedTime() // clock
	pointMesh.position.x = Math.sin(time) * 5
	pointMesh.position.z = Math.cos(time) * 5
	renderer.render(scene, camera)
	requestAnimationFrame(render)
}

const axes = new THREE.AxesHelper(100)
scene.add(axes)
renderer.shadowMap.enabled = true

render()

const control = new OrbitControls(camera, renderer.domElement)
control.addEventListener('change', () => {
	renderer.render(scene, camera)
})

