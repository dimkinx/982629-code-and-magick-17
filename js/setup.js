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

  var setup = document.querySelector('.setup');

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

  var getColorIdentity = function (color) {
    return color;
  };

  var changeWizardHandlers = {
    onCoatChange: getColorIdentity,
    onEyesChange: getColorIdentity,
    onFireballChange: getColorIdentity,
  };

  var onCoatClick = function () {
    coatInput.value = coatColor.style.fill = Colorize.next('coat');
    window.setup.changeWizardHandlers.onCoatChange(coatInput.value);
  };

  var onEyesClick = function () {
    eyesInput.value = eyesColor.style.fill = Colorize.next('eyes');
    window.setup.changeWizardHandlers.onEyesChange(eyesInput.value);
  };

  var onFireballClick = function () {
    fireballInput.value = fireballColor.style.backgroundColor = Colorize.next('fireball');
    window.setup.changeWizardHandlers.onFireballChange(fireballInput.value);
  };

  coatColor.addEventListener('click', onCoatClick);
  eyesColor.addEventListener('click', onEyesClick);
  fireballColor.addEventListener('click', onFireballClick);

  window.setup = {
    changeWizardHandlers: changeWizardHandlers,
  };
})();
