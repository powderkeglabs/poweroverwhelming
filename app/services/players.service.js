(function(){

  'use strict';

  angular.module('partnerApp')

    .service('PlayerService', ['FIREBASE_URL', '$firebaseAuth', '$firebaseObject', '$firebaseArray', function(FIREBASE_URL, $firebaseAuth, $firebaseObject, $firebaseArray){

      var ref = new Firebase(FIREBASE_URL + '/players');
      var auth = $firebaseAuth(ref);
      var list = $firebaseArray(ref);
      var playerRef;

      // Initilaize the service
      var PlayerService = { auth: auth.$getAuth() };


      // ********************************************************************
      // PUBLIC Functions
      // ********************************************************************

      // Login anonymously only if not already logged in
      // @TODO: Test for auth expiry
      PlayerService.authenticate = function(playerData){

        // Check if user is already authenticated
        if (PlayerService.auth) {
          console.error("User already logged in");
          return;
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

          return newPlayer.$save(); //save player data
        })

        // Get that saved record and bind it
        .then(function(ref){
          PlayerService.currentPlayer = list.$getRecord(ref.key());
          console.log("Current Player", PlayerService.currentPlayer);
        })
        .catch(function(err){
          console.log('Error authenticating', err);
          Materialize.toast('Error Authenticating ' + err, 4000);
        });

      };

      // Deauthenticate
      PlayerService.deAuthenticate = function(){
        auth.$unauth();
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
      var _setPlayer = function(uid){
        playerRef = ref.child(uid);
        PlayerService.currentPlayer = $firebaseObject(playerRef);
      };

      // ***********************************************
      // WATCHERS
      // ***********************************************
      // Watches for changes to auth and maintains state across sessions
      auth.$onAuth(function(authData){
        PlayerService.auth = authData;
        console.log('Auth Changed', PlayerService.auth);

        // Auth exists, so bind the existing record
        if (authData) {
          _setPlayer(authData.auth.uid);
        }
      });

      return PlayerService;
    }]);

})();
