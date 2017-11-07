/**
 * @authors chenfuxin (since1991_vip@163.com)
 * @date    2017-04-19 13:57:06
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

$(document).ready(function() {

  //分享
  var shareWeibo = function(option) {
    var defaults = {
      title: '',
      pic: '',
      url: '',
      key: ''
    };
    var options = $.extend({}, defaults, option);
    window.open('http://service.weibo.com/share/share.php?title=' + encodeURIComponent(options.title) + '&url=' + encodeURIComponent(options.url) + '&appkey=' + encodeURIComponent(options.key) + '&pic=' + encodeURIComponent(options.pic), '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
  };

  var $btn = $('.playbtn');
  var playnum = 3;
  var count = 0;
  $('.playnum').html(playnum);
  var isture = 0;
  var rotateFunc = function(awards, angle, text) {
    isture = true;
    $btn.stopRotate();
    $btn.rotate({
      angle: 0,
      duration: 5000, //旋转时间
      animateTo: angle + 1440, //根据得出来的结果+1440度旋转
      callback: function() {
        isture = false; //标志为执行完毕
        $('#J_modalTips').modal('show').find('#J_drawresult').html(text);
        if (playnum <= 0) {
          $('.btn-again').attr('disabled', true).addClass('disabled-current').html('次数已用完');
        }

        var drawResulte = $('#J_drawresult').text();
        var txt = '谢谢参与~再来一次吧';
        if (drawResulte === txt) {
          $('.btn-share').addClass('hide');
          $('.btn-again').removeClass('hide');
        } else {
          $('.btn-again').addClass('hide');
          $('.btn-share').removeClass('hide');
        }

        $('.btn-again').on('click', function() {
          if ($(this).hasClass('disabled-current')) {
            return;
          } else {
            $('#J_modalTips').modal('hide');
          }
          return false;
        });

        $('.btn-share').on('click', function() {
          var value = $('#J_drawresult').text();

          if ($(this).hasClass('disabled-current')) {
            return;
          } else {
            shareWeibo({
              title: 'xxxxxxx' + value + '去瞧瞧 →',
              pic: 'http://web.hd.com/public/img/hd_v04/bg-lottery.png',
              href: location.href
            });
            return false;
          }
        });
      }
    });
  };
  var clickfunc = function() {
    var data = [1, 2, 3, 4, 5, 6];
    data = data[Math.floor(Math.random() * data.length)];
    switch (data) {
      case 1:
        rotateFunc(1, 0, '恭喜您获得2000元理财金');
        break;
      case 2:
        rotateFunc(2, 60, '谢谢参与~再来一次吧');
        break;
      case 3:
        rotateFunc(3, 120, '恭喜您获得5200元理财金!');
        break;
      case 4:
        rotateFunc(4, 180, '恭喜您获得100元京东E卡，将在次日以短信形式下发到您的手机上，请注意查收!');
        break;
      case 5:
        rotateFunc(5, 240, '谢谢参与~再来一次吧');
        break;
      case 6:
        rotateFunc(6, 300, '恭喜您获得1000元理财金!');
        break;
    }
  };

  $btn.on('click', function() {
    if (isture) {
      return;
    } //如果在执行就退出
    isture = true; //标志为在执行

    //先判断是否登录，没登录跳转登录
    if (1 === 2) {
      $('.playnum').html(count);
      alert('请先登录');
      isture = false;
    } else {
      //登录就执行
      if (playnum <= 0) {
        $('.playnum').html(count);
        isture = false;
      } else {
        playnum = playnum - 1; //执行转盘则次数-1
        if (playnum <= 0) {
          playnum = 0;
        }
        $('.playnum').html(playnum);
        clickfunc();
      }
    }
  });
});