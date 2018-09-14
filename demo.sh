#!/bin/bash
function Create_Directory()
{
  folder=($1 "css" "js" "index.html" "style.css" "main.js")
if [ -d ${folder[0]} ]; then 
    echo "Directory exist!"
    exit 0
else
    mkdir ${folder[0]}
    cd ${folder[0]}
    mkdir ${folder[1]}
    mkdir ${folder[2]}
    echo "<!DOCTYPE><title>Hello</title><h1>Hi</h1>">${folder[3]}
    echo "h1{color: red;}">${folder[4]}
    echo "var string = "Hello World"\nalert(string)">${folder[5]}
    mv ${folder[4]} ${folder[1]}
    mv ${folder[5]} ${folder[2]}
fi    
}
Create_Directory $1