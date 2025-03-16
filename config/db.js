import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://ehsanbhaizan:9508821972@cluster0.wpyj4.mongodb.net/food-delivery').then(()=>console.log("DB connected"));
}
