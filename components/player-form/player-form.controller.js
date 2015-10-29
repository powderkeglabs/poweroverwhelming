(function(){

  'use strict';

  angular.module('partnerApp')
    .controller('PlayerFormCtrl', ['PlayerService', '$scope', function(PlayerService, $scope){

      var ctrl = this;
      ctrl.auth = {}; // Holds the auth state
      ctrl.player = {}; // Holds the player state

      ctrl.login = function(){
        var player = {
          name: ctrl.playerForm.name,
          bnetid: ctrl.playerForm.bnetid,
          race: ctrl.playerForm.race,
          league: 'Unranked',
          text: "I'm a young nubile protoss and like long walks on the beach."
        };

        PlayerService.authenticate(player);
      };

      ctrl.logout = function(){
        PlayerService.deAuthenticate();
      };

      ctrl.openModal = function(){
        console.log("openModal");
        $('#modalEdit').openModal();
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
          ctrl.player = data;
        }
      );

      // For Materialize to enable modal triggers
      $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        // $('.modal-trigger').leanModal();
        $('select').material_select();
      });


    }]);

})();
