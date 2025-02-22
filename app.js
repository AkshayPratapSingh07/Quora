const express = require("express")
const app = express();
let port = 8080;
const path = require("path")
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')



let posts = [
    {
        id:uuidv4(),
        name:"Akshay",
        content:"I love coding"

    },
    {
        id:uuidv4(),
        name:"Pratap",
         content:"I love reading"
    },
    {
        id:uuidv4(),
        name:"Singh",
         content:"I love playing"
    }
]

app.set("view engine",'ejs')
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"/public/css")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


app.listen(port,()=>{
    console.log(`App is listening at port ${port}`);
})

app.get("/posts",(req,res)=>{
    res.render("home.ejs",{posts})
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});

app.post("/posts",(req,res)=>{
  let {name,content} = req.body;
  let id = uuidv4();
    console.log(req.body)
    posts.push({name,id,content})
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> p.id == id)
    res.render("show.ejs",{post})
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>p.id === id)
    res.render("edit.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let newContent = req.body.content;
    let {id} = req.params;
    let post = posts.find((p)=>p.id === id)
    post.content = newContent;
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>p.id != id)
    res.redirect("/posts")
})