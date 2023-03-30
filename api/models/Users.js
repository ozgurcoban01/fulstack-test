const mongoose=require('mongoose')


const UserSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        date:{
            type:Date,
            default:Date.now()
        }
    }
);

const UserModul=mongoose.model("test-collections",UserSchema);
module.exports=UserModul

