import Canvas2Image from './canvas2image.js'
// input.addEventListener('blur',(e)=>{console.log(e.target.value)})

function CANVAS_ELEMENTS(){
    this.canvas  = document.getElementById('ctx')
    this.ctx = this.canvas.getContext('2d')
}

const CANVAS_DOM = new CANVAS_ELEMENTS()

function UI_ACTIONS(){
    function CONTROLLERS_ELEMENTS(){
        this.isSquareMenuOpen = false
    }
    function UI_DOM_ELEMENTS(){
        this.toolsWrapper = document.querySelector('.tools-wrapper')
        this.swapBtn = document.querySelector('.tools__swap-btn')
        this.activeTool = document.querySelector('.tools__active-tool'),
        this.allTools = document.querySelectorAll('.tools > div'),
        this.allMenus = document.querySelectorAll('.tools__menu'),
        this.allMenusDivs = document.querySelectorAll('.tools__menu div')
        this.allTooltips = document.querySelectorAll('.tools__tooltip')
        this.allTooltipsLeft = document.querySelectorAll('.tools__tooltip-left')
        this.allCanvasRanges = document.querySelectorAll('.tools__canvas-size-range')
        this.squareParent = document.querySelector('.tools__square'),
        this.square = document.querySelector('.square'),
        this.circle = document.querySelector('.circle'),
        this.pencil = document.querySelector('.tools__pencil'),
        this.brush = document.querySelector('.tools__brush'),
        this.line = document.querySelector('.tools__line'),
        this.shadow = document.querySelector('.tools__shadow'),
        this.strokeColorLine = document.querySelector('.tools__stroke-color div'),
        this.strokeColorInput = document.querySelector('.tools__stroke-color input'),
        this.firstColorInput = document.querySelector('.tools__first-color input'),
        this.secondColorInput = document.querySelector('.tools__second-color input')
    }
    this.CONTROLLERS = new CONTROLLERS_ELEMENTS()
    this.UI_DOM = new UI_DOM_ELEMENTS()
}


UI_ACTIONS.prototype.displayTooltip = function(e){
    const tooltip = e.target.querySelector('.tools__tooltip')
    const tooltipLeft = e.target.querySelector('.tools__tooltip-left')
    new Promise((resolve,reject) =>{
        UI.UI_DOM.allTooltips.forEach(tooltip => {
            tooltip.style.opacity = 0
            tooltip.style.top = '65px'
        })
        UI.UI_DOM.allTooltipsLeft.forEach(tooltip => {
            tooltip.style.opacity = 0
            tooltip.style.top = '8px'
        })
        resolve('hidden')
    }).then(data => {
        if(tooltip){
            tooltip.style.opacity = '1'
            tooltip.style.top = '55px'
        }
        if(tooltipLeft){
            tooltipLeft.style.opacity = '1'
            tooltipLeft.style.left = '100px'
        }
    }).then(data=>{
        setTimeout(()=>{
            if(tooltip){
                tooltip.style.opacity = '0'
                tooltip.style.top = '65px'
            }
            if(tooltipLeft){
                tooltipLeft.style.opacity = '0'
                tooltipLeft.style.left = '110px'
            }
        },3000)
    })
}





UI_ACTIONS.prototype.toggleMenuOpen = function(e){
    UI.UI_DOM.allMenus.forEach(menu => {
        menu.style.display = 'none'
        menu.style.opacity = 0
    })
    if(e.target.dataset.id){
        const menu = document.querySelector(`#${e.target.dataset.id}`)
        menu.style.display = 'flex'
        menu.style.opacity = '1'
    }
}




const UI = new UI_ACTIONS() 




function TOOLS_ACTIONS(){
    this.isPaint = false
    this.activeTool = 'brushTool'
    this.allToolsIcons = [
        {
            id:'canvasTool',
            icon:'far fa-copy'
        },
        {
            id:'wideTool',
            icon:'fas fa-arrows-alt-h'
        },
        {
            id:'pencilTool',
            icon:'fas fa-pencil-alt'
        },
        {
            id:'brushTool',
            icon:'fas fa-paint-brush'
        },
        {
            id:'lineTool',
            icon:'fas fa-grip-lines'
        },
        {
            id:'textTool',
            icon:'fas fa-text-width'
        },
        {
            id:'shadowTool',
            src:'./assets/icons/ball-outline-with-shadow-at-the-edge.png'
        },
        {
            id:'fillTool',
            icon:'fas fa-fill-drip'
        },
        {
            id:'gradientTool',
            src:'./assets/icons/gradient.png'
        },
        {
            id:'aplhaTool',
            icon:'fas fa-font'
        },
        {
            id:'rubberTool',
            icon:'fas fa-eraser'
        }
    ]
    this.wide = 11
    this.x1 = 100
    this.y1 = 0
    this.x2 = 100;
    this.y2 = 0
    this.r = 0
    this.shadowColor = 'red'
    this.shadowBlur = 10
    this.fillColor = '#000000'
    this.strokeColor = '#000000'
    this.fillColor = this.firstColor
    this.swapColors = false
    this.firstColor = '#000000'
    this.secondColor = '#ffffff'
}

