/**
 * @authors chenfuxin (since1991_vip@163.com)
 * @date    2017-01-04 08:24:13
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var apiNav = '/controller/hd_v06/api_nav.json';
var apiProduct = '/controller/hd_v06/api_product.json';

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

var lazyload = function() {
    var $visibleWatcher = $('#J_newyear');
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
};

var navEvent = function() {
    var $nav = $('#J_nav');
    var navoffsetTop = $nav.offset().top;
    var windowScrollTop = 0;
    var target = '';

    $(window).on('scroll', function() {
        windowScrollTop = $(this).scrollTop();

        if (windowScrollTop >= navoffsetTop) {
            $nav.addClass('fixed-nav');
        } else {
            $nav.removeClass('fixed-nav');
        }
    });

    $nav.find('.nav-items').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        target = $(this).attr('data-target');
        if (target && $(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - $nav.height()
            }, 500);
        }
        return false;
    });
};

var tabNavEvent = function() {
    //厨上式、厨下式tab切换
    var $tab = $('#J_life').find('.guide-a');
    var $tabContent = $('#J_life').find('.daliyuse-group');

    $tab.on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');

        var _index = $(this).index();
        $tabContent.hide().eq(_index).removeClass('hide').show().siblings().addClass('hide');

        return false;
    });

    //环境、美食、照明、睡眠tab切换
    var $home = $('#J_home');
    var $homeTab = $home.find('.home-guide a');
    var $homeTabContent = $('#J_homeList ul');

    $homeTab.on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');

        var homeIndex = $(this).index();

        $homeTabContent.hide().eq(homeIndex).removeClass('hide').show().siblings().addClass('hide');

        return false;
    });

    //小米电视tab切换
    var $mitv = $home.find('.tv-guide a');
    var $mitvContent = $('#J_tvList').find('.tv-group');

    $mitv.on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');

        var mitvIndex = $(this).index();
        $mitvContent.eq(mitvIndex).addClass('mitv-current').siblings().removeClass('mitv-current');
    });
};

var getCount = function() {
    var checkUrl = '//a.huodong.mi.com/nianhuo/zaobao/count';
    var miphone = 0;
    var five = 0;
    var smog = 0;
    var toy = 0;
    var walker = 0;

    //获取已有的阅读数
    _common.sendAjax(checkUrl, {}, 'jsonp', function(data) {
        if (data && data.code === 0) {
            var res = data.data;
            miphone = res.miphone;
            five = res.five;
            smog = res.smog;
            toy = res.toy;
            walker = res.walker;
            $('#J_miphone').text(miphone);
            $('#J_smog').text(smog);
            $('#J_five').text(five);
            $('#J_walker').text(walker);
            $('#J_toy').text(toy);
        } else {
            return false;
        }
    });
};

window.vm = new Vue({
    el: '#web',
    data: {
        headerDate: '活动时间：12月29日至1月3日',
        headerRule: '专题活动规则',
        headerReturn: '返回小米网',
        headerDesc: '明星商品限时开售，多款新品首卖',
        headerDesc1: '还可领超值优惠券',
        heikejiH1: '新年更有科技感',
        heikejiH2: '明星旗舰，限时开售',
        heikejiDesc: '挑选一份科技好礼，让生活更精彩',
        heikejiH2Phone: '挑选一部手机',
        heikejiH2Phone1: '挑选一台轻盈高性能的笔记本',
        lifeTitle: '新年生活更健康',
        lifeDesc: '用智能家居提升生活品质',
        lifeH2: '呼吸健康空气，抗霾必备',
        homeTitle: '新年居家更舒适',
        homeDesc: '用智能产品开启新的生活方式',
        homeH2: '新年要有好“看”的',
        tripTitle: '新年出行更时尚',
        tripDesc: '炫酷装备助您轻松出行',
        tripDesc1: '每种优惠券每位用户限领两张',
        tripH2: '运动也时尚',
        fashionTitle: '新年酷玩潮范儿足',
        fashionDesc: '挑选一件酷玩具，让生活充满惊喜',
        fashionDesc1: '每种优惠券每位用户限领两张',
        fashionH2: '酷玩新品，限时开售',
        navList: [],
        heikejiList: [],
        f2_kejishoujiList: [],
        f2_mibookList: [],
        jingoshuiqiUpList: [],
        jingoshuiqiDownList: [],
        f2_lifeList: [],
        jujiaHuanjingList: [],
        jujiaMeishiList: [],
        jujiaZhaomingList: [],
        jujiaShuimianList: [],
        jujiahaowuList: [],
        f2_tripList: [],
        chuxingList: [],
        listenList: [],
        kuwanList: [],
    }
});

_common.sendAjax(apiNav, {}, 'json', function(response) {
    if (response.code === 'result') {
        var res = response.data;
        window.vm.navList = res.nav;
        _common.sendAjax(apiProduct, {}, 'json', function(data) {
            if (data.code === 'result') {
                var _data = data.data;
                window.vm.heikejiList = _data.heikeji;
                window.vm.f2_kejishoujiList = _data.f2_kejishouji;
                window.vm.f2_mibookList = _data.f2_mibook;
                window.vm.jingoshuiqiUpList = _data.jingshuiqiUp;
                window.vm.jingoshuiqiDownList = _data.jingshuiqiDown;
                window.vm.f2_lifeList = _data.f2_life;
                window.vm.jujiaHuanjingList = _data.jujiaHuanjing;
                window.vm.jujiaMeishiList = _data.jujiaMeishi;
                window.vm.jujiaZhaomingList = _data.jujiaZhaoming;
                window.vm.jujiaShuimianList = _data.jujiaShuimian;
                window.vm.jujiahaowuList = _data.jujiahaowu;
                window.vm.f2_tripList = _data.f2_trip;
                window.vm.chuxingList = _data.chuxing;
                window.vm.listenList = _data.listen;
                window.vm.kuwanList = _data.kuwan;
                lazyload();
                navEvent();
                tabNavEvent();
                getCount();
            } else {
                return false;
            }
        });
    } else {
        return false;
    }
});