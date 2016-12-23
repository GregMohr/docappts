app.factory('sessionFactory', function($http){
  var factory = {};

  factory.getSession = function(cb){
    $http.get('/getSessionUser').then(function(output){
      factory.sessionUser = output.data;
      cb(factory.sessionUser);
    })
  }
  factory.login = function(user, cb){
    $http.post('/login', user).then(function(output){
      cb(output.data)
    })
  }
  factory.logout = function(){
    $http.get('/logout')
  }

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
