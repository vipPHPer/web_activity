/**
 * @author  chenfuxin
 * @date    2016/07/25
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

function olympic() {
  //懒加载
  var loazyload = function() {
    var $visibleWatcher = $('.J_olympicVisibleWatcher');
    var $sections = $('.section', $visibleWatcher);

    $sections.visibleWatcher({
      onVisible: function(elm, index) {
        $sections.filter(function(i) {
          return i <= index + 1;
        }).addClass('preload').find('img').each(function() {
          var _src = $(this).attr('data-src');
          $(this).attr('src', _src);
        });
      }
    });
  };

  function navEvent() {
    var $page = $('.page span');
    var $listPic = $('#J_listPic');

    $page.on('click', function() {
      var index = $(this).index();
      $(this).addClass('current').siblings().removeClass('current');
      $listPic.find('a').eq(index).addClass('current').siblings().removeClass('current');

      return false;
    });
  }

  //判断时间
  var checkTime = function(serverTime) {
    var nowTime = new Date().getTime() / 1000;
    var startTime = new Date('2018/01/01 00:00:00').getTime() / 1000;

    var timeDistance = startTime - nowTime;
    var _day = Math.floor(timeDistance / 86400);

    if (_day > 0) {
      $('.J_day').text(_day);
    }
  };

  //获取服务器时间
  var getServerTime = function() {
    var now = new Date().getTime() / 1000;
    var servertimeUrl = 'http://tptm.hd.mi.com/gettimestamp';
    var _common = {
      //ajax请求
      sendAjax: function(apiUrl, params, dataType, callback) {
        $.ajax({
          url: apiUrl,
          data: params,
          dataType: dataType,
          success: callback
        });
      }
    };
    _common.sendAjax(servertimeUrl, {}, 'script', function() {
      if (servertime === undefined || typeof(servertime) !== 'number') {
        checkTime(now);
      } else {
        checkTime(servertime);
      }
    });
  };

  //初始化
  var init = function() {
    loazyload();
    navEvent();
    getServerTime();
  };

  init();
}

$(function() {
  olympic();
});