const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
	    username: {
			type: String,
			required: true
		},

		email: {
			type: String,
			required: true
		},

		password:{
			type:String,
			required:true
		},
        
		cartItem: [{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Item"
        }],

        cartBooks:[{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Ebook"
        }]
	},
	{
		timestamps: true,
	}
);

const Event = mongoose.model("User", userSchema);
module.exports = Event;