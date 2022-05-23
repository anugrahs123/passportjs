const bycrpt=require('bcrypt')
const LocalStrategy=require('passport-local').Strategy
const intilize=(passport,getUserByEmail)=>{
    const authenticateUser=async(email,password,done)=>{
        const user=getUserByEmail(email)
        console.log("user is",user);
        if(user==null){
          console.log("enter");
          return  done(null,false,{message:"no user found"})
        }
        try{
            if(await bycrpt.compare(password,user.password)){
              return  done(null,user)
            }
            else{
               return done(null,false,{message:"password not match"})
            }

        }
        catch(e){
          console.log("yeh");
            return done(e)

        }


    }
    passport.use(new LocalStrategy({usernameField :'email'},authenticateUser))
    console.log("ok");
    passport.serializeUser((user,done)=>{
     return done(null,user.email);

    })
    passport.deserializeUser((email,done)=>{
     return  done(null,getUserByEmail(email))

    })

}

module.exports=intilize