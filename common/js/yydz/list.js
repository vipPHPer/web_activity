/**
 *
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/miVisibleWatcher.js

/* 懒加载 */
function loadlazy() {
  var $visibleWatcher = $('#app');
  var $sections = $('.section', $visibleWatcher);

  $sections.visibleWatcher({
    onVisible: function($elm, index) {
      $sections.filter(function(i) {
        return i <= index + 1;
      }).addClass('preload').find('img').each(function() {
        var _src = $(this).attr('data-src');
        $(this).attr('src', _src);
      });
    }
  });
}
loadlazy();

//获取url参数
var getUrlParameter = function(url) {
  if (!url) {
    url = location.search.substring(1);
  } else {
    url = url.substr(url.indexOf('?') + 1);
  }

  var args = {};
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
var Request = {};
Request = getUrlParameter();
var zone = Request.zone;

//获取当前日期
var myDate = new Date(); //获取系统当前时间
var year = myDate.getFullYear() + '-';
var month = myDate.getMonth() + 1 + '-';
var day = myDate.getDate();
$('#J_year').html(year);
$('#J_month').html(month);
$('#J_day').html(day);

/* 渲染页面数据 */
function yydzDetailList() {
  var apiArticleList = '//yydz.ums.quwannetwork.com:10101/h5/article/get_article_list/';
  var _common = {
    sendAjax: function(url, params, dataType, callback) {
      $.ajax({
        url: url,
        data: params,
        dataType: dataType,
        success: callback,
        error: function() {
          return false;
        }
      });
    }
  };

  var vm = new Vue({
    el: '#app',
    data: {
      zoneDetailList: [],
      zoneType: zone,
      zoneTitle: '',
    }
  });
  //扑克名人
  function gwAnounceList() {
    _common.sendAjax(apiArticleList, {
      reference_address: 'gw',
      reference_module: 'gw_anounce'
    }, 'json', function(data) {
      if (data && data.code === 0) {
        var gwAnounce = [];
        data.data.map(function(val) {
          gwAnounce.push(val);
        });
        vm.zoneDetailList = gwAnounce.reverse();
      }
    });
  }

  //近期热点
  function gwHotSpotList() {
    _common.sendAjax(apiArticleList, {
      reference_address: 'gw',
      reference_module: 'gw_hot_spot'
    }, 'json', function(data) {
      if (data && data.code === 0) {
        var gwHotSpot = [];
        data.data.map(function(val) {
          gwHotSpot.push(val);
        });
        vm.zoneDetailList = gwHotSpot.reverse();
      }
    });
  }

  //新手指南
  function gwBirdGuideList() {
    _common.sendAjax(apiArticleList, {
      reference_address: 'gw',
      reference_module: 'gw_bird_guide'
    }, 'json', function(data) {
      if (data && data.code === 0) {
        var gwBirdGuide = [];
        data.data.map(function(val) {
          gwBirdGuide.push(val);
        });
        vm.zoneDetailList = gwBirdGuide.reverse();
      }
    });
  }

  //扑克策略
  function gwPokerClList() {
    _common.sendAjax(apiArticleList, {
      reference_address: 'gw',
      reference_module: 'gw_poker_cl'
    }, 'json', function(data) {
      if (data && data.code === 0) {
        var gwPokerCl = [];
        data.data.map(function(val) {
          gwPokerCl.push(val);
        });
        vm.zoneDetailList = gwPokerCl.reverse();
      }
    });
  }

  //棋牌策略
  function gwChessClList() {
    _common.sendAjax(apiArticleList, {
      reference_address: 'gw',
      reference_module: 'gw_chess_cl'
    }, 'json', function(data) {
      if (data && data.code === 0) {
        var gwChessCl = [];
        data.data.map(function(val) {
          gwChessCl.push(val);
        });
        vm.zoneDetailList = gwChessCl.reverse();
      }
    });
  }

  //行业新闻
  function gwPokerNewsList() {
    _common.sendAjax(apiArticleList, {
      reference_address: 'gw',
      reference_module: 'gw_poker_news'
    }, 'json', function(data) {
      if (data && data.code === 0) {
        var gwPokerNews = [];
        data.data.map(function(val) {
          gwPokerNews.push(val);
        });
        vm.zoneDetailList = gwPokerNews.reverse();
      }
    });
  }

  setTimeout(function() {
    vm.zoneTitle = zone;
    if (zone === 'anounce') {
      vm.zoneTitle = '扑克名人';
      gwAnounceList();
    } else if (zone === 'hot_spot') {
      vm.zoneTitle = '近期热点';
      gwHotSpotList();
    } else if (zone === 'bird_guide') {
      vm.zoneTitle = '新手指南';
      gwBirdGuideList();
    } else if (zone === 'race_video') {
      vm.zoneTitle = '赛事中心';
    } else if (zone === 'poker_cl') {
      vm.zoneTitle = '扑克策略';
      gwPokerClList();
    } else if (zone === 'chess_cl') {
      vm.zoneTitle = '棋牌策略';
      gwChessClList();
    } else if (zone === 'poker_news') {
      vm.zoneTitle = '行业新闻';
      gwPokerNewsList();
    }
  }.bind(this), 0);
}
yydzDetailList();