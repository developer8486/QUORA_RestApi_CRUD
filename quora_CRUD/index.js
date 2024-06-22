const express =require("express");
const { use } = require("express/lib/application");
const app=express();
const port=8080;
const path=require("path");
const {v4 : uuidv4}=require('uuid');
var methodOverride = require('method-override');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id :uuidv4(),
        username: "apnacollege",
        content: "l love conding",
    },
    {
        id :uuidv4(),
        username: "praveendubey",
        content: "i am programmer",
    },
    {
        id :uuidv4(),
        username: "aniketyadav",
        content: "i am yadava",
    }
];



app.get("/posts",(req,res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let id=uuidv4();
    let{username , content}=req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req , res) =>{
    let {id}=req.params;
    let post =posts.find((p)=>id===p.id);
    //console.log(post);
    res.render("show.ejs",{post});
    
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post =posts.find((p)=> id ===p.id);
    post.content =newContent;
    //console.log(post.content);
    //res.send("patch request executed successfully");
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post =posts.find((p)=> id ===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts =posts.filter((p)=> id !==p.id);
    res.redirect("/posts");
});


app.listen(port,()=>{
    console.log("port is listening on 8080");
});
