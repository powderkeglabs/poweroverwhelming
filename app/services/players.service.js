(function(){

  'use strict';

  angular.module('partnerApp')
    .service('PlayerService', ['FIREBASE_URL', 'RACES', 'PresenceService', '$firebaseAuth', '$firebaseObject', '$firebaseArray', function(FIREBASE_URL, RACES, PresenceService, $firebaseAuth, $firebaseObject, $firebaseArray){

      var playersRef = new Firebase(FIREBASE_URL + '/players');
      var auth = $firebaseAuth(playersRef);

      // Initilaize the service
      var PlayerService = { auth: auth.$getAuth() };


      // ***********************************************************************
      // PUBLIC Functions
      // ***********************************************************************

      // ------------------------------------------------
      // Login anonymously only if not already logged in
      PlayerService.authenticate = function(playerData){

        // Check if user is already authenticated
        if (PlayerService.auth) {
          return console.error("User already logged in");
        }

        // Login anonymously and save the player data
        auth.$authAnonymously().then(function(data){
          PlayerService.auth = data; // Set auth data for singleton
          var newPlayerRef = playersRef.child(data.auth.uid);
          var newPlayer = $firebaseObject(newPlayerRef);

          // 'Flatten' the data instead of nesting object
          newPlayer = Object.assign(newPlayer, playerData);
          return newPlayer.$save();
        }).then(function(savedRef){
          // Find the saved record and bind that to .currentPlayer
          var playerRef = playersRef.child(savedRef.key());
          PlayerService.currentPlayer = $firebaseObject(playerRef);
        }).catch(function(err){
          console.error('Error authenticating', err);
          Materialize.toast('Error Authenticating ' + err, 4000);
        });
      };


      // ------------------------------------------------
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

      // ------------------------------------------------
      // Get the list of players regardless of their logged in status
      PlayerService.getPlayers = function(race, status){

        var presenceRef = PresenceService.getPresenceRef();
        var playersRef = (status === 'online') ? presenceRef : playersRef;
        var query = playersRef.orderByKey().limitToLast(25); // default to 'all'

        // Only query valid races
        if (RACES.indexOf(race) >= 0) {
          query = playersRef.orderByChild('race').equalTo(race).limitToLast(25);
        }
        return $firebaseArray(query);
      };

      // ------------------------------------------------
      // Get the current player data
      PlayerService.getCurrentPlayer = function(){
        return PlayerService.currentPlayer;
      };

      // ------------------------------------------------
      // Update the player's info and persist to Firebase
      PlayerService.updatePlayer = function(newData){
        console.log("Update Player Info", newData);
        newData.timestamp = Firebase.ServerValue.TIMESTAMP;
        PlayerService.currentPlayer.$ref().update(newData, function(err){
          if (err) {
            console.error('Error updating info', err);
            return Materialize.toast('Error Updating Data ' + err, 4000);
          }
          _setCurrentPlayer(PlayerService.currentPlayer.$ref().key());
        });
      };



      // ***********************************************************************
      // Private Functions
      // ***********************************************************************

      // Set the current player.
      // Finds and reloads the userdata if there's an existing session.
      var _setCurrentPlayer = function(uid){
        var playerRef = playersRef.child(uid);
        PlayerService.currentPlayer = $firebaseObject(playerRef);
        playerRef.once("value", function(snapshot){
          var data = snapshot.val();
          PresenceService.setOnline(uid, data);
        });
      };


      // ***********************************************************************
      // WATCHERS
      // ***********************************************************************

      // Watches for changes to auth and maintains state across sessions
      auth.$onAuth(function(authData){
        PlayerService.auth = authData;

        // Session exists, or it doesn't. If not then it might've been expired.
        if (authData) {
          _setCurrentPlayer(authData.auth.uid);
        } else {
          // Otherwise it's a logout.  Make sure ruser is offline
          PresenceService.setOffline();
        }
      });


      // Return the Service
      return PlayerService;
    }]);
})();
