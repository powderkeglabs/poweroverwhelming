(function(){

  'use strict';

  angular.module('partnerApp')

    .controller('PlayerListCtrl', ['PlayerService', '$state', function(PlayerService, $state){

      var ctrl = this;
      ctrl.players = PlayerService.getPlayers();
      ctrl.filterPlayers = function(race){
        $state.go('race', { race: race });
        ctrl.players = PlayerService.getPlayers(race);
      };

      //Materialize tabs initializtion
      $(document).ready(function(){
        $('ul.tabs').tabs();
      });

    }]);

})();
