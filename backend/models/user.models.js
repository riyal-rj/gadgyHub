import mongoose from "mongoose";
import validator from 'validator';
import brcypt from 'bcryptjs';


const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
const userSchema=new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true,'Please enter your username'],
        minlength: [3,'Please enter name with atleast 3 characters'],
        maxlength: [20,'Please enter name with atmost 20 characters'],
        unique: [true,'User already exists with the same username']
    },
    email: {
        type: String,
        required: [true,'Please enter your email id'],
        unique: [true,'User already exists with the same email id'],
        lowercase: true,
        validate:[validator.isEmail,'Please enter a valid email id']
    },
    password: {
        type: String,
        required:[ true,'Please enter your password'],
        minlength:[6,'Password must be at least 6 characters long'],
        select:false,
        validate:{
            validator:(value)=>{
                return passwordRegex.test(value);
            },
            message:'Password must contain at least one uppercase letter, one number, and one special character'
        }
    },
    confirmPassword: {
        type: String,
        validate: {
            validator:function (value) {
                return value === this.password;
            },
            message: 'Passwords do not match!'
        }
    },
    cartItems:[
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        }
    ],
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    }    
},{timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        return next();
        const salt=await brcypt.genSalt(10);
        this.password=await brcypt.hash(this.password,salt);
        this.confirmPassword=undefined;
        next();
});


userSchema.methods.comparePassword=async function (enteredPassword,originalPassword){
    return await brcypt.compare(enteredPassword,originalPassword);
}

const User=mongoose.model("User",userSchema);

export default User;