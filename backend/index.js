const express=require('express');
const app=express();
const authrouter=require('./src/controllers/auth.js');
const pondfishdetailsrouter=require('./src/controllers/pondfishdetails.js');
const feeddetailsrouter=require('./src/controllers/feeddetails.js');
const labourpagedetailsrouter=require('./src/controllers/labourpagedetails.js');
const farmerdetailsrouter=require('./src/controllers/farmerdetails.js');
const fishexportdetailsrouter=require('./src/controllers/fishexportdetails.js');
const expensesdetailsrouter=require('./src/controllers/expensesdetails.js');
const banktransactiondetailsrouter=require('./src/controllers/banktransactiondetails.js');
const imagesRouter = require("./src/controllers/images.js")
const { default: mongoose } = require('mongoose');
const dotenv  = require('dotenv');
const PORT=3000;

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use('/auth',authrouter);
app.use('/pondfishdetails',pondfishdetailsrouter);
app.use('/feeddetails',feeddetailsrouter);
app.use('/labourpagedetails',labourpagedetailsrouter);
app.use('/farmerdetails',farmerdetailsrouter);
app.use('/fishexportdetails',fishexportdetailsrouter);
app.use('/expensesdetails',expensesdetailsrouter);
app.use('/images',imagesRouter)
app.use('/banktransactiondetails',banktransactiondetailsrouter);
app.listen(PORT,()=>{
    console.log(`sever is listening at http://localhost:${PORT}`);
});