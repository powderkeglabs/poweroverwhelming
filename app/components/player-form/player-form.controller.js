(function(){

  'use strict';

  angular.module('partnerApp')
    .controller('PlayerFormCtrl', ['PlayerService', '$scope', function(PlayerService, $scope){

      var ctrl = this;
      ctrl.auth = {}; // Holds the auth state
      ctrl.player = {}; // Holds the player state
      ctrl.updateForm = {}; //Holds the updated player state

      // Login the user
      ctrl.login = function(valid){

        if (!valid){
          return Materialize.toast('Oops, the info you entered in invalid.  Please update and try again.', 4000);
        }

        var player = {
          name: ctrl.playerForm.name,
          bnetid: ctrl.playerForm.bnetid,
          race: ctrl.playerForm.race,
          league: 'Rank Unknown',
          text: "I'm a fun and honest " + ctrl.playerForm.race + " looking for another kind " + ctrl.playerForm.race + " to make sweet Archon Mode magic with."
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

      ctrl.updatePlayerInfo = function(valid){

        if (!valid){
          return Materialize.toast('Oops, the info you entered in invalid.  Please update and try again.', 4000);
        }

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
