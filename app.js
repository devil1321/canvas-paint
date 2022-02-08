import Canvas2Image from './canvas2image.js'

function CANVAS_ELEMENTS(){
    this.canvas  = document.getElementById('ctx')
    this.canvasPlaceholder = document.getElementById('ctx-placeholder')
    this.ctx = this.canvas.getContext('2d')
    this.ctxPlaceholder = this.canvasPlaceholder.getContext('2d')
}

const CANVAS_DOM = new CANVAS_ELEMENTS()

function UI_ACTIONS(){
    function CONTROLLERS_ELEMENTS(){
        this.allToolsIcons = []
    }
    function UI_DOM_ELEMENTS(){
        this.toolsWrapper = document.querySelector('.tools-wrapper')
        this.activeTool = document.querySelector('.tools__active-tool'),
        this.allTools = document.querySelectorAll('.tools > div'),
        this.allMenus = document.querySelectorAll('.tools__menu'),
        this.allMenuItems = document.querySelectorAll('.tools__menu > div')
        this.allTooltips = document.querySelectorAll('.tools__tooltip')
        this.allTooltipsLeft = document.querySelectorAll('.tools__tooltip-left')
    }
    function CANVAS_TOOL(){
        this.canvasWidth = document.querySelector('.--canvas-width')
        this.canvasHeight = document.querySelector('.--canvas-height')
        this.showWidth = document.querySelector('.--c-width')
        this.showHeight = document.querySelector('.--c-height')
        this.canvasColor = document.querySelector('.--canvas-color')
        this.clearCanvas = document.querySelector('.tools__clear-canvas')
        this.squareParent = document.querySelector('.tools__square')
    }

    function WIDE_TOOL(){
        this.wideTool = document.querySelector('.--wide-tool')
        this.showWide = document.querySelector('.--wide-state')
    }
    function SQUARE_TOOL(){
        this.square = document.querySelector('.square')
        this.lineJoinItems = document.querySelectorAll('.tools__line-join')
    }
    
    function CIRCLE_TOOL(){
        this.circle = document.querySelector('.circle')
    }
    function PENCIL_TOOL(){
        this.pencil = document.querySelector('.tools__pencil')
    }
    function BRUSH_TOOL(){
        this.brush = document.querySelector('.tools__brush')
    }
    function LINE_TOOL(){
        this.line = document.querySelector('.tools__line')
    }
    function TEXT_TOOL(){}
    function PATH_TOOL(){}
    function BEZIER_TOOL(){}
    function GRADIENT_TOOL(){}
    function ALPHA_TOOL(){}
    function SHADOW_TOOL(){
        this.shadow = document.querySelector('.tools__shadow')
    }
    function RUBBER_TOOL(){}
    function STROKE_TOOL(){
        this.strokeColorLine = document.querySelector('.tools__stroke-color div')
        this.strokeColorInput = document.querySelector('.tools__stroke-color input')
    }
    function COLOR_TOOL(){
        this.firstColorInput = document.querySelector('.tools__first-color input'),
        this.secondColorInput = document.querySelector('.tools__second-color input')
        this.swapBtn = document.querySelector('.tools__swap-btn')

    }
    function SAVE_TOOL(){
        this.savePNG = document.querySelector('.tools__save-png')
        this.saveBMP = document.querySelector('.tools__save-bmp')
    }
    this.CONTROLLERS = new CONTROLLERS_ELEMENTS()
    this.UI_DOM = new UI_DOM_ELEMENTS()

    this.CanvasTool = new CANVAS_TOOL()
    this.WideTool = new WIDE_TOOL()
    this.SquareTool = new SQUARE_TOOL()
    this.CircleTool = new CIRCLE_TOOL()
    this.PencilTool = new PENCIL_TOOL()
    this.BrushTool = new BRUSH_TOOL()
    this.LineTool = new LINE_TOOL()
    this.TextTool = new TEXT_TOOL()
    this.PathTool = new PATH_TOOL()
    this.BezierTool = new BEZIER_TOOL()
    this.GradientTool = new GRADIENT_TOOL()
    this.AlphaTool = new ALPHA_TOOL()
    this.ShadowTool = new SHADOW_TOOL()
    this.RubberTool = new RUBBER_TOOL()
    this.StrokeTool = new STROKE_TOOL()
    this.ColorTool = new COLOR_TOOL()
    this.SaveTool = new SAVE_TOOL()
}

