const mongoose = require("mongoose");
const ebookSchema = new mongoose.Schema(
	{
	    bookName: {
			type: String,
			required: true,
		},
		author: {
			type:String,
			required:true
		},
		category:{
			type:String,
			required:true
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

const Ebook = mongoose.model("Ebook", ebookSchema);
module.exports = Ebook;