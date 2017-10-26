/**
 * Title: Mi Visible Watcher
 * Author: Chenfuxin
 * Date: 2016-07-29 14:42:30
 * Description: 检查版块在视窗里的能见度，并执行相应回调。
 */

// 目前只支持 $(window) 的滚动事件，后期增加任意 DOM（如 <div>）的滚动事件支持及横向滚动支持。

(function($) {
  function visibleWatcher(opt) {
    //var isWindow;
    var $sections = $(this);
    var curIndex = -1;
    var sectionPosArr = [];
    var defaults, options;

    function getCurrentSection() {
      var index = -1;
      var pos = $(document).scrollTop();

      for (var i = 0, len = sectionPosArr.length; i < len; i += 1) {
        if (pos + options.viewport.height() > sectionPosArr[i]) {
          index += 1;
        } else {
          break;
        }
      }

      return index;
    }

    function refresh() {
      var viewIndex = getCurrentSection();

      if (curIndex !== viewIndex) {
        curIndex = viewIndex;

        $sections.filter(function(i) {
          return i <= curIndex && !$(this).hasClass(options.visibleClass);
        }).addClass(options.visibleClass).trigger('visible.visibleWatcher');

        options.onVisible($sections.eq(curIndex), curIndex);
      }
    }

    function init() {
      //if (isWindow) { console.log($elm.length); }

      // 为各版块计算位置
      $sections.each(function() {
        var offsetValue = $(this).attr('data-offset') ? Number($(this).attr('data-offset')) : options.offset;
        var visibleOffset = offsetValue % 1 === 0 ? offsetValue : offsetValue * options.viewport.height();

        sectionPosArr.push($(this).offset().top + visibleOffset);
      });

      refresh();
      options.onLoad();
    }

    // 合并选项
    defaults = {
      viewport: $(window), // 视窗位置
      visibleClass: 'is-visible', // 版块可见时增加的 class
      offset: 300, // 默认偏移量，单位是 px，如果传入 0.5 则转化为 50% viewport 高度
      onLoad: $.noop,
      onVisible: $.noop
    };
    options = $.extend({}, defaults, opt);

    // 容器是否是 window
    //isWindow = options.viewport.is($(window)) ? true : false;

    init();
    options.viewport.on({
      'scroll.visibleWatcher': refresh,
      'resize.visibleWatcher': init
    });
  }

  $.fn.visibleWatcher = function(opt) {
    visibleWatcher.call(this, opt);
    return this;
  };
})(jQuery);
