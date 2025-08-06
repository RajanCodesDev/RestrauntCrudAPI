import mongoose from 'mongoose'

/* url */
const mongoURL = process.env.MONGO_URL

/* connecting to database */
const dbconnection = async ()=>{
    try {
        await mongoose.connect(mongoURL)
        console.log(`Mongo is connected`);
        
    } catch (error) {
        console.log(error)
    }
}

export default dbconnection