/**
 * 
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

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

function miNoteEvent() {
  var flag = false;
  var $likeBtn = $('.J_like');
  var usCount = 0;
  var $total = $('.J_num');
  var $numCount = $('.J_numCount');
  var $showBox = $('#showBox');
  var addUrl = '//i.huodong.mi.com/count/hd20160704/post'; //添加
  var checkUrl = '//i.huodong.mi.com/count/hd20160704/get'; //查询

  var shareContent = [{
      title: '#小米Note清凉十竹#小米Note免费更换天然竹后盖活动再次开启，拿着小米Note到全国近500家小米授权服务门店，就可以免费将玻璃后盖更换为天然竹后盖，活动持续到7月31日！不多说了，我先去旁边那家授权服务门店换个后盖去！@小米公司 @小米之家',
      pic: 'http://hd.mi.com/f/zt/hd/2016070401/minote.jpg'
    },

    {
      title: '#小米Note清凉十竹#7月到小米授权服务门店就能免费为小米Note更换天然竹后盖！活动从现在开始持续到7月底，拿着小米Note到任意一家授权服务门店，不用预约就能免费将玻璃后盖更换为天然竹后盖，玻璃后盖还能带回来！这个活动好，解放夏天闷热的双手！@小米公司 @小米之家',
      pic: 'http://hd.mi.com/f/zt/hd/2016070401/minote.jpg'
    },

    {
      title: '#小米Note清凉十竹#小米授权服务门店可以免费为小米Note用户更换天然竹后盖了！活动从现在开始持续到7月31日，拿着小米Note到附近小米授权服务门店就可以免费享受服务，原玻璃后盖还能拿回来！去年的活动没赶上，今年一定要去换个竹后盖！@小米公司 @小米之家 ',
      pic: 'http://hd.mi.com/f/zt/hd/2016070401/minote.jpg'
    },

    {
      title: '#小米Note清凉十竹#7月4日到7月31日，到小米授权服务门店就可以免费为小米Note更换天然竹后盖。夏天换一个新的天然竹后盖，手感绝对好！这么好的服务千万别错过，拿着小米Note到授权服务门店就可以更换！@小米公司 @小米之家 ',
      pic: 'http://hd.mi.com/f/zt/hd/2016070401/minote.jpg'
    }
  ];

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

  var updateCount = function() {
    if (usCount >= 1) {
      $numCount.css('display', 'block');
      $total.text(usCount);
    }
  };

  var shareWeibo = function() {
    var random = parseInt(Math.random() * 4);
    var content = shareContent[random];
    var url = '//hd.mi.com/y/07041o/index.html';
    title = content.title;
    pic = content.pic,
      ralateUid = '',
      language = 'zh_cn';
    window.open('//service.weibo.com/share/share.php?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&pic=' + encodeURIComponent(pic) + '&ralateUid=' + encodeURIComponent(ralateUid) + '&language=' + encodeURIComponent(language), '_blank', 'width=615,height=505');
  };

  //获取点赞人数
  var getCount = function() {
    _common.sendAjax(checkUrl, {}, 'jsonp', function(data) {
      if (data && data.code === 0) {
        usCount = data.data.count;
        updateCount();
      } else {
        return false;
      }
    });
  };
  getCount();

  //点赞
  $likeBtn.on('click', function() {
    if (!flag) {
      $(this).addClass('checked');
      flag = true;
      shareWeibo();
      _common.sendAjax(addUrl, {}, 'jsonp', function(data) {
        if (data && data.code === 0) {
          $total.text(data.data.count);
        } else {
          return false;
        }
      });
    } else {
      $showBox.modal('show');
      return false;
    }
    return false;
  });
}

$(document).ready(function() {
  lazyload();
  miNoteEvent();
});