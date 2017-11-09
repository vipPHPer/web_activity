var apiUrl = '/controller/dwc/get_website_data.json';
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

/* banner图轮播 */
function bannerRotation() {
  var span = '';
  var index = 0;
  var _time = '';
  var $item = $('.J_slider').find('.slot-item');
  var picLength = $item.length;

  for (var i = 0; i < picLength; i++) {
    if (i === 0) {
      span += '<span class="current">1</span>';
    } else {
      span += '<span>' + (i + 1) + '</span>';
    }
  }
  $('.J_page').html(span);

  var page = $('.J_page span');
  var change = function() {
    $item.removeClass('current').eq(index).addClass('current');
    page.removeClass('current').eq(index).addClass('current');
  };

  var timer = function() {
    _time = setInterval(function() {
      index++;
      if (index === picLength) {
        index = 0;
      }
      change();
    }, 3000);
  };
  timer();

  page.hover(function() {
    clearInterval(_time);
  }, function() {
    timer();
  });
  page.on('click', function() {
    index = $(this).index();
    change();
    return false;
  });
}

/* acticity图轮播 */
function acticityRotation() {
  var span = '';
  var index = 0;
  var _time = '';
  var _li = $('.J_acList li');
  var liLength = _li.length;

  for (var i = 0; i < liLength; i++) {
    if (i === 0) {
      span += '<span class="current">1</span>';
    } else {
      span += '<span>' + (i + 1) + '</span>';
    }
  }
  $('.J_acPage').html(span);

  var _span = $('.J_acPage').find('span');
  var change = function() {
    _li.removeClass('current').eq(index).addClass('current');
    _span.removeClass('current').eq(index).addClass('current');
  };

  var timer = function() {
    _time = setInterval(function() {
      index++;
      if (index === liLength) {
        index = 0;
      }
      change();
    }, 3000);
  };
  timer();

  _span.hover(function() {
    clearInterval(_time);
  }, function() {
    timer();
  });

  _span.on('click', function() {
    index = $(this).index();
    change();
    return false;
  });
}

/* 公告、动态切换 */
function getNoticeDynamic() {
  var _tablist = $('.J_tablist');
  var _li = _tablist.find('li');
  var _listwrap = $('.J_listwrap');
  var _ulshow = _listwrap.find('ul');

  _li.hover(function() {
    var _index = $(this).index();
    $(this).addClass('current').siblings().removeClass('current');

    _ulshow.eq(_index).addClass('ul-show').siblings().removeClass('ul-show');
  });
}
getNoticeDynamic();

/* 渲染页面数据 */
_common.sendAjax(apiUrl, 'json', function(data) {
  if (data && data.code === 'success') {
    window.slotData = data.data;
    window.bannerListData = slotData.banner;
    window.activityListData = slotData.activityBanner;
    window.noticeListData = slotData.notice;
    window.dynamicListData = slotData.dynamic;
    window.gamesListData = slotData.games;

    window.vm = new Vue({
      el: '#bd',
      data: {
        bannerList: bannerListData,
        activityList: activityListData,
        noticeList: noticeListData,
        dynamicList: dynamicListData,
        gamesList: gamesListData
      }
    });
    loadlazy();
    bannerRotation();
    acticityRotation();
  }
});