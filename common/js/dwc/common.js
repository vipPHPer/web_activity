/*!
 * authors: chenfx (since1991_vip@163.com)
 * date:    2017-07-28 10:18:25
 * version: v1.0.0
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

(function() {
  var headerLoad = false;
  var footerLoad = false;
  var visibleAreaLoad = false;

  $('#header').load('/views/dwc/header.html', function() {
    headerLoad = true;
    if (headerLoad) {
      nowTime();
    }
  });

  $('#footer').load('/views/dwc/footer.html', function() {
    footerLoad = true;
  });
})();

/* 懒加载 */
function loadlazy() {
  var $bd = $('#bd');
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
loadlazy();

function zero(num) {
  return num >= 10 ? num : '0' + num;
}

function nowTime() {
  var _date = new Date();
  var _y = _date.getFullYear();
  var _m = _date.getMonth() + 1;
  var _d = _date.getDate();
  var _h = _date.getHours();
  var _mm = _date.getMinutes();
  var _s = _date.getSeconds();
  var timeValue = '北京时间： ' + _y + '-' + zero(_m) + '-' + zero(_d) + ' ' + zero(_h) + ':' + zero(_mm) + ':' + zero(_s);

  $('#nowTime').html(timeValue);
}

setInterval(nowTime, 1000);