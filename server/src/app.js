const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');
const { userRouter } = require('./routers/userRouter');
const seedRouter = require('./routers/seedRouter');
const app = express();


const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'Too many request from this IP, please try again later'
})


app.use(rateLimiter)
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get('/test',(req,res)=>{
    res.status(200).json({message:"api testing working fine !"});
})


app.use('/api/users',userRouter);
app.use('/api/seed',seedRouter);



//client error handling:
app.use((req,res,next)=>{
    next(createError(404, 'route not found !'));
});


//server error handling:
app.use((err,req,res,next)=>{
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });

});


module.exports = app;