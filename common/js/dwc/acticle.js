var apiActicleConUrl = '/controller/dwc/get_acticle_content.json';
var apiActicleListUrl = '/controller/dwc/get_acticle_list.json';
var _common = {
  /* ajax */
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

var articleId = Request.article_id;
var zone = Request.zone;

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
    var _h = time.getHours();
    var _mm = time.getMinutes();
    var _s = time.getSeconds();
    return _y + '-' + zero(_m) + '-' + zero(_d) + ' ' + zero(_h) + ':' + zero(_mm) + ':' + zero(_s);
  }
}

/* 读取文章列表展示 */
function getArticleList() {
  _common.sendAjax('get', apiActicleListUrl, { id: articleId, type: zone }, 'json', function(data) {
    if (data && data.result === 'success') {
      var _data = data.data;
      vm.articleList = _data;
    }
  });
}

/* 读取文章内容展示 */
function getReadArticle() {
  _common.sendAjax('get', apiActicleConUrl, { id: articleId, type: zone }, 'json', function(data) {
    if (data && data.result === 'success') {
      var _data = data.data;
      var _tm = _data.timestamp;
      window.vm = new Vue({
        el: '#bd',
        data: {
          articleContent: {
            content: '<p></p>',
            title: ''
          },
          zontTitle: null,
          timestamp: null,
          articleList: null,
          isActive: false,
          isWaiting: true
        }
      });
      vm.articleContent = _data;
      vm.timestamp = convertIntToTime(_tm);
      getArticleList();
    }
  });
}
getReadArticle();