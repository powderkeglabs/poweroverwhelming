(function() {

  'use strict';

  angular.module('partnerApp')

    .directive('playerForm', function(){
      return {
        scope: {},
        bindToController: {},
        controller: function() {
          $(document).ready(function() {
          $('select').material_select();
        });
        },
        controllerAs: 'ctrl',
        templateUrl: 'components/player-form/player-form.html'
      };
    });

})();
