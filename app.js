(function(){

  'use strict';

  angular.module('partnerApp', ['ui.router', 'firebase', 'ngSanitize'])

  // .constant("FIREBASE_URL", "https://crackling-inferno-4162.firebaseio.com/")
  .constant("RACES", ['protoss', 'zerg', 'terran']);

})();
