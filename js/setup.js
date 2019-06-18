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
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var setupSimilarItem = similarWizardTemplate.content.querySelector('.setup-similar-item');
var wizardsSimilarList = document.querySelector('.setup-similar-list');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSimilar = setup.querySelector('.setup-similar');
var wizardCoatColor = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyesColor = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardFireballColor = setup.querySelector('.setup-fireball-wrap');
var coatColor = setup.querySelector('input[name=coat-color]');
var eyesColor = setup.querySelector('input[name=eyes-color]');
var fireballColor = setup.querySelector('input[name=fireball-color]');

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

addWizards(wizardsSimilarList, getWizards(WIZARDS_NUM));

setupSimilar.classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoatColor.addEventListener('click', function () {
  var color = getRandomItem(COAT_COLORS);
  wizardCoatColor.style.fill = color;
  coatColor.value = color;
});

wizardEyesColor.addEventListener('click', function () {
  var color = getRandomItem(EYE_COLORS);
  wizardEyesColor.style.fill = color;
  eyesColor.value = color;
});

wizardFireballColor.addEventListener('click', function () {
  var color = getRandomItem(FIREBALL_COLORS);
  wizardFireballColor.style.backgroundColor = color;
  fireballColor.value = color;
});
