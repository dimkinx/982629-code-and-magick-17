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

  var getSimilarWizards = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0
      ? left.name.localeCompare(right.name, 'ru', {sensitivity: 'base'})
      : rankDiff;
  };

  var getSortedSimilarWizards = function () {
    return window.render.wizards(wizards.slice().sort(getSimilarWizards));
  };

  var onLoadData = function (data) {
    wizards = data;
    getSortedSimilarWizards();
    setupSimilar.classList.remove('hidden');
  };

  var onLoadError = function (errorMessage) {
    window.errorMessage.show(errorMessage);
  };

  window.setup.changeWizardHandlers.onCoatChange = function (color) {
    coatColor = color;
    window.similar.getSortedSimilarWizards();
  };

  window.setup.changeWizardHandlers.onEyesChange = function (color) {
    eyesColor = color;
    window.similar.getSortedSimilarWizards();
  };

  window.setup.changeWizardHandlers.onFireballChange = function (color) {
    fireballColor = color;
    window.similar.getSortedSimilarWizards();
  };

  window.backend.load(onLoadData, onLoadError);

  window.similar = {
    getSortedSimilarWizards: window.debounce(getSortedSimilarWizards),
  };
})();
