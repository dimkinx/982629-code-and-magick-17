'use strict';

(function () {
  var SHOW_ERROR_TIMEOUT = 5000;
  var footerElement = document.querySelector('footer');

  var createErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.setAttribute('class', 'error-message');
    node.textContent = errorMessage;

    return node;
  };

  var removeElement = function (element) {
    element.remove();
  };

  var showErrorMessage = function (errorMessage) {
    var errorElement = createErrorMessage(errorMessage);

    footerElement.insertAdjacentElement('afterbegin', errorElement);
    setTimeout(removeElement, SHOW_ERROR_TIMEOUT, errorElement);
  };

  window.errorMessage = {
    show: showErrorMessage,
  };
})();
