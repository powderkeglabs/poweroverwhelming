(function(){

  'use strict';

  angular.module('partnerApp')
    .controller('PlayerFormCtrl', ['PlayerService', '$scope', function(PlayerService, $scope){

      var ctrl = this;
      ctrl.auth = {}; // Holds the auth state
      ctrl.player = {
        name: 'Test#124',
        league: 'Unranked',
        race: 'Protoss',
        text: "I'm a young nubile protoss and like long walks on the beach."
      };

      ctrl.login = function(){
        PlayerService.authenticate(ctrl.player);
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

      // For Materialize to enable modal triggers
      $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        // $('.modal-trigger').leanModal();
        $('select').material_select();
      });


    }]);

})();
