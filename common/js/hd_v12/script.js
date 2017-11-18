/**
 * 
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js


var apiChildren = '/controller/hd_v12/api_children_product.json';
var _common = {
    //ajax请求
    sendAjax: function(api, params, dataType, callback) {
        $.ajax({
            url: api,
            data: params,
            dataType: dataType,
            success: callback
        });
    }
};
/* 懒加载 */
function loadlazy() {
    var $visibleWtcher = $('.wrapper');
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
//导航跳转
function navEvent() {
    //导航跳转
    var $nav = $('#J_nav').find('a');
    var target = '';
    $nav.on('click', function() {
        target = $(this).attr('data-target');
        if (target && $(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 90
            }, 500);
        }
        return false;
    });
}

function bannerEvent() {
    //头图轮换
    var index = 0;
    // var winHei = 0;
    var $oPage = $('.page');
    var aPage = $oPage.find('span');
    var _time = '';
    var $oItem = $('.items');

    var change = function() {
        $oItem.removeClass('active').eq(index).addClass('active');
        aPage.removeClass('active').eq(index).addClass('active');

        if (index === 1) {
            $oPage.addClass('dark');
        } else {
            $oPage.removeClass('dark');
        }
    };

    var timer = function() {
        _time = setInterval(function() {
            index++;
            if (index === 2) {
                index = 0;
            }
            change();
        }, 3000);
    };
    timer();

    aPage.hover(function() {
        clearInterval(_time);
    }, function() {
        timer();
    });

    aPage.on('click', function() {
        index = $(this).index();
        change();
        return false;
    });
}

function childrenDay() {
    var winHei = 0;
    //导航吸顶
    var navEventXiding = function() {
        var $scrollTop = $(window).scrollTop();
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > $scrollTop) {
                $('#J_nav').addClass('fixed').removeClass('container').addClass('container');
            } else {
                $('#J_nav').removeClass('fixed').addClass('container').removeClass('container');
            }
        });
    };
    navEventXiding();

    //判断ie678
    var iE678 = function() {
        var ua = navigator.userAgent;
        var flag = false;
        if (ua.indexOf('MSIE') > 0) {
            if (ua.indexOf('MSIE 6.0') > 0 || ua.indexOf('MSIE 7.0') > 0 || ua.indexOf('MSIE 8.0') > 0 && !window.innerWidth) {
                flag = true;
            }
        }
        return flag;
    };

    var setHead = function() {
        if (iE678()) {
            winHei = '1440px';
        } else {
            winHei = $(window).height();
        }

        $('.section-child-header').height(winHei);
    };
    setHead();

    var getHeight = function() {
        $('#J_mouseDown').css({
            'position': 'absolute',
            'bottom': ((75 / 1440) * winHei),
            'left': '50%'
        });

        $('.J_headerBox').css({
            'position': 'absolute',
            'top': ((310 / 1440) * winHei),
            'left': '50%',
            'margin-left': (-514 / 2) + 'px'
        });

        if (iE678()) {
            $('.J_headerBox').css({
                'top': '310px'
            });

            $('#J_mouseDown').css({
                'bottom': '75px'
            });

            return false;
        }

        if (parseInt(winHei) < 930) {
            $('.J_headerBox').css({
                'top': '115px'
            });
        }
    };
    getHeight();

    $(window).resize(function() {
        setHead();
        getHeight();
    });

    var shareContent = [{
        title: '刚刚在小米网参加#小米儿童节专场#，看到了辣条、大白兔、弹珠、悠悠球！亲爱的小伙伴们，再次看到这些属于我们那个时代的零食玩具，真是感慨万分！这个“六一”，找回童年，像小时候一样快乐！分享还可以获得小米5尊享版（3D陶瓷）的优先购买资格噢！',
        'pic': '../img/childhood-weibo1.jpg'
    }, {
        title: '刚刚在小米网参加#小米儿童节专场#，看到了辣条、大白兔、弹珠、悠悠球！亲爱的小伙伴们，再次看到这些属于我们那个时代的零食玩具，真是感慨万分！这个“六一”，找回童年，像小时候一样快乐！分享还可以获得小米5尊享版（3D陶瓷）的优先购买资格噢！',
        pic: '../img/childhood-weibo2.jpg'
    }];

    function share() {
        var random = parseInt(Math.random() * 2);
        var content = shareContent[random];
        var url = 'http://hd.mi.com/y/05241o/index.html';
        title = content.title;
        pic = content.pic,
            ralateUid = '',
            language = 'zh_cn';
        window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&pic=' + encodeURIComponent(pic) + '&ralateUid=' + encodeURIComponent(ralateUid) + '&language=' + encodeURIComponent(language), '_blank', 'width=615,height=505');
    }

    $('.btnShare').on('click', function(e) {
        e.preventDefault();
        share();
    });
}

window.vm = new Vue({
    el: '#web',
    data: {
        childToysList: [],
        child_wrap2: [],
        child_wrap3: [],
        child_wrap4: [],
        childHoodList: [],
        happinessList: [],
    }
});

_common.sendAjax(apiChildren, {}, 'json', function(response) {
    if (response.result === 'success') {
        var res = response.data;
        window.vm.childToysList = res.childToys;
        window.vm.child_wrap2 = res.child_wrap2;
        window.vm.child_wrap3 = res.child_wrap3;
        window.vm.child_wrap4 = res.child_wrap4;
        window.vm.childHoodList = res.childHood;
        window.vm.happinessList = res.happiness;
        loadlazy();
        navEvent();
        bannerEvent();
        childrenDay();
    } else {
        return false;
    }
});