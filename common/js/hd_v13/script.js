/**
 * @author  chenfuxin
 * @date    2016/07/25
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var _common = {
  //ajax请求
  sendAjax: function(api, params, dataType, callback) {
    $.ajax({
      url: api,
      data: params,
      dataType: dataType,
      success: callback
    });
  }
};

/* 懒加载 */
function lazyload() {
  var $bd = $('.bd');
  var $sections = $('.section', $bd);

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

/* 头图轮换 */
function rotationSlider() {
  var index = 0;
  var $oPage = $('.ui-pager');
  var aPage = $oPage.find('span');
  var _time = '';
  var $oItem = $('.section-banner').find('.items');

  var change = function() {
    $oItem.removeClass('banner-active').eq(index).addClass('banner-active');
    aPage.removeClass('pager-current').eq(index).addClass('pager-current');
  };

  var timer = function() {
    _time = setInterval(function() {
      index++;
      if (index === 2) {
        index = 0;
      }
      change();
    }, 5000);
  };
  timer();

  aPage.hover(function() {
    clearInterval(_time);
  }, function() {
    timer();
  });

  aPage.on('click', function() {
    index = $(this).index();
    change();
    return false;
  });
}

function numberScroll(className, end, time) {
  var obj = $('.' + className);
  var displayNum = obj.find('.num');
  var _starttime = 0;

  var countDown = function() {
    _starttime++;
    if (_starttime <= end) {
      displayNum.html(_starttime);
    } else {
      return;
    }
  };
  setInterval(countDown, time);
}

//监听数字滚动
function parallaxScrolling() {
  var scrollIndex = 0;

  $(window).on('scroll', function() {
    var windowScrollTop = $(window).scrollTop();
    var windowHei = $(window).height();

    if (windowScrollTop > windowHei) {
      if (scrollIndex === 0) {
        numberScroll('num-box-01', '1825', '1');
        numberScroll('num-box-02', '100', '20');
        numberScroll('num-box-03', '600', '10');
        numberScroll('num-box-04', '700', '10');
        scrollIndex = 1;
      }
    }
  });
}

function getIntroduceData() {
  var apiIntroduce = '/controller/hd_v13/introduce.json';

  _common.sendAjax(apiIntroduce, {}, 'json', function(response) {
    if (response && response.code === 'result') {
      var res = response.data;
      var introduceTemp = doT.template($('#J_introduceTemp').html());
      var introduceData = res.introduce;
      var introduceHtml = introduceTemp(introduceData);
      $('#J_introduce').find('ul').html(introduceHtml);
    } else {
      return false;
    }
  });

  $('#J_introduce').find('li').hover(function() {
    $(this).addClass('brick-item-active').siblings().removeClass('brick-item-active');
  }, function() {
    $(this).removeClass('brick-item-active');
  });
}

$(function() {
  lazyload();
  rotationSlider();
  parallaxScrolling();
  getIntroduceData();
});