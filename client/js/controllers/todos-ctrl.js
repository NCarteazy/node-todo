angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.done = 0;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		$scope.remove = function()
		{
			$scope.loading = true;
			Todos.remove()
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data;
				});
				$scope.done = 0;
		}

		$scope.checked = function(todo) {
			$scope.loading = true;
			NS = {val: todo.completed};
			console.log("Checked" + NS.val);
			Todos.complete(todo, NS)
				.success(function(data) {
					$scope.loading = false;
					$scope.otdos = data; // assign our new list of todos
				});

			$scope.style = "{text-decoration: line-through}";
			if(todo.completed) {
				$scope.done++;
			}
			else {
				todo.sleeping = false;
				$scope.done--;
			}
		};


		$scope.snoozer = function(todo) {
			$scope.loading = true;
			todo.sleeping = true;
			NS = {val: true};
			console.log("Clicked" + NS.val);
			Todos.snooze(todo, NS)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		$scope.unsnoozer = function(todo) {
			$scope.loading = true;
			todo.sleeping = false;
			NS = {val: false};
			console.log("Checked" + NS);
			Todos.snooze(todo, NS)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};
		
		$scope.del = function(todo) {
			$scope.loading = true;
			console.log("Todo to be removed containins: " + todo.text);
			Todos.del(todo)
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
				Todos.done++;
				console.log("todoremoved");
			});
		}

		$scope.change = function(todo) {
			$scope.loading = true;
			console.log("Todo change: " + todo.text + " to: " + $scope.formData);
			Todos.change(todo, $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.loading = false;
				$scope.todos = data;
				console.log("todoupdated");
			});
		}
		
			
	}]);
