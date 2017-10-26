/**
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-12-06 08:46:35
 */

(function(win) {
  var doc = win.document;
  var html = doc.documentElement;
  var baseWidth = 720,
    grids = baseWidth / 100,
    resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = html.clientWidth || 320;
      if (clientWidth > 720) {
        clientWidth = 720
      };
      html.style.fontSize = clientWidth / grids + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', function() {
    setTimeout(recalc)
  }, false);
})(window);
