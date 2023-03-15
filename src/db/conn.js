const mongoose=require("mongoose");

// creating a database


// This is old
// mongoose.connect("mongodb://localhost:27017/JMusic",{
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiedTopology:true
// }).then(()=>{
//     console.log("connection successful")
// }).catch((error)=>{
//     console.log(error)
// })  

// This is new
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/JMusic');
        console.log("connection successful");
}