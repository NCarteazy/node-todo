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


		$scope.checked = function(todo) {
			console.log("Checked" + todo.completed);
			$scope.loading = true;
			Todos.complete(todo, !todo.completed)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});


			if(todo.completed) {
				todo.checked = true;
				$scope.done++;
			}
			else {
				todo.checked = false;
				$scope.done--;
			}
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
