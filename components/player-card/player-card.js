(function() {

  'use strict';

  angular.module('partnerApp')

    .directive('playerCard', function(){
      return {
        scope: {},
        bindToController: {
          player: '='
        },
        controller: function() {},
        controllerAs: 'ctrl',
        templateUrl: 'components/player-card/player-card.html'
      };
    });

})();
