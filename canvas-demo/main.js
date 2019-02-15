var canvas = document.getElementById('canvas')//为canvas元素得到DOM对象
if(canvas.getContext){//检查canvas的支持性
  resizeCanvas()
  var ctx = canvas.getContext('2d')//获得2D的渲染上下文
  var toolUsing = false//使用画笔或橡皮的开关
  var eraserUsing = false//橡皮使用开关
  var lastPoint = {X:undefined,Y:undefined}/*当鼠标移动较快时，浏览器监听响应跟不上，
  为了能画出连续的图形，这里记录上一个点*/
  var lineWidth = 5
  save.onclick = function(){
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.id = 'temp-element'
    a.download = 'canvas-save'
    a.target = '_blank'
    a.click()
    var idObject = document.getElementById('temp-element')
    deleteElement(idObject)//用完删除多余标签
  }
  clear.onclick = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
  }
  thick.onclick = function(){
    lineWidth = 10
  }
  thin.onclick = function(){
    lineWidth = 5
  }
  red.onclick = function(){
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    red.classList.add('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
  }
  blue.onclick = function(){
    ctx.fillStyle = 'blue'
    ctx.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
  }
  green.onclick = function(){
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'green'
    green.classList.add('active')
    blue.classList.remove('active')
    red.classList.remove('active')
    black.classList.remove('active')
  }
  black.onclick = function(){
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    black.classList.add('active')
    blue.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
  }
  eraser.onclick = function(){
    eraserUsing = true
    eraser.classList.add('active')
    brush.classList.remove('active')
    // console.log(eraserUsing)
    //tools.className = 'tools x'
  }
  brush.onclick = function(){
    eraserUsing = false
    brush.classList.add('active')
    eraser.classList.remove('active')
    //tools.className = 'tools'
  }
  window.onresize = function(){//监听窗口大小改变
    resizeCanvas()
  }
  if(document.body.ontouchstart !== undefined){//特性检测
    //触屏设备
    console.log('触屏设备')
canvas.ontouchstart = function(tStart){
  var x = tStart.touches[0].clientX
  var y = tStart.touches[0].clientY
  paintStart(x,y)
  }
canvas.ontouchmove = function(tMove){
  var x = tMove.touches[0].clientX
  var y = tMove.touches[0].clientY
  painting(x,y)
}
canvas.ontouchend = function(){
  toolUsing = false
}
} else{
    //非触屏设备
  console.log('非触屏设备')
  canvas.onmousedown = function(MSdown){
    var x = MSdown.clientX
    var y = MSdown.clientY
    paintStart(x,y)
  }
  canvas.onmousemove = function (MSmove) {
    var x = MSmove.clientX
    var y = MSmove.clientY
    painting(x,y)
  }
  canvas.onmouseup = function(){
    toolUsing = !toolUsing
  }
 
  
}
}else{
console.log('canvas is nonsupport')//不支持canvas的操作
}

//*********工具函数***********//
function resizeCanvas(){//改变canvas画板大小
    var pageWidth = document.documentElement.clientWidth//获取页面宽
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
function drawCircle(x,y,radius){//根据圆心xy坐标和半径画圆
    ctx.beginPath()//新建路径
    //ctx.fillstyle = 'black'
    ctx.arc(x,y,radius,0,Math.PI*2)//arc函数中角的单位是弧度（Math.PI/180）*角度
    ctx.fill()//调用fill函数会让没有闭合的形状自动闭合，所以不需要再使用closePath函数
  }  
function drawLine(x1,y1,x2,y2){
    ctx.beginPath()
    //ctx.strokeStyle = 'black'
    ctx.moveTo(x1,y1)//画笔初始点
    ctx.lineWidth = lineWidth//线的宽度
    ctx.lineTo(x2,y2)//画笔终止点
    ctx.stroke()//描边
    ctx.closePath()
  }  
function paintStart(x,y){
  toolUsing = true
    if(eraserUsing){
      ctx.clearRect(x-5,y-5,10,10)//擦除当前点
    }else{
    lastPoint = {X:x,Y:y}
    drawCircle(x,y,3)
    }
}
function painting(x,y){
  if (toolUsing) {
      if (eraserUsing) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { X: x, Y: y }//每次移动鼠标后记录新的点
        console.log(lastPoint)
        drawLine(lastPoint.X, lastPoint.Y, newPoint.X, newPoint.Y)//在上个点和这次移动后新的点之间画线
        lastPoint = newPoint//画线完毕后更新这次移动的点为lastPoint
        //hash之间互相赋值需要里面的键相同
      }
    }
}
function deleteElement(idObject){
  if(idObject){
    idObject.parentNode.removeChild(idObject)
  }
}