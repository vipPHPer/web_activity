/**
 * @author  chenfuxin
 * @date    2016/07/25
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var haierWebsite = {

  /* 懒加载 */
  lazyload: function() {
    var $visibleWatcher = $('.bd');
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
  },

  /* 头图轮播 */
  rotationSlider: function() {
    var itemIndex = 0;
    var _time = '';
    var itemsBanner = $('#wrapper_banner');
    var $items = itemsBanner.find('.imageBox a');
    var $page = itemsBanner.find('.page span');
    var len = $items.size();
    var prev = $('#prevBtn');
    var next = $('#nextBtn');

    var change = function() {
      $items.removeClass('current').eq(itemIndex).addClass('current');
      $page.removeClass('current').eq(itemIndex).addClass('current');
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

    $page.hover(function() {
      clearInterval(_time);
    }, function() {
      timer();
    });

    $page.on('click', function() {
      itemIndex = $(this).index();
      change();

      return false;
    });

    itemsBanner.hover(function() {
      clearInterval(_time);
      $(this).find('.textBtn').show();
    }, function() {
      $(this).find('.textBtn').hide();
      timer();
    });

    var array = ['prevBtn', 'nextBtn'];
    for (var i = 0; i < array.length; i++) {
      $('#' + array[i]).hover(function() {
        $(this).css('opacity', 1);
      }, function() {
        $(this).css('opacity', 0.5);
      });
    }
  },

  /* 导航切换 */
  navMenuEvent: function() {
    var $items = $('#J_recommend').find('.dl-recom-item');
    var $ulItem = $('.excal-recom').find('.ul-excal');

    $items.hover(function() {
      $(this).addClass('dl-recom-item-over').siblings().removeClass('dl-recom-item-over');
      var index = $(this).index();
      $ulItem.hide().eq(index).show().siblings('.ul-excal').hide();
    });

    //商品分类详情
    var $category = $('#J_category');
    $category.hover(function() {
      $(this).find('.all-category-list').show();
    }, function() {
      $(this).find('.all-category-list').hide();
    });
  },

  /* doT.js */
  getDate: function() {
    var apiProductData = '/controller/hd_v16/haier_product_data.json';
    window._common = {
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
    var informaDate = function(data) {
      var data = data.data;

      //热卖产品
      var SellersProductTemp = doT.template($('#J_SellersTemp').html());
      var SellersData = data.Sellers;
      var SellersHtml = SellersProductTemp(SellersData);
      $('#J_SellersList').html(SellersHtml);

      var householdProductTemp = doT.template($('#J_bingxiangTemp').html());

      //冰箱
      var bingxiangData = data.bingxiang;
      var bingxiangHtml = householdProductTemp(bingxiangData);
      $('#J_bingxiangList').html(bingxiangHtml);

      //洗衣机
      var washerData = data.washer;
      var washerHtml = householdProductTemp(washerData);
      $('#J_washerList').html(washerHtml);

      //电视
      var tvData = data.tv;
      var tvHtml = householdProductTemp(tvData);
      $('#J_tvList').html(tvHtml);

      //空调
      var airData = data.air;
      var airHtml = householdProductTemp(airData);
      $('#J_airList').html(airHtml);

      //热水器
      var heaterData = data.Heater;
      var heaterHtml = householdProductTemp(heaterData);
      $('#J_heaterList').html(heaterHtml);

      //厨房家电
      var kitchenData = data.Kitchen;
      var kitchenHtml = householdProductTemp(kitchenData);
      $('#J_kitchenList').html(kitchenHtml);

      //生活小家电
      var lifeData = data.life;
      var lifeHtml = householdProductTemp(lifeData);
      $('#J_lifeList').html(lifeHtml);

      /* addShadow */
      var addShadow = function() {
        var str = ['J_SellersList', 'J_bingxiangList', 'J_washerList', 'J_tvList', 'J_airList', 'J_heaterList', 'J_kitchenList', 'J_lifeList'];
        for (var i = 0; i < str.length; i++) {
          $('#' + str[i]).find('li').hover(function() {
            $(this).addClass('brick-item-active').siblings().removeClass('brick-item-active');
          }, function() {
            $(this).removeClass('brick-item-active');
          });
        }
      };
      addShadow();
    };

    _common.sendAjax(apiProductData, {}, 'json', function(response) {
      if (response && response.code === 'result') {
        informaDate(response);
      }
    });
  },

  getResizeitemData: function() {
    var apiResizeData = '/controller/hd_v16/resize_item_data.json';

    var formaDate = function(data) {
      var data = data.data;

      var homePromoModal = doT.template($('#J_homePromoTemp').html());
      var homePromoData = data.homePromo;
      var homePromoHtml = homePromoModal(homePromoData);
      $('#J_homePromo').html(homePromoHtml);

      var newsGoodsModal = doT.template($('#J_newsGoodsTemp').html());
      var newsGoodsData = data.newsGoods;
      var newsGoodsHtml = newsGoodsModal(newsGoodsData);
      $('#J_newsGoods').html(newsGoodsHtml);

      var customizedModal = doT.template($('#J_customizedTemp').html());
      var customizedData = data.customized;
      var customizedHtml = customizedModal(customizedData);
      $('#J_customized').html(customizedHtml);

      var str2 = ['J_homePromo', 'J_newsGoods', 'J_customized'];
      for (var j = 0; j < str2.length; j++) {
        $('#' + str2[j]).find('img').hover(function() {
          $(this).animate({
            'left': '-10px'
          }, 'fast');
        }, function() {
          $(this).animate({
            'left': '0px'
          }, 'fast');
        });
      }
    };

    _common.sendAjax(apiResizeData, {}, 'json', function(response) {
      if (response && response.code === 'result') {
        formaDate(response);
      }
    });
  },

  init: function() {
    this.getDate();
    this.getResizeitemData();
    this.rotationSlider();
    this.navMenuEvent();
    this.lazyload();
  }
};

$(document).ready(function() {
  haierWebsite.init();
});