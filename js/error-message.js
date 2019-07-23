'use strict';

(function () {
  var BLINK_INTERVAL = 300;
  var START_BLINK_TIMEOUT = 7000;
  var SHOW_ERROR_TIMEOUT = 10000;
  var footerElement = document.querySelector('footer');

  var createErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.setAttribute('class', 'error-message');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.top = 0;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;

    setTimeout(function () {
      setInterval(function () {
        node.style.opacity ^= 1;
      }, BLINK_INTERVAL);
    }, START_BLINK_TIMEOUT);

    return node;
  };

  var insertAfter = function (newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };

  var showErrorMessage = function (errorMessage) {
    insertAfter(createErrorMessage(errorMessage), footerElement);

    setTimeout(function () {
      footerElement.parentNode.removeChild(document.querySelector('.error-message'));
    }, SHOW_ERROR_TIMEOUT);
  };

  window.errorMessage = {
    show: showErrorMessage,
  };
})();
