const express= require("express");
const path=require("path");
var fs=require("fs")
require("./db/conn")
const app= express();
const User=require("./models/userdata")
const port=process.env.PORT || 3000;

// setting the path

const staticpath=path.join(__dirname, "../public")
// asking if I can use html file || middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use(express.static(staticpath));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// app.engine('html', require('ejs').renderFile);
// app.set('view engine','html')// Set the template engine as html
// app.set('views', path.join(__dirname,'/public'))// Set the views directory
// app.get('/contact',(req,res)=>{
//     res.status(200).render('contact.html')
// })



// routing
// app.get(path,callback)
app.get("/",(req,res)=>{
    // res.send("Hi I am Arya")
    res.writeHead(200,{'Content-Type':'text/html'})
});


var http=require('http')
var url=require('url')
http.createServer((req,res)=>{

    var q=url.parse(req.url,true)
    var filename="../public"+q.pathname;
    fs.readFile(filename,function(err,data){
        if(err){
            res.writeHead(404,{'Content-Type':'text/html'}) 
            return res.end("Page not found");
        }
        res.writeHead(200,{'Content-Type':'text/html'}) 
        return res.end();
    });
    
})
// app.get("/contact",(req,res)=>{
//     res.send("Hi I am Arya")
    
// });

app.post("/contact",async(req,res)=>{
    try {
        // res.send(req.body)
        var  uk= await new User(req.body)
        //  uk.save();
        await uk.save();
        uk.save().then(savedDoc => {
            savedDoc === uk; // true
          });
         
        res.status(201).render("/");
    } catch (error) {
        res.status(500).send(error)
    }
})
// app.post('/contact', (req , res)=> {
//     const newUser = new User(req.body);

//     newUser.save().then((result)=>{
//         console.log(result)
//     }).catch((err)=>{
//         console.log(err)
//     })

//     res.send(newUser);
// })




// Creating Server
app.listen(port, ()=>{
    console.log(`Server is running at port number ${port}`)
})

