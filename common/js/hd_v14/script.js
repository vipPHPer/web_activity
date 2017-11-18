/**
 * @authors chenfuxin (since1991_vip@163.com)
 * @date    2017-01-25 09:17:42
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var apiClearance = '/controller/hd_v14/api_clearance.json';
var apiFooter = '/controller/hd_v14/api_footer.json';
var _common = {
    sendAjax: function(api, params, dataType, callback) {
        $.ajax({
            url: api,
            data: params,
            dataType: dataType,
            success: callback
        });
    }
};

window.vm = new Vue({
    el: '#web',
    data: {
        clearanceLeftList: [],
        clearanceRightList: [],
        footerService: [{
            name: '正品保障'
        }, {
            name: '七天无理由退货'
        }, {
            name: '好评如潮'
        }, {
            name: '闪电发货'
        }, {
            name: '权威荣誉'
        }],
        footerGuideList: [],
    }
});

_common.sendAjax(apiClearance, {}, 'json', function(response) {
    if (response.result === 'success') {
        var res = response.data;
        window.vm.clearanceLeftList = res.clearLeft;
        window.vm.clearanceRightList = res.clearRight;
    } else {
        return false;
    }
});

_common.sendAjax(apiFooter, {}, 'json', function(response) {
    if (response.result === 'success') {
        var res = response.data;
        window.vm.footerGuideList = res.footerGuide;
    } else {
        return false;
    }
});

var foodMall = {

    /* 懒加载 */
    lazyload: function() {
        var $bd = $('.bd');
        var $sections = $('.section', $bd);

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
    },

    /* 导航 */
    navEvent: function() {
        $('.nav-category-item').hover(function() {
            $('.site-nav-children', this).show();
        }, function() {
            $('.site-nav-children', this).hide();
        });
    },

    /* banner */
    rotationSlider: function() {
        var li = '';
        var len = $('#J_banner a');

        for (var i = 0; i < len.length; i++) {
            if (i === 0) {
                li += "<li class='current'>1</li>";
            } else {
                li += '<li>' + (i + 1) + '</li>';
            }
        }
        $('#J_page').html(li);

        var itemIndex = 0;
        var _time = '';
        var $page = $('#J_page li');
        var change = function() {
            len.removeClass('current').eq(itemIndex).addClass('current');
            $page.removeClass('current').eq(itemIndex).addClass('current');
        };

        var timer = function() {
            _time = setInterval(function() {
                itemIndex++;

                if (itemIndex >= 4) {
                    itemIndex = 0;
                }
                change();
            }, 3000);
        };
        timer();

        $page.hover(function() {
            clearInterval(_time);
        }, function() {
            timer();
        });

        $page.on('click', function() {
            itemIndex = $(this).index();
            change();

            return false;
        });

        $('#J_banner').hover(function() {
            clearInterval(_time);
        }, function() {
            timer();
        });
    },

    /* 导航切换 */
    navigatorSwitch: function() {
        var array = ['J_freshFood', 'J_importfood', 'J_domesticfood', 'J_drinks', 'J_nutrition'];

        for (var i = 0; i < array.length; i++) {
            $('#' + array[i]).find('.tab-list li').hover(function() {
                $(this).addClass('tab-active').siblings().removeClass('tab-active');
                var _index = $(this).index();

                $(this).parents('.container').find('.rowBox').hide().eq(_index).show().siblings().hide();
            });
        }
    },

    init: function() {
        this.lazyload();
        this.navEvent();
        this.rotationSlider();
        this.navigatorSwitch();
    }
};

$(document).ready(function() {
    foodMall.init();
});