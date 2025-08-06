import mongoose from "mongoose"


/* Schema for User */
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true, 'Username is required']
    },

    email:{
        type: String,
        required:[true, 'Email is required'],
        unique: true
    },

    password:{
        type: String,
        required:[true, "Password is required"]
    },

    usertype:{
        type: String,
        default: 'client',
        enum:['admin','client', 'driver', 'vendor']
    }
}, {timestamps: true})

const userModel = mongoose.model('User', userSchema)
/* export user model */
export default userModel
