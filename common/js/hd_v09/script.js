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
  var $visibleWtcher = $('.bd');
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

//获取资深度用户
function getUser() {
  var $userNum = $('.J_userNum');

  var _common = {
    //ajax请求
    sendAjax: function(url, dataType, callback) {
      $.ajax({
        url: url,
        dataType: dataType,
        jsonp: 'jsonpcallback',
        success: callback
      });
    }
  };

  var getUserNum = function() {
    _common.sendAjax('', 'jsonp', function(data) {
      if (data && data.code === 0) {
        var num = data.data.total;
        if (num >= 20000) {
          $userNum.html('<em>' + Number((num / 10000).toFixed(1)) + '</em>万人已参与了资深用户测试').show();
        } else {
          $userNum.hide();
        }
      }
    });
  };
  getUserNum();
}

$(document).ready(function() {
  loadlazy();
  getUser();
});