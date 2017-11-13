/**
 * 
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var apiMitvVip = '/controller/hd_v07/api_mitvVip_product.json';
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
var loadlazy = function() {
    var $visibleWtcher = $('#J_visibleWatcher');
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
};

//导航跳转
var navEvent = function() {
    var target = '';
    //导航跳转
    var $nav = $('#js-NavBtn').find('a');
    $nav.on('click', function() {
        target = $(this).attr('data-target');
        if (target && $(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 500);
        }
        return false;
    });
};

//添加阴影效果
var addShadow = function() {
    var array = ['mitv', 'hezi', 'yinxiang'];
    for (var i = 0; i < array.length; i++) {
        $('#' + array[i]).find('li').hover(function() {
            $(this).addClass('brick-item-active').siblings().removeClass('brick-item-active');
        }, function() {
            $(this).removeClass('brick-item-active');
        });
    }
};

function mitvActivity() {
    //了解产品按钮时间
    var startTime = parseInt(Date.parse(new Date('2017/11/11 00:00:00')) / 1000);
    var endTime = parseInt(Date.parse(new Date('2017/12/12 00:00:00')) / 1000);
    var overTime = parseInt(Date.parse(new Date('2017/12/30 00:00:00')) / 1000);

    var config = {
        '2160800023': 'mitv43',
        '2160800024': 'mitv48',
        '2160800025': 'mitv65'
    };

    //活动进行中
    var hdStart = function() {
        var url = '//item.mi.com.static/buymitv';

        $(elem).attr({
            'href': url,
            'target': '_blank'
        }).find('span').text('立即购买');
        addShadow();
    };

    //商品售罄
    var hdSaled = function() {
        $(elem).addClass('btn-gray').find('span').text('已售罄');
    };

    //了解产品
    var getGoodUrl = function() {
        var $mitvbuyBtn = $('.J_buyBtn');
        $mitvbuyBtn.each(function() {
            var _self = $(this);
            var url = _self.attr('data-url');
            _self.attr({
                href: url,
                target: '_blank'
            }).find('span').text('了解产品');
        });

        $('.start').css({
            'display': 'block',
            'color': '#ff6700'
        });
        addShadow();
    };

    //活动结束
    var hdOver = function() {
        var $mitvbuyBtn = $('.J_buyBtn');
        $.each($mitvbuyBtn, function() {
            var url = $(this).attr('data-url');

            $(this).attr('href', 'javascript:void(0);').addClass('btn-gray').find('span').text('活动已结束');
            $(this).siblings('.start').html('<a href="' + url + '">了解产品 &gt;</a>').css('display', 'block');
        });
        addShadow();
    };

    //读取库存  立即购买
    var buyGoods = function() {
        var $mitvbuyBtn = $('.J_buyBtn');
        _common.sendAjax('', {}, 'jsonp', function(data) {
            if (data && data.code === 0) {
                var value = data.data;
                $.each(value, function(k, v) {
                    for (var i in v) {
                        $.each($mitvbuyBtn, function() {
                            if (mark === config[k]) {
                                if (v[i] === false) {
                                    //true为有货
                                    hdSaled($(this));
                                } else {
                                    hdStart($(this));
                                }
                            } else {
                                hdStart($(this));
                            }
                        });
                    }
                });
            } else {
                hdStart($(this));
            }
        });
        addShadow();
    };

    var checkBtn = function(newTime) {
        if (newTime > startTime && newTime < endTime) {
            getGoodUrl();
        } else if (newTime > endTime && newTime < overTime) {
            buyGoods();
        } else if (newTime > overTime) {
            hdOver();
        } else {
            getGoodUrl();
        }
    };

    var init = function() {
        //请求服务器时间
        _common.sendAjax('//tptm.hd.mi.com/gettimestamp', {}, 'script', function(servertime) {
            if (servertime === undefined || typeof(servertime) !== 'number') {
                servertime = Date.parse(new Date()) / 1000;
            }
            checkBtn(servertime);
        });
    };

    init();
}

window.vm = new Vue({
    el: '#J_visibleWatcher',
    data: {
        headerTitle: '小米电视会员免费送',
        headerDesc: '4月30日-5月2日 买电视 送小米电视会员季卡＋爱奇艺VIP会员 (3个月)',
        mitvVipTitle: '一个会员，双重特权',
        mitvVipDesc: '成为小米电视会员，将同时享受小米电视会员及爱奇艺VIP的全部特权。',
        mitvTitle: '买电视送会员，好剧大片免费看',
        mitvDesc: '4月30日-5月2日 全系尺寸，买即赠小米电视会员季卡+爱奇艺VIP会员（3个月）。',
        mitvPartsLogo: '/public/img/hd_v07/mitv-big-logo.png',
        mitvPartsHeader: '/public/img/hd_v07/mitv-small-logo.png',
        heziTitle: '送家人朋友一款追剧神器',
        yinxiangTitle: '给你的大片一点好声音',
        mitv_70_65_60_55: [],
        mitv_48_43: [],
        hezi: [],
        heizParts: [],
        yinxiang: [],
    }
});

_common.sendAjax(apiMitvVip, {}, 'json', function(response) {
    if (response.code === 'result') {
        var res = response.data;
        window.vm.mitv_70_65_60_55 = res.mitv_70_65_60_55;
        window.vm.mitv_48_43 = res.mitv_48_43;
        window.vm.hezi = res.hezi;
        window.vm.heizParts = res.heizParts;
        window.vm.yinxiang = res.yinxiang;
        loadlazy();
        navEvent();
        mitvActivity();
    } else {
        return false;
    }
});