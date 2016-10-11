$(function(){
	$('#doPost').click(function(){
		var username=$.trim($('#username').val());
		var password=$.trim($('#password').val());
		$('.error').remove();
		if(username.length==0){
            alert('用户名不能为空!!!');
           
            return;
		}else if(password.length==0){
			 alert('密码不能为空!!!');
            return;
		}
		$.ajax({
		  type: "POST",
		  url: "/doRegist",
		  dataType:'json',
          data: {'username':username,'password':password},
		  success: function(result){
		  	//alert(result);
		      switch(result){
		      	 case -3:alert('系统错误！！');break;
		      	 case -1: $('#username').parent().addClass('am-form-error').find('label').after('<span class="error">用户名已存在！！</span>');break;
		      	 case  1:window.location.href='/';break;

		      }
		  }
        });  
	})
    $('#doLogin').click(function(){
		var username=$.trim($('#username').val());
		var password=$.trim($('#password').val());
		$('.error').remove();
		$('#username').parent().removeClass('am-form-error');
		$('#password').parent().removeClass('am-form-error');
		if(username.length==0){
            alert('用户名不能为空!!!');
           
            return;
		}else if(password.length==0){
			 alert('密码不能为空!!!');
            return;
		}
		$.ajax({
		  type: "POST",
		  url: "/doLogin",
		  dataType:'json',
          data: {'username':username,'password':password},
		  success: function(result){
		  	//alert(result);
		      switch(result){
		      	 case -3:alert('系统错误！！');break;
		      	 case -2: $('#username').parent().addClass('am-form-error').find('label').after('<span class="error">用户名不存在！！</span>');break;
		      	 case  -1:$('#password').parent().addClass('am-form-error').find('label').after('<span class="error">密码错误！！</span>');break;
		      	 case  1:window.location.href='/';break;

		      }
		  }
        });  
	})       

});
