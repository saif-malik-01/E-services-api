const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
	{
	    event_Name: {
			type: String,
			required: true
		},
        company:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Company"
        },
        category:{
            type: String,
			required: true
        },
		date: {
			type: DateTime,
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

const Event = mongoose.model("Event",eventSchema);
module.exports = Event;