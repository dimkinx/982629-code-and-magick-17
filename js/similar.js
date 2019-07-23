'use strict';

(function () {
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var fireballColor = '#ee4830';
  var wizards = [];

  var setup = document.querySelector('.setup');
  var setupSimilar = setup.querySelector('.setup-similar');

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 5;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 3;
    }
    if (wizard.colorFireball === fireballColor) {
      rank += 1;
    }
    return rank;
  };

  var updateWizards = function () {
    window.render.wizards(wizards.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }

      return rankDiff;
    }));
  };

  var onLoad = function (data) {
    wizards = data;
    updateWizards();
    setupSimilar.classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    window.errorMessage.show(errorMessage);
  };

  window.setup.ChangeHandlers.onCoatChange = function (color) {
    coatColor = color;
    window.similar.updateWizards();
  };

  window.setup.ChangeHandlers.onEyesChange = function (color) {
    eyesColor = color;
    window.similar.updateWizards();
  };

  window.setup.ChangeHandlers.onFireballChange = function (color) {
    fireballColor = color;
    window.similar.updateWizards();
  };

  window.backend.load(onLoad, onError);

  window.similar = {
    updateWizards: window.debounce(updateWizards),
  };
})();
