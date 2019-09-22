const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model('Exercise', {
	description: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
	},
});
