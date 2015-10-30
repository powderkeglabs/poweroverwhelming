(function(){

  'use strict';

  angular.module('partnerApp')

    .controller('PlayerListCtrl', ['PlayerService', '$state', function(PlayerService, $state){

      var ctrl = this;
      ctrl.players = PlayerService.getPlayers(null, 'online');
      ctrl.filterPlayers = function(race){
        $state.go('race', { race: race });
        ctrl.players = PlayerService.getPlayers(race, 'online');
      };

      //Materialize tabs initializtion
      $(document).ready(function(){
        $('ul.tabs').tabs();
      });

    }]);

})();
