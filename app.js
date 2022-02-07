import Canvas2Image from './canvas2image.js'
// input.addEventListener('blur',(e)=>{console.log(e.target.value)})

function CANVAS_ELEMENTS(){
    this.canvas  = document.getElementById('ctx')
    this.ctx = this.canvas.getContext('2d')
}

const CANVAS_DOM = new CANVAS_ELEMENTS()

function UI_ACTIONS(){
    function CONTROLLERS_ELEMENTS(){
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
    }
    function UI_DOM_ELEMENTS(){
        this.toolsWrapper = document.querySelector('.tools-wrapper')
        this.activeTool = document.querySelector('.tools__active-tool'),
        this.allTools = document.querySelectorAll('.tools > div'),
        this.allMenus = document.querySelectorAll('.tools__menu'),
        this.allMenusDivs = document.querySelectorAll('.tools__menu div')
        this.allTooltips = document.querySelectorAll('.tools__tooltip')
        this.allTooltipsLeft = document.querySelectorAll('.tools__tooltip-left')
    }
    function CANVAS_TOOL(){
        this.canvasWidth = document.querySelector('.tools__canvas-size-range:first-of-type input')
        this.canvasHeight = document.querySelector('.tools__canvas-size-range:last-of-type input')
        this.canvasColor = document.querySelector('.tools__canvas-color-picker')
        this.clearCanvas = document.querySelector('.tools__clear-canvas')
        this.squareParent = document.querySelector('.tools__square')
    }

    function WIDE_TOOL(){}
    function SQUARE_TOOL(){
        this.square = document.querySelector('.square')
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
    if(e.target.dataset.action){
        if(e.target.dataset.action === 'gradientTool' || e.target.dataset.action === 'shadowTool'){
            const  item = UI.CONTROLLERS.allToolsIcons.find(el => el.id === e.target.dataset.action)
            const img = document.createElement('img')
            img.src = item.src
            UI.UI_DOM.activeTool.innerHTML = ''
            UI.UI_DOM.activeTool.appendChild(img)
        } else if(e.target.dataset.tool === 'squareTool' ){
            UI.UI_DOM.activeTool.innerHTML = ''
            const tempEl = UI.UI_DOM.square.cloneNode(true)
            UI.UI_DOM.activeTool.appendChild(tempEl)

        } else  if(e.target.dataset.toolAction ==='circleTool'){
            UI.UI_DOM.activeTool.innerHTML = ''
            const tempEl = UI.UI_DOM.circle.cloneNode(true)
            UI.UI_DOM.activeTool.appendChild(tempEl)
        } else{
            const item =  UI.CONTROLLERS.allToolsIcons.find(el => el.id === e.target.dataset.action)

            UI.UI_DOM.activeTool.innerHTML = `<i class="${item.icon}"></i>`
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
    function STYLES(){
        this.wide = 11
        this.shadowColor = 'red'
        this.shadowBlur = 10
        this.strokeColor = '#000000'
        this.firstColor = '#000000'
        this.secondColor = '#ffffff'
        this.fillColor = this.firstColor
    }
    function CANVAS_TOOL(){}
    function WIDE_TOOL(){}
    function SQUARE_TOOL(){}
    SQUARE_TOOL.prototype.squareTool = function(){
        CANVAS_DOM.ctx.beginPath()
        CANVAS_DOM.ctx.strokeRect(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,TOOLS.Cords.y2 - TOOLS.Cords.y1)
        CANVAS_DOM.ctx.stroke()
    }
    function CIRCLE_TOOL(){}
    CIRCLE_TOOL.prototype.circleTool = function(){
        CANVAS_DOM.ctx.beginPath()
        CANVAS_DOM.ctx.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,0,2*Math.PI,false)
        CANVAS_DOM.ctx.flllStyle = 'white'
        CANVAS_DOM.ctx.stroke()
    
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
    }
    COLOR_TOOL.prototype.setSecondColor = function(e){
        TOOLS.Styles.secondColor = e.target.value
    }
    COLOR_TOOL.prototype.setSwapColors = function(){
        if(!TOOLS.Controllers.swapColors){
            this.fillColor = this.secondColor
            UI.UI_DOM.firstColorInput.value =  TOOLS.Styles.secondColor
            UI.UI_DOM.secondColorInput.value =  TOOLS.Styles.firstColor
            TOOLS.Controllers.swapColors = true
        }else{
            this.fillColor = this.firstColor
            UI.UI_DOM.firstColorInput.value =  TOOLS.Styles.firstColor
            UI.UI_DOM.secondColorInput.value =  TOOLS.Styles.secondColor
            TOOLS.Controllers.swapColors = false
        }
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
}

const TOOLS = new TOOLS_ACTIONS()

window.addEventListener('DOMContentLoaded',()=>{
    UI.UI_DOM.toolsWrapper.style.height = CANVAS_DOM.canvas.height + 'px'
})

CANVAS_DOM.canvas.addEventListener('mousedown',(e)=>{
    TOOLS.Controllers.isActive()
   if(TOOLS.activeTool !== 'pathTool'){
    TOOLS.Cords.setStartPos(e)
       CANVAS_DOM.ctx.moveTo(TOOLS.Cords.x1,TOOLS.Cords.y1)
   }
   if(TOOLS.activeTool === 'squareTool' || TOOLS.activeTool === 'circleTool'){
    TOOLS.Cords.setStartPos(e)
   }
})

CANVAS_DOM.canvas.addEventListener('mouseup',(e)=>{
    TOOLS.Controllers.isActive()
    CANVAS_DOM.ctx.closePath()
    if(TOOLS.Controllers.activeTool === 'lineTool'){
        TOOLS.LineTool.lineTool()
    }else if(TOOLS.Controllers.activeTool ==='squareTool' || TOOLS.Controllers.activeTool === 'circleTool'){
        TOOLS[TOOLS.Controllers.activeTool][TOOLS.Controllers.toolAction]()
    }
 })

CANVAS_DOM.canvas.addEventListener('mousemove',(e)=>{
    if(TOOLS.Controllers.activeTool !== 'squareTool' && TOOLS.Controllers.activeTool !== 'circleTool'){
        TOOLS.Cords.setStartPos(e)
    }else if(TOOLS.Controllers.activeTool === 'squareTool' || TOOLS.Controllers.activeTool === 'circleTool' || TOOLS.Controllers.activeTool === 'lineTool'){
        TOOLS.Cords.setEndPos(e)
    }
    if(TOOLS.Controllers.isPaint){
        if(TOOLS.Controllers.activeTool !== 'lineTool' && TOOLS.Controllers.activeTool !== 'squareTool' && TOOLS.Controllers.activeTool !== 'circleTool'){
            TOOLS[TOOLS.Controllers.activeTool][TOOLS.Controllers.toolAction]()
        }
    }
})

UI.UI_DOM.allMenusDivs.forEach(item => {
    item.addEventListener('mouseenter',(e)=>UI.displayTooltip(e))
})

UI.UI_DOM.allTools.forEach((item,index) => {
    if(index > 9){
        item.addEventListener('mouseenter',(e)=>UI.displayTooltip(e))
    }
})





UI.UI_DOM.allTools.forEach(tool => tool.addEventListener('click',(e)=>TOOLS.Controllers.setActiveTool(e)))
UI.UI_DOM.allTools.forEach(tool => tool.addEventListener('click',(e)=>UI.setActiveIcon(e)))
UI.UI_DOM.allTools.forEach(parentItem => {
    parentItem.addEventListener('click',(e)=>{
        const items = parentItem.querySelectorAll('div')
        UI.toggleMenuOpen(e)
        parentItem.removeEventListener('click',(e)=>UI.toggleMenuOpen(e))
    })
})

UI.StrokeTool.strokeColorInput.addEventListener('input',(e)=>TOOLS.setStrokeColor(e))
UI.ColorTool.firstColorInput.addEventListener('input',(e)=>TOOLS.setFirstColor(e))
UI.ColorTool.secondColorInput.addEventListener('input',(e)=>TOOLS.setSecondColor(e))
UI.ColorTool.swapBtn.addEventListener('click',()=>TOOLS.setSwapColors())
// Canvas2Image.saveAsPNG(CANVAS_DOM.canvas)
