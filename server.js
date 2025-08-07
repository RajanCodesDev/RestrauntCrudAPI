import 'dotenv/config'
import morgan from 'morgan'
import express from 'express'
import dbconnection from './config/dbConnetion.js'
import authRouter from './routes/authroute.js'
import userRouter from './routes/userroute.js'
import restrauntRouter from './routes/restrauntroute.js'


/* Variable Assignment */
const port = process.env.PORT
const app = express()

/* DB Connection */
dbconnection()

/* Middlewares */
app.use(morgan("dev"))
app.use(express.json())

/* Routes */
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter )
app.use('/api/v1/restraunt', restrauntRouter)


/* listen to port */
app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
})

/* hit root path */
app.get('/', (req, res)=>{
    console.log('root document is hit')
    res.status(200).send('hi youre at root document')
})