'use strict';

(function () {
  var WIZARDS_NUM = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var setupSimilarItem = similarWizardTemplate.content.querySelector('.setup-similar-item');
  var wizardsSimilarList = document.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var wizardElement = setupSimilarItem.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    wizards.slice(0, WIZARDS_NUM).forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });

    wizardsSimilarList.innerHTML = '';

    wizardsSimilarList.appendChild(fragment);
  };

  window.render = {
    wizards: renderWizards,
  };
})();
