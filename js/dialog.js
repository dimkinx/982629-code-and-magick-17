'use strict';
(function () {

  var dialog = document.querySelector('.setup');
  var openElement = document.querySelector('.setup-open');
  var closeElement = dialog.querySelector('.setup-close');
  var dialogHandle = dialog.querySelector('.upload');
  var userNameInput = dialog.querySelector('.setup-user-name');
  var dropCells = dialog.querySelectorAll('.setup-artifacts-cell');
  var draggableItem = dialog.querySelector('img[draggable="true"]');

  var dragged = false;

  var startCoords = {
    x: undefined,
    y: undefined,
  };

  var CellColors = {
    BORDER: 'rgb(255, 255, 255)',
    BG: 'rgba(255, 255, 255, 0.1)',
    BG_FOCUS: 'rgba(255, 255, 255, 0.3)',
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

  openElement.addEventListener('click', function () {
    openPopup();
  });

  openElement.addEventListener('keydown', function (evt) {
    if (isEnterKey(evt)) {
      openPopup();
    }
  });

  closeElement.addEventListener('click', function () {
    closePopup();
  });

  closeElement.addEventListener('keydown', function (evt) {
    if (isEnterKey(evt)) {
      closePopup();
    }
  });

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  userNameInput.addEventListener('blur', function () {
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

  var dialogDragHandler = function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var itemDragStartHandler = function (evt) {
    evt.target.style.opacity = '0.5';

    dropCells.forEach(function (value) {
      value.style.borderColor = CellColors.BORDER;
      value.style.backgroundColor = CellColors.BG;
    });
  };

  var itemDragEnterHandler = function (evt) {
    if (evt.target.className === 'setup-artifacts-cell') {
      evt.target.style.backgroundColor = CellColors.BG_FOCUS;
    }
  };

  var itemDragOverHandler = function (evt) {
    evt.preventDefault();
  };

  var itemDragLeaveHandler = function (evt) {
    if (evt.target.className === 'setup-artifacts-cell') {
      evt.target.style.backgroundColor = CellColors.BG;
    }
  };

  var itemDropHandler = function (evt) {
    evt.preventDefault();

    if (evt.target.className === 'setup-artifacts-cell') {
      draggableItem.parentNode.removeChild(draggableItem);
      evt.target.appendChild(draggableItem);
    }
  };

  var itemDragEndHandler = function () {
    removeAttrStyle(draggableItem);

    dropCells.forEach(function (value) {
      removeAttrStyle(value);
    });
  };

  dropCells.forEach(function (cell) {
    cell.addEventListener('dragstart', itemDragStartHandler, false);
    cell.addEventListener('dragenter', itemDragEnterHandler, false);
    cell.addEventListener('dragover', itemDragOverHandler, false);
    cell.addEventListener('dragleave', itemDragLeaveHandler, false);
    cell.addEventListener('drop', itemDropHandler, false);
    cell.addEventListener('dragend', itemDragEndHandler, false);
  });

  dialogHandle.addEventListener('mousedown', dialogDragHandler);
})();
