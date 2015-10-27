(function(){

  'use strict';

  angular.module('partnerApp')

    .service('PlayerService', ['$http', function($http){
      var PlayerService = {};

      PlayerService.getPlayers = function(){
        return $http.get('players.json');
      };

      // ProxyService.proxy = {};
      //
      // ProxyService.updateProxy = function(proxy){
      //   ProxyService.proxy = proxy;
      // };
      //
      // // Submit the Proxy
      // ProxyService.submitProxy = function(proxy){
      //
      //   // Clone because we will be manipulating the proxy form for submission
      //   var proxyObj = angular.copy(proxy);
      //
      //   // We want the candidate name to show up correctly in the form
      //   if (proxyObj.candidate === 'Other' && proxy.otherCandidateName){
      //     proxyObj.candidate = proxy.otherCandidateName;
      //   }
      //
      //   // We want the candidate name to show up correctly in the form
      //   if (proxyObj.holder === 'Other' && proxy.otherHolderName){
      //     proxyObj.holder = proxy.otherHolderName;
      //   }
      //
      //   console.log(proxy, proxyObj);
      //   return $http.post('/api/Proxy', proxyObj);
      // };

      return PlayerService;
    }]);

})();
