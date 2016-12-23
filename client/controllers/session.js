app.controller('sessionController', function($scope, sessionFactory, $location, $routeParams, $route){
  $scope.sessionUser = null;

  sessionFactory.getSession(function(data){
    $scope.sessionUser = data;
    if(!$scope.sessionUser || $scope.sessionUser == null){
      $location.path('/login')
    }
  })
  $scope.login = function(){
    sessionFactory.login($scope.user, function(data){
      $scope.sessionUser = data;
      $location.path('/dashboard')
    });
  }
  $scope.logout = function(){
    $scope.sessionUser = {};
    sessionFactory.logout();
  }
})
