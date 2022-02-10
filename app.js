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
    }
    
    function CIRCLE_TOOL(){
        this.circle = document.querySelector('.circle')
    }
    function PENCIL_TOOL(){
        this.pencils = document.querySelectorAll('.tools__pencil .tools__menu > div')
    }
    function BRUSH_TOOL(){
        this.brushes = document.querySelectorAll('.tools__brush .tools__menu > div')

    }
    function LINE_TOOL(){
        this.line = document.querySelector('.tools__line')
        this.lineJoinItems = document.querySelectorAll('.tools__line-join')

    }
    function TEXT_TOOL(){
        this.promptWrapper = document.querySelector('.tools__prompt-wrapper')
        this.prompt = document.querySelector('.--prompt')
        this.fill = document.querySelector('.--stroke-text')
        this.stroke = document.querySelector('.--fill-text')
    }
   
    function BEZIER_TOOL(){}
    function GRADIENT_TOOL(){
        this.linear = document.querySelector('.--linear-gradient')
        this.radial = document.querySelector('.--radial-gradient')
        this.off = document.querySelector('.--gradient-off')
    }
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
        this.isGradientLinear = false
        this.isGradientRadial = false

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
        if(this.x2 - this.x1 > 0){
            this.r = this.x2 - this.x1
        }else{
            this.r = (this.x2 - this.x1) * (-1)
        }
    }
    function STYLES(){
        this.lineWidth = 3
        this.lineJoin = 'square'
        this.pencilLineCap = 'square'
        this.brushLineCap = 'square'
        this.shadowColor = 'red'
        this.shadowBlur = 10
        this.strokeColor = '#000000'
        this.firstColor = '#000000'
        this.secondColor = '#ffffff'
        this.gradient = ''
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
            CANVAS_DOM.ctxPlaceholder.shadowBlur = 0
            CANVAS_DOM.ctxPlaceholder.clearRect(0,0,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
            CANVAS_DOM.ctxPlaceholder.strokeStyle = TOOLS.Styles.strokeColor
            CANVAS_DOM.ctxPlaceholder.lineWidth= TOOLS.Styles.lineWidth
            CANVAS_DOM.ctxPlaceholder.strokeRect(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,TOOLS.Cords.y2 - TOOLS.Cords.y1)
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            }
        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.beginPath()
            }

            CANVAS_DOM.ctx.shadowBlur = 0
            CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
            CANVAS_DOM.ctx.lineWidth= TOOLS.Styles.lineWidth

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
            CANVAS_DOM.ctxPlaceholder.shadowBlur = 0
            CANVAS_DOM.ctxPlaceholder.lineWidth= TOOLS.Styles.lineWidth
            CANVAS_DOM.ctxPlaceholder.clearRect(0,0,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
            if(TOOLS.Controllers.isGradientLinear || TOOLS.Controllers.isGradientRadial){
                CANVAS_DOM.ctxPlaceholder.fillStyle = TOOLS.Styles.gradient
            }
            CANVAS_DOM.ctxPlaceholder.fillRect(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,TOOLS.Cords.y2 - TOOLS.Cords.y1)
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            }

        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.beginPath()
            }
            CANVAS_DOM.ctx.shadowBlur = 0
            CANVAS_DOM.ctx.lineWidth= TOOLS.Styles.lineWidth
            if(TOOLS.Controllers.isGradientLinear || TOOLS.Controllers.isGradientRadial){
                CANVAS_DOM.ctx.fillStyle = TOOLS.Styles.gradient
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
            CANVAS_DOM.ctxPlaceholder.lineWidth= TOOLS.Styles.lineWidth
            if(TOOLS.Controllers.isGradientLinear || TOOLS.Controllers.isGradientRadial){
                CANVAS_DOM.ctxPlaceholder.fillStyle = TOOLS.Styles.gradient
            }
            CANVAS_DOM.ctxPlaceholder.shadowBlur = 0
            CANVAS_DOM.ctxPlaceholder.strokeStyle = TOOLS.Styles.strokeColor
            CANVAS_DOM.ctxPlaceholder.clearRect(0,0,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
            CANVAS_DOM.ctxPlaceholder.rect(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2 - TOOLS.Cords.x1,TOOLS.Cords.y2 - TOOLS.Cords.y1)
            if(TOOLS.Controllers.isGradient){
                CANVAS_DOM.ctxPlaceholder.fillStyle = TOOLS.Styles.gradient
            }
            CANVAS_DOM.ctxPlaceholder.stroke()
            CANVAS_DOM.ctxPlaceholder.fill()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            }

        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.beginPath()
            }
            CANVAS_DOM.ctx.shadowBlur = 0
            CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
            CANVAS_DOM.ctx.lineWidth= TOOLS.Styles.lineWidth
            if(TOOLS.Controllers.isGradientLinear || TOOLS.Controllers.isGradientRadial){
                CANVAS_DOM.ctx.fillStyle = TOOLS.Styles.gradient
            }
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
                CANVAS_DOM.ctxPlaceholder.shadowBlur = 0
                CANVAS_DOM.ctxPlaceholder.lineWidth= TOOLS.Styles.lineWidth

                CANVAS_DOM.ctxPlaceholder.clearRect(0,0,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
                CANVAS_DOM.ctxPlaceholder.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.r,0,2*Math.PI,false)
                CANVAS_DOM.ctxPlaceholder.stroke()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            } 
        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()   
            }
            CANVAS_DOM.ctx.shadowBlur = 0
            CANVAS_DOM.ctx.lineWidth= TOOLS.Styles.lineWidth

            CANVAS_DOM.ctx.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.r,0,2*Math.PI,false)
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
                CANVAS_DOM.ctxPlaceholder.lineWidth= TOOLS.Styles.lineWidth
                CANVAS_DOM.ctxPlaceholder.shadowBlur = 0
                CANVAS_DOM.ctxPlaceholder.clearRect(0,0,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
                if(TOOLS.Controllers.isGradientLinear || TOOLS.Controllers.isGradientRadial){
                    CANVAS_DOM.ctxPlaceholder.fillStyle = TOOLS.Styles.gradient
                }
                CANVAS_DOM.ctxPlaceholder.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.r,0,2*Math.PI,false)
                CANVAS_DOM.ctxPlaceholder.fill()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            } 
        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()   
            }
            CANVAS_DOM.ctx.shadowBlur = 0
            CANVAS_DOM.ctx.lineWidth= TOOLS.Styles.lineWidth
            if(TOOLS.Controllers.isGradientLinear || TOOLS.Controllers.isGradientRadial){
                CANVAS_DOM.ctx.fillStyle = TOOLS.Styles.gradient
            }
            CANVAS_DOM.ctx.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.r,0,2*Math.PI,false)
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
                CANVAS_DOM.ctxPlaceholder.shadowBlur = 0
                CANVAS_DOM.ctxPlaceholder.clearRect(0,0,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
                if(TOOLS.Controllers.isGradientLinear || TOOLS.Controllers.isGradientRadial){
                    CANVAS_DOM.ctxPlaceholder.fillStyle = TOOLS.Styles.gradient
                }
                CANVAS_DOM.ctxPlaceholder.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.r,0,2*Math.PI,false)
                CANVAS_DOM.ctxPlaceholder.stroke()
                CANVAS_DOM.ctxPlaceholder.fill()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            } 
        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()   
            }
            CANVAS_DOM.ctx.shadowBlur = 0
            if(TOOLS.Controllers.isGradientLinear || TOOLS.Controllers.isGradientRadial){
                CANVAS_DOM.ctx.fillStyle = TOOLS.Styles.gradient
            }
            CANVAS_DOM.ctx.arc(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.r,0,2*Math.PI,false)
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
        this.blur = '5'
    }
    PENCIL_TOOL.prototype.setCap = function(e){
        TOOLS.Styles.pencilLineCap = e.target.dataset.cap
    }
    PENCIL_TOOL.prototype.pencilTool = function(){
        if(!TOOLS.Controllers.isPath){
            CANVAS_DOM.ctx.beginPath()
        }
        CANVAS_DOM.ctx.shadowBlur = 0
        CANVAS_DOM.ctx.lineCap = TOOLS.Styles.pencilLineCap
        CANVAS_DOM.ctx.lineWidth = TOOLS.Styles.lineWidth / 2
        CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
        CANVAS_DOM.ctx.lineTo(TOOLS.Cords.x1,TOOLS.Cords.y1)
        CANVAS_DOM.ctx.stroke()
        if(!TOOLS.Controllers.isPath){
            CANVAS_DOM.ctx.closePath()
        }
    }
    PENCIL_TOOL.prototype.pencilToolLazy  = function(){
        if(!TOOLS.Controllers.isPath){
            CANVAS_DOM.ctx.beginPath()
        }
        CANVAS_DOM.ctx.lineCap = TOOLS.Styles.pencilLineCap
        CANVAS_DOM.ctx.lineWidth = TOOLS.Styles.lineWidth /  2
        CANVAS_DOM.ctx.shadowBlur = this.blur
        CANVAS_DOM.ctx.shadowColor = TOOLS.Styles.strokeColor
        CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
        CANVAS_DOM.ctx.lineTo(TOOLS.Cords.x1,TOOLS.Cords.y1)
        CANVAS_DOM.ctx.stroke()
        if(!TOOLS.Controllers.isPath){
            CANVAS_DOM.ctx.closePath()
        }
    }
    function BRUSH_TOOL(){
        this.blur = '10'
    }   
    BRUSH_TOOL.prototype.setCap = function(e){
        TOOLS.Styles.brushLineCap = e.target.dataset.cap
    }
    BRUSH_TOOL.prototype.brushTool = function(){
        if(!TOOLS.Controllers.isPath){
            CANVAS_DOM.ctx.beginPath()
        }
        CANVAS_DOM.ctx.shadowBlur = 10
        CANVAS_DOM.ctx.lineCap = TOOLS.Styles.brushLineCap
        CANVAS_DOM.ctx.lineWidth = TOOLS.Styles.lineWidth
        CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
        CANVAS_DOM.ctx.lineTo(TOOLS.Cords.x1,TOOLS.Cords.y1)
        CANVAS_DOM.ctx.stroke()
        if(!TOOLS.Controllers.isPath){
            CANVAS_DOM.ctx.closePath()
        }
    }
    BRUSH_TOOL.prototype.brushToolLazy  = function(){
        if(!TOOLS.Controllers.isPath){
            CANVAS_DOM.ctx.beginPath()
        }
        CANVAS_DOM.ctx.lineCap = TOOLS.Styles.brushLineCap
        CANVAS_DOM.ctx.lineWidth = TOOLS.Styles.lineWidth
        CANVAS_DOM.ctx.shadowBlur = this.blur
        CANVAS_DOM.ctx.shadowColor = TOOLS.Styles.strokeColor
        CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
        CANVAS_DOM.ctx.lineTo(TOOLS.Cords.x1,TOOLS.Cords.y1)
        CANVAS_DOM.ctx.stroke()
        if(!TOOLS.Controllers.isPath){
            CANVAS_DOM.ctx.closePath()
        }
    }
    function LINE_TOOL(){}
    LINE_TOOL.prototype.setLineJoin = function(e){
        TOOLS.Styles.lineJoin =  e.target.dataset.join
    }
    LINE_TOOL.prototype.lineToolSquare = function(){
        if(TOOLS.Controllers.isPaint){
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()
                CANVAS_DOM.ctxPlaceholder.moveTo(TOOLS.Cords.x1,TOOLS.Cords.y1)

            }
            CANVAS_DOM.ctxPlaceholder.lineCap = 'square'
            // DOM.ctx.lineDashOffset = 24
            CANVAS_DOM.ctxPlaceholder.clearRect(0,0,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
      
            CANVAS_DOM.ctxPlaceholder.lineTo(TOOLS.Cords.x2 ,TOOLS.Cords.y2)
            CANVAS_DOM.ctxPlaceholder.lineWidth = TOOLS.Styles.lineWidth
            CANVAS_DOM.ctxPlaceholder.strokeStyle = TOOLS.Styles.strokeColor
            CANVAS_DOM.ctxPlaceholder.stroke()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            }
        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.beginPath()
                CANVAS_DOM.ctx.moveTo(TOOLS.Cords.x1,TOOLS.Cords.y1)

            }
            CANVAS_DOM.ctx.lineCap = 'square'
            // DOM.ctx.lineDashOffset = 24
        
            CANVAS_DOM.ctx.lineTo(TOOLS.Cords.x2 ,TOOLS.Cords.y2)
            CANVAS_DOM.ctx.lineWidth = TOOLS.Styles.lineWidth
            CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
            CANVAS_DOM.ctx.stroke()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.closePath()
            }
        }
      
    }
    LINE_TOOL.prototype.lineToolRound = function(){
        if(TOOLS.Controllers.isPaint){
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.beginPath()
                CANVAS_DOM.ctx.moveTo(TOOLS.Cords.x1,TOOLS.Cords.y1)

            }
            CANVAS_DOM.ctxPlaceholder.lineCap = 'round'
            // DOM.ctx.lineDashOffset = 24
            CANVAS_DOM.ctxPlaceholder.clearRect(0,0,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
          
            CANVAS_DOM.ctxPlaceholder.lineTo(TOOLS.Cords.x2 ,TOOLS.Cords.y2)
            CANVAS_DOM.ctxPlaceholder.lineWidth = TOOLS.Styles.lineWidth
            CANVAS_DOM.ctxPlaceholder.strokeStyle = TOOLS.Styles.strokeColor
            CANVAS_DOM.ctxPlaceholder.stroke()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctxPlaceholder.closePath()
            }
        }else{
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.beginPath()
                CANVAS_DOM.ctx.moveTo(TOOLS.Cords.x1,TOOLS.Cords.y1)
            }
            CANVAS_DOM.ctx.lineCap = 'round'
            CANVAS_DOM.ctx.lineTo(TOOLS.Cords.x2 ,TOOLS.Cords.y2)
            CANVAS_DOM.ctx.lineWidth = TOOLS.Styles.lineWidth
            CANVAS_DOM.ctx.strokeStyle = TOOLS.Styles.strokeColor
            CANVAS_DOM.ctx.stroke()
            if(!TOOLS.Controllers.isPath){
                CANVAS_DOM.ctx.closePath()
            }
        }
      
    }
  
    function TEXT_TOOL(){
        this.text = ''
        this.isFill = true
    }
    TEXT_TOOL.prototype.textToolStroke = function(e){
        TOOLS.TextTool.isFill = true
    }
    TEXT_TOOL.prototype.textToolFill = function(e){
        TOOLS.TextTool.isFill = false
    }
    TEXT_TOOL.prototype.setPrompt = function(e){
        e.preventDefault();
        UI.TextTool.prompt.style.left = `${TOOLS.Cords.x1 + 80}px`
        UI.TextTool.prompt.style.top = `${TOOLS.Cords.y1 - 50}px`
        UI.TextTool.prompt.focus()
        console.log('moved',TOOLS.Cords.x1,TOOLS.Cords.y1 -150)

    }
    TEXT_TOOL.prototype.setText = function(e){
        TOOLS.TextTool.text = e.target.value
    }
    TEXT_TOOL.prototype.textToolNormal = function(e){
        CANVAS_DOM.ctx.font=`normal 30px Arial`;
        CANVAS_DOM.ctx.moveTo(TOOLS.Cords.x1,TOOLS.Cords.y1);
        if(!this.isFill){
            CANVAS_DOM.ctx.strokeText(this.text,TOOLS.Cords.x1,TOOLS.Cords.y1);
        }else{
            CANVAS_DOM.ctx.fillText(this.text,TOOLS.Cords.x1,TOOLS.Cords.y1);
        }
    }
    TEXT_TOOL.prototype.textToolBold = function(e){
        CANVAS_DOM.ctx.font=`bold 30px Arial`;
        CANVAS_DOM.ctx.moveTo(TOOLS.Cords.x1,TOOLS.Cords.y1);
        if(!this.isFill){
            CANVAS_DOM.ctx.strokeText(this.text,TOOLS.Cords.x1,TOOLS.Cords.y1);
        }else{
            CANVAS_DOM.ctx.fillText(this.text,TOOLS.Cords.x1,TOOLS.Cords.y1);
        }
    }
    TEXT_TOOL.prototype.textToolItalic = function(e){
        CANVAS_DOM.ctx.font=`italic 30px Arial`;
        CANVAS_DOM.ctx.moveTo(TOOLS.Cords.x1,TOOLS.Cords.y1);
        if(!this.isFill){
            CANVAS_DOM.ctx.strokeText(this.text,TOOLS.Cords.x1,TOOLS.Cords.y1);
        }else{
            CANVAS_DOM.ctx.fillText(this.text,TOOLS.Cords.x1,TOOLS.Cords.y1);
        }
    }
   
 
   
    function BEZIER_TOOL(){}
    function GRADIENT_TOOL(){}
    GRADIENT_TOOL.prototype.linearGradientTool = function(){
        console.log('on')
        TOOLS.Controllers.isGradientLinear = true
        TOOLS.Controllers.isGradientRadial = false
    }
    GRADIENT_TOOL.prototype.linearGradientActive = function(){
        const gradient = CANVAS_DOM.ctx.createLinearGradient(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.x2-TOOLS.Cords.x1,TOOLS.Cords.y2-TOOLS.Cords.y2)
        gradient.addColorStop(0, TOOLS.Styles.firstColor);
        gradient.addColorStop(1, TOOLS.Styles.secondColor);   
        TOOLS.Styles.gradient = gradient
    }
    GRADIENT_TOOL.prototype.radialGradientTool = function(){
        TOOLS.Controllers.isGradientLinear = false
        TOOLS.Controllers.isGradientRadial = true
    }
    GRADIENT_TOOL.prototype.radialGradientActive = function(){
        TOOLS.Controllers.isGradient = true
        const gradient = CANVAS_DOM.ctx.createRadialGradient(TOOLS.Cords.x1,TOOLS.Cords.y1,TOOLS.Cords.r,TOOLS.Cords.x2-TOOLS.Cords.x1,TOOLS.Cords.y2-TOOLS.Cords.y2,0)
        gradient.addColorStop(0, TOOLS.Styles.firstColor);
        gradient.addColorStop(1, TOOLS.Styles.secondColor);   
        TOOLS.Styles.gradient = gradient
    }
    GRADIENT_TOOL.prototype.gradientToolOff =  function(){
        TOOLS.Controllers.isGradientLinear = false
        TOOLS.Controllers.isGradientRadial = false
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
            UI.ColorTool.firstColorInput.value =  TOOLS.Styles.secondColor
            UI.ColorTool.secondColorInput.value =  TOOLS.Styles.firstColor
            CANVAS_DOM.ctx.fillStyle = TOOLS.Styles.secondColor
            CANVAS_DOM.ctxPlaceholder.fillStyle = TOOLS.Styles.secondColor
            TOOLS.Controllers.swapColors = true
        }else{
            UI.ColorTool.firstColorInput.value =  TOOLS.Styles.firstColor
            UI.ColorTool.secondColorInput.value =  TOOLS.Styles.secondColor
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
   if(TOOLS.Controllers.activeTool !== 'PathTool' && TOOLS.Controllers.activeTool !== 'TextTool'){
       CANVAS_DOM.ctx.moveTo(TOOLS.Cords.x1,TOOLS.Cords.y1)
    } else if(TOOLS.Controllers.activeTool === 'TextTool'){
        TOOLS.TextTool.setPrompt(e)
    }

})

