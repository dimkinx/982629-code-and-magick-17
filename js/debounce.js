'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;

  window.debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
    };
  };
})();
