var mainApp = angular.module("mainApp", ["ngRoute", "controllers", ]);

mainApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: '../views/home.html'
    })
    .when("/list", {
        templateUrl : '../views/list.html',
        controller : 'listController'
    })
    .when("/add", {
        templateUrl : '../views/add.html',
        controller : 'addController'
    })
    .when("/single/one/:id", {
        templateUrl : '../views/single.html',
        controller : 'singleController'
    })
    .when("/user", {
        templateUrl : '../views/user.html',
        controller : 'userController'
    })
    .when("/chirp/:user", {
        templateUrl : '../views/chirp.html',
        controller : 'chirpController'
    })
});

    angular.module('controllers', [])
    .controller('addController', ['$scope', function() {   
    }])
    .controller('listController', ['$scope', function() {   
    }])
    .controller('singleController', ['$scope', function() {  
    }])
    .controller('userController', ['$scope', function() {
    }])
    .controller('chirpController', ['scope', function() {
    }]);

    mainApp.controller('addController', function($scope, $http, $location) {
        $scope.insertData = function() {
          $http.post('/api/chirps', {'user' : $scope.user, 'message' : $scope.message})
          .then(function(response) {
            $scope.postList = response.data;
            $scope.user = '';
            $scope.message = '';  
            });     
        }  
    });

    mainApp.controller('listController', function($http, $scope, $location) {
        $http.get('http://localhost:3000/api/chirps')
        .then(function(response) { 
            $scope.postList = response.data;
        });

        $scope.getId=function(id) {
            $location.path('/single/one/' + id);
        }

        $scope.deleteData = function(id) {
         $http.delete("/api/chirps/one/" + id)
            .success(function(response) {
               $http.get('/api/chirps')
                .then(function (response) {
                    $scope.postList = response.data;
                });
            });    
        }
    });

    mainApp.controller('singleController', function($scope, $routeParams, $http, $location) {   
        var currentId = $routeParams.id;
        $http.get('http://localhost:3000/api/chirps/one/' + currentId)
        .then(function(response) {
            $scope.postList = response.data;
        });
    
    
    $scope.deleteData = function(id) {
       $http.delete("/api/chirps/one/" + id)
           .success(function(response) {
               $http.get('/api/chirps')
               .then(function(response) {
                $scope.postList = response.data;
                $location.path('/list/');
                });
            });    
        }
    });

    mainApp.controller('userController', function($scope, $http, $location) {
        $http.get('/api/users')
        .then(function(response) {
            $scope.postList = response.data;
        });
        $scope.getId = function(id) {
            $location.path('/chirp/' + id);
        }
        
    });

    mainApp.controller('chirpController', function($scope, $http, $routeParams, $location) {
        var currentUser = $routeParams.user;
        $http.get('/api/chirps/user/' + currentUser)
        .then(function(response) {
            $scope.postList = response.data;
        });
        $scope.getId = function(element) {
            window.location = '#/chirp/' + element.value;
        }
        $scope.deleteData = function(id) {
         $http.delete("/api/chirps/one/" + id)
            .success(function(response) {
               $http.get('/api/chirps')
                .then(function(response) {
                $location.path('/user/');

                });
            });    
        }
        $scope.deleteEverything = function() {
            $http.delete('/api/chirps/user/' + $routeParams.user)
            .success(function(response) {
                $http.get('/api/chirps/')
                .then(function(response) {
                    $location.path('/user/');
                })
            })
        }
    });

// side bar stuff
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

