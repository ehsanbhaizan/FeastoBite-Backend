import foodModel from "../models/foodModel.js"
import fs from 'fs'




//Add food items
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        image: image_filename,
        description: req.body.description,
        category: req.body.category
    })
    try{
        await food.save();
        res.json({success:true, message:"Food added successfully"})
    }
    catch(error){
        console.log(error)
        res.json({success:false, message:"Failed to add food"})
    }
}


//All food list
const listFood = async (req, res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Failed"})
    }
}



// remove food item
const removeFood = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {})

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({success:true, message:"Food removed successfully"})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Failed to remove food"})
    }
}




export {addFood,listFood,removeFood}
