app.controller('entryController', function($scope, sessionFactory, entryFactory, $location, $route){
  $scope.today = new Date();
  $scope.times = ['8:00am','9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm']

  entryFactory.getEntries(function(data){
    var filteredEntries = [];
    for(var i = 0; i<data.length; i++){
      var entryDate = new Date(data[i].date);
      if(entryDate.getTime() >= $scope.today.getTime()){
        filteredEntries.push(data[i]);
      }
    }
    $scope.entries = filteredEntries;
  })
  $scope.cancelInput = function(){
    $scope.newEntry = {};
  }
  $scope.cancel = function(entry){
    var cDate = new Date(entry.date);
    if($scope.today.getTime() + 86400000 <= cDate.getTime()){
    } else {
      $scope.errMsg = 'Appt too soon to cancel.'
      return;
    }
    entryFactory.cancel(entry, function(){
      $route.reload();
    });
  }

  $scope.create = function(){
    if(!$scope.newEntry || !$scope.newEntry.date || !$scope.newEntry.time || !$scope.newEntry.complaint){
      $scope.errMsg = 'All fields required.'
      return;
    }
    if($scope.newEntry.complaint.length < 10){
      $scope.errMsg = 'Complaint must be at least 10 characters long.'
      return;
    }
    var eDate= $scope.newEntry.date;
    if(eDate.getTime() <= $scope.today.getTime()){
      $scope.errMsg = 'Date must be in the future.'
      return;
    }
    $scope.newEntry.name = $scope.sessionUser.name;
    $scope.newEntry._patient = $scope.sessionUser._id

    entryFactory.checkUserEntries($scope.newEntry, function(data){
      if(data.length > 0){
        $scope.errMsg = 'You already have an appointment for that day.'
        return;
      }
      entryFactory.checkDayEntries($scope.newEntry, function(data){
        if(data.length >= 3){
          $scope.errMsg = "That day's appointments are full"
          return;
        } else {
          entryFactory.create($scope.newEntry)
          $scope.newEntry = {};
          $location.path('/dashboard')
        }
      })
    });
  }
})
