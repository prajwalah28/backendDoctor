

const User = require("../models/UserSchema.js");
const BookingSchema = require("../models/BookingSchema.js")
const DoctorSchema = require("../models/DoctorSchema.js")

module.exports.updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body }, // update the fields of user that we want to change
            { new: true } // return the new updated user data
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
};

module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
};

module.exports.getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            message: "User found",
            data: user,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "No user found",
        });
    }
};

module.exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");

        res.status(200).json({
            success: true,
            message: "Users found",
            data: users,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
}; 
  module.exports.getUserProfile = async(req,res)=>{
    const userId = req.userId

    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({sucess:false,message:'User not found'})
        }
        const {password,...rest} = user._doc

        res.status(200)
        .json({sucess:true,message:'Profile info is getting ',data:{...rest}})
    }
    catch(err){
        res.status(500)
        .json({sucess:false,message:"Something went wrong,cannot get"});
    }
  };
  module.exports.getMyAppointments = async(req,res) =>{
    try {
        const bookings = await BookingSchema.find({user:req.userId})

        const doctorIds =  bookings.mp(e1=>e1.doctor.id)

        const doctors = await DoctorSchema.find({_id : {$in : doctorIds}}).select('-password');

        res.status(200).json({sucess:true,message:'Appointments are getting',data:doctors})
    }
    catch(err){

    }
  }