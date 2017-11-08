/**
 * 
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var xmWebsite = {
  /* 懒加载 */
  loadlazy: function() {
    var $visibleWtcher = $('#J_visibleWatcher');
    var $sections = $('.section-item', $visibleWtcher);

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

  /* 视频播放 */
  videoEvent: function() {
    /* 点击播放视频 */
    var $modalVideo = $('#J_modalVideo');
    $('.J_videoTrigger').on('click', function(e) {
      e.preventDefault();
      $modalVideo.find('.modal-body').html('<iframe width="880" height="536" src="//hd.mi.com/f/zt/hd/misc/youku.html?vid=' + $(this).attr('data-video') + '" frameborder=0 allowfullscreen></iframe>');
      $modalVideo.modal({
        backdrop: 'static',
        show: true
      });
    });

    $modalVideo.on('hide', function() {
      $modalVideo.find('.modal-body').empty();
    });
  },

  init: function() {
    this.loadlazy();
    this.videoEvent();
  }
};

$(document).ready(function() {
  xmWebsite.init();
});