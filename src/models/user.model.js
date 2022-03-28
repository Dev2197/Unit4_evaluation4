const bcrypt = require('bcrypt');
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : {type:String, required:true},
    lastName : {type:String, required:false},
    email : {type:String, required:true},
    password : {type:String, required:true}
},{
    versionKey:false,
    timestamps:true
});


userSchema.pre("save",function(next){
    const hash = bcrypt.hashSync(this.password, 5)
    this.password = hash;

    return next();
})

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("users", userSchema);