/**
 * @authors chenfuxin (since1991_vip@163.com)
 * @date    2017-02-06 13:44:51
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var koreanWave0206 = {

  /* 懒加载 */
  lazyload: function() {
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
  },

  /* banner */
  rotationSlider: function() {
    var _index = 0;
    var _time = '';
    var $banner = $('#J_banner');
    var $iconpage = $('#J_page');
    var $prev = $('#J_prev');
    var $next = $('#J_next');
    var $bannerImg = $banner.find('a');
    var imgLen = $bannerImg.size();
    var $Page = $iconpage.find('span');

    var change = function() {
      $bannerImg.removeClass('current').eq(_index).addClass('current');
      $Page.removeClass('current').eq(_index).addClass('current');
    };

    var timer = function() {
      _time = setInterval(function() {
        _index++;

        if (_index >= imgLen) {
          _index = 0;
        }
        change();
      }, 3000);
    };
    timer();

    $Page.click(function() {
      _index = $(this).index();
      change();
    });

    $('#J_bannerHover').hover(function() {
      clearInterval(_time);
    }, function() {
      timer();
    });
  },

  /* 热门推荐 */
  hotRecommend: function() {
    var $hot = $('#J_hot');
    var $li = $hot.find('.hot-list li');
    var $hotCon = $('#J_hotContert').find('ul');

    $li.hover(function() {
      $(this).addClass('current').siblings().removeClass('current');
      var _index = $(this).index();

      $hotCon.hide().eq(_index).show().siblings().hide();
    });
  },

  init: function() {
    this.lazyload();
    this.rotationSlider();
    this.hotRecommend();
  },
};

$(document).ready(function() {
  koreanWave0206.init();

  $('#J_siteCategory').hover(function() {
    $('#J_siteList').show();
  }, function() {
    $('#J_siteList').hide();
  });

  $('#J_siteList').find('li').hover(function() {
    $(this).find('.site-children').show();
  }, function() {
    $(this).find('.site-children').hide();
  });
});