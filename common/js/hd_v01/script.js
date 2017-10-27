/**
 * 
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var xm618 = {
  /* 懒加载 */
  loadlazy: function() {
    var $bd = $('.bd');
    var $sections = $('.section', $bd);

    $sections.visibleWatcher({
      onVisible: function($elm, index) {
        $sections.filter(function(i) {
          return i <= index + 1;
        }).addClass('preload').find('img').each(function() {
          var src = $(this).attr('data-src');
          $(this).attr('src', src);
        });
      }
    });
  },

  //导航吸顶、跳转
  navEvent: function() {
    var $nav = $('#J_nav');
    var navoffsetTop = $nav.offset().top;
    var windowScrollTop = 0;
    var target = '';

    $(window).on('scroll', function() {
      windowScrollTop = $(this).scrollTop();

      if (windowScrollTop >= navoffsetTop) {
        $nav.addClass('nav-fixed');
      } else {
        $nav.removeClass('nav-fixed');
      }
    });

    $nav.find('li').on('click', function() {
      target = $(this).attr('data-target');
      if (target && $(target).length) {
        $('html, body').animate({
          scrollTop: $(target).offset().top - $nav.height()
        }, 500);
      }
      return false;
    });
  },

  //图片轮换
  tabSwitch: function() {
    var $tabActive = $('.tab-active');
    var $tabImg = $('.tab-content').find('a');
    var tabCon = $tabActive.find('.items');
    // var imageNum = $tabImg.size();
    var itemIndex = 0;
    var _time = '';

    var change = function() {
      tabCon.removeClass('active').eq(itemIndex).addClass('active');
      $tabImg.removeClass('active').eq(itemIndex).addClass('active');
    };

    var timer = function() {
      _time = setInterval(function() {
        itemIndex++;
        if (itemIndex === 10) {
          itemIndex = 0;
        }
        change();
      }, 3000);
    };
    timer();

    tabCon.hover(function() {
      clearInterval(_time);
    }, function() {
      timer();
    });

    tabCon.on('click', function() {
      itemIndex = $(this).index();
      change();

      return false;
    });
  },

  //获取服务器时间显示抽奖按钮
  getServerTime: function() {
    var hdStartTime = parseInt(Date.parse(new Date('2017/10/8 00:00:00')) / 1000);
    var hdEndTime = parseInt(Date.parse(new Date('2017/12/10 00:00:00')) / 1000);

    var changeBtn = function(nowTime) {
      if (nowTime >= hdStartTime && nowTime < hdEndTime) {
        $('.J_btn618').each(function() {
          $(this).text($(this).attr('data-start-text')).removeClass('btn-disable');
        });
      } else if (nowTime >= hdEndTime) {
        $('.J_btn618').each(function() {
          $(this).addClass('btn-disable').text('活动已结束');
        });
      }
    };

    $.ajax({
      url: 'http://tptm.hd.mi.com/gettimestamp',
      dataType: 'script',
      error: function() { alert('网络出错，稍后重试'); },
      success: function() {
        if (servertime === undefined && typeof(servertime) !== 'number') {
          servertime = Date.parse(new Date()) / 1000;
        }
        changeBtn(servertime);
      }
    });
  },

  //618活动
  luckDraw618: function() {
    var _common = {
      sendAjax: function(apiUrl, params, dataType, callback) {
        $.ajax({
          url: apiUrl,
          data: params,
          dataType: dataType,
          success: callback
        });
      }
    };
    var uscore = 0;
    var $btn = $('#J_draw618');
    var $total = $('#J_uscoreTotal');
    var $modalDrawResult = $('#J_modalDrawResult');

    var drawUrl = '/controller/hd_v01/api_draw.json';
    var scoreUrl = '';
    var prizeUrl = '/controller/hd_v01/api_prize.json';
    var loginUrl = '';

    //登录
    var goLogin = function() {
      var $loginUrl = loginUrl;
      location.href = $loginUrl + location.href;
    };

    //获取剩余抽奖次数
    var updateTotalNum = function() {
      if (uscore > 0) {
        $total.text(uscore).parent().show();
      }

      if (uscore <= 0) {
        $btn.addClass('btn-disable');
      }
    };

    //抽奖次数
    _common.sendAjax(drawUrl, {}, 'json', function(data) {
      if (data && data.code === 'result') {
        var _drawData = data.data;
        uscore = _drawData.uscore;
        updateTotalNum();
        // $('#J_sharePrize').removeClass('hide');
      } else {
        goLogin();
      }
    });

    //显示抽奖结果
    var showResult = function(status, luckyInfo) {
      // 1: 未中奖
      // 2: 积分没了
      // 3: 中奖了
      // luckyInfo  中奖信息
      if (!status) return;

      var statusClass = '';
      if (status === 1) {
        statusClass = 'modal-draw-faild';
      } else if (status === 2) {
        statusClass = 'modal-draw-noscore';
      } else if (status === 3) {
        statusClass = 'modal-draw-lucky';
        $('#J_drawPrizeName').html(luckyInfo.prize_name);
      }

      $modalDrawResult.removeClass('modal-draw-faild modal-draw-lucky modal-draw-noscore').addClass(statusClass).modal('show');
    };

    //抽奖
    $btn.on('click', function() {
      if (uscore < 1) {
        //积分没了
        showResult(2);
        return false;
      } else {
        _common.sendAjax(drawUrl, {}, 'json', function(data) {
          if (data && data.code === 'result') {
            var _drawData = data.data;
            showResult(3, _drawData.user_prize_info);
          } else {
            showResult(1);
          }
          uscore = _drawData.uscore;
          updateTotalNum();
        });
      }
    });

    //我的奖品
    $('#J_showPrize').on('click', function() {
      $.ajax({
        url: prizeUrl,
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        success: function(data) {
          if (data && data.code === 0) {
            //中奖
            showResult(3, data.data[0]);
          } else {
            showResult(1);
          }
        }
      });
      return false;
    });
  },


  init: function() {
    this.loadlazy();
    this.navEvent();
    this.tabSwitch();
    this.getServerTime();
    this.luckDraw618();
  }
};

//弹窗
function modalInfor() {
  var $modalrule = $('.rule');
  var $modalbuchang = $('.buchang');
  var $rule = $('#J_modalRule');
  var $buchang = $('#J_modalBuchang');

  //规则详情
  $modalrule.on('click', function(e) {
    e.preventDefault();
    $rule.modal('show');
  });

  //十天购机补偿
  $modalbuchang.on('click', function(e) {
    e.preventDefault();
    $buchang.modal('show');
  });
}
modalInfor();

//分享微博
function shareWeibo(option) {
  var defaults = {
    title: '',
    pic: '',
    url: '',
    key: ''
  };
  var options = $.extend({}, defaults, option);
  window.open('http://service.weibo.com/share/share.php?title=' + encodeURIComponent(options.title) + '&url=' + encodeURIComponent(options.url) + '&appkey=' + encodeURIComponent(options.key) + '&pic=' + encodeURIComponent(options.pic), '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
}

$('#J_sharePrize').on('click', function() {
  shareWeibo({
    title: '太幸运啦，我在@小米商城 狂欢20天活动抽中幸运大礼包，还能抢先拥有小米5 尊享版！这么好的福利我通常不告诉别人的，去瞧瞧 →',
    pic: '',
    href: location.href
  });

  return false;
});

jQuery(document).ready(function() {
  xm618.init();
});