TOOLS_ACTIONS.prototype.setStartPos = function(e){
    this.x1 = e.clientX - 80
    this.y1 = e.clientY 
}

TOOLS_ACTIONS.prototype.setEndPos = function(e){
    this.x2 = e.clientX - 80
    this.y2 = e.clientY
}

TOOLS_ACTIONS.prototype.setActiveTool = function(e){
    if(e.target.dataset.tool){
        this.activeTool = e.target.dataset.tool
    }
}

TOOLS_ACTIONS.prototype.setActiveIcon = function(e){
    if(e.target.dataset.tool){
        if(e.target.dataset.tool === 'gradientTool' || e.target.dataset.tool === 'shadowTool'){
            const  item = this.allToolsIcons.find(el => el.id === e.target.dataset.tool)
            const img = document.createElement('img')
            img.src = item.src
            UI.UI_DOM.activeTool.innerHTML = ''
            UI.UI_DOM.activeTool.appendChild(img)
        } else if(e.target.dataset.tool === 'squareTool' ){
            UI.UI_DOM.activeTool.innerHTML = ''
            const tempEl = UI.UI_DOM.square.cloneNode(true)
            UI.UI_DOM.activeTool.appendChild(tempEl)

        } else  if(e.target.dataset.tool ==='circleTool'){
            UI.UI_DOM.activeTool.innerHTML = ''
            const tempEl = UI.UI_DOM.circle.cloneNode(true)
            UI.UI_DOM.activeTool.appendChild(tempEl)
        } else{
            const item = this.allToolsIcons.find(el => el.id === e.target.dataset.tool)
            UI.UI_DOM.activeTool.innerHTML = `<i class="${item.icon}"></i>`
        }
    }
}

TOOLS_ACTIONS.prototype.isActive = function(){
    if(!this.isPaint){
        this.isPaint = true
    }else{
        this.isPaint = false
    }
}

TOOLS_ACTIONS.prototype.setStrokeColor = function(e){
    this.strokeColor = e.target.value
    UI.UI_DOM.strokeColorLine.style.borderBottom = `2px solid ${e.target.value}`
}

TOOLS_ACTIONS.prototype.setFirstColor = function(e){
    this.firstColor = e.target.value
}
TOOLS_ACTIONS.prototype.setSecondColor = function(e){
    this.secondColor = e.target.value
}


TOOLS_ACTIONS.prototype.setSwapColors = function(){
    if(!this.swapColors){
        this.fillColor = this.secondColor
        UI.UI_DOM.firstColorInput.value = this.secondColor
        UI.UI_DOM.secondColorInput.value = this.firstColor
        this.swapColors = true
    }else{
        this.fillColor = this.firstColor
        UI.UI_DOM.firstColorInput.value = this.firstColor
        UI.UI_DOM.secondColorInput.value = this.secondColor
        this.swapColors = false
    }
}

TOOLS_ACTIONS.prototype.squareTool = function(){
    CANVAS_DOM.ctx.beginPath()
    CANVAS_DOM.ctx.strokeRect(this.x1,this.y1,this.x2 - this.x1,this.y2 - this.y1)
    CANVAS_DOM.ctx.stroke()
}
TOOLS_ACTIONS.prototype.circleTool = function(){
    CANVAS_DOM.ctx.beginPath()
    CANVAS_DOM.ctx.arc(this.x1,this.y1,this.x2 - this.x1,0,2*Math.PI,false)
    CANVAS_DOM.ctx.flllStyle = 'white'
    CANVAS_DOM.ctx.stroke()

}

TOOLS_ACTIONS.prototype.pencilTool = function(){
    CANVAS_DOM.ctx.beginPath()
    CANVAS_DOM.ctx.lineCap = 'square'
    CANVAS_DOM.ctx.moveTo(this.x1,this.y1)
    CANVAS_DOM.ctx.lineTo(this.x1,this.y1)
    CANVAS_DOM.ctx.lineWidth = this.wide
    CANVAS_DOM.ctx.strokeStyle = this.strokeColor
    CANVAS_DOM.ctx.stroke()
}


TOOLS_ACTIONS.prototype.brushTool = function(){
    CANVAS_DOM.ctx.beginPath()
    CANVAS_DOM.ctx.lineCap = 'round'
    CANVAS_DOM.ctx.lineTo(this.x1,this.y1)
    CANVAS_DOM.ctx.lineWidth = this.wide
    CANVAS_DOM.ctx.strokeStyle = this.strokeColor
    CANVAS_DOM.ctx.stroke()
}


