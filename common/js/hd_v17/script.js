/**
 * @authors chenfuxin (since1991_vip@163.com)
 * @date    2017-02-24 08:33:12
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js

var xmNewSeason = {

    /* 懒加载 */
    lazyload: function() {
        var $bd = $('body');
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

    /* doT.js */
    getProductData: function() {
        var apiSeason = '/controller/hd_v17/xmKaiXueSeason.json';
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

        var formaDate = function(data) {
            if (data && data.code === 'result') {
                var data = data.data;
                var xmNewSeasonData = doT.template($('#J_productTemp').html());

                //小米手机
                var xmPhoneData = data.phone;
                var xmPhoneHtml = xmNewSeasonData(xmPhoneData);
                $('#J_xmPhone').html(xmPhoneHtml);

                //校园
                var xiaoyuanData = data.xiaoyuan;
                var xiaoyuanHtml = xmNewSeasonData(xiaoyuanData);
                $('#J_xiaoyuan').html(xiaoyuanHtml);

                //家居
                var jiajuData = data.jiaju;
                var jiajuHtml = xmNewSeasonData(jiajuData);
                $('#J_jiaju').html(jiajuHtml);

                //更多
                var gengduoData = data.gengduo;
                var gengduoHtml = xmNewSeasonData(gengduoData);
                $('#J_gengduo').html(gengduoHtml);
            }
        };

        _common.sendAjax(apiSeason, {}, 'json', function(response) {
            if (response && response.code === 'result') {
                formaDate(response);
            } else {
                return false;
            }
        });
    },


    init: function() {
        this.lazyload();
        this.getProductData();
    }
};

$(document).ready(function() {
    xmNewSeason.init();
});