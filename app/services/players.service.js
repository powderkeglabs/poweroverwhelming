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

      // ******************************************************
      // Login anonymously only if not already logged in
      PlayerService.authenticate = function(playerData){

        // Check if user is already authenticated
        if (PlayerService.auth) {
          return console.error("User already logged in");
        }

        // Login anonymously and save the player data
        auth.$authAnonymously().then(function(data){
          PlayerService.auth = data; // Set auth data for singleton
          var newPlayerRef = ref.child(data.auth.uid);
          var newPlayer = $firebaseObject(newPlayerRef);

          // 'Flatten' the data instead of nesting object
          newPlayer = Object.assign(newPlayer, playerData);
          return newPlayer.$save();
        }).then(function(savedRef){
          // Find the saved record and bind that to .currentPlayer
          var playerRef = ref.child(savedRef.key());
          PlayerService.currentPlayer = $firebaseObject(playerRef);
        }).catch(function(err){
          console.error('Error authenticating', err);
          Materialize.toast('Error Authenticating ' + err, 4000);
        });
      };


      // ******************************************************
      // Logout and remove the association
      PlayerService.deAuthenticate = function(){
        var updateObj = {status: 'logged_out', timestamp: Firebase.ServerValue.TIMESTAMP};
        PlayerService.currentPlayer.$ref().update(updateObj, function(err){
          if (err){
            console.error('Error Logging Out', err);
            return Materialize.toast('Error Logging Out ' + err, 4000);
          }
          auth.$unauth();
          PlayerService.currentPlayer = {}; // unset currentPlayer
        });
      };


      // PlayerService.getOnlinePlayers = function(){
      //   var query =
      // };



      // ******************************************************
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



      // ******************************************************
      // Get the current player data
      PlayerService.getCurrentPlayer = function(){
        return PlayerService.currentPlayer;
      };

      // ******************************************************
      // Update the player's info and persist to Firebase
      PlayerService.updatePlayerInfo = function(player){
        console.log("Update Player Info", player);
      };



      // ***************************************************
      // Private Functions
      // ***************************************************

      // Set the current player.
      // Finds and reloads the userdata if there's an existing session.
      var _setCurrentPlayer = function(uid){
        var playerRef = ref.child(uid);
        PlayerService.currentPlayer = $firebaseObject(playerRef);
        playerRef.once("value", function(snapshot){
          var data = snapshot.val();
          PresenceService.setOnline(uid, data);
        });
      };

      // Reload the

      // ***********************************************
      // WATCHERS
      // ***********************************************

      // Watches for changes to auth and maintains state across sessions
      auth.$onAuth(function(authData){
        PlayerService.auth = authData;
        console.log('Auth Changed', PlayerService.auth);

        // Session exists, or it doesn't. If not then it might've been expired.
        if (authData) {
          _setCurrentPlayer(authData.auth.uid);
        } else {

          PresenceService.setOffline();
        }
      });

      return PlayerService;
    }]);

})();
