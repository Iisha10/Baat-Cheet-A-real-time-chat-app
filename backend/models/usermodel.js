import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        requires:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
        enum:["male", "female", "others"],
    },
    profilePic:{
        type:String,
        default:"",
    }
}, {timestamps: true}//member since <createdAt>
 );
const User=mongoose.model("User", userSchema);

export default User;