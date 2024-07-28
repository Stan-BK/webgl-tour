import { createProgram, createShader } from "./creations"

export function Init(gl: WebGLRenderingContext) {
    const vertexShaderSource = (document.querySelector("#vertex-shader-2d") as HTMLScriptElement).text
    const fragmentShaderSource = (document.querySelector("#fragment-shader-2d") as HTMLScriptElement).text

    // 根据预先提供的两个GLSL字符串模板，分别生成顶点及片元的着色器
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

    // 通过将两个着色器进行链接，生成着色器程序
    const program = createProgram(gl, vertexShader, fragmentShader)

    return program
}