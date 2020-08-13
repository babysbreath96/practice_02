$(function() {
    // 1 , 登录注册页面切换
    // 1.1 点击去注册
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show()
    });
    // 1.2 点击去登录
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();

    });
    // 2 , 表单验证
    // 从layui 中获取form对象 
    const form = layui.form;

    // 通过form.verify() 函数自定义校验规则
    form.verify({
        // 支持数组，支持函数形式
        // username: function(value, item){ //value：表单的值、item：表单的DOM对象

        // 自定义密码校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function(value) { //value：表单的值 也就是确认密码框的值
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次输入密码不一致"
            }

        }
    });
    const layer = layui.layer;
    // 3 ,监听注册表单提交事件
    $('#form_reg').submit(function(e) {
        // 阻止默认提交
        e.preventDefault();
        // 发起ajax请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        };
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: data,
            success: function(res) {
                // 弹出层组件 内置方法 msg() : 提示信息
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功，请登录！');

                // 模拟点击行为
                $('#link_login').click();
            }
        })
    });

    // 4 , 监听登录表单提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('登录失败');
                layer.msg('登录成功！');

                //将登录成功后得到的token 字符串保存到本地localStorage
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = './index.html';

            }
        })
    });



});