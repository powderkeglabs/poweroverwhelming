(function(){

  'use strict';

  angular.module('partnerApp')

    .service('PresenceService', ['FIREBASE_URL', function(FIREBASE_URL){

      // var presenceRef = new Firebase(FIREBASE_URL + '/presence');
      var onlineRef = new Firebase(FIREBASE_URL + '/.info/connected');
      var PresenceService = {};

      // Set status to online
      PresenceService.setOnline = function(uid) {
        onlineRef.on('value', function(snapshot) {
          if (snapshot.val()) {
            PresenceService.userRef = new Firebase(FIREBASE_URL + '/presence/' + uid);
            PresenceService.userRef.onDisconnect().remove();
            PresenceService.userRef.set('online');
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
