/**
 * @authors chenfuxin (since1991_vip@163.com)
 * @date    2017-01-10 13:40:47
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var apiMijia = '/controller/hd_v11/api_mijia_product.json';
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

window.vm = new Vue({
    el: '#mijia',
    data: {
        wrap1H1: '品牌日优惠券疯狂送，0点、10点、12点、14点、18点、20点 开抢！',
        wrap3Title: '健康舒适的环境',
        wrap3Desc: '从雾霾天回家，应该呼吸清新湿润的空气',
        wrap3H3: '自由呼吸的全自动解决方案',
        wrap3H3Desc: '客厅的霾表可以随时监测空气质量并自动控制净化器的开关和运转模式，加湿器也能根据环境自动调整加湿方案。一回家就能呼吸到仿佛置身森林般的新鲜空气，湿润而又洁净。',
        wrap4Title: '享受慵懒的时光',
        wrap4Desc: '其实很多生活琐事都不需亲自动手的',
        wrap4SubTit: '居家生活更轻松的小秘诀',
        wrap4SubDesc: '喜欢在一个阳光午后蜷在沙发，端起恒温水壶泡茶慢品。我对小白说：“开始扫地！”它便帮我唤醒扫地机器人，将每一块地板打扫干净。这时的我俨然成为了家里的“国王”。',
        wrap4TitleH3: '懒人必看：沙发生存指南',
        wrap4TitleDesc: '闲暇的周末，你和她躺在沙发上，晒着冬日的阳光。米家扫地机器人早已将家里打扫干净，恒温水壶中保持着冲泡绿茶最合适的温度，厨房的阵阵香气飘进客厅…懒，或许就是最理想的幸福。',
        wrap5Title: '体会陪伴的温馨',
        wrap5SubTit: '给全家人带来快乐的好物',
        wrap5SubDesc: '抱起孩子听首故事，一起组装积木机器人享受挑战双手的乐趣；或者陪另一伴拿起VR眼镜，体验震撼的全景视频；哪怕只是抱着抱枕和家人坐在一起傻笑，这就是我想要的温馨和幸福。',
        wrap5Desc: '不只是“客”厅，更是陪伴家人的地方',
        wrap5TitleH3: '499元 把客厅打造成亲子乐园',
        wrap5TitleDesc: '家里的宝宝起床后就会扎进玩具堆里，他们喜欢彩色的图画、喜欢毛茸茸的娃娃、喜欢跟着音乐一起唱。但宝宝最喜欢的，是有你的陪伴。把客厅变成专属的亲子乐园，只需要你的用心和这些…… ',
        wrap6Title: '震撼的智能影院',
        wrap6Desc: '随时看一场震撼大片，或是听一场音乐会',
        wrap6SubTit: '在家也能享受视听盛',
        wrap6SubDesc: '休闲娱乐的时刻，无论是观影还是听音乐，都可以通过手机操作：打开电视，自动推荐内容并寻找片源，感官效果堪比亲临影院；智能音响也可以自动连网，播放爱听的音乐或电台。',
        wrap6TitleH3: '老电视做不到的五件事儿',
        wrap6TitleDesc: '家里的那台老电视陪伴我们度过了许多美好时光，但随着年岁渐长，它越来越不能满足我们的观影需要。细数老电视做不到的5件事儿，让一台理想的新电视给客厅换新装，也让新电视开启我们的新世界！',
        wrap7Ttile: '米家精选，享受高品质生活',
        wrap7Dese: '打造居家美学，做美好生活的设计师',
        wrap8Ttile: '小米明星单品',
        wrap8Dese: '体验智能的乐趣，享受科技生活',
        wrap3_nav: [],
        wrap4_nav: [],
        wrap5_nav: [],
        wrap7_nav1: [],
        wrap7_nav2: [],
        wrap7_nav3: [],
        wrap8_nav1: [],
        wrap8_nav2: [],
        wrap8_nav3: [],
        wrap10_nav: [],
    }
});

_common.sendAjax(apiMijia, {}, 'json', function(response) {
    if (response.code === 'result') {
        var res = response.data;
        window.vm.wrap3_nav = res.wrap3_nav;
        window.vm.wrap4_nav = res.wrap4_nav;
        window.vm.wrap5_nav = res.wrap5_nav;
        window.vm.wrap7_nav1 = res.wrap7_nav1;
        window.vm.wrap7_nav2 = res.wrap7_nav2;
        window.vm.wrap7_nav3 = res.wrap7_nav3;
        window.vm.wrap8_nav1 = res.wrap8_nav1;
        window.vm.wrap8_nav2 = res.wrap8_nav2;
        window.vm.wrap8_nav3 = res.wrap8_nav3;
        window.vm.wrap10_nav = res.wrap10_nav;
    } else {
        return false;
    }
});

var mjBrandDays = {

    /* 懒加载 */
    lazyload: function() {
        var $visibleWatcher = $('.mijia-home');
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

        /* 自动播放视频加载 */
        var checkVideoPlayType = function() {
            //检测浏览器是否能播放不同类型的视频
            return !!document.createElement("video").canPlayType;
        }();
        var $videoPlay = $('.J_videoSec');

        $videoPlay.visibleWatcher({
            onVisible: function($elm, index) {
                var videoLen = $videoPlay.find('.video').filter(function() {
                    return $(this).data('autoplay');
                });
                checkVideoPlayType && videoLen.length && videoLen.each(function(e) {
                    var _this = videoLen.eq(e);
                    _this.data('preload') || (_this.data('preload', !0), _this[0].volume = 0, _this[0].play());
                });
            }
        });
    },

    /* 弹窗 */
    modalInfor: function() {
        var $modalRule = $('#J_rule');
        var $modalruleBtn = $('.J_rule');

        $modalruleBtn.on('click', function() {
            $modalRule.modal('show');

            return false;
        });

        var $modalMxRule = $('#J_mxRule');
        var $modalMxRuleBtn = $('#J_showMXRule');

        $modalMxRuleBtn.on('click', function() {
            $modalMxRule.modal('show');

            return false;
        });
    },

    /* 参与互动分享 */
    interactionShare: function() {
        var $chatBox = $('.J_chatBox');
        var $item = $chatBox.find('.item');

        $item.hover(function() {
            $(this).find('.chat-icon').addClass('current').parents('.item').siblings().find('.chat-icon').removeClass('current');
        });

        var $msgModal = $('#modal-msg');
        $item.on('click', function() {
            var _index = $(this).attr('data-index');

            $msgModal.modal('show').find('.modal-inner' + _index).removeClass('hide').siblings().addClass('hide');

            return false;
        });

        //分享
        var shareWeibo = function(option) {
            var defaults = {
                title: '小米#米家品牌日#，千万元优惠券疯抢！多款商品 1 分钱加购福袋，100% 得好礼！关注@小米商城 并参与微博互动还有机会获得扫地机器人，这次真的是你升级智能家庭的好机会 → ',
                pic: '../xiaomi_10/img/weibo_share.jpg',
                url: location.href,
                key: ''
            };
            var options = $.extend({}, defaults, option);
            window.open('http://service.weibo.com/share/share.php?title=' + encodeURIComponent(options.title) + '&url=' + encodeURIComponent(options.url) + '&appkey=' + encodeURIComponent(options.key) + '&pic=' + encodeURIComponent(options.pic), '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
        };

        $('.J_share').on('click', function() {
            shareWeibo();

            return false;
        });
    },

    /* 抢卷抢卷 */
    couPonEvent: function() {
        var baseUrl = 'http://a.huodong.mi.com';
        var couponsUrl = baseUrl + '/mijia/prizestatus';
        var activeTimeArr = ['2017/01/12 00:00:00', '2017/01/12 10:00:00', '2017/01/12 12:00:00', '2017/01/12 14:00:00', '2017/01/12 18:00:00', '2017/01/12 20:00:00'];
        var textArr = ['下一轮10点开启', '下一轮12点开启', '下一轮14点开启', '下一轮18点开启', '下一轮20点开启', '券被领完啦！', '活动未开始'];
        var lotteryResultText = { success: '领取成功！', fail: '领取未成功<br/>再试一次！', out: '优惠券已经被领完...', received: '今天已领过该券！' };
        var serverTime = null;
        var drawCode = null;
        var curRound = null;
    },

    init: function() {
        this.lazyload();
        this.modalInfor();
        this.interactionShare();
        this.couPonEvent();
    }
};

$(document).ready(function() {
    mjBrandDays.init();
});