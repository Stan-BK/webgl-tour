import { resize } from "./utils";

export class Renderer {
    gl: WebGLRenderingContext
    program: WebGLProgram
    canvas: HTMLCanvasElement
    positionAttributeLocation: GLint
    positionBuffer: WebGLBuffer
    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        this.gl = gl
        this.program = program
        this.canvas = gl.canvas as HTMLCanvasElement
        // 获取程序唯一入口属性的位置
        this.positionAttributeLocation = gl.getAttribLocation(program, 'a_position')

        
        // 创建属性读取值时指向的缓冲, 将该缓冲绑定到gl提供的全局变量上
        this.positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        const position = [
            0, 0,
            0, 0.5,
            0.7, 0,
        ]
        // 因为GLSL是强类型语言，所以需要显示指定数据的类型
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)
    }

    render() {
        const gl = this.gl
        const canvas = this.canvas
        resize(canvas)
    
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
    
        gl.useProgram(this.program)
        gl.enableVertexAttribArray(this.positionAttributeLocation)

        const size = 2
        const type = gl.FLOAT
        const normalized = false
        const stride = 0 // 每次迭代运行的起始点移动步长
        const offset = 0 // 缓冲读取的起始位置偏移量
        gl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalized, stride, offset)

        const primitiveType = gl.TRIANGLES
        const count = 3
        gl.drawArrays(primitiveType, offset, 3)
    }
}