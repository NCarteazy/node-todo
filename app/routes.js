var Todo = require('./models/todo');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			completed : false,
			snoozed : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});

	app.delete('/api/todos/d*', function(req, res) {
		Todo.findById(req.originalUrl.substring(12)).remove().exec();
		getTodos(res);
	});	

	app.put('/api/todos/p*', function(req, res) {
		console.log(res.body.text);
		Todo.findByIdAndUpdate(req.originalUrl.substring(12), { 
			$set: { text: req.body.text }
			}, function (err, todo) {
  				if (err) return handleError(err);
		});
		getTodos(res);
	});

	app.put('/api/todos/c*', function(req, res) {
		Todo.findByIdAndUpdate(req.originalUrl.substring(12), { 
			$set: { completed: req.body }
			}, function (err, todo) {
  				if (err) return handleError(err);
		});
		getTodos(res);
	});

	app.put('/api/todos/s*', function(req, res) {
		console.log(req.body.text);
		Todo.findByIdAndUpdate(req.originalUrl.substring(12), { 
			$set: { snoozed: req.body }
			}, function (err, todo) {
  				if (err) return handleError(err);
		});
		getTodos(res);
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
