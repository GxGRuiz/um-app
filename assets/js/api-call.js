function ApiCall(url) {

  return fetch(url).then(function (response) {
    return response.text()
  }).then(function (text) {
    console.log(JSON.parse(text));
    return JSON.parse(text);
  });


}