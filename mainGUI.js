import "./style.css"
import fragShader from "./frag.glsl?raw"
import * as dat from "dat.gui"
import GlslCanvas from "glslCanvas"

const canvas = document.querySelector(".glslCanvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var sandbox = new GlslCanvas(canvas)
sandbox.load(fragShader)

const gui = new dat.GUI()
const params = {
  speed: 0.15,
  dimensions: 2,
  scale1: 1.2,
  scale2: 1.0,
  baseColor: 0.25,
  simplexCoefficient: 0.9,
  noiseStrength: 0.08,
  mouseImpact: 0.2,
}

gui.add(params, "speed", 0.05, 0.85).onChange(updateUniforms)
gui.add(params, "dimensions", 2).onChange(updateUniforms)
gui.add(params, "scale1", 0.2, 5).onChange(updateUniforms)
gui.add(params, "scale2", 0.1, 5).onChange(updateUniforms)
gui.add(params, "baseColor", 0.05, 1).onChange(updateUniforms)
gui.add(params, "simplexCoefficient", 0.2, 5).onChange(updateUniforms)
gui.add(params, "noiseStrength", 0.02, 0.3).onChange(updateUniforms)
gui.add(params, "mouseImpact", 0.05, 0.6).onChange(updateUniforms)

function updateUniforms() {
  sandbox.setUniform("u_speed", params.speed)
  sandbox.setUniform("u_dimensions", params.dimensions)
  sandbox.setUniform("u_scale1", params.scale1)
  sandbox.setUniform("u_scale2", params.scale2)
  sandbox.setUniform("u_base_color", params.baseColor)
  sandbox.setUniform("u_simplex_coefficient", params.simplexCoefficient)
  sandbox.setUniform("u_noise_strength", params.noiseStrength)
  sandbox.setUniform("u_mouse_impact", params.mouseImpact)
}

updateUniforms()

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})
