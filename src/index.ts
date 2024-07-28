import { Init } from "./init"
import { Renderer } from "./render"

const canvas = document.getElementById('webgl-tour') as HTMLCanvasElement
const gl = canvas.getContext('webgl')

if (!gl) {
    document.write("This browser doesn't support webgl :(")
} else {
    const program = Init(gl)
    new Renderer(gl, program).render()
}

