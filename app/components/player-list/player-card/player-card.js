(function() {

  'use strict';

  angular.module('partnerApp')

    .directive('playerCard', function(){
      return {
        scope: {},
        bindToController: {
          name: '@',
          bnetid: '@',
          server: '@',
          race: '@',
          league: '@',
          mode: '@'
        },
        controller: function() {},
        controllerAs: 'ctrl',
        templateUrl: 'components/player-list/player-card/player-card.html'
      };
    });

})();
