app.factory('entryFactory', function($http){
  var factory = {};

  factory.create = function(entry){
    $http.post('/create', entry).then(function(output){
    })
  }
  factory.getEntries = function(callback){
    $http.get('/getEntries').then(function(output){
      callback(output.data)
    })
  }
  factory.cancel = function(entry, callback){
    $http.post('/cancel', entry).then(function(output){
      callback();
    })
  }
  factory.checkUserEntries = function(entry, callback){
    $http.post('/checkUserEntries', entry).then(function(output){
      callback(output.data);
    })
  }
  factory.checkDayEntries = function(entry, callback){
    $http.post('/checkDayEntries', entry).then(function(output){
      callback(output.data);
    })
  }

  return factory;
})
