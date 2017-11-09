/**
 * 
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

//添加阴影边框
function addShadow() {
  var array = ['smart', 'J_match', 'J_accessories', 'J_around', 'J_recommend', 'J_hotReview', 'J_video'];
  for (var j = 0; j < array.length; j++) {
    $('#' + array[j]).find('li').hover(function() {
      $(this).addClass('brick-item-active');
    }, function() {
      $(this).removeClass('brick-item-active');
    });
  }
}

//为你推荐
function remEvent() {
  var $listWidth = $('#J_xmRecommendList');
  var $vShow = $('.xm-recommend-wrapper');
  var $height = $vShow.height();
  var $width = $listWidth.width();
  var $liWidth = $listWidth.find('li').width();
  var $num = $listWidth.find('li').size();
  var page = 1;
  var i = 5;
  var imgNum = $vShow.find('li').length;
  var pageCount = Math.ceil(imgNum / i);
  var $vWidth = $('.xm-recommend').width() + 14;

  $listWidth.css({
    'width': $liWidth * $num + 14 * 10 + 'px',
    'margin-left': '0' + 'px'
  });

  $('.control-next').on('click', function() {
    if (!$listWidth.is(':animated')) {
      if (page === pageCount) {
        $listWidth.animate({
          'margin-left': $vWidth + 14
        });
      } else {
        $listWidth.animate({
          'margin-left': '-' + $vWidth
        });
      }

      $('#recommend').find('.control').eq((page)).addClass('control-disable').siblings().removeClass('control-disable');
    }

    return false;
  });

  $('.control-prev').on('click', function() {
    if (!$listWidth.is(':animated')) {
      if (page === 1) {
        $listWidth.animate({
          'margin-left': '0' + 'px'
        });
      } else {
        $listWidth.animate({
          'margin-left': '+=' + $vWidth
        });
        page--;
      }

      $('#recommend').find('.control').eq((page - 1)).addClass('control-disable').siblings().removeClass('control-disable');
    }

    return false;
  });
}

//banner
function rotationSlider() {
  //首页幻灯
  var itemIndex = 0;
  var $oPage = $('.slider-page');
  var _time = '';
  var len = $('.xm-slider-control').find('a').size();
  var change = function() {
    $('.xm-slider-pagination').find('span').removeClass('active').eq(itemIndex).addClass('active');

    $('.xm-slider-control').find('a').removeClass('active').eq(itemIndex).addClass('active');
  };

  var timer = function() {
    _time = setInterval(function() {
      itemIndex++;

      if (itemIndex >= len) {
        itemIndex = 0;
      }
      change();
    }, 3000);
  };
  timer();

  $oPage.hover(function() {
    clearInterval(_time);
  }, function() {
    timer();
  });

  $oPage.on('click', function() {
    itemIndex = $(this).index();
    change();

    return false;
  });

  $('#J_homeSlider').hover(function() {
    clearInterval(_time);
  }, function() {
    timer();
  });

  $('#J_btnNext').on('click', function() {
    itemIndex++;

    if (itemIndex === len) {
      itemIndex = 0;
    }
    change();

    return false;
  });

  $('#J_btnPrevious').on('click', function() {
    itemIndex--;

    if (itemIndex < 0) {
      itemIndex = len - 1;
    }
    change();

    return false;
  });
}

var xmWebsite = {

  /* 懒加载 */
  loadlazy: function() {
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
  },

  xmOfficialWebsite: function() {
    var apiUrl = '/controller/xiaomi/xmWebsite.json'; //首页banner、焦点图下方三个图片、小米明星产品、智能硬件、搭配、周边、为你推荐
    var apihotReview = '/controller/xiaomi/hotReview.json'; //热评产品
    var apiVideo = '/controller/xiaomi/video.json'; //视频
    var apiContent = '/controller/xiaomi/xmContent.json'; //内容
    var apiNavList = '/controller/xiaomi/navList.json'; //左边导航列表

    var _common = {
      //ajax请求
      sendAjax: function(url, dataType, callback) {
        $.ajax({
          url: url,
          dataType: dataType,
          success: callback
        });
      }
    };

    var getData = function() {
      _common.sendAjax(apiUrl, 'json', function(data) {
        if (data && data.code === 0) {
          var _data = data.data;

          //首页slider
          var sliderList = doT.template($('#js-sliderTemp').html());
          var sliderDate = _data.slider;
          var sliderHtml = sliderList(sliderDate);

          $('#J_sliderHtml').html(sliderHtml);
          rotationSlider();

          //焦点图下方三个图片
          var sliderMapList = doT.template($('#js-sliderMapTemp').html());
          var sliderMapDate = _data.sliderMap;
          var sliderMapHtml = sliderMapList(sliderMapDate);

          $('#J_sliderMap').html(sliderMapHtml);

          //小米明星产品
          var starList = doT.template($('#js-starTemp').html());
          var starDate = _data.star;
          var starHtml = starList(starDate);

          $('#J_homeStarGoods').html(starHtml);

          var xmWebsiteTemp = doT.template($('#J_xmWebsiteTemp').html());

          //智能硬件
          var smartList = doT.template($('#js-smartTemp').html());
          var smartDate = _data.smart;
          var smartHtml = smartList(smartDate);

          $('#smart').html(smartHtml);

          //搭配
          var matchData = _data.match;
          var matchHtml = xmWebsiteTemp(matchData);
          $('#J_match').html(matchHtml);

          //配件
          var accessoriesData = _data.accessorise;
          var accessoriseHtml = xmWebsiteTemp(accessoriesData);
          $('#J_accessories').html(accessoriseHtml);

          //周边
          var aroundData = _data.round;
          var aroundHtml = xmWebsiteTemp(aroundData);

          $('#J_around').html(aroundHtml);

          //为你推荐
          var recommendTemp = doT.template($('#J_recommendTemp').html());
          var recommendData = _data.recommend;
          var recommendHtml = recommendTemp(recommendData);

          $('#J_recommend').html(recommendHtml);

          addShadow();
          remEvent();
        }
      });
    };
    getData();

    //热评产品
    var getHotReviewData = function() {
      _common.sendAjax(apihotReview, 'json', function(data) {
        if (data && data.code === 0) {
          var _data = data.data;
          var hotReviewTemp = doT.template($('#J_hotReviewTemp').html());
          var hotReviewData = _data.hotReview;
          var hotReviewHtml = hotReviewTemp(hotReviewData);

          $('#J_hotReview').html(hotReviewHtml);
        }
      });
    };
    getHotReviewData();

    //内容
    var contentData = function() {
      _common.sendAjax(apiContent, 'json', function(data) {
        if (data && data.code === 0) {
          var _data = data.data;
          var contentTemp = doT.template($('#J_contentTemp').html());

          //图书
          var bookData = _data.book;
          var bookHtml = contentTemp(bookData);

          $('#J_Book').html(bookHtml);

          //主题
          var themeData = _data.theme;
          var themeHtml = contentTemp(themeData);

          $('#J_Theme').html(themeHtml);

          //游戏
          var gameData = _data.game;
          var gameHtml = contentTemp(gameData);

          $('#J_game').html(gameHtml);

          //应用
          var appData = _data.app;
          var appHtml = contentTemp(appData);

          $('#J_app').html(appHtml);

          //生成pager圆点
          var getPager = function() {
            var bookLi = $('#J_Book').find('li');
            var themeLi = $('#J_Theme').find('li');
            var gameLi = $('#J_game').find('li');
            var appLi = $('#J_app').find('li');

            var array = [bookLi, themeLi, gameLi, appLi];
            var str = ['book', 'theme', 'game', 'app'];

            for (var i = 0; i < array.length; i++) {
              var span = '';
              for (j = 0; j < array[i].length; j++) {
                if (j === 0) {
                  span += '<span class="pager page-active"><em class="dot"></em></span>';
                } else {
                  span += '<span class="pager"><em class="dot">' + (j + 1) + '</em></span>';
                }
              }
              var strtype = str[i];

              $('.' + strtype).html(span);
            }
          };
          getPager();
        }
      });
    };
    contentData();

    //视频
    var getVideoData = function() {
      _common.sendAjax(apiVideo, 'json', function(data) {
        if (data && data.code === 0) {
          var _data = data.data;
          var videoTemp = doT.template($('#J_videoTemp').html());
          var videoData = _data.video;
          var videoHtml = videoTemp(videoData);

          $('#J_video').html(videoHtml);
          addShadow();
        }
      });
    };
    getVideoData();
  },

  //导航事件
  navTopEvent: function() {

    //顶部
    var $navItem = $('.J_navMainList').find('.nav-item');
    var $navMenu = $('#J_navMenu');

    $navItem.hover(function() {
      var _html = $(this).find('.item-children').html();
      $navMenu.empty();
      $navMenu.html(_html);
      $navMenu.addClass('header-nav-menu-active').show();
    }, function() {
      $navMenu.hide();
    });

    $navMenu.hover(function() {
      $(this).show();
    }, function() {
      $(this).hide();
    });

    //左边
    var $categoruList = $('#J_categoryList').find('li');

    $categoruList.hover(function() {
      $('div.children', this).show();
    }, function() {
      $('div.children', this).hide();
    });

    //购物车
    var $miniCart = $('#J_miniCartBtn');

    $miniCart.hover(function() {
      $(this).addClass('topbar-cart-active').parent().find('#shop_cart_lay').slideDown(200);
    }, function() {
      $(this).removeClass('topbar-cart-active').parent().find('#shop_cart_lay').slideUp(200);
    });
  },

  //tab切换
  addTabShadow: function() {
    var array = ['smart', 'match', 'accessories', 'around'];
    for (var i = 0; i < array.length; i++) {
      //切换
      $('#' + array[i]).find('.tab-list li').hover(function() {
        $(this).addClass('tab-active').siblings().removeClass('tab-active');
        var _index = $(this).index();

        $(this).parents('div.home-brick-box').find('.text-02-list').hide().eq(_index).removeClass('hide').show().siblings().addClass('hide').hide();
      });
    }
  },

  init: function() {
    this.loadlazy();
    this.navTopEvent();
    this.xmOfficialWebsite();
    this.addTabShadow();
  }
};

$(document).ready(function() {
  xmWebsite.init();

  $('#J_select').on('click', function() {
    $('#J_modalglobalSites').modal('show');
  });
});