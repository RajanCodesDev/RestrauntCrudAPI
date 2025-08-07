import express from 'express'
import authmiddleware from '../middleware/authmiddleware.js'
import { createRestraunt, deleteRestaurant, getRestaurants } from '../controllers/restrauntController.js'

const restrauntRouter = express.Router()

/* Routes */


//Create Restraunt
restrauntRouter.post('/create', createRestraunt )
restrauntRouter.get('/getrestaurant', getRestaurants)
restrauntRouter.delete('/deleteRes', authmiddleware, deleteRestaurant)

export default restrauntRouter