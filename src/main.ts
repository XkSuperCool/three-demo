import * as THREE from 'three'
import { MeshBasicMaterial } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const { innerWidth: width, innerHeight: height } = window

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
camera.position.set(0, 0, 18)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ alpha: false })
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const geomtry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ wireframe: true, color: 'skyblue' })
const cubes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>[] = []

for (let i = -5; i < 5; i++) {
	for (let j = -5; j < 5; j++) {
		for (let x = -5; x < 5; x++) {
			const cube = new THREE.Mesh(geomtry, material)
			scene.add(cube)
			cube.position.set(i, j, x)
			cubes.push(cube)
		}
	}
}

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

window.addEventListener('click', (event) => {
	pointer.x = event.x / width * 2 - 1
	pointer.y = -(event.y / height * 2 - 1)
	raycaster.setFromCamera(pointer, camera)
	raycaster.intersectObjects<THREE.Mesh>(cubes).forEach((item) => {
		item.object.material = new MeshBasicMaterial({
			color: new THREE.Color(Math.random(), Math.random(), Math.random())
		})
	})
	render()
})

let x = 0
window.addEventListener('mousemove', (event) => {
	x = event.clientX / width - 0.5
})

function render() {
	renderer.render(scene, camera)
}

const clock = new THREE.Clock()
function animation() {
	const deltaTime = clock.getDelta()
	camera.position.x += (x * 5 - camera.position.x) * deltaTime * 5
	render()
	requestAnimationFrame(animation)
}

animation()

const control = new OrbitControls(camera, renderer.domElement)
control.addEventListener('change', render)

const axes = new THREE.AxesHelper(10)
scene.add(axes)

// 站在悬崖边缘
