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

var wizardsSimilarList = document.querySelector('.setup-similar-list');

var showBlock = function (selector) {
  var element = document.querySelector(selector);
  element.classList.remove('hidden');
};

var getRandomItem = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

var getRandomBool = function () {
  return Math.random() < 0.5;
};

var getRandomName = function () {
  return (getRandomBool() ? [FIRST_NAMES, LAST_NAMES] : [LAST_NAMES, FIRST_NAMES]).map(getRandomItem).join(' ');
};

var makeWizard = function () {
  return {
    name: getRandomName(),
    coatColor: getRandomItem(COAT_COLORS),
    eyesColor: getRandomItem(EYE_COLORS),
  };
};

var renderWizard = function (wizard) {
  var parent = document.querySelector('#similar-wizard-template');
  var child = parent.content.querySelector('.setup-similar-item');
  var clone = child.cloneNode(true);

  clone.querySelector('.setup-similar-label').textContent = wizard.name;
  clone.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  clone.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return clone;
};

var addWizards = function (list, wizards) {
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });

  list.appendChild(fragment);
};

var getWizards = function () {
  return Array(WIZARDS_NUM).fill(null).map(makeWizard);
};

showBlock('.setup');

addWizards(wizardsSimilarList, getWizards());

showBlock('.setup-similar');
