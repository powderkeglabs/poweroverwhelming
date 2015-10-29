(function() {

  'use strict';

  angular.module('partnerApp')

    .directive('playerCard', function(){
      return {
        scope: {},
        bindToController: {
          player: '=',
          self: "@"
        },
        controller: function() {
        },
        controllerAs: 'ctrl',
        templateUrl: 'components/player-card/player-card.html'
      };
    });

})();
