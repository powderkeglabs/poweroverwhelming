(function() {

  'use strict';

  angular.module('partnerApp')

    .directive('playerForm', function(){
      return {
        scope: {},
        bindToController: {},
        controller: 'PlayerFormCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'components/player-form/player-form.html'
      };
    });

})();
