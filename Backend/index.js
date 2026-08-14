import express from 'express'
import {authenticationMiddleware} from './middlewares/auth.middleware.js'
import userRouter from './routes/user.routes.js'
import urlRouter from './routes/url.routes.js'
import cors from 'cors'
import redirectRouter from './routes/redirect.routes.js'

const app = express();
const PORT= process.env.PORT ?? 8000;

app.use(cors({
    // origin: process.env.CLIENT_ORIGIN,
    origin: (origin, callback) =>{
        if(!origin || origin.startsWith('https://url-shortner')){
            return callback(null, true);  // allowed ; null= no error
        }
        return callback(new Error('Not allowed by CORS. ')); // Blocked!  
        },
    credentials: true, // not required now
  }) )
app.use(express.json());
app.use(authenticationMiddleware);

app.get('/',(req,res)=>{
    return res.json({status: 'Server is up and running . . .'})
});

app.use('/user',userRouter);
app.use('/url', urlRouter);              // '/url'
app.use('/', redirectRouter);


app.listen(PORT,()=>{
    console.log(`Server is listening on port: ${PORT}`);
});