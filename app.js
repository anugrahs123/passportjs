require('dotenv').config
const express=require('express');
const app= new express();
const bycrpt=require('bcrypt')
const passport=require('passport')
const flash=require('express-flash')
const session=require('express-session')

const intilizePassport=require('./config/passport');
intilizePassport(passport,email=>users.find(user=> user.email==email ))
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.set("views","./src/views")
 app.use(flash())
 app.use(session({
     secret:"key",
     resave:false,
     saveUninitialized:false
 }))
//  console.log(process.env.SESSION_SECRET);
//  console.log(settings.name);
app.use(passport.initialize())
app.use(passport.session())

const isAuth=(req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect("/signup")

}
let users=[];   
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/login",(req,res)=>{
//    console.log( req.secret);
    res.render("login")
})
app.post("/login",passport.authenticate('local',{
    successRedirect:'/home',
    failureRedirect:'/login',
    failureFlash:true
})
)
// app.post("/login/add",(req,res)=>{
    
//     let login={
//         email:req.body.username,
//         password:req.body.password
//     }
//     for(let i=0;i<users.length;i++){
//          bycrpt.compare(login.password,users[i].password,(err,data)=>{

//              if(data){
//              if(users[i].email===login.email ){
//                  res.redirect("/home")
//                 }else{
//                     res.json({message:"invalid username"})
//                     console.log("else");
//                 }
//             }
//             else{
//                 res.json({message:"invalid password"})
//                 console.log("else else");

//             }
//             })
//             }
// })
app.get("/home",isAuth,(req,res)=>{
    res.render("home")
})
app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/")
})
app.get("/signup",(req,res)=>{
    res.render("register")
})
app.post("/signup/add",async(req,res)=>{
    try{
    const hashPassword=await bycrpt.hash(req.body.password,10)
    let items={
        email:req.body.email,
        password:hashPassword
    }
    users.push(items)
    res.redirect("/login")

    console.log(items);
    console.log("users",users);
}
catch(err){
    console.log("sighup err",err);

}

})

app.listen(8001,()=>{
    console.log("server connected at http://localhost:8001");
})