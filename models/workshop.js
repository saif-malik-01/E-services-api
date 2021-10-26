const mongoose = require("mongoose");
const workShopSchema = new mongoose.Schema(
	{
	    workshop_Name: {
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
		date: {
			type: DateTime,
			required: true
		},
        price:{
            type:String,
            required: true
        },
		

		participants: [{
            type: mongoose.Schema.Types.ObjectId,
			ref: "User",
        }]
	},
	{
		timestamps: true,
	}
);

const WorkShop = mongoose.model("WorkShop", workShopSchema);
module.exports = WorkShop;