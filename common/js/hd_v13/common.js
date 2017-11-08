/**
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-12-23 15:46:06
 */

$(function() {

  /* 公共头部导航 */
  var $nav = $('.nav').find('li');
  $nav.hover(function() {
    $(this).addClass('current').siblings().removeClass('current');
  });

  /* 公共懒加载 */
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

  $('.section-introduce').find('li').hover(function() {
    $(this).addClass('brick-item-active').siblings().removeClass('brick-item-active');
  }, function() {
    $(this).removeClass('brick-item-active');
  });
});

(function() {
  var headerLoad = false;
  var footerLoad = false;
  var visibleAreaLoad = false;
  $('#header').load('/views/hd_v13/header.html', function() {
    headerLoad = true;
  });

  $('#footer').load('/views/hd_v13/footer.html', function() {
    footerLoad = true;
  });
})();