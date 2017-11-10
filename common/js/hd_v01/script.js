/**
 * 
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-11-01 09:14:36
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var apiBanner = '/controller/hd_v01/api_banner.json';
var apiPhone = '/controller/hd_v01/api_phone.json';
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

/* 懒加载 */
function loadlazy() {
    var $bd = $('.bd');
    var $sections = $('.section', $bd);
    $sections.visibleWatcher({
        onVisible: function($ele, index) {
            $sections.filter(function(i) {
                return i <= index + 1;
            }).addClass('preload').find('img').each(function() {
                var _src = $(this).attr('data-src');
                $(this).attr('src', _src);
            });
        }
    });
}

/* 导航吸顶、跳转 */
function navEvent() {
    var $nav = $('#J_nav');
    var navoffsetTop = $nav.offset().top;
    var windowScrollTop = 0;
    var target = '';

    $(window).on('scroll', function() {
        windowScrollTop = $(this).scrollTop();

        if (windowScrollTop >= navoffsetTop) {
            $nav.addClass('nav-fixed');
        } else {
            $nav.removeClass('nav-fixed');
        }
    });

    $nav.find('li').on('click', function() {
        target = $(this).attr('data-target');
        if (target && $(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - $nav.height()
            }, 500);
        }
        return false;
    });
}

/* banner 图片轮换 */
function tabSwitch() {
    var $tabActive = $('.tab-active');
    var $tabImg = $('.tab-content').find('a');
    var tabCon = $tabActive.find('.items');
    // var imageNum = $tabImg.size();
    var itemIndex = 0;
    var _time = '';
    var change = function() {
        tabCon.removeClass('active').eq(itemIndex).addClass('active');
        $tabImg.removeClass('active').eq(itemIndex).addClass('active');
    };

    var timer = function() {
        _time = setInterval(function() {
            itemIndex++;
            if (itemIndex === 10) {
                itemIndex = 0;
            }
            change();
        }, 3000);
    };
    timer();

    tabCon.hover(function() {
        clearInterval(_time);
    }, function() {
        timer();
    });

    tabCon.on('click', function() {
        itemIndex = $(this).index();
        change();

        return false;
    });
}

//弹窗
function modalInfor() {
    var $modalrule = $('.rule');
    var $modalbuchang = $('.buchang');
    var $rule = $('#J_modalRule');
    var $buchang = $('#J_modalBuchang');

    //规则详情
    $modalrule.on('click', function(e) {
        e.preventDefault();
        $rule.modal('show');
    });

    //十天购机补偿
    $modalbuchang.on('click', function(e) {
        e.preventDefault();
        $buchang.modal('show');
    });
}

window.vm = new Vue({
    el: '#web',
    data: {
        headerTitle: '',
        headerDesc: '10大惊喜不间断放送，红米Note 3 全网通直降100',
        headerDesc1: '手机天天现货，小米Max 高配版等 6 大新品首发，还有 3 大专属福利',
        surpriseTitle: '10大惊喜不间断',
        surpriseDesc: '小米5 现货购买、小米Max 高配版首卖、红米Note 3 全网通直降100',
        surpriseDesc1: '还有更多惊喜不间断，狂欢20天',
        phoneTitle: '明星手机天天现货',
        phoneDesc: '小米5 标准版 / 高配版现货购买，小米Max 每天早 10 点现货，全系红米手机天天有',
        newProductTitle: '首发新品抢先拥有',
        newProductDesc: '米家 LED 智能台灯、小米手环2 等重量级新品将陆续发布',
        mitvTitle: '小米电视3 最高降300',
        mitvDesc: '全系电视买就送 3 个月小米电视 + 爱奇艺 VIP 会员(价值 88 元），电视/盒子有特惠、领券省更多',
        smartTitle: '智能硬件 最多省50',
        smartDesc: '买小米净水器，抽奖赢滤芯，空气净化器2 直降50，还有多款爆品特惠',
        accessTitle: '配件特惠 全场8折起',
        accessDesc: '蓝牙音箱、移动电源、旅行箱等配件特惠，还有多款商品包邮',
        welfareTitle: '3大专属福利',
        welfareDesc: '618 活动期间，小米商城准备了 3 大专属福利',
        welfareDesc1: '抽奖赢幸运大礼包、新机红包、晒单赢好礼，抢先拥有小米5 尊享版、小米手环2',
        bannerTitle: [],
        bannerList: [],
        navList: [],
        phoneList: [],
        newProductList: [],
        mitvList: [],
        smartList: [],
        accessoriesList: []
    }
});

