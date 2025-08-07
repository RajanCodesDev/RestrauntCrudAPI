import express from 'express'
import { createRestraunt } from '../controllers/restrauntController.js'

const restrauntRouter = express.Router()

/* Routes */


//Create Restraunt
restrauntRouter.post('/create', createRestraunt )


export default restrauntRouter