UI_ACTIONS.prototype.clickToolPush = function(e){
    e.target.classList.add('active') 
}
UI_ACTIONS.prototype.clickToolRelease = function(e){
    e.target.classList.remove('active') 
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
UI_ACTIONS.prototype.setActiveIcon = function(e){
    let target;
    if(e.target.tagName.toUpperCase() === 'INPUT' && e.target.dataset.tool){
        target = e.target.parentElement.parentElement
    }else if(!e.target.dataset.tool){
        target = e.target.parentElement
    }
    else{
        target = e.target
    }
    this.CONTROLLERS.allToolsIcons = []
    class ICON{
        constructor(icon,src,node,action){
            this.icon = icon;
            this.src = src
            this.node = node
            this.action = action
        }
    }
    const icon = target.querySelector('i')
    const img = target.querySelector('img')
    const divIcon = target.querySelector('div:first-child')
    const action = target.dataset.action
    if(icon){
        const iconEL = new ICON(icon.classList.value,null,null,action)
        this.CONTROLLERS.allToolsIcons.push(iconEL)
    }else if(img){
        const iconEL = new ICON(null,img.src,null,action)
        this.CONTROLLERS.allToolsIcons.push(iconEL)
    }else if(divIcon){
        const tempEl = divIcon.cloneNode(true)
        const iconEL = new ICON(null,null,tempEl,action)
        this.CONTROLLERS.allToolsIcons.push(iconEL)
    }
    if(target.dataset.action){
        const item =  this.CONTROLLERS.allToolsIcons.find(el => el.action === target.dataset.action)
        if(item.icon){
            this.UI_DOM.activeTool.innerHTML = `<i class="${item.icon}"></i>`      
        }else if(item.src){
            const img = document.createElement('img')
            img.src = item.src
            this.UI_DOM.activeTool.innerHTML = ''
            this.UI_DOM.activeTool.appendChild(img)
        }else if(item.node){
            this.UI_DOM.activeTool.innerHTML = ''
            const icon = item.node
            this.UI_DOM.activeTool.appendChild(icon)
        }
    } 
}

const UI = new UI_ACTIONS() 

function TOOLS_ACTIONS(){
    function CONTROLLERS(){
        this.isPaint = false
        this.activeTool = 'BrushTool'
        this.toolAction = 'brushTool'
        this.swapColors = false
        this.isPath = false

    }
    CONTROLLERS.prototype.setActiveTool = function(e){
        if(e.target.dataset.tool){
            this.activeTool = e.target.dataset.tool
            this.toolAction = e.target.dataset.action
        }
    }
    CONTROLLERS.prototype.isActive = function(){
        if(!this.isPaint){
            this.isPaint = true
        }else{
            this.isPaint = false
        }
    }
    function CORDS(){
        this.x1 = 100
        this.y1 = 0
        this.x2 = 100;
        this.y2 = 0
        this.r = 0
    }
    CORDS.prototype.setStartPos = function(e){
        this.x1 = e.clientX - 80
        this.y1 = e.clientY 
    }
    
    CORDS.prototype.setEndPos = function(e){
        this.x2 = e.clientX - 80
        this.y2 = e.clientY
    }
    CORDS.prototype.setRadius = function(e){
        this.r = this.x2 - this.x1
    }
    function STYLES(){
        this.lineWidth = 10
        this.lineJoin = 'square'
        this.shadowColor = 'red'
        this.shadowBlur = 10
        this.strokeColor = '#000000'
        this.firstColor = '#000000'
        this.secondColor = '#ffffff'
    }
    function CANVAS_TOOL(){
    }
    CANVAS_TOOL.prototype.canvasHeight = function(e){
        CANVAS_DOM.canvas.height = e.target.value
        CANVAS_DOM.canvasPlaceholder.height = e.target.value
        UI.CanvasTool.showHeight.textContent = e.target.value
    }
    CANVAS_TOOL.prototype.canvasWidth= function(e){
        CANVAS_DOM.canvas.width = e.target.value
        CANVAS_DOM.canvasPlaceholder.width = e.target.value
        UI.CanvasTool.showWidth.textContent = e.target.value

    }
    CANVAS_TOOL.prototype.canvasColor = function(e){
        CANVAS_DOM.ctx.fillRect(0,0,CANVAS_DOM.canvas.width,CANVAS_DOM.canvas.height)
        CANVAS_DOM.ctx.fillStyle = e.target.value
    }
    CANVAS_TOOL.prototype.canvasClear= function(e){
        CANVAS_DOM.ctx.clearRect(0,0,CANVAS_DOM.canvas.width,CANVAS_DOM.canvas.height)
    }

    function WIDE_TOOL(){}
    WIDE_TOOL.prototype.wideTool = function(e){
        TOOLS.Styles.lineWidth = e.target.value
        UI.WideTool.showWide.textContent = e.target.value
        CANVAS_DOM.ctx.lineWidth = TOOLS.Styles.lineWidth
        CANVAS_DOM.ctxPlaceholder.lineWidth = TOOLS.Styles.lineWidth
    }
    function SQUARE_TOOL(){
    }
  
    SQUARE_TOOL.prototype.squareToolStroke = function(){
        if(TOOLS.Controllers.isPaint){
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()
            }
            CANVAS_DOM.ctxPlaceholder.clearRect(TOOLS.Cords.x1,TOOLS.Cords.y1,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
            CANVAS_DOM.ctxPlaceholder.strokeStyle = TOOLS.Styles.strokeColor
            CANVAS_DOM.ctxPlaceholder.strokeRect(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,TOOLS.Cords.y2 - TOOLS.Cords.y1)
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            }
        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.beginPath()
            }
            CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
            CANVAS_DOM.ctx.strokeRect(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,TOOLS.Cords.y2 - TOOLS.Cords.y1)
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.closePath()
            }

        }
    }
    SQUARE_TOOL.prototype.squareToolFill = function(){
        if(TOOLS.Controllers.isPaint){
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()
            }
            CANVAS_DOM.ctxPlaceholder.clearRect(TOOLS.Cords.x1,TOOLS.Cords.y1,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
            CANVAS_DOM.ctxPlaceholder.fillRect(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,TOOLS.Cords.y2 - TOOLS.Cords.y1)
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            }

        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.beginPath()
            }
            CANVAS_DOM.ctx.fillRect(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,TOOLS.Cords.y2 - TOOLS.Cords.y1)
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.closePath()
            }

        }
    }
    SQUARE_TOOL.prototype.squareToolFillStroke = function(){
        if(TOOLS.Controllers.isPaint){
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()
            }
            CANVAS_DOM.ctxPlaceholder.strokeStyle = TOOLS.Styles.strokeColor
            CANVAS_DOM.ctxPlaceholder.rect(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,TOOLS.Cords.y2 - TOOLS.Cords.y1)
            CANVAS_DOM.ctxPlaceholder.stroke()
            CANVAS_DOM.ctxPlaceholder.fill()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            }

        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.beginPath()
            }
            CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.sttrokeColor
            CANVAS_DOM.ctx.rect(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,TOOLS.Cords.y2 - TOOLS.Cords.y1)
            CANVAS_DOM.ctx.stroke()
            CANVAS_DOM.ctx.fill()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.closePath()
            }

        }
    }
    function CIRCLE_TOOL(){}
    CIRCLE_TOOL.prototype.circleToolStroke = function(){
        if(TOOLS.Controllers.isPaint){
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()  
            } 
                CANVAS_DOM.ctxPlaceholder.clearRect(TOOLS.Cords.x1,TOOLS.Cords.y1,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
                CANVAS_DOM.ctxPlaceholder.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,0,2*Math.PI,false)
                CANVAS_DOM.ctxPlaceholder.stroke()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            } 
        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()   
            }
            CANVAS_DOM.ctx.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,Math.abs(TOOLS.Cords.r),0,2*Math.PI,false)
            CANVAS_DOM.ctx.stroke()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            }
        }
        if(!TOOLS.Controllers.isPath){
            CANVAS_DOM.ctx.beginPath()
        }    
    }
    CIRCLE_TOOL.prototype.circleToolFill = function(){
        if(TOOLS.Controllers.isPaint){
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()  
            } 
                CANVAS_DOM.ctxPlaceholder.clearRect(TOOLS.Cords.x1,TOOLS.Cords.y1,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
                CANVAS_DOM.ctxPlaceholder.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,0,2*Math.PI,false)
                CANVAS_DOM.ctxPlaceholder.fill()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            } 
        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()   
            }
            CANVAS_DOM.ctx.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,Math.abs(TOOLS.Cords.r),0,2*Math.PI,false)
            CANVAS_DOM.ctx.fill()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            }
        }
        if(!TOOLS.Controllers.isPath){
            CANVAS_DOM.ctx.beginPath()
        }    
    }
    CIRCLE_TOOL.prototype.circleToolFillStroke = function(){
        if(TOOLS.Controllers.isPaint){
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()  
            } 
                CANVAS_DOM.ctxPlaceholder.clearRect(TOOLS.Cords.x1,TOOLS.Cords.y1,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
                CANVAS_DOM.ctxPlaceholder.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,0,2*Math.PI,false)
                CANVAS_DOM.ctxPlaceholder.stroke()
                CANVAS_DOM.ctxPlaceholder.fill()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            } 
        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()   
            }
            CANVAS_DOM.ctx.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,Math.abs(TOOLS.Cords.r),0,2*Math.PI,false)
            CANVAS_DOM.ctx.stroke()
            CANVAS_DOM.ctx.fill()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            }
        }
        if(!TOOLS.Controllers.isPath){
            CANVAS_DOM.ctx.beginPath()
        }    
    }
    function PENCIL_TOOL(){
        this.square = 'square'
        this.round = 'round'
        this.blur = '10'
    }
    PENCIL_TOOL.prototype.pencilTool = function(){
        CANVAS_DOM.ctx.beginPath()
        CANVAS_DOM.ctx.lineCap = 'square'
        CANVAS_DOM.ctx.moveTo(TOOLS.Cords.x1,TOOLS.Cords.y1)
        CANVAS_DOM.ctx.lineTo(TOOLS.Cords.x1,TOOLS.Cords.y1)
        CANVAS_DOM.ctx.lineWidth = TOOLS.Styles.wide
        CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
        CANVAS_DOM.ctx.stroke()
    }
    
    function BRUSH_TOOL(){
        this.square = 'square'
        this.round = 'round'
        this.blur = '10'
    }   
    BRUSH_TOOL.prototype.brushTool = function(){
        CANVAS_DOM.ctx.beginPath()
        CANVAS_DOM.ctx.lineCap = 'round'
        CANVAS_DOM.ctx.lineTo(TOOLS.Cords.x1,TOOLS.Cords.y1)
        CANVAS_DOM.ctx.lineWidth = TOOLS.Styles.wide
        CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
        CANVAS_DOM.ctx.stroke()
    }
    
    
    function LINE_TOOL(){}
    
    LINE_TOOL.prototype.lineTool = function(){
        CANVAS_DOM.ctx.lineCap = 'round'
        // DOM.ctx.lineDashOffset = 24
        CANVAS_DOM.ctx.lineTo(TOOLS.Cords.x1,TOOLS.Cords.y2)
        CANVAS_DOM.ctx.lineWidth = TOOLS.Styles.lineWidth
        CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
        CANVAS_DOM.ctx.stroke()
    }
    LINE_TOOL.prototype.setLineJoin = function(e){
        TOOLS.Styles.lineJoin =  e.target.dataset.join
    }
    function TEXT_TOOL(){}
    function PATH_TOOL(){}
    function BEZIER_TOOL(){}
    function GRADIENT_TOOL(){}
    GRADIENT_TOOL.prototype.linearGradientTool = function(){
        const gradient = DOM.ctx.createLinearGradient(0,0,200,0)
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "white");   
        CANVAS_DOM.ctx.fillStyle = gradient
    }
    GRADIENT_TOOL.prototype.radialGradientTool = function(){
        const gradient = DOM.ctx.createRadialGradient(5, 50, 5, 90, 60, 100)
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "white");
        CANVAS_DOM.ctx.fillStyle = gradient

    }
    function ALPHA_TOOL(){}
    function SHADOW_TOOL(){}
    TOOLS_ACTIONS.prototype.shadowTool = function(){
        CANVAS_DOM.ctx.shadowColor = TOOLS.Styles.shadowColor
        CANVAS_DOM.ctx.shadowBlur = TOOLS.Styles.shadowBlur
    }
    
    function RUBBER_TOOL(){}
    function STROKE_TOOL(){}
    STROKE_TOOL.prototype.setStrokeColor = function(e){
        TOOLS.Styles.strokeColor = e.target.value
        UI.StrokeTool.strokeColorLine.style.borderBottom = `2px solid ${e.target.value}`
    }
    function COLOR_TOOL(){}
    COLOR_TOOL.prototype.setFirstColor = function(e){
        TOOLS.Styles.firstColor = e.target.value
        CANVAS_DOM.ctx.fillStyle = TOOLS.Styles.firstColor
        CANVAS_DOM.ctxPlaceholder.fillStyle = TOOLS.Styles.firstColor
    }
    COLOR_TOOL.prototype.setSecondColor = function(e){
        TOOLS.Styles.secondColor = e.target.value
    }
    COLOR_TOOL.prototype.setSwapColors = function(){
        if(!TOOLS.Controllers.swapColors){
            UI.UI_DOM.firstColorInput.value =  TOOLS.Styles.secondColor
            UI.UI_DOM.secondColorInput.value =  TOOLS.Styles.firstColor
            CANVAS_DOM.ctx.fillStyle = TOOLS.Styles.secondColor
            CANVAS_DOM.ctxPlaceholder.fillStyle = TOOLS.Styles.secondColor
            TOOLS.Controllers.swapColors = true
        }else{
            UI.UI_DOM.firstColorInput.value =  TOOLS.Styles.firstColor
            UI.UI_DOM.secondColorInput.value =  TOOLS.Styles.secondColor
            CANVAS_DOM.ctx.fillStyle = TOOLS.Styles.firstColor
            CANVAS_DOM.ctxPlaceholder.fillStyle = TOOLS.Styles.firstColor
            TOOLS.Controllers.swapColors = false
        }
    }
    function SAVE__TOOL(){

    }

    this.Controllers = new CONTROLLERS()
    this.Cords = new CORDS()
    this.Styles = new STYLES()
    this.CanvasTool = new CANVAS_TOOL()
    this.WideTool = new WIDE_TOOL()
    this.SquareTool = new SQUARE_TOOL()
    this.CircleTool = new CIRCLE_TOOL()
    this.PencilTool = new PENCIL_TOOL()
    this.BrushTool = new BRUSH_TOOL()
    this.LineTool = new LINE_TOOL()
    this.TextTool = new TEXT_TOOL()
    this.PathTool = new PATH_TOOL()
    this.BezierTool = new BEZIER_TOOL()
    this.GradientTool = new GRADIENT_TOOL()
    this.AlphaTool = new ALPHA_TOOL()
    this.ShadowTool = new SHADOW_TOOL()
    this.RubberTool = new RUBBER_TOOL()
    this.StrokeTool = new STROKE_TOOL()
    this.ColorTool = new COLOR_TOOL()
    this.SaveTool = new SAVE__TOOL()
}

