var fs=require("fs")
var dir_name=process.argv[2]
if (fs.existsSync("dir_name"))
  {
  console.log("Directory already exists!")  
  return
  }
else
  { 
  fs.mkdirSync(dir_name)
  process.chdir(dir_name)
  fs.mkdirSync("css")
  fs.mkdirSync("js")
  fs.writeFileSync("index.html","<!DOCTYPE>\n<title>Hello</title>\n<h1>Hi</h1>")
  fs.writeFileSync("./css/style.css","h1{color: red;}")
  fs.writeFileSync("./js/main.js","var string = 'Hello World'\nalert(string)")
  }