CANVAS_DOM.canvas.addEventListener('mouseup',(e)=>{
    TOOLS.Controllers.isActive()
    CANVAS_DOM.ctx.closePath()
    UI.TextTool.prompt.value  = ''
    TOOLS.TextTool.text  = ''
    if(TOOLS.Controllers.activeTool !== "TextTool"){
        TOOLS[TOOLS.Controllers.activeTool][TOOLS.Controllers.toolAction]()
    
    }
 })

CANVAS_DOM.canvas.addEventListener('mousemove',(e)=>{
    CANVAS_DOM.ctxPlaceholder.clearRect(0,0,CANVAS_DOM.canvasPlaceholder.width,CANVAS_DOM.canvasPlaceholder.height)
    TOOLS.Cords.setEndPos(e)
    if(TOOLS.Controllers.activeTool === 'PencilTool' || TOOLS.Controllers.activeTool === 'BrushTool'){
        TOOLS.Cords.setStartPos(e)
    }
    TOOLS.Cords.setRadius(e)
    if(TOOLS.Controllers.isPaint && TOOLS.Controllers.activeTool !== "TextTool"){
        TOOLS[TOOLS.Controllers.activeTool][TOOLS.Controllers.toolAction]()
        if(TOOLS.Controllers.isGradientLinear){
            TOOLS.GradientTool.linearGradientActive()
        }
        else if(TOOLS.Controllers.isGradientRadial){
            TOOLS.GradientTool.radialGradientActive()
        }
    }
})

