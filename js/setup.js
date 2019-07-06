'use strict';

var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

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

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomBool = function () {
  return Math.random() < 0.5;
};

var getRandomName = function () {
  return (getRandomBool() ? [FIRST_NAMES, LAST_NAMES] : [LAST_NAMES, FIRST_NAMES])
    .map(getRandomItem)
    .join(' ');
};

var makeWizard = function () {
  return {
    name: getRandomName(),
    coatColor: getRandomItem(COAT_COLORS),
    eyesColor: getRandomItem(EYE_COLORS),
  };
};

var renderWizard = function (wizard) {
  var wizardElement = setupSimilarItem.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var addWizards = function (target, wizards) {
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });

  target.appendChild(fragment);
};

var getWizards = function (number) {
  return Array(number).fill(null).map(makeWizard);
};

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

addWizards(wizardsSimilarList, getWizards(WIZARDS_NUM));

setupSimilar.classList.remove('hidden');
