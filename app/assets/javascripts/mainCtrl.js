'use strict';

angular.module('portfolioApp').controller('MainCtrl', function($scope, $http) {

  $scope.projects = [];
  $http.get('/projects.json').
    success(function(data, status, headers, config) {
      $scope.projects = data;
    }).
    error(function(data, status, headers, config) {
      console.log('cannot get projects');
    });
}).$inject = ['$scope', '$http'];
