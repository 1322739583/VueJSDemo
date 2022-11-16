const fs=require("fs")

const sourcePath="../题目模板/template.html"
const distPath="./practice.html"

fs.readFile(sourcePath,{encoding:"utf-8"},(err,data)=>{
    if (err) throw err
    fs.writeFile(distPath,data,(err)=>{
        if (err) throw err
        console.log("reset success")
    })
})
