/**
 * @author  chenfuxin
 * @date    2016/07/25
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var apiBanner = '/controller/hd_v05/api_product.json';

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

//懒加载
var loazyload = function() {
    var $visibleWatcher = $('.J_olympicVisibleWatcher');
    var $sections = $('.section', $visibleWatcher);

    $sections.visibleWatcher({
        onVisible: function(elm, index) {
            $sections.filter(function(i) {
                return i <= index + 1;
            }).addClass('preload').find('img').each(function() {
                var _src = $(this).attr('data-src');
                $(this).attr('src', _src);
            });
        }
    });
};

function navEvent() {
    var $page = $('.page span');
    var $listPic = $('#J_listPic');

    $page.on('click', function() {
        var index = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $listPic.find('a').eq(index).addClass('current').siblings().removeClass('current');

        return false;
    });
}

//判断时间
var checkTime = function(time) {
    var nowTime = new Date().getTime() / 1000;
    var startTime = new Date('2018/01/01 00:00:00').getTime() / 1000;

    var timeDistance = startTime - nowTime;
    var _day = Math.floor(timeDistance / 86400);

    if (_day > 0) {
        $('.J_day').text(_day);
    }
};

//获取服务器时间
var getServerTime = function() {
    var now = new Date().getTime() / 1000;
    var servertimeUrl = 'http://tptm.hd.mi.com/gettimestamp';

    _common.sendAjax(servertimeUrl, {}, 'script', function(servertime) {
        if (servertime === undefined || typeof(servertime) !== 'number') {
            checkTime(now);
        } else {
            checkTime(servertime);
        }
    });
};

window.vm = new Vue({
    el: '#web',
    data: {
        headerContent: '7月25日至8月20日限时降价，55" / 60" 电视 3299元起',
        bigScreenTitle: '大屏在手看奥运',
        bigScreenDesc: '大屏手机小米Max 现货购买，全金属小米平板2 仅 999 元',
        heziTitle: '有盒子精彩赛事不错过',
        heziDesc: '小米盒子3 直降 50 元，海量内容任你选',
        radioTtile: '激情与呐喊全都听的见',
        radioDesc: '家庭音响套装 899 元，小米圈铁耳机仅 99 元',
        bannerList: [],
        mitvList: [],
        bigScreenList: [],
        heziList: [],
        radioList: [],
    }
});

_common.sendAjax(apiBanner, {}, 'json', function(response) {
    if (response.code === 'result') {
        var res = response.data;
        window.vm.bannerList = res.banner;
        window.vm.mitvList = res.mitv;
        window.vm.bigScreenList = res.bigScreen;
        window.vm.heziList = res.hezi;
        window.vm.radioList = res.radio;
        loazyload();
        navEvent();
        getServerTime();
    } else {
        return false;
    }
});