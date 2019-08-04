'use strict';

(function () {
  var REQUEST_TYPE = 'json';
  var REQUEST_TIMEOUT = 1000;

  var RequestMethod = {
    GET: 'GET',
    POST: 'POST',
  };

  var RequestUrl = {
    GET: 'https://js.dump.academy/code-and-magick/data',
    POST: 'https://js.dump.academy/code-and-magick',
  };

  var RequestCode = {
    OK: 200,
    MULTIPLE_CHOICES: 300,
  };

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = REQUEST_TYPE;
    xhr.timeout = REQUEST_TIMEOUT;

    onError = onError || function (errorMessage) {
      throw new Error(errorMessage);
    };

    var isError = function () {
      return xhr.status < RequestCode.OK
        || xhr.status > RequestCode.MULTIPLE_CHOICES;
    };

    xhr.addEventListener('load', function () {
      if (isError(xhr)) {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        return;
      }

      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open(RequestMethod.GET, RequestUrl.GET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open(RequestMethod.POST, RequestUrl.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
