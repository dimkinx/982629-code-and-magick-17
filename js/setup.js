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

var WIZARDS_NUM = 4;

var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var setupSimilarItem = similarWizardTemplate.content.querySelector('.setup-similar-item');

var wizardsSimilarList = document.querySelector('.setup-similar-list');

var showElement = function (element) {
  element.classList.remove('hidden');
};

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

showElement(document.querySelector('.setup'));

addWizards(wizardsSimilarList, getWizards(WIZARDS_NUM));

showElement(document.querySelector('.setup-similar'));
