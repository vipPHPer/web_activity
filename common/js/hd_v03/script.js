/**
 * @authors chenfuxin (since1991_vip@163.com)
 * @date    2017-03-15 14:20:30
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var serviceMonth = {

  //懒加载
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

  xmServiceMonth: function() {
    var apiDianZan = '/controller/hd_v03/dianzanData.json';
    var apiActGreenMonth = '/controller/hd_v03/serviceMonthData.json';
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

    //点赞
    var dianzan = function() {
      var thumbs = $('.thumbs');
      var flag = false; //未点赞

      thumbs.each(function() {
        var _this = $(this);
        _this.on('click', function() {
          _common.sendAjax(apiDianZan, {
            count: 1
          }, 'json', function(data) {
            if (data && data.code === 'result') {
              var count = data.data.count;
              if (count === 1) {
                _this.addClass('apilike').text('已点赞');
                flag = true; //已点赞
              } else {
                console.log(data.msg);
              }
            } else {
              console.log('error');
            }
          });
          return false;
        });
      });
    };
    dianzan();

    //获取参与活动人数（点赞人数）
    var joinGreenAct = function() {
      var userid = 11680920;
      _common.sendAjax(apiActGreenMonth, {
        user_id: userid
      }, 'json', function(data) {
        if (data && data.code === 'result') {
          var total = data.data.total;
          $('#J_peopleNum').text(total);
        } else {
          console.log('error');
        }
      });
    };
    joinGreenAct();

    //开启绿色行动
    var startGreenAct = function() {
      var textArea = $('#J_customerdefine');
      var customText = $('#J_photos_text');
      var $liItems = $('#J_list li');

      customText.val($('#J_list li:first').text());

      textArea.on('click', function() {
        if ($liItems.hasClass('current')) {
          $liItems.removeClass('current');
        }
        customText.val('');
      });

      $liItems.on('click', function() {
        var key = $(this).attr('data-key').toString();
        var content = $(this).attr('data-content').toString();

        $(this).addClass('current').siblings().removeClass('current');
        customText.val(content);
      });

      textArea.on('keyup', function() {
        var text = $(this).val();
        customText.val(text);
      });
    };
    startGreenAct();

    //微博分享
    var shareContent = [{
      title: '如今抬头见蓝天、呼吸一口新鲜空气就是奢侈！为环境做点事，再小的力量汇聚起来就能改变世界！绿色出行，从我做起。今年#小米服务月#的活动，很赞，一起参加！@小米公司 @小米之家',
      pic: 'http://web.hd.mi.com/xiaomi_12/img/green_month_share.jpg'
    }, {
      title: '我们赖以生存的空气、饮水，污染严重。同呼吸，共责任，一起行动起来，从最小的绿色出行做起，为环境做一点贡献。3月，参与#小米服务月#绿色行动，还有小福利哦！@小米公司 @小米之家',
      pic: 'http://web.hd.mi.com/xiaomi_12/img/green_month_share.jpg'
    }, {
      title: '环境保护，不应只是地球日的一个呼吁。每一天的小行动，都能带来大不同。3月，小米授权服务网点为每一个绿色出行的人送福利，同时还开通旧手机回收服务！这样的#小米服务月#，很赞，一起参加吧！@小米公司 @小米之家',
      pic: 'http://web.hd.mi.com/xiaomi_12/img/green_month_share.jpg'
    }, {
      title: '每年我们丢弃的旧手机、使用汽车儿排放的尾气，都为环境造成了很大的压力。我们只有一个地球，同呼吸共责任！今年@小米公司 邀请大家参与绿色行动，绿色出行、回收废旧手机。活动持续到3月底，参与即有福利。去看看！#小米服务月#',
      pic: 'http://web.hd.mi.com/xiaomi_12/img/green_month_share.jpg'
    }, {
      title: '我希望，我们的后代能奔跑在我们小时候奔跑过的草地，能玩耍在我们小时候嬉戏过的清澈小河边，能生活在我们小时候呼吸过的干净空气下。绿色行动，一起参加，让小行动发挥大作用！3月#小米服务月#，绿色出行、回收旧手机，为环境做贡献。@小米公司 @小米之家',
      pic: 'http://web.hd.mi.com/xiaomi_12/img/green_month_share.jpg'
    }];

    var shareWeibo = function() {
      var random = parseInt(Math.random() * 5);
      var content = shareContent[random];
      var url = 'http://web.hd.mi.com/xiaomi_12/index.html';

      title = content.title;
      pic = content.pic,
        ralateUid = '',
        language = 'zh_cn';

      window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&pic=' + encodeURIComponent(pic) + '&ralateUid=' + encodeURIComponent(ralateUid) + '&language=' + encodeURIComponent(language), '_blank', 'width=615,height=505');
    };

    $('#J_share').on('click', function() {
      shareWeibo();

      return false;
    });
  },

  init: function() {
    this.lazyload();
    this.xmServiceMonth();
  }
};

$(document).ready(function() {
  serviceMonth.init();
});