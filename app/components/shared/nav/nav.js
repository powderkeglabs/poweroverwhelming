(function() {

  'use strict';

  angular.module('partnerApp')

    .directive('navigation', function(){
      return {
        scope: {},
        bindToController: {},
        controller: function() {

          // For initializing the SideNav
          $( document ).ready(function(){
            $('.button-collapse').sideNav();
          });

        },
        controllerAs: 'ctrl',
        templateUrl: 'components/shared/nav/nav.html'
      };
    });

})();
