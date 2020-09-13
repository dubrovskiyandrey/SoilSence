init();

function login(){
	showDialog({
				header : 'Авторизация в системе',
				message : '<table style="padding:5px 80px 0px 80px;width:100%">'+
						  '<tr>'+
						  '<td>Авторизуйтесь для входа в систему'+
						  '</table>'+
 				          '<table style="padding:0px 10px 10px 10px;width:100%">'+
						  '<tr>'+
						  '<td><div class="group"><input type="text" id="userlogin" required value=""><span class="bar"></span><label>Имя пользователя</label></div>'+
						  '</tr>'+
						  '<tr>'+
						  '<td><div class="group"><input type="password" id="userpwd" required value=""><span class="bar"></span><label>Пароль</label></div>'+
						  '</tr>'+
						  '</table>'+
						  '',
				buttons : ['Вход', 'Регистрация'],
				bgcantclose : 1,
				//buttons : ['Ok'],
				colors : ['#F00'],
				bgcolor : ['rgba(0,0,0,0)'],				
				callback : function(res){
					console.log(res);
					if(res==0){
//						login();

						if(menutoglestate==1) return 0;
						menuback.style['display'] = 'block';
						clearTimeout(menutimer);
						menutimer = setTimeout(function(){
							menuback.style.opacity = 0.2;
						}, 100);
						menu.style.left = '0px';

						if(menutoglestate==0){
							menuback.style.opacity = 0;
							menutimer = setTimeout(function(){
								menuback.style['display'] = 'none';
							}, 500);
							header.style.left = '300px';
							frmdata.style.left = '300px';
							footer.style.left = '300px';
							menutoglestate=3;
							menutogle_icon.innerHTML = "fullscreen_exit";
							menu.style['box-shadow'] = '0px 0px 3px 0px rgba(0,0,0,1)';
							window_resize();
						}
						if(menutoglestate==1){
							menuback.style['display'] = 'block';
							clearTimeout(menutimer);
							setTimeout(function(){
								menuback.style.opacity = 0.2;
							}, 1);
							header.style.left = '0px';
							frmdata.style.left = '0px';
							footer.style.left = '0px';
							menutoglestate=2;
							menutogle_icon.innerHTML = "fullscreen"
							menu.style['box-shadow'] = '';
							window_resize();
						}
						menutoglestate=menutoglestate-2;

                        LoadScript("./app/frm.map.js");
						splash.style.opacity = 0;	
						setTimeout(function(){
							splash.style['display'] = 'none';
						}, 1000); 
					}
					if(res==1){
						register();
					}					
				}
				})
}

function register(){
	showDialog({
				header : 'Регистрация в системе',
				message : '<table style="padding:5px 40px 0px 40px;width:100%">'+
						  '<tr>'+
						  '<td>Для регистрации в системе заполните следующие данные'+
						  '</table>'+
 				          '<table style="padding:0px 10px 10px 10px;width:100%">'+
						  '<tr>'+
						  '<td><div class="group"><input type="text" id="userlogin" required value=""><span class="bar"></span><label>Имя пользователя</label></div>'+
						  '</tr>'+
						  '<tr>'+
						  '<td><div class="group"><input type="password" id="userpwd" required value=""><span class="bar"></span><label>Пароль</label></div>'+
						  '</tr>'+
						  '<tr>'+
						  '<td><div class="group"><input type="password" id="userpwd" required value=""><span class="bar"></span><label>Повтор пароля</label></div>'+
						  '</tr>'+
						  '</table>'+
						  '',
				buttons : ['Регистрация', 'Отмена'],
				bgcantclose : 1,
				//buttons : ['Ok'],
				colors : ['#F00'],
				bgcolor : ['rgba(0,0,0,0)'],				
				callback : function(res){
					console.log(res);
					if(res==0){
						register_success();
					}
					if(res==1){
						login();
					}					
				}
				})
}

