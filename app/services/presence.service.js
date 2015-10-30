(function(){

  'use strict';

  angular.module('partnerApp')

    .service('PresenceService', ['FIREBASE_URL', function(FIREBASE_URL){

      var onlineRef = new Firebase(FIREBASE_URL + '/.info/connected');
      var PresenceService = {};

      // Set status to online
      PresenceService.setOnline = function(uid, data) {
        console.log("save data", data);
        onlineRef.on('value', function(snapshot) {
          if (snapshot.val()) {
            PresenceService.userRef = new Firebase(FIREBASE_URL + '/online/' + uid);

            // Set firebase to Watch for client disconnect and set to offline;
            PresenceService.userRef.onDisconnect().remove();

            if (data){
              data.timestamp = Firebase.ServerValue.TIMESTAMP;
              PresenceService.userRef.set(data);
            } else {
              PresenceService.userRef.set('online');
            }

          }
        });
      };

      // Set status to offline
      PresenceService.setOffline = function(){
        if (PresenceService.userRef) {
          PresenceService.userRef.remove();
        }
      };

      return PresenceService;
    }]);

})();
