(function(){

  'use strict';

  angular.module('partnerApp', ['ui.router', 'firebase', 'ngSanitize', 'angulartics', 'angulartics.google.analytics'])

  // .constant("FIREBASE_URL", "https://crackling-inferno-4162.firebaseio.com/")
  .constant("RACES", ['random','protoss', 'zerg', 'terran']);

})();
