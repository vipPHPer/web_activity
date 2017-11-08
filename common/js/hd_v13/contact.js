/**
 * @authors chenfuxin (chenfuxin@99cj.com.cn)
 * @date    2016-12-23 14:09:40
 */

//=require ../../../static/js/_modules/doT.js
//=require ../../../static/js/_modules/transition.js
//=require ../../../static/js/_modules/modal.js
//=require ../../../static/js/_modules/miVisibleWatcher.js


var contactUs = {

  // 验证中文名称
  isChinaName: function() {
    var checkname = /^[\u4E00-\u9FA5]{1,6}$/;
    var username = $('#js-username');

    username.blur(function() {
      var _this = $(this);
      if (_this.val() === '') {
        _this.css({
          'border-color': 'red'
        });
      } else if (!checkname.test(_this.val())) {
        _this.css({
          'border-color': 'red'
        });
      } else {
        _this.css({
          'border-color': '#dadada'
        });
      }
    });
  },

  // 验证手机号码
  checkphone: function() {
    var checkPhone = /^1[34578]\d{9}$/;
    var phone = $('#js-phone');

    phone.blur(function() {
      var _this = $(this);
      if (_this.val() === '') {
        _this.css('border-color', 'red');
      } else if (!checkPhone.test(_this.val())) {
        _this.css('border-color', 'red');
      } else {
        _this.css('border-color', '#dadada');
      }
    });
  },

  // 验证邮箱地址
  checkEmail: function() {
    var checkRegEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var email = $('#js-email');

    email.blur(function() {
      var _this = $(this);
      if (_this.val() === '') {
        _this.css('border-color', 'red');
      } else if (!checkRegEmail.test(_this.val())) {
        _this.css('border-color', 'red');
      } else {
        _this.css('border-color', '#dadada');
      }
    });
  },

  // 提交
  applyInfor: function() {
    var username = $('#js-username').val();
    var email = $('#js-email').val();
    var phone = $('#js-phone').val();

    var resultObj = {
      username: username,
      email: email,
      phone: phone
    };

    $('#js-btn').on('click', function() {
      var result = resultObj;
      console.log(result);
      if (result) {
        // console.log(result);
      }
      return false;
    });
  },

  init: function() {
    this.isChinaName();
    this.checkphone();
    this.checkEmail();
    this.applyInfor();
  }
};

$(document).ready(function() {
  contactUs.init();
});