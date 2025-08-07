import restrauntModel from "../models/restrauntModel.js"

const createRestraunt = async (req, res)=>{
    try {
        const {
            title,
            foods, 
            time, 
            pickup, 
            delivery, 
            isopen 
        } = req.body
    
        if(!title){
            return res.status(401).send({
                success: false,
                message: "Please fill the required feilds"
            })
        }

        const existing = await restrauntModel.findOne({title})
        if(existing){
            return res.status(403).send({
                success: false,
                message: "Restraunt already exists"
            })
        }

        const restraunt = await restrauntModel.create({
            title,
            foods,
            time,
            pickup,
            delivery,
            isopen,
        })

        res.status(201).send({
            success: true,
            message: "Restraunt created sucessfully",
            restraunt,
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in creating Restraunt"
        })
    }
}



export { createRestraunt }