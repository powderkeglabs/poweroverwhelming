(function(){

  'use strict';

  angular.module('partnerApp')
    .controller('PlayerFormCtrl', ['PlayerService', '$scope', function(PlayerService, $scope){

      var ctrl = this;
      ctrl.auth = {}; // Holds the auth state
      ctrl.player = {}; // Holds the player state
      ctrl.updateForm = {}; //Holds the updated player state

      // Login the user
      ctrl.login = function(){
        var player = {
          name: ctrl.playerForm.name,
          bnetid: ctrl.playerForm.bnetid,
          race: ctrl.playerForm.race,
          league: 'Rank Unknown',
          text: "I'm a young nubile protoss and like long walks on the beach."
        };

        PlayerService.authenticate(player);
      };

      ctrl.logout = function(){
        PlayerService.deAuthenticate();
      };

      // Open the bottom sheet modal to allow user to edit their info
      ctrl.openModal = function(){
        $('#modalEdit').openModal();
      };

      ctrl.updatePlayerInfo = function(){
        PlayerService.updatePlayer(ctrl.updateForm);
        $('#modalEdit').closeModal();
      };

      // Watch for changes in the Auth State
      $scope.$watch(
        function(){ return PlayerService.auth; },
        function(data){
          ctrl.auth = data;
        }
      );

      // Watch for changes in the Player Data
      $scope.$watch(
        function(){ return PlayerService.getCurrentPlayer(); },
        function(data){

          // Bind one way so UX to update is less jarring if too many people
          // are updating.
          if (data && Object.keys(data).length > 0){
            data.$ref().once('value', function(snapshot){
              console.log("watch", snapshot.val());
              ctrl.player = snapshot.val();
              ctrl.updateForm = snapshot.val();
            });
          }

        }
      );

      // For Materialize to enable modal triggers
      $(document).ready(function(){
        $('select').material_select();
      });


    }]);

})();
