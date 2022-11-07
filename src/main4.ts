import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import star from './xx.png'
import star2 from './xx2.png'

const scene = new THREE.Scene()
const { innerWidth: width, innerHeight: height } = window

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
camera.position.set(0, 0, 30)
scene.add(camera)

const params = {
  count: 10000,
  size: 0.1,
  radius: 20,
  branch: 3,
  color: '#fff'
}

const geomtry = new THREE.BufferGeometry()
const loader = new THREE.TextureLoader().load(star)
const loader2 = new THREE.TextureLoader().load(star2)
const material = new THREE.PointsMaterial({
  map: loader,
  alphaMap: loader2,
  transparent: true,
  // vertexColors: true,
  size: params.size,
  blending: THREE.AdditiveBlending
  // color: params.color,
})

const positions = new Float32Array(params.count * 3)
// const colors = new Float32Array(params.count * 3)
for (let i = 0; i < params.count; i++) {
  const idx = i * 3
  // 0 120 360
  const angle = (i % params.branch) * ((2 * Math.PI) / params.branch)
	
	const POW = 3
  const randomX = (Math.random() * 2 - 1) ** POW
  const randomY = (Math.random() * 2 - 1) ** POW
  const randomZ = (Math.random() * 2 - 1) ** POW
  const distance = Math.random() * params.radius

  positions[idx] = Math.cos(angle + distance * 0.1) * distance + randomX // x
  positions[idx + 1] = 0 + randomY // y
  positions[idx + 2] = Math.sin(angle + distance * 0.1) * distance + randomZ // z
}

geomtry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const mesh = new THREE.Points(geomtry, material)
scene.add(mesh)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const axes = new THREE.AxesHelper(10)
scene.add(axes)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.addEventListener('change', () => {
  render()
})

function render() {
  renderer.render(scene, camera)
}

render()
