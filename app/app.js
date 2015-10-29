(function(){

  'use strict';

  angular.module('partnerApp', ['ui.router', 'firebase'])

  .constant("FIREBASE_URL", "'https://crackling-inferno-4162.firebaseio.com/")
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('player-list', {
        url: '/',
        template: '<player-list></player-list>'
      })

      .state('content-list', {
        url: '/content-list',
        template: '<content-list></content-list>',
        params: { proxy: null }
      });

      //g
      // .state('done', {
      //   url: '/done',
      //   templateUrl: 'app/proxy/proxy-done.html',
      //   controller: 'proxyDoneController',
      //   params: { proxy: null }
      // });
  });

})();
