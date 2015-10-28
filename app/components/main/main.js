(function() {

  'use strict';

  angular.module('partnerApp')

    .directive('mainApp', function(){
      return {
        scope: {},
        bindToController: {},
        controller: function() {

          $(document).ready(function(){
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal-trigger').leanModal();
          });

        },
        controllerAs: 'ctrl',
        templateUrl: 'components/main/main.html'
      };
    });

})();
