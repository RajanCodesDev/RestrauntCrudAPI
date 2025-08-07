import express from 'express'
import { createRestraunt, getRestaurants } from '../controllers/restrauntController.js'

const restrauntRouter = express.Router()

/* Routes */


//Create Restraunt
restrauntRouter.post('/create', createRestraunt )
restrauntRouter.get('/getrestaurant', getRestaurants)

export default restrauntRouter