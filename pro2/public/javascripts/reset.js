
			var bstop=true//不通过
			var pass=document.getElementsByClassName('pass')[0]
			var newpass=document.getElementsByClassName('newpass')[0]
			var rul1=document.getElementsByClassName('rul1')[0]
			var rul2=document.getElementsByClassName('rul2')[0]
			var repeatpass=document.getElementsByClassName('repeatpass')[0]
			var bt1=document.getElementsByClassName('bt1')[0]
			var passreg= /^[a-zA-Z]\w{5,17}$/;
//			$('.newpass').on(blur,function(){
//				var password=this.value;
////				if(passreg.test(password)){
////					$('.rul1').css('color','green').html('√');
////					bstop=false;
////				}
////				if(!passreg.test(password)){
////					$('.rul1').css('color','red').html('密码格式错误');
////					bstop=true;
////				}
//			    if(password===oldpassword){
//					$('.rul1').css('color','red').html('新旧密码不能相同');
//					bstop=true;
//				}
//			})
			newpass.onblur=function(){
				var oldpassword=pass.value
				var passwor=this.value;
				if(passwor==''){
					rul1.style.color='red'
					rul1.innerHTML='新密码不能为空'
//					bt1.disabled=true;
				}
				else if(passwor==oldpassword&&oldpassword!=''){
					rul1.style.color='red'
					rul1.innerHTML='新旧密码不能相同'
//					bt1.disabled=true;
				}else if(!passreg.test(passwor)){
					rul1.style.color='red'
					rul1.innerHTML='新密码格式错误'
//					bt1.disabled=true;
				}
				else{
					rul1.style.color='green'
					rul1.innerHTML='√'
//					bt1.enabled=true;
                    
				}
			}
			repeatpass.onblur=function(){
				var repass=this.value
				if(repass==''){
					rul2.style.color='red'
					rul2.innerHTML='重复密码不能为空'
//					bt1.disabled=true;
				}else if(repass!=newpass.value){
					rul2.style.color='red'
					rul2.innerHTML='密码不一致'
//					bt1.disabled=true;
				}else{
					rul2.style.color='green'
					rul2.innerHTML='√'
//					bt1.enabled=true;
                    bt1.removeAttribute('disabled')
				}
			}
			
				/*if(bstop){
					bt1.disabled=true;
				}else{
					bt1.enabled=true;
				}*/
				
		
//			$('.repeatpass').on('blur',function(){
//				var repass=$(this).val();
//				if(repass==''){
//					$('.rul2').css('color','red').html('重复密码不能为空');
//					bstop=true;
//				}else if(repass!=$('.newpass').val()){
//					$('.rul2').css('color','red').html('密码不一致');
//					bstop=true;
//				}else{
//					$('.rul2').css('color','green').html('√');
//					bstop=false;
//				}
//			})
			
//			$('.bt1').on('click',function(){
//				if(bstop){
//					return false;
//				}
//			});
			
			

