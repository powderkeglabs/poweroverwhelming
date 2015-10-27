(function(){

  'use strict';

  angular.module('partnerApp')

    .controller('PlayerListCtrl', ['PlayerService', function(PlayerService){

      var ctrl = this;
      PlayerService.getPlayers().then(function(response){
        ctrl.players = response.data;
        console.log(ctrl.players);
      });
    }]);

})();
