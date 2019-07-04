'use strict';
(function () {

  var dialog = document.querySelector('.setup');
  var dialogOpen = document.querySelector('.setup-open');
  var dialogClose = dialog.querySelector('.setup-close');
  var dialogHandle = dialog.querySelector('.upload');
  var dialogUserNameInput = dialog.querySelector('.setup-user-name');

  var dragged = false;

  var startCoords = {
    x: undefined,
    y: undefined,
  };

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  var removeAttrStyle = function (element) {
    element.removeAttribute('style');
  };

  var isEnterKey = function (evt) {
    return evt.key === 'Enter';
  };

  var isEscapeKey = function (evt) {
    return evt.key === 'Escape'
      || evt.key === 'Esc';
  };

  var onPopupEscPress = function (evt) {
    if (isEscapeKey(evt)) {
      closePopup();
    }
  };

  var openPopup = function () {
    showElement(dialog);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    hideElement(dialog);
    removeAttrStyle(dialog);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  dialogOpen.addEventListener('click', function () {
    openPopup();
  });

  dialogOpen.addEventListener('keydown', function (evt) {
    if (isEnterKey(evt)) {
      openPopup();
    }
  });

  dialogClose.addEventListener('click', function () {
    closePopup();
  });

  dialogClose.addEventListener('keydown', function (evt) {
    if (isEnterKey(evt)) {
      closePopup();
    }
  });

  dialogUserNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  dialogUserNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  var mouseMoveHandler = function (evt) {
    evt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY,
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    dialog.style.top = (dialog.offsetTop - shift.y) + 'px';
    dialog.style.left = (dialog.offsetLeft - shift.x) + 'px';
  };

  var clickPreventDefaultHandler = function (evt) {
    evt.preventDefault();
    dialogHandle.removeEventListener('click', clickPreventDefaultHandler);
  };

  var mouseUpHandler = function (evt) {
    evt.preventDefault();

    if (dragged) {
      dialogHandle.addEventListener('click', clickPreventDefaultHandler);
    }

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    dragged = false;
  };

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
