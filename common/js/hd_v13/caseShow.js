/**
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-12-21 09:35:01
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var caseShow = {

  /* 导航切换 */
  navEvent: function() {
    var $caseShow = $('.section-caseshow');
    var $nav = $caseShow.find('span');
    var $navContent = $caseShow.find('.items');

    $nav.hover(function() {
      $(this).addClass('current').siblings().removeClass('current');
      var _index = $(this).index();

      $navContent.hide().eq(_index).removeClass('hide').show().siblings().addClass('hide').hide();
    });
  },

  init: function() {
    this.navEvent();
  }
}

$(document).ready(function() {
  caseShow.init();
});