(function(){

  'use strict';

  angular.module('partnerApp')

    .controller('PlayerListCtrl', ['PlayerService', function(PlayerService){

      var ctrl = this;
      ctrl.players = PlayerService.getPlayers();
      // PlayerService.getPlayers().then(function(response){
      //   ctrl.players = response.data;
      //   console.log(ctrl.players);
      // });

      //Materialize tabs initializtion
      $(document).ready(function(){
        $('ul.tabs').tabs();
      });

    }]);

})();
