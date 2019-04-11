var APP_ID = 'dY3kaKbr0zFoxMl3TfdxJTfq-gzGzoHsz';
var APP_KEY = 'KEU29FM3tD08njXQyOy5rpet';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   //alert('LeanCloud Rocks!');
// })

var query = new AV.Query('message');
  query.find().then(function (message) {
  //  console.log(message)
   let array = message.map((item) => item.attributes)
  //  console.log(array[1].content)
   array.forEach((item)=>{
     let li = document.createElement('li')
     li.innerText = `${item.visitor}: ${item.content}`
     let messageList = document.querySelector('#messageList ol')
     messageList.appendChild(li)
   })
  },(error)=>{
    console.log(error)
  })

let myform = document.querySelector('#postMessageForm')
console.log(myform)
myform.addEventListener('submit',function(e){
  e.preventDefault()
  let content = myform.querySelector('input[name=content]').value.trim()
  let visitor = myform.querySelector('input[name=visitor]').value.trim() 
  if(content ==='' || visitor === ''){
    alert('姓名或留言不能为空')
    return}
  console.log(visitor,content)
  var Message = AV.Object.extend('message')
  var message = new Message()
  message.save({
    content:content,
    visitor:visitor
  }).then(function(object){
    alert('留言成功')
    console.log(object)
    let li = document.createElement('li')
    li.innerText = `${object.attributes.visitor}: ${object.attributes.content}`
    let messageList = document.querySelector('#messageList ol')
    messageList.appendChild(li)
    myform.querySelector('input[name=content]').value=''
    myform.querySelector('input[name=visitor]').value=''
  })
})