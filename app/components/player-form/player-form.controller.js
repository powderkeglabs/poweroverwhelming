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
          text: "I'm a young nubile protoss and like long walks on the beach.",
          status: "Online"
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

      // Update the player's info
      // ctrl.updatePlayerInfo = function(){
      //   console.log("CLICL");
      //   PlayerService.updatePlayerInfo(ctrl.player);
      // };

      // Watch for changes in the Auth State
      $scope.$watch(
        function(){ return PlayerService.auth; },
        function(data){
          ctrl.auth = data;
          // PlayerService.currentPlayer.$bindTo($scope, 'player');
        }
      );

      // Watch for changes in the Player Data
      $scope.$watch(
        function(){ return PlayerService.getCurrentPlayer(); },
        function(data){
          ctrl.player = data;
        }
      );



      // For Materialize to enable modal triggers
      $(document).ready(function(){
        // Modal cannot be dismissed by clicking outside of the modal
        // $('.modal-trigger').leanModal({ dismissible: false});
        $('select').material_select();
      });


    }]);

})();
