var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Entry = mongoose.model('Entry');

module.exports = (function(){
  return {
    getEntries: function(req, res){
      Entry.find({}, function(err, entries){
        if(entries){
          res.json(entries);
        } else {
          console.log(err);
        }
      })
    },
    create: function(req, res){
      var entry = new Entry(req.body)
      entry.save(function(err, savedEntry){
        if(savedEntry){
          User.findOne({_id: savedEntry._patient}, function(err, user){
            if(user){
              user._entries.push(savedEntry._id);
              user.save(function(err, savedUser){
                if(savedUser){
                  res.json({status: 'OK'})
                } else {
                  console.log(err);
                }
              })
            }
          })
        }
      })
    },
    cancel: function(req, res){
      User.findOne({_id: req.body._patient}, function(err, user){
        if(user){
          for(var i=0;i<user._entries.length;i++){
            if(user._entries[i] == req.body._id){
              user._entries.splice(i, 1);
              user.save();
            }
          }
        }
      })
      Entry.remove({_id: req.body._id}, function(err, removedEntry){
        if(removedEntry){
          res.json({status: 'OK'});
        }
      })
    },
    checkUserEntries: function(req, res){
      Entry.find({_patient: req.body._patient, date: req.body.date}, function(err, entries){
        res.json(entries)
      })
    },
    checkDayEntries: function(req, res){
      Entry.find({date: req.body.date}, function(err, entries){
        res.json(entries)
      })
    },
  }
})()
