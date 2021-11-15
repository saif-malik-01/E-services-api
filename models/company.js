const mongoose = require("mongoose");
const companySchema = new mongoose.Schema(
	{
	    Name: {
			type: String,
			required: true
		},
        Events: [{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Event"
        }],
        Workshops: [{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Workshop"
        }]
        
		
	},
	{
		timestamps: true,
	}
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;