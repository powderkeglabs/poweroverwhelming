(function(){

  'use strict';

  angular.module('partnerApp')

    .service('PlayerService', ['$http', '$firebaseAuth', '$firebaseArray', function($http, $firebaseAuth, $firebaseArray){

      var ref = new Firebase('https://crackling-inferno-4162.firebaseio.com/players');
      var auth = $firebaseAuth(ref);
      var PlayerService = { auth: auth.$getAuth() };

      // Login anonymously only if not already logged in
      // @TODO: Test for auth expiry
      PlayerService.authenticate = function(){
        if (!PlayerService.auth) {
          auth.$authAnonymously().then(function(data){
            PlayerService.auth = data;
          }).catch(function(err){
            console.log('Error authenticating', err);
          });
        }
      };

      // Deauthenticate
      PlayerService.deAuthenticate = function(){
        auth.$unauth();
      };

      // Get the list of players
      PlayerService.getPlayers = function(){
        return $firebaseArray(ref);
      };

      // Watches for changes to auth and maintains state across sessions
      auth.$onAuth(function(authData){
        PlayerService.auth = authData;
        console.log('Auth Changed', PlayerService.auth);
      });

      return PlayerService;
    }]);

})();