//ajax请求
_common.sendAjax(apiBanner, {}, 'json', function(response) {
    if (response.code === 'result') {
        window.slotData = response.data;
        window.vm.navList = window.slotData.nav;
        window.vm.bannerTitle = window.slotData.bannerTitle;
        window.vm.bannerList = window.slotData.banner;
        _common.sendAjax(apiPhone, {}, 'json', function(res) {
            if (res.code === 'result') {
                window.slotProductData = res.data;
                window.vm.phoneList = window.slotProductData.phone;
                window.vm.newProductList = window.slotProductData.newProduct;
                window.vm.mitvList = window.slotProductData.mitv;
                window.vm.smartList = window.slotProductData.smart;
                window.vm.accessoriesList = window.slotProductData.accessories;
                modalInfor();
                navEvent();
                tabSwitch();
                loadlazy();
            } else {
                return false;
            }
        });
    } else {
        return false;
    }
});

/* 获取服务器时间显示抽奖按钮 */
var getServerTime = function() {
    var hdStartTime = parseInt(Date.parse(new Date('2017/10/8 00:00:00')) / 1000);
    var hdEndTime = parseInt(Date.parse(new Date('2017/12/10 00:00:00')) / 1000);
    var apiTimestamp = 'http://tptm.hd.mi.com/gettimestamp';
    var changeBtn = function(nowTime) {
        if (nowTime >= hdStartTime && nowTime < hdEndTime) {
            $('.J_btn618').each(function() {
                $(this).text($(this).attr('data-start-text')).removeClass('btn-disable');
            });
        } else if (nowTime >= hdEndTime) {
            $('.J_btn618').each(function() {
                $(this).addClass('btn-disable').text('活动已结束');
            });
        }
    };

    _common.sendAjax(apiTimestamp, {}, 'script', function(servertime) {
        if (servertime === undefined && typeof(servertime) !== 'number') {
            servertime = Date.parse(new Date()) / 1000;
        }
        changeBtn(servertime);
    });
};
getServerTime();

/* 618活动 */
function luckDraw618() {
    var uscore = 0;
    var $btn = $('#J_draw618');
    var $total = $('#J_uscoreTotal');
    var $modalDrawResult = $('#J_modalDrawResult');

    var drawUrl = '/controller/hd_v01/api_draw.json';
    var prizeUrl = '/controller/hd_v01/api_prize.json';
    var loginUrl = '';
    //登录
    var goLogin = function() {
        var $loginUrl = loginUrl;
        location.href = $loginUrl + location.href;
    };

    //获取剩余抽奖次数
    var updateTotalNum = function() {
        if (uscore > 0) {
            $total.text(uscore).parent().show();
        }

        if (uscore <= 0) {
            $btn.addClass('btn-disable');
        }
    };

    //抽奖次数
    _common.sendAjax(drawUrl, {}, 'json', function(data) {
        if (data && data.code === 'result') {
            var _drawData = data.data;
            uscore = _drawData.uscore;
            updateTotalNum();
        } else {
            goLogin();
        }
    });
    //显示抽奖结果
    var showResult = function(status, luckyInfo) {
        // 1: 未中奖
        // 2: 积分没了
        // 3: 中奖了
        // luckyInfo  中奖信息
        if (!status) return;

        var statusClass = '';
        if (status === 1) {
            statusClass = 'modal-draw-faild';
        } else if (status === 2) {
            statusClass = 'modal-draw-noscore';
        } else if (status === 3) {
            statusClass = 'modal-draw-lucky';
            $('#J_drawPrizeName').html(luckyInfo.prizeName);
        }

        $modalDrawResult.removeClass('modal-draw-faild modal-draw-lucky modal-draw-noscore').addClass(statusClass).modal('show');
    };

    //抽奖
    $btn.on('click', function() {
        if (uscore < 1) {
            //积分没了
            showResult(2);
            return false;
        } else {
            _common.sendAjax(drawUrl, {}, 'json', function(data) {
                if (data && data.code === 'result') {
                    var _drawData = data.data;
                    showResult(3, _drawData.userPrizeInfo);
                } else {
                    showResult(1);
                }
                uscore = _drawData.uscore;
                updateTotalNum();
            });
        }
    });
    //我的奖品
    $('#J_showPrize').on('click', function() {
        $.ajax({
            url: prizeUrl,
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function(data) {
                if (data && data.code === 0) {
                    //中奖
                    showResult(3, data.data[0]);
                } else {
                    showResult(1);
                }
            }
        });
        return false;
    });
}
luckDraw618();

//分享微博
function shareWeibo(option) {
    var defaults = {
        title: '',
        pic: '',
        url: '',
        key: ''
    };
    var options = $.extend({}, defaults, option);
    window.open('http://service.weibo.com/share/share.php?title=' + encodeURIComponent(options.title) + '&url=' + encodeURIComponent(options.url) + '&appkey=' + encodeURIComponent(options.key) + '&pic=' + encodeURIComponent(options.pic), '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
}

$('#J_sharePrize').on('click', function() {
    shareWeibo({
        title: '太幸运啦，我在@小米商城 狂欢20天活动抽中幸运大礼包，还能抢先拥有小米5 尊享版！这么好的福利我通常不告诉别人的，去瞧瞧 →',
        pic: '',
        href: location.href
    });

    return false;
});