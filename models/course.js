const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
	{
		courseName: {
			type: String,
			required: true,
		},
		tutor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tutor",
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

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
