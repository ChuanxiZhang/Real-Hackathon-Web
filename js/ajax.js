function AJAX(parameters, type) {
  var obj = {};
  obj[type] = parameters;
  $.ajax({
    url: "php/crossdomain.php",
    dataType: "json",
    type: "GET",
    async: false,
    data: obj,
    crossDomain: true,
    success: function(data) {
      obj = JSON.parse(JSON.stringify(data));
    },
    error: function(response, txtStatus) {
      console.log(obj)
      console.log(response, txtStatus)
    }
  });
  return obj;
}
