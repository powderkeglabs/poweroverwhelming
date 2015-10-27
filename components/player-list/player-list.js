(function() {

  'use strict';

  angular.module('partnerApp')

    .directive('playerList', function(){
      return {
        scope: {},
        bindToController: {},
        controller: 'PlayerListCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'components/player-list/player-list.html'
      };
    });

})();
