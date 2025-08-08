import restaurantModel from "../models/restaurantModel.js"

// Creates a new restaurant
const createRestaurant = async (req, res) => {
  try {
    const { title, foods, time, pickup, delivery, isopen } = req.body

    if (!title) {
      return res.status(401).send({
        success: false,
        message: "Please fill the required feilds",
      })
    }

    const existing = await restaurantModel.findOne({ title })
    if (existing) {
      return res.status(403).send({
        success: false,
        message: "restaurant already exists",
      })
    }

    const restaurant = await restaurantModel.create({
      title,
      foods,
      time,
      pickup,
      delivery,
      isopen,
    })

    res.status(201).send({
      success: true,
      message: "restaurant created sucessfully",
      restaurant,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in creating restaurant",
    })
  }
}

// Prints all the restaurants in the vicinity

const getRestaurants = async (req, res) => {
  try {
    const allRestaurants = await restaurantModel.find()
    const titlesandfoods = allRestaurants.map((restaurant) => ({
      title: restaurant.title,
      foods: restaurant.foods,
    }))

    res.status(200).send({
      success: true,
      message: "Found all restaurants",
      data: titlesandfoods,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in getRestaurants API",
    })
  }
}

// delete a restaurant
const deleteRestaurant = async (req, res) => {
  try {
    console.log(`Resquest Parameters: `, req.params)
    const id = req.params.id
    console.log(id)
    if(!id){
      return res.status(401).send({
        success: false,
        message: "No Id provided"
      })
    }
    const resRnt = await restaurantModel.findByIdAndDelete(id)
    console.log(`Restaurant Details: `, resRnt)
    if (!resRnt) {
      return res.status(401).send({
        success: false,
        message: "Restaurant does not exist",
      })
    }
    res.status(201).send({
      success: true,
      message: "Restraunt is successfully deleted",
      resRnt,
    })
  } catch (error) {
    console.log(error)
    res.status(501).send({
      success: false,
      message: "Error in deleteRestaurant API",
      error,
    })
  }
}

// export controllers
export { createRestaurant, getRestaurants, deleteRestaurant }
