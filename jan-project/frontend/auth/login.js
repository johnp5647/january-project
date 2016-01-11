var app = angular.module('NSApp');

app.controller("LoginController", ['$location', '$scope', 'UserService', function($location, $scope, UserService) {
    
    $scope.login = function(user) {
        //perform the login
        UserService.login(user).then(function(response) {
            $location.path('/');   
        }, function(response) {
            alert('There was a problem logging in');
        });
    }
    
}]);