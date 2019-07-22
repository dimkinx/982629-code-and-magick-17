'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ];

  var EYE_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];

  var WIZARDS_NUM = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var setupSimilarItem = similarWizardTemplate.content.querySelector('.setup-similar-item');
  var wizardsSimilarList = document.querySelector('.setup-similar-list');
  var setup = document.querySelector('.setup');
  var setupSimilar = setup.querySelector('.setup-similar');

  var coatColor = setup.querySelector('.wizard-coat');
  var eyesColor = setup.querySelector('.wizard-eyes');
  var fireballColor = setup.querySelector('.setup-fireball-wrap');

  var coatInput = setup.querySelector('input[name=coat-color]');
  var eyesInput = setup.querySelector('input[name=eyes-color]');
  var fireballInput = setup.querySelector('input[name=fireball-color]');

  var makeCounter = function (max) {
    var counter = 0;
    return {
      next: function () {
        counter = max > counter ? counter + 1 : 0;
        return counter;
      },
    };
  };

  var makeColorize = function (colors) {
    var index = {};
    Object.keys(colors).forEach(function (color) {
      index[color] = makeCounter(colors[color].length - 1);
    });

    return {
      next: function (name) {
        return colors[name][index[name].next()];
      },
    };
  };

  var Colorize = makeColorize({
    fireball: FIREBALL_COLORS,
    eyes: EYE_COLORS,
    coat: COAT_COLORS,
  });

  var onCoatClick = function () {
    coatInput.value = coatColor.style.fill = Colorize.next('coat');
  };

  var onEyesClick = function () {
    eyesInput.value = eyesColor.style.fill = Colorize.next('eyes');
  };

  var onFireballClick = function () {
    fireballInput.value = fireballColor.style.backgroundColor = Colorize.next('fireball');
  };

  coatColor.addEventListener('click', onCoatClick);
  eyesColor.addEventListener('click', onEyesClick);
  fireballColor.addEventListener('click', onFireballClick);

  var renderWizard = function (wizard) {
    var wizardElement = setupSimilarItem.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var addWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });

    wizardsSimilarList.appendChild(fragment);
  };

  var onLoad = function (wizards) {
    addWizards(wizards.slice(0, WIZARDS_NUM));
    setupSimilar.classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    window.errorMessage.show(errorMessage);
  };

  window.backend.load(onLoad, onError);
})();
