const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema(
	{
	    Item_Name: {
			type: String,
			required: true
		},
        company:{
            type: String,
			required: true
        },
        category:{
            type: String,
			required: true
        },
		seller: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Seller"
		},
	

		price: {
            type:String,
            required: true
        }
	},
	{
		timestamps: true,
	}
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;