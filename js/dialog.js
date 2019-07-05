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

  var CellColor = {
    BACKGROUND: 'rgba(255, 255, 255, 0.1)',
    BACKGROUND_IN_FOCUS: 'rgba(255, 255, 255, 0.3)',
    BORDER_IN_FOCUS: 'rgb(255, 255, 255)',
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
    return isEscapeKey(evt) && closePopup();
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
    return isEnterKey(evt) && openPopup();
  });

  closeElement.addEventListener('click', function () {
    closePopup();
  });

  closeElement.addEventListener('keydown', function (evt) {
    return isEnterKey(evt) && closePopup();
  });

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  var onMouseMove = function (evt) {
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

  var onClickPreventDefault = function (evt) {
    evt.preventDefault();
    dialogHandle.removeEventListener('click', onClickPreventDefault);
  };

  var onMouseUp = function (evt) {
    evt.preventDefault();

    if (dragged) {
      dialogHandle.addEventListener('click', onClickPreventDefault);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    dragged = false;
  };

  var onDialogDrag = function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onItemDragStart = function (evt) {
    evt.target.style.opacity = '0.5';

    dropCells.forEach(function (value) {
      value.style.borderColor = CellColor.BORDER_IN_FOCUS;
      value.style.backgroundColor = CellColor.BACKGROUND;
    });
  };

  var onItemDragEnter = function (evt) {
    if (evt.target.className === 'setup-artifacts-cell') {
      evt.target.style.backgroundColor = CellColor.BACKGROUND_IN_FOCUS;
    }
  };

  var onItemDragOver = function (evt) {
    evt.preventDefault();
  };

  var onItemDragLeave = function (evt) {
    if (evt.target.className === 'setup-artifacts-cell') {
      evt.target.style.backgroundColor = CellColor.BACKGROUND;
    }
  };

  var onItemDrop = function (evt) {
    evt.preventDefault();

    if (evt.target.className === 'setup-artifacts-cell') {
      draggableItem.parentNode.removeChild(draggableItem);
      evt.target.appendChild(draggableItem);
    }
  };

  var onItemDragEnd = function () {
    removeAttrStyle(draggableItem);

    dropCells.forEach(function (value) {
      removeAttrStyle(value);
    });
  };

  dropCells.forEach(function (cell) {
    cell.addEventListener('dragstart', onItemDragStart, false);
    cell.addEventListener('dragenter', onItemDragEnter, false);
    cell.addEventListener('dragover', onItemDragOver, false);
    cell.addEventListener('dragleave', onItemDragLeave, false);
    cell.addEventListener('drop', onItemDrop, false);
    cell.addEventListener('dragend', onItemDragEnd, false);
  });

  dialogHandle.addEventListener('mousedown', onDialogDrag);
})();
