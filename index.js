const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./Routes/auth.js");
const userRoute = require("./Routes/user.js")
const doctorRoute = require("./Routes/doctors.js");
const reviewRoute = require("./Routes/review.js");
dotenv.config()

const app = express()

const port = process.env.PORT || 8000

const corsOptions ={
    origin:true
}

app.get( "/", (req, res) => {
   res.send("Welcome to the API")
})
//database connection
mongoose.set('strictQuery',false)
const connectDB = async()=>{
    try{
        mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("MongoDb is connected")
    }
    catch(err){
        console.log("MongoDb is fail")

    }
}
// Middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',userRoute);
app.use('/api/v1/doctors',doctorRoute);
app.use('/api/v1/reviews',reviewRoute);


app.listen(port, ()=> {
    connectDB();
    console.log("server is running " + port);
} )

