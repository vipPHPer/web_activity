/**
 * @authors chenfuxin (since1991_vip@163.com)
 * @date    2017-01-10 13:40:47
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var mjBrandDays = {

  /* 懒加载 */
  lazyload: function() {
    var $visibleWatcher = $('.mijia-home');
    var $sections = $('.section', $visibleWatcher);

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

    /* 自动播放视频加载 */
    var checkVideoPlayType = function() {
      //检测浏览器是否能播放不同类型的视频
      return !!document.createElement("video").canPlayType;
    }();
    var $videoPlay = $('.J_videoSec');

    $videoPlay.visibleWatcher({
      onVisible: function($elm, index) {
        var videoLen = $videoPlay.find('.video').filter(function() {
          return $(this).data('autoplay');
        });
        checkVideoPlayType && videoLen.length && videoLen.each(function(e) {
          var _this = videoLen.eq(e);
          _this.data('preload') || (_this.data('preload', !0), _this[0].volume = 0, _this[0].play());
        });
      }
    });
  },

  /* 弹窗 */
  modalInfor: function() {
    var $modalRule = $('#J_rule');
    var $modalruleBtn = $('.J_rule');

    $modalruleBtn.on('click', function() {
      $modalRule.modal('show');

      return false;
    });

    var $modalMxRule = $('#J_mxRule');
    var $modalMxRuleBtn = $('#J_showMXRule');

    $modalMxRuleBtn.on('click', function() {
      $modalMxRule.modal('show');

      return false;
    });
  },

  /* 参与互动分享 */
  interactionShare: function() {
    var $chatBox = $('.J_chatBox');
    var $item = $chatBox.find('.item');

    $item.hover(function() {
      $(this).find('.chat-icon').addClass('current').parents('.item').siblings().find('.chat-icon').removeClass('current');
    });

    var $msgModal = $('#modal-msg');
    $item.on('click', function() {
      var _index = $(this).attr('data-index');

      $msgModal.modal('show').find('.modal-inner' + _index).removeClass('hide').siblings().addClass('hide');

      return false;
    });

    //分享
    var shareWeibo = function(option) {
      var defaults = {
        title: '小米#米家品牌日#，千万元优惠券疯抢！多款商品 1 分钱加购福袋，100% 得好礼！关注@小米商城 并参与微博互动还有机会获得扫地机器人，这次真的是你升级智能家庭的好机会 → ',
        pic: '../xiaomi_10/img/weibo_share.jpg',
        url: location.href,
        key: ''
      };
      var options = $.extend({}, defaults, option);
      window.open('http://service.weibo.com/share/share.php?title=' + encodeURIComponent(options.title) + '&url=' + encodeURIComponent(options.url) + '&appkey=' + encodeURIComponent(options.key) + '&pic=' + encodeURIComponent(options.pic), '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
    };

    $('.J_share').on('click', function() {
      shareWeibo();

      return false;
    });
  },

  /* 抢卷抢卷 */
  couPonEvent: function() {
    var baseUrl = 'http://a.huodong.mi.com';
    var couponsUrl = baseUrl + '/mijia/prizestatus';
    var activeTimeArr = ['2017/01/12 00:00:00', '2017/01/12 10:00:00', '2017/01/12 12:00:00', '2017/01/12 14:00:00', '2017/01/12 18:00:00', '2017/01/12 20:00:00'];
    var textArr = ['下一轮10点开启', '下一轮12点开启', '下一轮14点开启', '下一轮18点开启', '下一轮20点开启', '券被领完啦！', '活动未开始'];
    var lotteryResultText = { success: '领取成功！', fail: '领取未成功<br/>再试一次！', out: '优惠券已经被领完...', received: '今天已领过该券！' };
    var serverTime = null;
    var drawCode = null;
    var curRound = null;
  },

  init: function() {
    this.lazyload();
    this.modalInfor();
    this.interactionShare();
    this.couPonEvent();
  }
};

$(document).ready(function() {
  mjBrandDays.init();
});