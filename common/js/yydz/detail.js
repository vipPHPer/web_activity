/**!
 *
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/miVisibleWatcher.js

var yydzDetail = {
  /* 懒加载 */
  loadlazy: function() {
    var $app = $('#app');
    var $sections = $('.section', $app);

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

  yydzDetailList: function() {
    var apiActicleDetail = '//yydz.ums.quwannetwork.com:10101/h5/article/get_article_detail/';
    var _common = {
      sendAjax: function(url, params, dataType, callback) {
        $.ajax({
          url: url,
          data: params,
          dataType: dataType,
          success: callback
        });
      }
    };

    //获取url参数
    var getUrlParameter = function(url) {
      if (!url) {
        url = location.search.substring(1);
      } else {
        url = url.substr(url.indexOf('?') + 1);
      }

      var args = {};
      var query = decodeURI(url);
      var pairs = query.split('&');

      for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos === -1) {
          continue;
        }
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        args[argname] = decodeURI(value);
      }
      return args;
    };
    var Requert = {};
    Requert = getUrlParameter();

    var articleId = Request.articleid;
    var zone = Request.zone;

    function getReadDetail() {
      _common.sendAjax(apiActicleDetail, {
        _id: articleId
      }, 'json', function(data) {
        if (data && data.code === 0) {
          window.vm = new Vue({
            el: '#app',
            data: {
              articleDetail: {
                content: '<p></p>',
                title: ''
              },
              zoneTitle: '',
              isActive: false,
              isWaiting: true,
            }
          });
          vm.articleDetail = data.data;
        }
      });
    }
    getReadDetail();

    setTimeout(function() {
      window.vm.zoneTitle = zone;
      if (zone === 'anounce') {
        vm.zoneTitle = '扑克名人';
      } else if (zone === 'hot_spot') {
        vm.zoneTitle = '近期热点';
      } else if (zone === 'bird_guide') {
        vm.zoneTitle = '新手指南';
      } else if (zone === 'race_video') {
        vm.zoneTitle = '赛事中心';
      } else if (zone === 'poker_cl') {
        vm.zoneTitle = '扑克策略';
      } else if (zone === 'chess_cl') {
        vm.zoneTitle = '棋牌策略';
      } else if (zone === 'poker_news') {
        vm.zoneTitle = '行业新闻';
      }
    }.bind(this), 0);
  },

  init: function() {
    this.loadlazy();
    this.yydzDetailList();
  }
};

$(document).ready(function() {
  yydzDetail.init();
});