UI.TextTool.prompt.addEventListener('input',(e)=>{
    TOOLS.TextTool.setText(e)
    TOOLS[TOOLS.Controllers.activeTool][TOOLS.Controllers.toolAction]()
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

UI.PencilTool.pencils.forEach(pencil => pencil.addEventListener('click',(e)=>TOOLS.PencilTool.setCap(e)))
UI.BrushTool.brushes.forEach(pencil => pencil.addEventListener('click',(e)=>TOOLS.BrushTool.setCap(e)))


UI.LineTool.lineJoinItems.forEach(item => item.addEventListener('click',(e)=>TOOLS.SquareTool.setLineJoin(e)))

UI.TextTool.fill.addEventListener('click',TOOLS.TextTool.textToolFill)
UI.TextTool.stroke.addEventListener('click',TOOLS.TextTool.textToolStroke)

UI.GradientTool.linear.addEventListener('click',TOOLS.GradientTool.linearGradientTool)
UI.GradientTool.radial.addEventListener('click',TOOLS.GradientTool.radialGradientTool)
UI.GradientTool.off.addEventListener('click',TOOLS.GradientTool.gradientToolOff)

UI.StrokeTool.strokeColorInput.addEventListener('input',(e)=>TOOLS.StrokeTool.setStrokeColor(e))
UI.ColorTool.firstColorInput.addEventListener('input',(e)=>TOOLS.ColorTool.setFirstColor(e))
UI.ColorTool.secondColorInput.addEventListener('input',(e)=>TOOLS.ColorTool.setSecondColor(e))
UI.ColorTool.swapBtn.addEventListener('click',()=>TOOLS.ColorTool.setSwapColors())
// Canvas2Image.saveAsPNG(CANVAS_DOM.canvas)
