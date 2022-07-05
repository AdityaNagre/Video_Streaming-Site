const express= require('express')
const app= express();
const mongoose= require('mongoose')
const dotenv=require('dotenv')

dotenv.config();

app.use(express.json())

const connectToMongo=()=>{
    try {
        mongoose.connect(process.env.MONGO_URL , ()=>{
            console.log("Connected to mongo DB successfully")
        })
    } catch (error) {
        console.log(error.message)
    }
    
}
connectToMongo();

app.use("/api/auth", require('./routes/auth'))
app.use("/api/users", require('./routes/users'))
app.use("/api/movies", require('./routes/movies'))
app.use("/api/list", require('./routes/list'))

app.listen(3000, ()=>{
    console.log("Server connected at port 3000")
})