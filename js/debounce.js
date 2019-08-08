'use strict';

(function () {
  var DELAY = 500;

  window.debounce = function (onDelay, delay) {
    delay = delay || DELAY;

    var timeoutId = 0;

    return function () {
      var parameters = arguments;

      if (timeoutId > 0) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(function () {
        onDelay.apply(null, parameters);
      }, delay);
    };
  };
})();
