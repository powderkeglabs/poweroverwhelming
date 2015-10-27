(function(){

  'use strict';

  angular.module('partnerApp')

    .directive('appFooter', function(){

      return {
        scope: {},
        bindToController: {},
        controller: 'FooterCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'components/shared/footer/footer.html'
      };

    });

})();
