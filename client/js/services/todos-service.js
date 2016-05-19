angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			del : function(todoData) {
				return $http.delete('/api/todos/d' + todoData._id);
			},
			change : function(todoData, upd) {
				return $http.put('/api/todos/p' + todoData._id, upd);
			},
			complete : function(todoData, upd) {
				return $http.put('/api/todos/c' + todoData._id, upd);
			},
			snooze : function(todoData, upd) {
				return $http.put('/api/todos/s' + todoData._id, upd);
			},
			remove : function() {
				return $http.delete('/api/todos/r');
			}
		}
	}]);
