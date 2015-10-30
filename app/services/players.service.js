(function(){

  'use strict';

  angular.module('partnerApp')

    .service('PlayerService', ['FIREBASE_URL', 'PresenceService', '$firebaseAuth', '$firebaseObject', '$firebaseArray', function(FIREBASE_URL, PresenceService, $firebaseAuth, $firebaseObject, $firebaseArray){

      var ref = new Firebase(FIREBASE_URL + '/players');
      var auth = $firebaseAuth(ref);

      // Initilaize the service
      var PlayerService = { auth: auth.$getAuth() };


      // ********************************************************************
      // PUBLIC Functions
      // ********************************************************************

      // Login anonymously only if not already logged in
      // @TODO: Test for auth expiry
      PlayerService.authenticate = function(playerData){

        playerData.timestamp = Firebase.ServerValue.TIMESTAMP;

        // Check if user is already authenticated
        if (PlayerService.auth) {
          return console.error("User already logged in");
        }

        // Login anonymously and save the player data
        auth.$authAnonymously().then(function(data){
          PlayerService.auth = data; // Set auth data for singleton
          var newPlayerRef = ref.child(data.auth.uid);
          var newPlayer = $firebaseObject(newPlayerRef);

          // 'Flatten' the player data into the Firebase ref
          // Otherwise we'd have to save it as a nested object, and we don't
          // want that.
          newPlayer = Object.assign(newPlayer, playerData);
          console.log("newplayer", playerData, newPlayer);

          newPlayerRef.onDisconnect().update({ status: 'disconnected', timestamp: Firebase.ServerValue.TIMESTAMP});

          return newPlayer.$save(); //save player data
        })

        // Get that saved record and bind it to `currentPlayer`
        .then(function(ref){
          _setCurrentPlayer(ref.key(), playerData, 'online');
          console.log("Current Player", PlayerService.currentPlayer);
        })
        .catch(function(err){
          console.log('Error authenticating', err);
          Materialize.toast('Error Authenticating ' + err, 4000);
        });

      };

      // Deauthenticate
      PlayerService.deAuthenticate = function(){
        PlayerService.currentPlayer.status = "logged out";
        PlayerService.currentPlayer.timestamp = Firebase.ServerValue.TIMESTAMP;
        PlayerService.currentPlayer.$save().then(function(){
          auth.$unauth();
        }).catch(function(err){
          Materialize.toast('Error Logging Out ' + err, 4000);
        });
      };

      // Get the list of players
      PlayerService.getPlayers = function(race){

        var query;    // Used to generate firebase query;

        // Validate the race before querying;
        // @TODO: Race array should be a constant or something...
        if (['zerg', 'protoss', 'terran'].indexOf(race) >= 0) {
          query = ref.orderByChild('race').equalTo(race).limitToLast(25);
        } else {
          query = ref.orderByKey().limitToLast(25);
        }

        return $firebaseArray(query);
      };

      // Get the current player data
      PlayerService.getCurrentPlayer = function(){
        return PlayerService.currentPlayer;
      };

      // Update the player's info and persist to Firebase
      PlayerService.updatePlayerInfo = function(player){
        console.log("Update Player Info", player);
      };


      // ***************************************************
      // Private Functions
      // ***************************************************

      // Set the current player. Used by watcher to persist player across
      // sessions.
      var _setCurrentPlayer = function(uid, data, status){
        var playerRef = ref.child(uid);
        PlayerService.currentPlayer = $firebaseObject(playerRef);
        playerRef.update({ status: status, timestamp: Firebase.ServerValue.TIMESTAMP});
        PresenceService.setOnline(uid, data);
      };

      // ***********************************************
      // WATCHERS
      // ***********************************************
      // Watches for changes to auth and maintains state across sessions
      auth.$onAuth(function(authData){
        PlayerService.auth = authData;
        console.log('Auth Changed', PlayerService.auth);

        // Auth exists, so bind the existing record and set online
        if (authData) {
          _setCurrentPlayer(authData.auth.uid, null, 'online');
        } else {
          PresenceService.setOffline();
        }
      });

      return PlayerService;
    }]);

})();
