const mongoose=require('mongoose');
const data=new mongoose.Schema({
    alias:String,
    name:String,
    clues:Array,
    fun_fact:Array,
    trivia:Array

})

const model=mongoose.model("Ggame",data);
module.exports =model;