TOOLS_ACTIONS.prototype.shadowTool = function(){
    CANVAS_DOM.ctx.shadowColor = this.shadowColor
    CANVAS_DOM.ctx.shadowBlur = this.shadowBlur
}



TOOLS_ACTIONS.prototype.lineTool = function(){
    CANVAS_DOM.ctx.lineCap = 'round'
    // DOM.ctx.lineDashOffset = 24
    CANVAS_DOM.ctx.lineTo(this.x1,this.y2)
    CANVAS_DOM.ctx.lineWidth = this.lineWidth
    CANVAS_DOM.ctx.strokeStyle = this.strokeColor
    CANVAS_DOM.ctx.stroke()
}

TOOLS_ACTIONS.prototype.textTool = function(){

}

TOOLS_ACTIONS.prototype.fillTool = function(){
    CANVAS_DOM.ctx.fillStyle = this.fillColor
}

TOOLS_ACTIONS.prototype.linearGradientTool = function(){
    const gradient = DOM.ctx.createLinearGradient(0,0,200,0)
    CANVAS_DOM.ctx.fillStyle = gradient
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "white");
}

TOOLS_ACTIONS.prototype.radialGradientTool = function(){
    const gradient = DOM.ctx.createRadialGradient(5, 50, 5, 90, 60, 100)
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "white");
    CANVAS_DOM.ctx.fillStyle = gradient

}

const TOOLS = new TOOLS_ACTIONS()


window.addEventListener('DOMContentLoaded',()=>{
    UI.UI_DOM.toolsWrapper.style.height = CANVAS_DOM.canvas.height + 'px'
})

CANVAS_DOM.canvas.addEventListener('mousedown',(e)=>{
    TOOLS.isActive()
   if(TOOLS.activeTool !== 'pathTool'){
    TOOLS.setStartPos(e)
       CANVAS_DOM.ctx.moveTo(TOOLS.x1,TOOLS.y1)
   }
   if(TOOLS.activeTool === 'squareTool' || TOOLS.activeTool === 'circleTool'){
    TOOLS.setStartPos(e)
   }
})

CANVAS_DOM.canvas.addEventListener('mouseup',(e)=>{
    TOOLS.isActive()
    CANVAS_DOM.ctx.closePath()
    if(TOOLS.activeTool === 'lineTool'){
        TOOLS.lineTool()
    }else if(TOOLS.activeTool ==='squareTool' || TOOLS.activeTool === 'circleTool'){
        TOOLS[TOOLS.activeTool]()
    }
 })

CANVAS_DOM.canvas.addEventListener('mousemove',(e)=>{
    if(TOOLS.activeTool !== 'squareTool' && TOOLS.activeTool !== 'circleTool'){
        TOOLS.setStartPos(e)
    }else if(TOOLS.activeTool === 'squareTool' || TOOLS.activeTool === 'circleTool' || TOOLS.activeTool === 'lineTool'){
        TOOLS.setEndPos(e)
    }
    if(TOOLS.isPaint){
        if(TOOLS.activeTool !== 'lineTool' && TOOLS.activeTool !== 'squareTool' && TOOLS.activeTool !== 'circleTool'){
            TOOLS[TOOLS.activeTool]()
        }
    }
})

UI.UI_DOM.allMenusDivs.forEach(item => {
    item.addEventListener('mouseenter',(e)=>UI.displayTooltip(e))
})

UI.UI_DOM.allTools.forEach((item,index) => {
    if(index > 11){
        item.addEventListener('mouseenter',(e)=>UI.displayTooltip(e))
    }
})





UI.UI_DOM.allTools.forEach(tool => tool.addEventListener('click',(e)=>TOOLS.setActiveTool(e)))
UI.UI_DOM.allTools.forEach(parentItem => {
    parentItem.addEventListener('click',(e)=>{
        const items = parentItem.querySelectorAll('div')
        UI.toggleMenuOpen(e)
        parentItem.removeEventListener('click',(e)=>UI.toggleMenuOpen(e))
    })
})

UI.UI_DOM.strokeColorInput.addEventListener('input',(e)=>TOOLS.setStrokeColor(e))
UI.UI_DOM.firstColorInput.addEventListener('input',(e)=>TOOLS.setFirstColor(e))
UI.UI_DOM.secondColorInput.addEventListener('input',(e)=>TOOLS.setSecondColor(e))
UI.UI_DOM.swapBtn.addEventListener('click',()=>TOOLS.setSwapColors())
// Canvas2Image.saveAsPNG(CANVAS_DOM.canvas)
