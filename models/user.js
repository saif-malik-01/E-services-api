const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
	    Name: {
			type: String,
			required: true
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

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;