const TOOLS = new TOOLS_ACTIONS()

window.addEventListener('DOMContentLoaded',()=>{
    UI.UI_DOM.toolsWrapper.style.height = CANVAS_DOM.canvas.height + 'px'
})

CANVAS_DOM.canvas.addEventListener('mousedown',(e)=>{
   CANVAS_DOM.ctxPlaceholder.clearRect(0,0,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
   TOOLS.Controllers.isActive()
   TOOLS.Cords.setStartPos(e)
   if(TOOLS.activeTool !== 'pathTool'){
       CANVAS_DOM.ctx.moveTo(TOOLS.Cords.x1,TOOLS.Cords.y1)
   }

})

CANVAS_DOM.canvas.addEventListener('mouseup',(e)=>{
    TOOLS.Controllers.isActive()
    CANVAS_DOM.ctx.closePath()
    TOOLS[TOOLS.Controllers.activeTool][TOOLS.Controllers.toolAction]()
 })

CANVAS_DOM.canvas.addEventListener('mousemove',(e)=>{
CANVAS_DOM.ctxPlaceholder.clearRect(0,0,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)

    TOOLS.Cords.setEndPos(e)
    TOOLS.Cords.setRadius(e)
    if(TOOLS.Controllers.isPaint){
        if(TOOLS.Controllers.activeTool !== 'lineTool' && TOOLS.Controllers.activeTool !== 'squareTool' && TOOLS.Controllers.activeTool !== 'circleTool'){
            TOOLS[TOOLS.Controllers.activeTool][TOOLS.Controllers.toolAction]()
        }
    }
})

UI.UI_DOM.allMenuItems.forEach(item => {
    item.addEventListener('mouseenter',(e)=>UI.displayTooltip(e))
})
UI.UI_DOM.allTools.forEach((item,index) => {
    item.addEventListener('mousedown',(e)=>UI.clickToolPush(e))
    item.addEventListener('mouseup',(e)=>UI.clickToolRelease(e))
})
UI.UI_DOM.allTools.forEach((item,index) => {
    if(index > 9){
        item.addEventListener('mouseenter',(e)=>UI.displayTooltip(e))
    }
})
UI.UI_DOM.allTools.forEach((item,index) => {
    if(index === 18){
        item.addEventListener('mouseenter',(e)=>UI.displayTooltip(e))
    }
})

UI.UI_DOM.allMenuItems.forEach(tool => tool.addEventListener('click',(e)=>{
    UI.setActiveIcon(e)
    if(tool.dataset.action){
        TOOLS.Controllers.setActiveTool(e)
    }
}))

UI.CanvasTool.canvasHeight.addEventListener('mousedown',(e)=>UI.setActiveIcon(e))
UI.CanvasTool.canvasHeight.addEventListener('mousedown',(e)=>TOOLS.Controllers.setActiveTool(e))
UI.CanvasTool.canvasWidth.addEventListener('mousedown',(e)=>TOOLS.Controllers.setActiveTool(e))
UI.CanvasTool.canvasWidth.addEventListener('mousedown',(e)=>TOOLS.Controllers.setActiveTool(e))
UI.UI_DOM.allTools.forEach(tool => tool.addEventListener('click',(e)=>{
    if(tool.dataset.action){
        TOOLS.Controllers.setActiveTool(e)
    }
}))
UI.UI_DOM.allTools.forEach(tool => {
    if(tool.dataset.action){
        tool.addEventListener('click',(e)=>UI.setActiveIcon(e))
    }
})
UI.UI_DOM.allTools.forEach(parentItem => {
    parentItem.addEventListener('click',(e)=>{
        const items = parentItem.querySelectorAll('div')
        UI.toggleMenuOpen(e)
        parentItem.removeEventListener('click',(e)=>UI.toggleMenuOpen(e))
    })
})

UI.CanvasTool.canvasHeight.addEventListener('input',(e)=>{TOOLS.CanvasTool.canvasHeight(e)})
UI.CanvasTool.canvasWidth.addEventListener('input',(e)=>{TOOLS.CanvasTool.canvasWidth(e)})
UI.CanvasTool.canvasColor.addEventListener('input',(e)=>TOOLS.CanvasTool.canvasColor(e))
UI.CanvasTool.clearCanvas.addEventListener('click',TOOLS.CanvasTool.canvasClear)

UI.WideTool.wideTool.addEventListener('input',(e)=>TOOLS.WideTool.wideTool(e))
UI.SquareTool.lineJoinItems.forEach(item => item.addEventListener('click',(e)=>TOOLS.SquareTool.setLineJoin(e)))



UI.StrokeTool.strokeColorInput.addEventListener('input',(e)=>TOOLS.StrokeTool.setStrokeColor(e))
UI.ColorTool.firstColorInput.addEventListener('input',(e)=>TOOLS.ColorTool.setFirstColor(e))
UI.ColorTool.secondColorInput.addEventListener('input',(e)=>TOOLS.ColorTool.setSecondColor(e))
UI.ColorTool.swapBtn.addEventListener('click',()=>TOOLS.setSwapColors())
// Canvas2Image.saveAsPNG(CANVAS_DOM.canvas)
