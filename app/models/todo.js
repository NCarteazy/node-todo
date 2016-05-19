var mongoose = require('mongoose');

var TodoSchema =  new mongoose.Schema({
   	completed: Boolean,
   	snoozed: Boolean,
	text : {type : String,
		 default: '',
		required: true}
});
var TodoModel = mongoose.model('Todo', TodoSchema);
module.exports =TodoModel; 
