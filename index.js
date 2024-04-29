const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname , "public")));
app.set('view engine' , 'ejs');

app.get('/',(req,res)=>{
    fs.readdir("./files" , (err,files)=>{
        res.render('index' ,{files : files})
    })
})

app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.Title.split(" ").join("")}.txt`,req.body.Description,function(err){
      res.redirect('/');
    })
})

app.get('/file/:filename' , (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err,filedata){
        res.render('fileContent',{filename : req.params.filename,filedata : filedata});
        // console.log(req.params.filename);
    })
})

app.get('/edit/:filename',(req,res)=>{
    res.render('edit' , {filename: req.params.filename})
})

app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new.split(" ").join("")}.txt`,function(err){
        res.redirect('/');
    })
    // console.log(req.body)
})

app.get('/delete/:filename',(req,res)=>{
    res.render('deletePage',{filename : req.params.filename});
})

app.post('/delete',(req,res)=>{
    fs.unlink(`./files/${req.body.filename}`,function(err){
        res.redirect('/');
    })
    // console.log(req.body);
})


app.listen(4000)