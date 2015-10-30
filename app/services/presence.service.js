(function(){

  'use strict';

  angular.module('partnerApp')

    .service('PresenceService', ['FIREBASE_URL', function(FIREBASE_URL){

      var PresenceService = { userRef: null }; // Iniitalize

      var presenceRef = new Firebase(FIREBASE_URL + '/online');
      var onlineRef = new Firebase(FIREBASE_URL + '/.info/connected');

      // Set status to online
      PresenceService.setOnline = function(uid, data) {
        console.log("save data", data);
        onlineRef.on('value', function(snapshot) {
          if (snapshot.val()) {
            var userRef = presenceRef.child(uid);
            PresenceService.userRef = userRef;

            // Set firebase to Watch for client disconnect and set to offline;
            userRef.onDisconnect().remove();

            data.timestamp = Firebase.ServerValue.TIMESTAMP;
            userRef.set(data);
          }
        });
      };

      // Set status to offline if online
      PresenceService.setOffline = function(){
        if (PresenceService.userRef) {
          PresenceService.userRef.remove();
        }
      };

      // Get Online players
      PresenceService.getOnlinePlayers = function(){

      };

      return PresenceService;
    }]);

})();
