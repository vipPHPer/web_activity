/**!
 *
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/miVisibleWatcher.js

var yydzWeb = {
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

  /* 渲染页面数据 */
  yydzRenderData: function() {
    var apiVersion = '//aliyun.cdn.dl.quwannetwork.com/static_file/html/guanwang/detail/yydz_version/yydz_version.json';
    var apiArticleList = '//yydz.ums.quwannetwork.com:10101/h5/article/get_article_list/';
    var _common = {
      sendAjax: function(url, params, dataType, callback) {
        $.ajax({
          url: url,
          data: params,
          dataType: dataType,
          success: callback,
          error: function() {
            return false;
          }
        });
      }
    };

    //获取版本号
    _common.sendAjax(apiVersion, {}, 'json', function(data) {
      if (data && data.code === 0) {
        var _data = data.data;
        vm.androidLink = _data.apk_url.package;
      }
    });

    var vm = new Vue({
      el: '#app',
      data: {
        iosLink: '//itunes.apple.com/us/app/ye-ye-de-zhou-pu-ke/id1137555565?ls=1&mt=8',
        androidLink: '',
        anounceList: [],
        hotSpotList: [],
        birdGuideList: [],
        pokerClList: [],
        chessClList: [],
        pokerNewsList: [],
      }
    });

    //扑克名人
    function gwAnounceList() {
      _common.sendAjax(apiArticleList, {
        reference_address: 'gw',
        reference_module: 'gw_anounce'
      }, 'json', function(data) {
        if (data && data.code === 0) {
          var gwAnounce = [];
          var _data = data.data;
          _data.map(function(val) {
            gwAnounce.push(val);
          });
          vm.anounceList = gwAnounce.reverse();
        }
      });
    }
    gwAnounceList();

    //近期热点
    function gwHotSpotList() {
      _common.sendAjax(apiArticleList, {
        reference_address: 'gw',
        reference_module: 'gw_hot_spot'
      }, 'json', function(data) {
        if (data && data.code === 0) {
          var gwHotSpot = [];
          data.data.map(function(val) {
            gwHotSpot.push(val);
          });
          vm.hotSpotList = gwHotSpot.reverse();
        }
      });
    }
    gwHotSpotList();

    //新手指南
    function gwBirdGuideList() {
      _common.sendAjax(apiArticleList, {
        reference_address: 'gw',
        reference_module: 'gw_bird_guide'
      }, 'json', function(data) {
        if (data && data.code === 0) {
          var gwBirdGuide = [];
          data.data.map(function(val) {
            gwBirdGuide.push(val);
          });
          vm.birdGuideList = gwBirdGuide.reverse();
        }
      });
    }
    gwBirdGuideList();

    //扑克策略
    function gwPokerClList() {
      _common.sendAjax(apiArticleList, {
        reference_address: 'gw',
        reference_module: 'gw_poker_cl'
      }, 'json', function(data) {
        if (data && data.code === 0) {
          var gwPokerCl = [];
          data.data.map(function(val) {
            gwPokerCl.push(val);
          });
          vm.pokerClList = gwPokerCl.reverse();
        }
      });
    }
    gwPokerClList();

    //棋牌策略
    function gwChessClList() {
      _common.sendAjax(apiArticleList, {
        reference_address: 'gw',
        reference_module: 'gw_chess_cl'
      }, 'json', function(data) {
        if (data && data.code === 0) {
          var gwChessCl = [];
          data.data.map(function(val) {
            gwChessCl.push(val);
          });
          vm.chessClList = gwChessCl.reverse();
        }
      });
    }
    gwChessClList();

    //行业新闻
    function gwPokerNewsList() {
      _common.sendAjax(apiArticleList, {
        reference_address: 'gw',
        reference_module: 'gw_poker_news'
      }, 'json', function(data) {
        if (data && data.code === 0) {
          var gwPokerNews = [];
          data.data.map(function(val) {
            gwPokerNews.push(val);
          });
          vm.pokerNewsList = gwPokerNews.reverse();
        }
      });
    }
    gwPokerNewsList();
  },

  init: function() {
    this.loadlazy();
    this.yydzRenderData();
  }
};

$(document).ready(function() {
  yydzWeb.init();
});