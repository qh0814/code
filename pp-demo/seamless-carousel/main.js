$(document).ready(function(){
  var img = $('.wraper img').first().clone()
  $('.wraper').append('<a href="" class="slider-item"></a>')
  var lastItem = $('.wraper a').last()
  $(lastItem).append(img)
  var size = $('.wraper img').length
  //console.log('共有' + size + '个图片')
  $('li').first().addClass('active')
  //循环轮播事件
  var i = 0
  var ID = setInterval(() => {
    i++
    move()
  },2000)
// 悬停清除计时器，移除创建计时器
$('.slider-list').hover(() => {
  clearInterval(ID)
},() =>{
  ID = setInterval(() => {
    i++
    move()
  },2000)
})

//用户手动选择
$('.index li').hover( function() {
  console.log(this)//如果用箭头函数this会指向document..
  let currentIndex = $(this).index()
  console.log(currentIndex)
  $('.wraper').stop().animate({left:-currentIndex*300},500)
  i = currentIndex
  $(this).addClass('active').siblings().removeClass('active')
})

$('.leftButton').click(function(){
  i--
  move()
})
$('.rightButton').click(function(){
  i++
  move()
})
  function move(){
    //console.log(i)
    if(i === size){
      $('.wraper').css({left:0})//首尾图片相同，视觉上不影响
      i = 1
      //console.log(size*0)
      //debugger
    }
    if(i === -1){
      $('.wraper').css({left:-(size-1)*300})
      i = size - 2//从第一个向左退到最后一个
    }
    
   $('.wraper').stop().animate({left:-i*300},500)

    // $('.wraper').stop().animate({},() =>{
    //   $('.wraper').css({'transform':'translate(' + -i*300 + 'px)'})
    // })
    if(i === size - 1){
      $('li').eq(0).addClass('active').siblings().removeClass('active')
      //让index是第一个的假象
    }else{//0~3
      $('li').eq(i).addClass('active').siblings().removeClass('active')
    }
  }
})