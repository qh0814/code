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

let myform = document.querySelector('#postMessageForm')
console.log(myform)
myform.addEventListener('submit',function(e){
  e.preventDefault()
  let content = myform.querySelector('input[name=content]').value 
  // console.log(content)
  var Message = AV.Object.extend('message')
  var message = new Message()
  message.save({
    content:content
  }).then(function(object){
    alert('存入成功')
    console.log(object)
  })
})