(function(){

  'use strict';

  angular.module('partnerApp')
    .controller('MainCtrl', ['PlayerService', '$scope', function(PlayerService, $scope){

      var ctrl = this;

      ctrl.login = function(){
        PlayerService.authenticate();
      };

      ctrl.logout = function(){
        PlayerService.deAuthenticate();
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
        $('.modal-trigger').leanModal();
      });

    }]);

})();
