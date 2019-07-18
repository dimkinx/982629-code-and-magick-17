'use strict';

(function () {
  var TIMEOUT = 1000;

  var DataURL = {
    GET: 'https://js.dump.academy/code-and-magick/data',
    POST: 'https://js.dump.academy/code-and-magick',
  };

  var ResponseCodes = {
    OK: 200,
  };

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    onError = onError || function (errorMessage) {
      throw new Error(errorMessage);
    };

    xhr.addEventListener('load', function () {
      if (xhr.status === ResponseCodes.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', DataURL.GET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('POST', DataURL.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
