var apiActicleListUrl = '/controller/dwc/get_acticle_list.json';
var _common = {
  //ajax
  sendAjax: function(type, url, params, dataType, callback) {
    $.ajax({
      type: type,
      url: url,
      data: params,
      dataType: dataType,
      success: callback
    });
  }
};

/* 获取url参数 */
var getUrlParameter = function(url) {
  if (!url) {
    url = location.search.substring(1);
  } else {
    url = url.substr(url.indexOf('?') + 1);
  }

  var args = [];
  var query = decodeURI(url);
  var pairs = query.split('&');

  for (var i = 0; i < pairs.length; i++) {
    var pos = pairs[i].indexOf('=');
    if (pos === -1) {
      continue;
    }
    var argname = pairs[i].substring(0, pos);
    var value = pairs[i].substring(pos + 1);
    args[argname] = decodeURI(value);
  }
  return args;
};
var Request = [];
Request = getUrlParameter();

var zone = Request.zone;

function getArticleList() {
  _common.sendAjax('get', apiActicleListUrl, { type: zone }, 'json', function(data) {
    if (data && data.result === 'success') {
      var _data = data.data;
      window.vm = new Vue({
        el: '#bd',
        data: {
          articleList: _data,
        }
      });
    }
  });
}
getArticleList();

(function() {
  /* unix时间戳转为js时间戳 */
  function zero(num) {
    return num < 10 ? '0' + num : num;
  }

  function convertIntToTime(_tm) {
    if (_tm) {
      _tm = parseInt(_tm) * 1000;
      var time = new Date(_tm);
      var _y = time.getFullYear();
      var _m = time.getMonth() + 1;
      var _d = time.getDate();
      return _y + '-' + zero(_m) + '-' + zero(_d);
    }
  }
})();