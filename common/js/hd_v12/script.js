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
  var $visibleWtcher = $('.wrapper');
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

function childrenDay() {

  //导航跳转
  var $nav = $('#J_nav').find('a');
  var target = '';
  $nav.on('click', function() {
    target = $(this).attr('data-target');
    if (target && $(target).length) {
      $('html, body').animate({
        scrollTop: $(target).offset().top - 90
      }, 500);
    }
    return false;
  });

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

  var $mouseDown = $('#J_mouseDown');
  var $clothes = $('.section-last-body');
  var $btnbuy = $('#J_btnBuy');
  var startTime = parseInt(Date.parse(new Date('2016/12/1 00:00:00')) / 1000);
  var stTime = parseInt(Date.parse(new Date('2016/12/6 10:00:00')) / 1000);

  //头图轮换
  var index = 0;
  var winHei = 0;
  var $oPage = $('.page');
  var aPage = $oPage.find('span');
  var _time = '';
  var $oItem = $('.items');

  var change = function() {
    $oItem.removeClass('active').eq(index).addClass('active');
    aPage.removeClass('active').eq(index).addClass('active');

    if (index === 1) {
      $oPage.addClass('dark');
    } else {
      $oPage.removeClass('dark');
    }
  };

  var timer = function() {
    _time = setInterval(function() {
      index++;
      if (index === 2) {
        index = 0;
      }
      change();
    }, 3000);
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

  var changeWord = function(newTime) {
    if (newTime > startTime) {
      $clothes.find('.text').hide().siblings('.text-hide').show();
    }

    if (newTime > stTime) {
      $clothes.find('.btnBuy').text('立即购买');
      $btnbuy.text('立即购买');
    }
  };

  //导航吸顶
  var navEvent = function() {
    var $scrollTop = $(window).scrollTop();
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > winHei) {
        $('#J_nav').addClass('fixed').removeClass('container').addClass('container');
      } else {
        $('#J_nav').removeClass('fixed').addClass('container').removeClass('container');
      }
    });
  };

  var init = function() {
    _common.sendAjax('http://tptm.hd.mi.com/gettimestamp', 'script', function(data) {
      if (servertime === undefined || typeof(servertime) !== 'number') {
        servertime = Date.parse(new Date()) / 1000;
      }
      changeWord(servertime);
      navEvent();
    });
  };

  init();

  //判断ie678
  var iE678 = function() {
    var ua = navigator.userAgent;
    var flag = false;
    if (ua.indexOf('MSIE') > 0) {
      if (ua.indexOf('MSIE 6.0') > 0 || ua.indexOf('MSIE 7.0') > 0 || ua.indexOf('MSIE 8.0') > 0 && !window.innerWidth) {
        flag = true;
      }
    }
    return flag;
  };

  var setHead = function() {
    if (iE678()) {
      winHei = '1440px';
    } else {
      winHei = $(window).height();
    }

    $('.section-child-header').height(winHei);
  };
  setHead();

  var getHeight = function() {
    $('#J_mouseDown').css({
      'position': 'absolute',
      'bottom': ((75 / 1440) * winHei),
      'left': '50%'
    });

    $('.J_headerBox').css({
      'position': 'absolute',
      'top': ((310 / 1440) * winHei),
      'left': '50%',
      'margin-left': (-514 / 2) + 'px'
    });

    if (iE678()) {
      $('.J_headerBox').css({
        'top': '310px'
      });

      $('#J_mouseDown').css({
        'bottom': '75px'
      });

      return false;
    }

    if (parseInt(winHei) < 930) {
      $('.J_headerBox').css({
        'top': '115px'
      });
    }
  };
  getHeight();

  $(window).resize(function() {
    setHead();
    getHeight();
  });

  var shareContent = [{
    title: '刚刚在小米网参加#小米儿童节专场#，看到了辣条、大白兔、弹珠、悠悠球！亲爱的小伙伴们，再次看到这些属于我们那个时代的零食玩具，真是感慨万分！这个“六一”，找回童年，像小时候一样快乐！分享还可以获得小米5尊享版（3D陶瓷）的优先购买资格噢！',
    'pic': '../img/childhood-weibo1.jpg'
  }, {
    title: '刚刚在小米网参加#小米儿童节专场#，看到了辣条、大白兔、弹珠、悠悠球！亲爱的小伙伴们，再次看到这些属于我们那个时代的零食玩具，真是感慨万分！这个“六一”，找回童年，像小时候一样快乐！分享还可以获得小米5尊享版（3D陶瓷）的优先购买资格噢！',
    pic: '../img/childhood-weibo2.jpg'
  }];

  function share() {
    var random = parseInt(Math.random() * 2);
    var content = shareContent[random];
    var url = 'http://hd.mi.com/y/05241o/index.html';
    title = content.title;
    pic = content.pic,
      ralateUid = '',
      language = 'zh_cn';
    window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&pic=' + encodeURIComponent(pic) + '&ralateUid=' + encodeURIComponent(ralateUid) + '&language=' + encodeURIComponent(language), '_blank', 'width=615,height=505');
  }

  $('.btnShare').on('click', function(e) {
    e.preventDefault();
    share();
  });
}

$(document).ready(function() {
  loadlazy();
  childrenDay();
});