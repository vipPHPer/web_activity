/**
 * 
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

/* 懒加载 */
function loadlazy() {
  var $visibleWtcher = $('#J_visibleWatcher');
  var $sections = $('.section', $visibleWtcher);

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

function mitvActivity() {
  var $mitvbuyBtn = $('.J_buyBtn');
  var target = '';
  //导航跳转
  var $nav = $('#js-NavBtn').find('a');
  $nav.on('click', function() {
    target = $(this).attr('data-target');
    if (target && $(target).length) {
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 500);
    }
    return false;
  });

  //了解产品按钮时间
  var startTime = parseInt(Date.parse(new Date('2016/12/7 00:00:00')) / 1000);
  var endTime = parseInt(Date.parse(new Date('2016/12/10 00:00:00')) / 1000);
  var overTime = parseInt(Date.parse(new Date('2016/12/12 00:00:00')) / 1000);

  var config = {
    '2160800023': 'mitv43',
    '2160800024': 'mitv48',
    '2160800025': 'mitv65'
  };

  var _common = {
    //ajax请求
    sendAjax: function(url, dataType, callback) {
      $.ajax({
        url: url,
        async: false,
        dataType: dataType,
        jsonp: 'jsonpcallback',
        success: callback
      });
    }
  };

  //活动进行中
  var hdStart = function() {
    var url = 'http://item.mi.com.static/buymitv';

    $(elem).attr({
      'href': url,
      'target': '_blank'
    }).find('span').text('立即购买');
  };

  //商品售罄
  var hdSaled = function() {
    $(elem).addClass('btn-gray').find('span').text('已售罄');
  };

  //添加阴影效果
  var addShadow = function() {
    var array = ['mitv', 'hezi', 'yinxiang'];
    for (var i = 0; i < array.length; i++) {
      $('#' + array[i]).find('li').hover(function() {
        $(this).addClass('brick-item-active').siblings().removeClass('brick-item-active');
      }, function() {
        $(this).removeClass('brick-item-active');
      });
    }
  };

  //了解产品
  var getGoodUrl = function() {
    $.each($mitvbuyBtn, function() {
      var url = $(this).attr('data-url');

      $(this).attr({
        'href': url,
        'target': '_blank'
      }).find('span').text('了解产品');
    });

    $('.start').css('display', 'block');
  };

  //活动结束
  var hdOver = function() {
    $.each($mitvbuyBtn, function() {
      var url = $(this).attr('data-url');

      $(this).attr('href', 'javascript:void(0);').addClass('btn-gray').find('span').text('活动已结束');
      $(this).siblings('.start').html('<a href="' + url + '">了解产品 &gt;</a>').css('display', 'block');
    });
  };

  //读取库存  立即购买
  var buyGoods = function() {
    _common.sendAjax('', 'jsonp', function(data) {
      if (data && data.code === 0) {
        var value = data.data;
        $.each(value, function(k, v) {
          for (var i in v) {
            $.each($mitvbuyBtn, function() {
              if (mark === config[k]) {
                if (v[i] === false) {
                  //true为有货
                  hdSaled($(this));
                } else {
                  hdStart($(this));
                }
              } else {
                hdStart($(this));
              }
            });
          }
        });
      } else {
        hdStart($(this));
      }
    });
  };

  var checkBtn = function(newTime) {
    if (newTime > startTime && newTime < endTime) {
      getGoodUrl();
    } else if (newTime > endTime && newTime < overTime) {
      buyGoods();
    } else if (newTime > overTime) {
      hdOver();
    } else {
      getGoodUrl();
    }
  };

  var init = function() {
    addShadow();
    //请求服务器时间
    _common.sendAjax('http://tptm.hd.mi.com/gettimestamp', 'script', function() {
      if (servertime === undefined || typeof(servertime) !== 'number') {
        servertime = Date.parse(new Date()) / 1000;
      }
      checkBtn(servertime);
    });
  };

  init();
}

$(document).ready(function() {
  loadlazy();
  mitvActivity();
});