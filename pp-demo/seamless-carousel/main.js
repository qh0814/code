$(document).ready(function(){
  var img = $('.wraper img').first().clone()
  $('.wraper').append('<a href="" class="slider-item"></a>')
  var lastItem = $('.wraper a').last()
  $(lastItem).append(img)
  var size = $('.wraper img').length
  console.log('共有' + size + '个图片')
  $('li').first().addClass('active')
  //循环轮播事件
  var i = 4
  var ID = setInterval(() => {
    i++
    // if(i === size){
    // // $('.wraper ,.move').css({'transform':'translate(' + -i*500 + 'px)'})
    // // $('.wraper').addClass('move')
    // $('.wraper').css({'transform':'translate(' + size*0 + 'px)'})//首尾图片相同，视觉上不影响
    // i = 1
    // }
    move()
  },3000)

  function move(){
    console.log(i)
    if(i === size){
      $('.wraper').css({left:0})//首尾图片相同，视觉上不影响
      i = 1
      console.log(size*0)
      //debugger
    }
    if(i === -1){
      
      $('.wraper').css({'transform':'translate(' + (size-1) *  (-300) + 'px)'})
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