function register_success(){
	showDialog({
				header : 'Регистрация в системе',
				message : '<table style="padding:5px 40px 0px 40px;width:100%">'+
						  '<tr>'+
						  '<td>Для регистрации в системе ПРОИЗВЕДЕНА УСПЕШНО'+
						  '</table>'+
						  '',
				buttons : ['Ok'],
				bgcantclose : 1,
				//buttons : ['Ok'],
				colors : ['#F00'],
				bgcolor : ['rgba(0,0,0,0)'],				
				callback : function(res){
					if(res==0){
						login();
					}
				}
				})
	
}


function init(el){
	//console.log(Params);

    headertext.innerHTML = '';
    frmdata.innerHTML = '';
	footer.innerHTML = '';
///*
	var btn;
	
	btn = CreateHeaderBtn('menubtn1', 'network_wifi');
	btn.addEventListener('click', materializeEffect);
//	btn.addEventListener('click', hTooltip);
	btn.setAttribute('caption', 'Это Wifi');
	btn.onmouseover = sTooltip;
	btn.onmouseout = hTooltip;
	
	btn = CreateHeaderBtn('menubtn2', 'gps_fixed');
	btn.addEventListener('click', materializeEffect);
//	btn.addEventListener('click', hTooltip);
	btn.setAttribute('caption', 'Это включить GPS');
	btn.onmouseover = sTooltip;
	btn.onmouseout = hTooltip;

	btn = CreateHeaderBtn('menubtn3', 'now_widgets');
	btn.addEventListener('click', materializeEffect);
//	btn.addEventListener('click', hTooltip);
	btn.setAttribute('caption', 'Это включить!!!');
	btn.onmouseover = sTooltip;
	btn.onmouseout = hTooltip;
//*/
	
/*
	footer.innerHTML = 
'<table id="footerbar" class="footerbar">'+
'	<tbody>'+
'		<tr>'+
'			<td id="btn1" style="margin: 5px;padding: 0px 15px;">'+
'				<i style="font-size: 29px;vertical-align:middle;" class="material-icons">language</i>'+
'			</td>'+
'			<td id="btn2" style="margin: 5px;padding: 0px 15px;">'+
'				<i style="font-size: 29px;vertical-align:middle;" class="material-icons">sd_storage</i>'+
'			</td>'+
'			<td id="btn3" style="margin: 5px;padding: 0px 15px;">'+
'				<i style="font-size: 29px;vertical-align:middle;" class="material-icons">inbox</i>'+
'			</td>'+
'			<td id="btn4" style="margin: 5px;padding: 0px 15px;">'+
'				<i style="font-size: 29px;vertical-align:middle;" class="material-icons">file_copy</i>'+
'			</td>'+
'		</tr>'+
'	</tbody>'+
'</table>'+
'';
	btn1.addEventListener('click', materializeEffect);
	btn2.addEventListener('click', materializeEffect);
	btn3.addEventListener('click', materializeEffect);
	btn4.addEventListener('click', materializeEffect);

	btn1.addEventListener('click', function(){
		btn1.style['border-bottom'] = '';
		btn2.style['border-bottom'] = '';
		btn3.style['border-bottom'] = '';
		btn4.style['border-bottom'] = '';
		
		btn1.style['border-bottom'] = '3px solid #000';
	});
	btn2.addEventListener('click', function(){
		btn1.style['border-bottom'] = '';
		btn2.style['border-bottom'] = '';
		btn3.style['border-bottom'] = '';
		btn4.style['border-bottom'] = '';
		
		btn2.style['border-bottom'] = '3px solid #000';
	});
	btn3.addEventListener('click', function(){
		btn1.style['border-bottom'] = '';
		btn2.style['border-bottom'] = '';
		btn3.style['border-bottom'] = '';
		btn4.style['border-bottom'] = '';
		
		btn3.style['border-bottom'] = '3px solid #000';
	});
	btn4.addEventListener('click', function(){
		btn1.style['border-bottom'] = '';
		btn2.style['border-bottom'] = '';
		btn3.style['border-bottom'] = '';
		btn4.style['border-bottom'] = '';
		
		btn4.style['border-bottom'] = '3px solid #000';
	});
*/	
	login();
	return 0;
}



function unloadform(){
	ClearHeaderBtn();
	footer.innerHTML = '';
}