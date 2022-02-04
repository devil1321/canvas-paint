const canvas  = document.getElementById('ctx')
const canvasPlaceholder = document.getElementById('ctx-placeholder')
const ctx = canvas.getContext('2d')

function TOOLS(e){
    this.isPaint = false
    this.activeTool = 'brushTool'
    this.allTools = document.querySelectorAll('.tools div')
    this.brush = document.querySelector('.tools__brush')
    this.pencil = document.querySelector('.tools__pencil')
    this.shadow = document.querySelector('.tools__shadow')
    this.line = document.querySelector('.tools__line')
    this.wide = 11
    this.lineEnd = 0
    this.x = 100
    this.y = 0
    this.shadowColor = 'red'
    this.shadowBlur = 10
    this.fillColor = 'black'
    this.strokeColor = 'red'
}

TOOLS.prototype.setPos = function(e){
    this.x = e.clientX - 80
    this.y = e.clientY 
}

TOOLS.prototype.setActiveTool = function(e){
    this.activeTool = e.target.dataset.tool
}

TOOLS.prototype.isActive = function(){
    if(!this.isPaint){
        this.isPaint = true
    }else{
        this.isPaint = false
    }
}

TOOLS.prototype.brushTool = function(){
    ctx.lineCap = 'round'
    ctx.lineTo(this.x,this.y)
    ctx.lineWidth = this.wide
    ctx.strokeStyle = this.strokeColor
    ctx.stroke()
}

TOOLS.prototype.pencilTool = function(){
    ctx.lineCap = 'square'
    ctx.moveTo(this.x,this.y)
    ctx.lineTo(this.x,this.y)
    ctx.lineWidth = this.wide
    ctx.stroke()
}

TOOLS.prototype.shadowTool = function(){
    console.log('shadow')
    ctx.shadowColor = this.shadowColor
    ctx.shadowBlur = this.shadowBlur
}



TOOLS.prototype.lineTool = function(){
    ctx.lineCap = 'round'
    ctx.lineDashOffset = 24
    ctx.lineTo(this.x,this.lineEnd)
    ctx.lineWidth = this.lineWidth
    ctx.stroke()
}

const tools = new TOOLS()


tools.allTools.forEach(tool => tool.addEventListener('click',(e)=>tools.setActiveTool(e)))

canvas.addEventListener('mousedown',(e)=>{
   tools.isActive()
   tools.lineStart = e.clientX - 80
   ctx.moveTo(tools.x,tools.y)
   console.log(tools.activeTool)
   console.log(tools.isPaint)
})

canvas.addEventListener('mouseup',(e)=>{
    tools.isActive()
    console.log(tools.isPaint)
    if(tools.activeTool === 'lineTool'){
        tools.lineTool()

    }
    
 })

canvas.addEventListener('mousemove',(e)=>{
    tools.setPos(e)
    tools.lineEnd = e.clientY

    if(tools.isPaint){
        if(tools.activeTool !== 'lineTool'){
            tools[tools.activeTool]()
        }else{
            tools.linePlaceholder()
        }
    }
})
