/**
 * 
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

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

//懒加载
function lazyload() {
  var $bd = $('.bd');
  var $sections = $('.section', $bd);

  $sections.visibleWatcher({
    onVisible: function($lem, index) {
      $sections.filter(function(i) {
        return i <= index + 1;
      }).addClass('preload').find('img').each(function() {
        var src = $(this).attr('data-src');
        $(this).attr('src', src);
      });
    }
  });
}

function formaDate(data) {
  var productList = doT.template($('#productTemp').html());
  var _data = data.data;

  //旋转木马区
  var horseData = _data.one;
  var horseHtml = productList(horseData);

  $('#J_horseList').html(horseHtml);

  //海盗船区
  var shipDate = _data.two;
  var shipHtml = productList(shipDate);

  $('#J_shipList').html(shipHtml);

  //摩天轮区
  var wheelDate = _data.three;
  var wheelHtml = productList(wheelDate);

  $('#J_wheelList').html(wheelHtml);
}

//渲染产品
var apiSummer = '/controller/hd_v02/summerData.json';
_common.sendAjax(apiSummer, {}, 'json', function(data) {
  if (data && data.code === 'result') {
    formaDate(data);
  } else {
    return false;
  }
});

//导航跳转
function navEvent() {
  var $nav = $('#J_nav');
  var target = '';

  $nav.find('li').on('click', function() {
    target = $(this).attr('data-target');
    if (target && $(target).length) {
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 500);
    }
    return false;
  });
}

//弹窗
function modalInfor() {
  var $modalrule = $('.rule');
  var $rule = $('#J_modalRule');
  $modalrule.on('click', function() {
    $rule.modal('show');

    return false;
  });
}

//抽奖逻辑
function summaryDraw() {
  var uscore = 0;
  var $total = $('#J_uscoreTotal');
  var $modalDrawResult = $('#J_modalDrawResult');
  var isLogin = $.cookie('userId') && $.cookie('xm_order_btauth') ? true : false;
  var prizeUrl = '//i.huodong.t.n.mi.com/summer0621/default/getUserPrizeInfo';
  var scoreUrl = '//i.huodong.t.n.mi.com/summer0621/default/getUserScore';
  var drawUrl = '//i.huodong.t.n.mi.com/summer0621/default/idraw';
  var autarUrl = '//i.huodong.t.n.mi.com/summer0621/default/getUserAvatar';
  var loginProxy = 'http://i.huodong.t.n.mi.com/user/proxy/stop/1';
  var loginUrl = '//order.mi.com/site/login?ac=1&redirectUrl=' + location.href;
  var weibopic = '//i.huodong.t.n.mi.com/summer0621/default/getUserShareImage';

  //获取用户积分
  var getscore = function() {
    $.ajax({
      url: scoreUrl,
      dataType: 'jsonp',
      jsonp: 'jsonpcallback',
      error: function() {
        console.log('获取用户积分失败');
      },
      success: function(data) {
        if (data.code === 0) {
          uscore = data.available_score;
          updateScore();
        } else if (data.code === 100005) {
          window.location.href = loginUrl;
        }
      }
    });
  };

  // 更新剩余抽奖次数
  var updateScore = function() {
    if (uscore >= 0) {
      $total.text(uscore);
    }

    if (uscore <= 0) {
      $('.J_btnLuckDraw').addClass('gray-btn');
    }
  };

  // 显示抽奖结果
  var showDrawResult = function(status, luckyInfor) {
    // 1: 没有中奖
    // 2: 抽奖次数已用完
    // 3: 中奖
    // luckyInfor: 中奖信息

    if (!status) return;

    var statusClass = '';
    if (status === 1) {
      statusClass = 'modal-draw-faild';
    } else if (status === 2) {
      statusClass = 'modal-draw-noscore';
    } else if (status === 3) {
      status = 'modal-draw-lucky';
      $('#J_drawPrizeName').html(luckyInfor.prize_name);
    }

    $modalDrawResult.removeClass('modal-draw-faild modal-draw-noscore modal-draw-lucky').addClass(statusClass).modal('show');
  };

  //抽奖
  $('#J_luckDraw').off().on('click', function() {
    if (uscore < 1) {
      showDrawResult(2);
      return false;
    }

    $.ajax({
      url: drawUrl,
      dataType: 'jsonp',
      jsonp: 'jsonpcallback',
      success: function(data) {
        if (data && data.code === 0) {
          //中奖
          showDrawResult(3, data.user_prize_info);
        } else {
          //未中奖
          showDrawResult(1);
        }

        uscore = data.available_score;
        updateScore();
      }
    });
  });

  //我的奖品
  $('#J_showPrize').off().on('click', function() {
    if (isLogin) {
      $.ajax({
        url: prizeUrl,
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        success: function(data) {
          if (data && data.code === 0) {
            if (data.data.length) {
              //中奖
              showDrawResult(3, data.data[0]);
            } else {
              //未中奖
              showDrawResult(1);
            }
          } else if (data.code === 100005) {
            window.location.href = loginUrl;
          }
        }
      });
    } else {
      window.location.href = loginUrl;
    }
    return false;
  });

  //登录
  var loginProxy2 = function(callback) {
    var $ifr = $('<iframe width="0" height="0" name="summerProxy"></iframe>');
    $ifr.attr('src', loginProxy);
    $('body').append($ifr);

    $('iframe[name="summerProxy"]').load(function() {
      if (typeof callback === 'function') {
        callback();
      }

      $('iframe[name="summerProxy"]').remove();
    });
  };

  //拍照
  var getCamera = function() {
    $('#J_camera').on('click', function() {

      if (isLogin) {
        $.ajax({
          url: autarUrl,
          dataType: 'jsonp',
          jsonp: 'jsonpcallback',
          success: function(data) {
            if (data && data.code === 0) {
              $('.text-02').addClass('btn-disable').siblings('.text-03').removeClass('btn-disable');
              $('.phone-bg').show();
              $('.camera-bg').html('<img src="' + data.data.avatar_url + '">').show();
            }
          }
        });
      } else {
        window.location.href = loginUrl;
      }

      return false;
    });
  };
  getCamera();

  //分享
  var shareWeibo = function(option) {
    var defaults = {
      title: '小米暑期“游乐场”开业啦！这里有风驰电掣的云霄飞车、浪漫温馨的旋转木马、惊险刺激的海盗船、象征幸福的摩天轮......玩的太嗨可别忘了在这里“拍照”噢！分享照片就有机会获得小米手环2 的优先购买资格。什么？你想问怎么拍照？不如自己来看看吧 →',
      pic: '',
      url: location.href,
      key: ''
    };
    var options = $.extend({}, defaults, option);
    window.open('http://service.weibo.com/share/share.php?title=' + encodeURIComponent(options.title) + '&url=' + encodeURIComponent(options.url) + '&appkey=' + encodeURIComponent(options.key) + '&pic=' + encodeURIComponent(options.pic), '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
  };

  $('#J_shareWeibo').on('click', function() {
    $('.text-03').addClass('btn-disable').siblings('.text-04').removeClass('btn-disable');
    getscore();

    $.ajax({
      url: weibopic,
      dataType: 'jsonp',
      jsonp: 'jsonpcallback',
      success: function(data) {
        if (data && data.code === 0) {
          shareWeibo({
            pic: data.data.share_url
          });
        }
      }
    });
    return false;
  });

  //炫耀一下
  $('#J_sharePrize').on('click', function() {
    shareWeibo({
      pic: 'http://c1.mifile.cn/f/i/16/2016summer/summer_award.jpg'
    });
    return false;
  });
}

jQuery(document).ready(function() {
  lazyload();
  navEvent();
  modalInfor();
  //   summaryDraw();
});