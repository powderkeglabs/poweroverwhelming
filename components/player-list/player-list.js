(function() {

  'use strict';

  angular.module('partnerApp')

    // // Configure nested routes for filtering player list based on class
    .config(function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('all', {
          url: '/',
          template: '<player-card ng-repeat="player in ctrl.players" player="player"></player-card>'
        })

        .state('race', {
          url: '/:race',
          template: '<player-card ng-repeat="player in ctrl.players" player="player"></player-card>'
        });

    })

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
