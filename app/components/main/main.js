(function() {

  'use strict';

  angular.module('partnerApp')

    .directive('mainApp', function(){
      return {
        scope: {},
        bindToController: {},
        controller: 'MainCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'components/main/main.html'
      };
    });

})();
