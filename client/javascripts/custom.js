var app = angular.module('app', []);

app.controller('RepoCtrl', function ($scope, $http) {
  $http.get('http://localhost:9999/api/commits/bebbs/BorisBikes')
    .success(function(commits) {
      $scope.commits = commits
    });
});