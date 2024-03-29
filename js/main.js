//@prepros-append jq-start.js
//@prepros-append forms.js
//@prepros-append jquery.inputmask.bundle.min.js
//@prepros-append script.js
//@prepros-append jq-end.js    

$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
//FORMS
function forms(){
	//SELECT
	if($('select').length>0){
		function selectscrolloptions(){
				var scs=100;
				var mss=50;
			if(isMobile.any()){
				scs=10;
				mss=1;
			}
			var opt={
				cursorcolor:"#9B4E7C",
				cursorwidth: "12px",
				background: "",
				autohidemode:false,
				bouncescroll:false, 
				cursorborderradius: "10px",
				scrollspeed:scs,
				mousescrollstep:mss,
				directionlockdeadzone:0,
				cursorborder: "0px solid #fff",
			};
			return opt;
		}

		function select(){
			$.each($('select'), function(index, val) {
					var ind=index;
				$(this).hide();
				if($(this).parent('.select-block').length==0){
					$(this).wrap("<div class='select-block "+$(this).attr('class')+"-select-block'></div>");
				}else{
					$(this).parent('.select-block').find('.select').remove();
				}
					let cl='';
					var milti='';
					var check='';
					var sblock=$(this).parent('.select-block');
					var soptions="<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
				if($(this).attr('multiple')=='multiple'){
					milti='multiple';
					check='check';
				}
				$.each($(this).find('option'), function(index, val) {
					if($(this).attr('class')!='' && $(this).attr('class')!=null){
						let cl=$(this).attr('class');
					}
					if($(this).attr('value')!=''){
						if($(this).attr('data-icon')!='' && $(this).attr('data-icon')!=null){
							soptions=soptions+"<div data-value='"+$(this).attr('value')+"' class='select-options__value_"+ind+" select-options__value value_"+$(this).val()+" "+cl+" "+check+"'><div><img src="+$(this).attr('data-icon')+" alt=\"\"></div><div>"+$(this).html()+"</div></div>";
						}else{
							soptions=soptions+"<div data-value='"+$(this).attr('value')+"' class='select-options__value_"+ind+" select-options__value value_"+$(this).val()+" "+cl+" "+check+"'>"+$(this).html()+"</div>";
						}
					}else if($(this).parent().attr('data-label')=='on'){
						if(sblock.find('.select__label').length==0){
							sblock.prepend('<div class="select__label">'+$(this).html()+'</div>');
						}
					}
				});
					soptions=soptions+"</div></div></div>";
				if($(this).attr('data-type')=='search'){
						sblock.append("<div data-type='search' class='select_"+ind+" select"+" "+$(this).attr('class')+"__select "+milti+"'>"+
												"<div class='select-title'>"+
													"<div class='select-title__arrow ion-ios-arrow-down'></div>"+
													"<input data-value='"+$(this).find('option[selected="selected"]').html()+"' class='select-title__value value_"+$(this).find('option[selected="selected"]').val()+"' />"+
												"</div>"+
												soptions+
											"</div>");
						$('.select_'+ind).find('input.select-title__value').jcOnPageFilter({
							parentSectionClass:'select-options_'+ind,
							parentLookupClass:'select-options__value_'+ind,
							childBlockClass:'select-options__value_'+ind
						});
				}else if($(this).attr('data-icon')=='true'){
					sblock.append("<div class='select_"+ind+" select"+" "+$(this).attr('class')+"__select icon "+milti+"'>"+
											"<div class='select-title'>"+
												"<div class='select-title__arrow ion-ios-arrow-down'></div>"+
												"<div class='select-title__value value_"+$(this).find('option[selected="selected"]').val()+"'><div><img src="+$(this).find('option[selected="selected"]').attr('data-icon')+" alt=\"\"></div><div>"+$(this).find('option[selected="selected"]').html()+"</div></div>"+
											"</div>"+
											soptions+
										"</div>");
				}else{
					sblock.append("<div class='select_"+ind+" select"+" "+$(this).attr('class')+"__select "+milti+"'>"+
											"<div class='select-title'>"+
												"<div class='select-title__arrow ion-ios-arrow-down'></div>"+
												"<div class='select-title__value value_"+$(this).find('option[selected="selected"]').val()+"'>"+$(this).find('option[selected="selected"]').html()+"</div>"+
											"</div>"+
											soptions+
										"</div>");
				}
				if($(this).find('option[selected="selected"]').val()!=''){
					sblock.find('.select').addClass('focus');
				}

				if(sblock.find('.select-options__value').length==1){
					sblock.find('.select').addClass('one');
				}

				if($(this).attr('data-req')=='on'){
					$(this).addClass('req');
				}
				$(".select_"+ind+" .select-options-scroll").niceScroll('.select-options-list',selectscrolloptions());
			});
		}
			select();

		$('body').on('keyup','input.select-title__value',function() {
			$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
			$(this).parents('.select').addClass('active');
			$(this).parents('.select').find('.select-options').slideDown(50,function() {
				$(this).find(".select-options-scroll").getNiceScroll().resize();
			});
			$(this).parents('.select-block').find('select').val('');
		});
		$('body').on('click','.select',function(){
			if(!$(this).hasClass('disabled') && !$(this).hasClass('one')){
				$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
				$(this).toggleClass('active');
				$(this).find('.select-options').slideToggle(50,function() {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});

				//	var input=$(this).parent().find('select');
				//removeError(input);

				if($(this).attr('data-type')=='search'){
					if(!$(this).hasClass('active')){
						searchselectreset();
					}
					$(this).find('.select-options__value').show();
				}


				var cl=$.trim($(this).find('.select-title__value').attr('class').replace('select-title__value',''));
					$(this).find('.select-options__value').show().removeClass('hide').removeClass('last');
				if(cl!=''){
					$(this).find('.select-options__value.'+cl).hide().addClass('hide');
				}
				if($(this).find('.select-options__value').last().hasClass('hide')){
					$(this).find('.select-options__value').last().prev().addClass('last');
				}
			}
		});
		$('body').on('click','.select-options__value',function() {
			if($(this).parents('.select').hasClass('multiple')){
				if($(this).hasClass('active')){
					if($(this).parents('.select').find('.select-title__value span').length>0){
						$(this).parents('.select').find('.select-title__value').append('<span data-value="'+$(this).data('value')+'">, '+$(this).html()+'</span>');
					}else{
						$(this).parents('.select').find('.select-title__value').data('label',$(this).parents('.select').find('.select-title__value').html());
						$(this).parents('.select').find('.select-title__value').html('<span data-value="'+$(this).data('value')+'">'+$(this).html()+'</span>');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index()+1).prop('selected', true);
					$(this).parents('.select').addClass('focus');
				}else{
					$(this).parents('.select').find('.select-title__value').find('span[data-value="'+$(this).data('value')+'"]').remove();
					if($(this).parents('.select').find('.select-title__value span').length==0){
						$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
						$(this).parents('.select').removeClass('focus');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index()+1).prop('selected', false);
				}
				return false;
			}


			if($(this).parents('.select').attr('data-type')=='search'){
				$(this).parents('.select').find('.select-title__value').val($(this).html());
				$(this).parents('.select').find('.select-title__value').attr('data-value',$(this).html());
			}else{
				$(this).parents('.select').find('.select-title__value').attr('class','select-title__value value_'+$(this).data('value'));
				$(this).parents('.select').find('.select-title__value').html($(this).html());

			}

				$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
			if($.trim($(this).data('value'))!=''){
				$(this).parents('.select-block').find('select').val($(this).data('value'));
				$(this).parents('.select-block').find('select').find('option[value="'+$(this).data('value')+'"]').attr('selected','selected');
			}else{
				$(this).parents('.select-block').find('select').val($(this).html());
				$(this).parents('.select-block').find('select').find('option[value="'+$(this).html()+'"]').attr('selected','selected');
			}


			if($(this).parents('.select-block').find('select').val()!=''){
				$(this).parents('.select-block').find('.select').addClass('focus');
			}else{
				$(this).parents('.select-block').find('.select').removeClass('focus');

				$(this).parents('.select-block').find('.select').removeClass('err');
				$(this).parents('.select-block').parent().removeClass('err');
				$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
			}
			if(!$(this).parents('.select').data('tags')!=""){
				if($(this).parents('.form-tags').find('.form-tags__item[data-value="'+$(this).data('value')+'"]').length==0){
					$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="'+$(this).data('value')+'" href="" class="form-tags__item">'+$(this).html()+'<span class="fa fa-times"></span></a>');
				}
			}
			$(this).parents('.select-block').find('select').change();

			if($(this).parents('.select-block').find('select').data('update')=='on'){
				select();
			}
		});
		$(document).on('click touchstart',function(e) {
			if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50,function() {});
				searchselectreset();
			};
		});
		$(document).on('keydown',function(e) {
			if(e.which==27){
				$('.select').removeClass('active');
				$('.select-options').slideUp(50,function() {});
				searchselectreset();
			}
		});
	}
	//FIELDS
	$('input,textarea').focus(function(){
		if($(this).val() == $(this).attr('data-value')){
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function() {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}else{
				this.value = $(this).attr('data-value');
			}
		}
		if(this.value!=$(this).attr('data-value') && this.value!=''){
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}

		$(this).click(function() {
			if (this.value == $(this).attr('data-value')) {
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','password');
				};
				this.value = '';
			};
		});
		$(this).blur(function() {
			if (this.value == '') {
				if(!$(this).hasClass('l')){
					this.value = $(this).attr('data-value');
				}
					$(this).removeClass('focus');
					$(this).parent().removeClass('focus');
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','text');
				};
			};
			if($(this).hasClass('vn')){
				formValidate($(this));
			}
		});
	});
	$('.form-input__viewpass').click(function(event) {
		if($(this).hasClass('active')){
			$(this).parent().find('input').attr('type','password');
		}else{
			$(this).parent().find('input').attr('type','text');
		}
		$(this).toggleClass('active');
	});

	//$('textarea').autogrow({vertical: true, horizontal: false});
	

	//MASKS//
	//'+7(999) 999 9999'
	//'+38(999) 999 9999'
	//'+375(99)999-99-99'
	//'a{3,1000}' только буквы минимум 3
	//'9{3,1000}' только цифры минимум 3
	$.each($('input.phone'), function(index, val) {
		$(this).attr('type','tel');
		$(this).focus(function(){
			$(this).inputmask('+7(999) 999 9999',{clearIncomplete: true,clearMaskOnLostFocus: true,
				"onincomplete": function(){maskclear($(this));}
			});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.phone').focusout(function(event) {
		maskclear($(this));
	});
	$.each($('input.num'), function(index, val) {
		$(this).focus(function(){
			$(this).inputmask('9{1,1000}',{clearIncomplete: true,placeholder:"",clearMaskOnLostFocus: true,"onincomplete": function(){maskclear($(this));}});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.num').focusout(function(event) {
		maskclear($(this));
	});
	/*
	$.each($('input.date'), function(index, val) {
		$(this).focus(function(){
			$(this).inputmask('dd.mm.yyyy',{
				clearIncomplete: true,
				placeholder:"_",
				//yearrange:{'minyear':n-40,'maxyear':n},
				clearMaskOnLostFocus: true,
				"onincomplete": function(){maskclear($(this));},
				"oncomplete": function(){
					$(this).datepicker("setDate",$(this).val());
				}
			});
			$(this).addClass('focus');
			$(this).parents('.form-column').addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
		$(this).focusout(function(event) {
			maskclear($(this));
		});
		$(this).datepicker({
			dateFormat : "dd.mm.yy",
			//yearRange: "1915:2015",
			//defaultDate: '-18Y', 
			//inDate: '-85Y', 
			//maxDate: "0Y",
			beforeShow :function(event){
				$('.ui-datepicker').show();
			},
			onSelect:function(event){
				if($(this).val()!=$(this).attr('data-value') && $(this).val()!=''){
					$(this).addClass('focus');
					$(this).parent().addClass('focus');
					if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
						$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
					}
				}
			}
		});
	});
	*/

	//CHECK
	$.each($('.check'), function(index, val) {
		if($(this).find('input').prop('checked')==true){
			$(this).addClass('active');
		}
	});
	$('body').off('click','.check',function(event){});
	$('body').on('click','.check',function(event){
		if(!$(this).hasClass('disable')){
				var target = $(event.target);
			if (!target.is("a")){
					$(this).toggleClass('active');
				if($(this).hasClass('active')){
					$(this).find('input').prop('checked', true);
				}else{
					$(this).find('input').prop('checked', false);
				}
			}
		}
	});

	//OPTION
	$.each($('.option.active'), function(index, val) {
		$(this).find('input').prop('checked', true);
	});
	$('.option').click(function(event) {
		if(!$(this).hasClass('disable')){
				var target = $(event.target);
			if (!target.is("a")){
				if($(this).hasClass('active') && $(this).hasClass('order') ){
					$(this).toggleClass('orderactive');
				}
					$(this).parents('.options').find('.option').removeClass('active');
					$(this).toggleClass('active');
					$(this).children('input').prop('checked', true);
			}
		}
	});
	//RATING
	$('.rating.edit .star').hover(function() {
			var block=$(this).parents('.rating');
		block.find('.rating__activeline').css({width:'0%'});
			var ind=$(this).index()+1;
			var linew=ind/block.find('.star').length*100;
		setrating(block,linew);
	},function() {
			var block=$(this).parents('.rating');
		block.find('.star').removeClass('active');
			var ind=block.find('input').val();
			var linew=ind/block.find('.star').length*100;
		setrating(block,linew);
	});
	$('.rating.edit .star').click(function(event) {
			var block=$(this).parents('.rating');
			var re=$(this).index()+1;
			block.find('input').val(re);
			var linew=re/block.find('.star').length*100;
		setrating(block,linew);
	});
	$.each($('.rating'), function(index, val) {
			var ind=$(this).find('input').val();
			var linew=ind/$(this).parent().find('.star').length*100;
		setrating($(this),linew);
	});
	function setrating(th,val) {
		th.find('.rating__activeline').css({width:val+'%'});
	}
	//QUANTITY
	$('.quantity__btn').click(function(event) {
			var n=parseInt($(this).parent().find('.quantity__input').val());
		if($(this).hasClass('dwn')){
			n=n-1;
			if(n<1){n=1;}
		}else{
			n=n+1;
		}
			$(this).parent().find('.quantity__input').val(n);
		return false;
	});
	//RANGE
	if($("#range" ).length>0){
		$("#range" ).slider({
			range: true,
			min: 0,
			max: 5000,
			values: [0, 5000],
			slide: function( event, ui ){
				$('#rangefrom').val(ui.values[0]);
				$('#rangeto').val(ui.values[1]);
				$(this).find('.ui-slider-handle').eq(0).html('<span>'+ui.values[0]+'</span>');
				$(this).find('.ui-slider-handle').eq(1).html('<span>'+ui.values[1]+'</span>');
			},
			change: function( event, ui ){
				if(ui.values[0]!=$( "#range" ).slider( "option","min") || ui.values[1]!=$( "#range" ).slider( "option","max")){
					$('#range').addClass('act');
				}else{
					$('#range').removeClass('act');
				}
			}
		});
		$('#rangefrom').val($( "#range" ).slider( "values", 0 ));
		$('#rangeto').val($( "#range" ).slider( "values", 1 ));

		$("#range" ).find('.ui-slider-handle').eq(0).html('<span>'+$( "#range" ).slider( "option","min")+'</span>');
		$("#range" ).find('.ui-slider-handle').eq(1).html('<span>'+$( "#range" ).slider( "option","max")+'</span>');
		
		$( "#rangefrom" ).bind("change", function(){
			if($(this).val()*1>$( "#range" ).slider( "option","max")*1){
				$(this).val($( "#range" ).slider( "option","max"));
			}
			if($(this).val()*1<$( "#range" ).slider( "option","min")*1){
				$(this).val($( "#range" ).slider( "option","min"));
			}
			$("#range" ).slider( "values",0,$(this).val());
		});
		$( "#rangeto" ).bind("change", function(){
			if($(this).val()*1>$( "#range" ).slider( "option","max")*1){
				$(this).val($( "#range" ).slider( "option","max"));
			}
			if($(this).val()*1<$( "#range" ).slider( "option","min")*1){
				$(this).val($( "#range" ).slider( "option","min"));
			}
			$("#range" ).slider( "values",1,$(this).val());
		});
		$("#range" ).find('.ui-slider-handle').eq(0).addClass('left');
		$("#range" ).find('.ui-slider-handle').eq(1).addClass('right');
	}
	//ADDFILES
	$('.form-addfile__input').change(function(e){
		if($(this).val()!=''){
					var ts=$(this);
				ts.parents('.form-addfile').find('ul.form-addfile-list').html('');
			$.each(e.target.files, function(index, val) {
				if(ts.parents('.form-addfile').find('ul.form-addfile-list>li:contains("'+e.target.files[index].name+'")').length==0){
					ts.parents('.form-addfile').find('ul.form-addfile-list').append('<li>'+e.target.files[index].name+'</li>');
				}
			});
		}
	});
}
forms();

function digi(str){
	var r=str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return r;
}

//VALIDATE FORMS
$('form button[type=submit]').click(function(){
		var er=0;
		var form=$(this).parents('form');
		var ms=form.data('ms');
	$.each(form.find('.req'), function(index, val) {
		er+=formValidate($(this));
	});
	if(er==0){
		removeFormError(form);
		/*
			var messagehtml='';
		if(form.hasClass('editprofile')){
			var messagehtml='';
		}
		formLoad();
		*/

		//ОПТРАВКА ФОРМЫ
		/*
		function showResponse(html){
			if(!form.hasClass('nomessage')){
				showMessage(messagehtml);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		}
		var options={
			success:showResponse
		};
			form.ajaxForm(options);
		

		setTimeout(function(){
			if(!form.hasClass('nomessage')){
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		},0);

		return false;
		*/
		if(ms!=null && ms!=''){
			showMessageByClass(ms);
			return false;
		}
	}else{
		return false;
	}
});
function formValidate(input){
		var er=0;
		var form=input.parents('form');
	if(input.attr('name')=='email' || input.hasClass('email')){
		if(input.val()!=input.attr('data-value')){
			var em=input.val().replace(" ","");
			input.val(em);
		}
		if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val()==input.attr('data-value')){
				er++;
			addError(input);
		}else{
			removeError(input);
		}
	}else{
		if(input.val()=='' || input.val()==input.attr('data-value')){
			er++;
			addError(input);
		}else{
			removeError(input);
		}
	}
	if(input.attr('type')=='checkbox'){
		if(input.prop('checked') == true){
			input.removeClass('err').parent().removeClass('err');
		}else{
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if(input.hasClass('name')){
		if(!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))){
				er++;
			addError(input);
		}
	}
	if(input.hasClass('pass-2')){
		if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
			addError(input);
		}else{
			removeError(input);
		}
	}
		return er;
}
function formLoad(){
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms){
	$('.popup').hide();
	popupOpen('message.'+ms,'');
}
function showMessage(html){
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form){
	$.each(form.find('.input'), function(index, val) {
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
		if($(this).hasClass('phone')){
			maskclear($(this));
		}
	});
}
function addError(input){
		input.addClass('err');
		input.parent().addClass('err');
		input.parent().find('.form__error').remove();
	if(input.hasClass('email')){
			var error='';
		if(input.val()=='' || input.val()==input.attr('data-value')){
			error=input.data('error');
		}else{
			error=input.data('error');
		}
		if(error!=null){
			input.parent().append('<div class="form__error">'+error+'</div>');
		}
	}else{
		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
			input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
		}
	}
	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function addErrorByName(form,input__name,error_text){
		var input=form.find('[name="'+input__name+'"]');
	input.attr('data-error',error_text);
	addError(input);
}
function addFormError(form, error_text){
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form){
	form.find('.form__generalerror').hide().html('');
}
function removeError(input){
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form){
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}
function maskclear(n){
	if(n.val()==""){
		n.inputmask('remove');
		if(!n.hasClass('l')){
			n.val(n.attr('data-value'));
		}
		n.removeClass('focus');
		n.parent().removeClass('focus');
	}
}
function searchselectreset() {
	$.each($('.select[data-type="search"]'), function(index, val){
			var block=$(this).parent();
			var select=$(this).parent().find('select');
		if($(this).find('.select-options__value:visible').length==1){
			$(this).addClass('focus');
			$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
			$(this).find('.select-title__value').val($('.select-options__value:visible').html());
			$(this).find('.select-title__value').attr('data-value',$('.select-options__value:visible').html());
		}else if(select.val()==''){
			$(this).removeClass('focus');
			block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
			block.find('input.select-title__value').attr('data-value',select.find('option[selected="selected"]').html());
		}
	});
}
/*!
* jquery.inputmask.bundle.js
* https://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.5-178
*/
!function(e){function t(a,n){return this instanceof t?(e.isPlainObject(a)?n=a:(n=n||{}).alias=a,this.el=void 0,this.opts=e.extend(!0,{},this.defaults,n),this.noMasksCache=n&&void 0!==n.definitions,this.userOptions=n||{},this.events={},void i(this.opts.alias,n,this.opts)):new t(a,n)}function i(t,a,n){var r=n.aliases[t];return r?(r.alias&&i(r.alias,void 0,n),e.extend(!0,n,r),e.extend(!0,n,a),!0):(null===n.mask&&(n.mask=t),!1)}function a(i,a){function n(t){function a(e,t,i,a){this.matches=[],this.isGroup=e||!1,this.isOptional=t||!1,this.isQuantifier=i||!1,this.isAlternator=a||!1,this.quantifier={min:1,max:1}}function n(t,a,n){var r=i.definitions[a];n=void 0!==n?n:t.matches.length;var o=t.matches[n-1];if(r&&!v){r.placeholder=e.isFunction(r.placeholder)?r.placeholder(i):r.placeholder;for(var s=r.prevalidator,l=s?s.length:0,u=1;u<r.cardinality;u++){var c=l>=u?s[u-1]:[],f=c.validator,p=c.cardinality;t.matches.splice(n++,0,{fn:f?"string"==typeof f?new RegExp(f):new function(){this.test=f}:new RegExp("."),cardinality:p||1,optionality:t.isOptional,newBlockMarker:void 0===o||o.def!==(r.definitionSymbol||a),casing:r.casing,def:r.definitionSymbol||a,placeholder:r.placeholder,mask:a}),o=t.matches[n-1]}t.matches.splice(n++,0,{fn:r.validator?"string"==typeof r.validator?new RegExp(r.validator):new function(){this.test=r.validator}:new RegExp("."),cardinality:r.cardinality,optionality:t.isOptional,newBlockMarker:void 0===o||o.def!==(r.definitionSymbol||a),casing:r.casing,def:r.definitionSymbol||a,placeholder:r.placeholder,mask:a})}else t.matches.splice(n++,0,{fn:null,cardinality:0,optionality:t.isOptional,newBlockMarker:void 0===o||o.def!==a,casing:null,def:i.staticDefinitionSymbol||a,placeholder:void 0!==i.staticDefinitionSymbol?a:void 0,mask:a}),v=!1}function r(e,t){e.isGroup&&(e.isGroup=!1,n(e,i.groupmarker.start,0),!0!==t&&n(e,i.groupmarker.end))}function o(e,t,i,a){t.matches.length>0&&(void 0===a||a)&&r(t.matches[t.matches.length-1]),n(t,e)}function s(){if(y.length>0){if(f=y[y.length-1],o(u,f,0,!f.isAlternator),f.isAlternator){p=y.pop();for(var e=0;e<p.matches.length;e++)p.matches[e].isGroup=!1;y.length>0?(f=y[y.length-1]).matches.push(p):g.matches.push(p)}}else o(u,g)}for(var l,u,c,f,p,d,m,h=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,v=!1,g=new a,y=[],k=[];l=h.exec(t);)if(u=l[0],v)s();else switch(u.charAt(0)){case i.escapeChar:v=!0;break;case i.optionalmarker.end:case i.groupmarker.end:if(void 0!==(c=y.pop()))if(y.length>0){if((f=y[y.length-1]).matches.push(c),f.isAlternator){p=y.pop();for(var x=0;x<p.matches.length;x++)p.matches[x].isGroup=!1;y.length>0?(f=y[y.length-1]).matches.push(p):g.matches.push(p)}}else g.matches.push(c);else s();break;case i.optionalmarker.start:y.push(new a(!1,!0));break;case i.groupmarker.start:y.push(new a(!0));break;case i.quantifiermarker.start:var b=new a(!1,!1,!0),P=(u=u.replace(/[{}]/g,"")).split(","),S=isNaN(P[0])?P[0]:parseInt(P[0]),w=1===P.length?S:isNaN(P[1])?P[1]:parseInt(P[1]);if(("*"===w||"+"===w)&&(S="*"===w?0:1),b.quantifier={min:S,max:w},y.length>0){var A=y[y.length-1].matches;(l=A.pop()).isGroup||((m=new a(!0)).matches.push(l),l=m),A.push(l),A.push(b)}else(l=g.matches.pop()).isGroup||((m=new a(!0)).matches.push(l),l=m),g.matches.push(l),g.matches.push(b);break;case i.alternatormarker:y.length>0?(f=y[y.length-1],d=f.matches.pop()):d=g.matches.pop(),d.isAlternator?y.push(d):((p=new a(!1,!1,!1,!0)).matches.push(d),y.push(p));break;default:s()}for(;y.length>0;)r(c=y.pop(),!0),g.matches.push(c);return g.matches.length>0&&(r(d=g.matches[g.matches.length-1]),k.push(g)),i.numericInput&&function e(t){for(var a in t.matches=t.matches.reverse(),t.matches){var n=parseInt(a);if(t.matches[a].isQuantifier&&t.matches[n+1]&&t.matches[n+1].isGroup){var r=t.matches[a];t.matches.splice(a,1),t.matches.splice(n+1,0,r)}void 0!==t.matches[a].matches?t.matches[a]=e(t.matches[a]):t.matches[a]=((o=t.matches[a])===i.optionalmarker.start?o=i.optionalmarker.end:o===i.optionalmarker.end?o=i.optionalmarker.start:o===i.groupmarker.start?o=i.groupmarker.end:o===i.groupmarker.end&&(o=i.groupmarker.start),o)}var o;return t}(k[0]),k}function r(r,o){if(null!==r&&""!==r){if(1===r.length&&!1===i.greedy&&0!==i.repeat&&(i.placeholder=""),i.repeat>0||"*"===i.repeat||"+"===i.repeat){var s="*"===i.repeat?0:"+"===i.repeat?1:i.repeat;r=i.groupmarker.start+r+i.groupmarker.end+i.quantifiermarker.start+s+","+i.repeat+i.quantifiermarker.end}var l;return void 0===t.prototype.masksCache[r]||!0===a?(l={mask:r,maskToken:n(r),validPositions:{},_buffer:void 0,buffer:void 0,tests:{},metadata:o},!0!==a&&(t.prototype.masksCache[i.numericInput?r.split("").reverse().join(""):r]=l,l=e.extend(!0,{},t.prototype.masksCache[i.numericInput?r.split("").reverse().join(""):r]))):l=e.extend(!0,{},t.prototype.masksCache[i.numericInput?r.split("").reverse().join(""):r]),l}}function o(e){return e.toString()}var s;if(e.isFunction(i.mask)&&(i.mask=i.mask(i)),e.isArray(i.mask)){if(i.mask.length>1){i.keepStatic=null===i.keepStatic||i.keepStatic;var l="(";return e.each(i.numericInput?i.mask.reverse():i.mask,function(t,i){l.length>1&&(l+=")|("),l+=o(void 0===i.mask||e.isFunction(i.mask)?i:i.mask)}),r(l+=")",i.mask)}i.mask=i.mask.pop()}return i.mask&&(s=void 0===i.mask.mask||e.isFunction(i.mask.mask)?r(o(i.mask),i.mask):r(o(i.mask.mask),i.mask)),s}function n(i,a,r){function u(e,t,i){t=t||0;var a,n,o,s=[],l=0,u=p();do{if(!0===e&&c().validPositions[l]){var f=c().validPositions[l];n=f.match,a=f.locator.slice(),s.push(!0===i?f.input:F(l,n))}else n=(o=h(l,a,l-1)).match,a=o.locator.slice(),(!1===r.jitMasking||u>l||isFinite(r.jitMasking)&&r.jitMasking>l)&&s.push(F(l,n));l++}while((void 0===se||se>l-1)&&null!==n.fn||null===n.fn&&""!==n.def||t>=l);return""===s[s.length-1]&&s.pop(),s}function c(){return a}function f(e){var t=c();t.buffer=void 0,!0!==e&&(t.tests={},t._buffer=void 0,t.validPositions={},t.p=0)}function p(e,t){var i=-1,a=-1,n=c().validPositions;for(var r in void 0===e&&(e=-1),n){var o=parseInt(r);n[o]&&(t||null!==n[o].match.fn)&&(e>=o&&(i=o),o>=e&&(a=o))}return-1!==i&&e-i>1||e>a?i:a}function d(t,i,a){if(r.insertMode&&void 0!==c().validPositions[t]&&void 0===a){var n,o=e.extend(!0,{},c().validPositions),s=p();for(n=t;s>=n;n++)delete c().validPositions[n];c().validPositions[t]=i;var l,u=!0,d=c().validPositions;for(n=l=t;s>=n;n++){var m=o[n];if(void 0!==m)for(var h=l,v=-1;h<E()&&(null==m.match.fn&&d[n]&&(!0===d[n].match.optionalQuantifier||!0===d[n].match.optionality)||null!=m.match.fn);){if(null===m.match.fn||!r.keepStatic&&d[n]&&(void 0!==d[n+1]&&k(n+1,d[n].locator.slice(),n).length>1||void 0!==d[n].alternation)?h++:h=R(l),g(h,m.match.def)){var y=A(h,m.input,!0,!0);u=!1!==y,l=y.caret||y.insert?p():h;break}if(u=null==m.match.fn,v===h)break;v=h}if(!u)break}if(!u)return c().validPositions=e.extend(!0,{},o),f(!0),!1}else c().validPositions[t]=i;return f(!0),!0}function m(e,t,i,a){var n,o=e;for(c().p=e,n=o;t>n;n++)void 0!==c().validPositions[n]&&(!0===i||!1!==r.canClearPosition(c(),n,p(),a,r))&&delete c().validPositions[n];for(n=o+1;n<=p();){for(;void 0!==c().validPositions[o];)o++;var s=c().validPositions[o];if(o>n&&(n=o+1),void 0===c().validPositions[n]&&C(n)||void 0!==s)n++;else{var l=h(n);g(o,l.match.def)?!1!==A(o,l.input||F(n),!0)&&(delete c().validPositions[n],n++):C(n)||(n++,o--),o++}}var u=p(),d=E();for(!0!==a&&!0!==i&&void 0!==c().validPositions[u]&&c().validPositions[u].input===r.radixPoint&&delete c().validPositions[u],n=u+1;d>=n;n++)c().validPositions[n]&&delete c().validPositions[n];f(!0)}function h(e,t,i){var a=c().validPositions[e];if(void 0===a)for(var n=k(e,t,i),o=p(),s=c().validPositions[o]||k(0)[0],l=void 0!==s.alternation?s.locator[s.alternation].toString().split(","):[],u=0;u<n.length&&!((a=n[u]).match&&(r.greedy&&!0!==a.match.optionalQuantifier||(!1===a.match.optionality||!1===a.match.newBlockMarker)&&!0!==a.match.optionalQuantifier)&&(void 0===s.alternation||s.alternation!==a.alternation||void 0!==a.locator[s.alternation]&&w(a.locator[s.alternation].toString().split(","),l)));u++);return a}function v(e){return c().validPositions[e]?c().validPositions[e].match:k(e)[0].match}function g(e,t){for(var i=!1,a=k(e),n=0;n<a.length;n++)if(a[n].match&&a[n].match.def===t){i=!0;break}return i}function y(t,i){var a,n;return(c().tests[t]||c().validPositions[t])&&e.each(c().tests[t]||[c().validPositions[t]],function(e,t){var r=t.alternation?t.locator[t.alternation].toString().indexOf(i):-1;(void 0===n||n>r)&&-1!==r&&(a=t,n=r)}),a}function k(t,i,a){function n(i,a,o,s){function u(o,s,m){function h(t,i){var a=0===e.inArray(t,i.matches);return a||e.each(i.matches,function(e,n){return(!0!==n.isQuantifier||!(a=h(t,i.matches[e-1])))&&void 0}),a}function v(e,t){var i=y(e,t);return i?i.locator.slice(i.alternation+1):[]}if(l>1e4)throw"Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. "+c().mask;if(l===t&&void 0===o.matches)return f.push({match:o,locator:s.reverse(),cd:d}),!0;if(void 0!==o.matches){if(o.isGroup&&m!==o){if(o=u(i.matches[e.inArray(o,i.matches)+1],s))return!0}else if(o.isOptional){var g=o;if(o=n(o,a,s,m)){if(!h(r=f[f.length-1].match,g))return!0;p=!0,l=t}}else if(o.isAlternator){var k,x=o,b=[],P=f.slice(),S=s.length,w=a.length>0?a.shift():-1;if(-1===w||"string"==typeof w){var A,C=l,E=a.slice(),R=[];if("string"==typeof w)R=w.split(",");else for(A=0;A<x.matches.length;A++)R.push(A);for(var j=0;j<R.length;j++){if(A=parseInt(R[j]),f=[],a=v(l,A),!0!==(o=u(x.matches[A]||i.matches[A],[A].concat(s),m)||o)&&void 0!==o&&R[R.length-1]<x.matches.length){var _=e.inArray(o,i.matches)+1;i.matches.length>_&&((o=u(i.matches[_],[_].concat(s.slice(1,s.length)),m))&&(R.push(_.toString()),e.each(f,function(e,t){t.alternation=s.length-1})))}k=f.slice(),l=C,f=[];for(var M=0;M<E.length;M++)a[M]=E[M];for(var F=0;F<k.length;F++){var O=k[F];O.alternation=O.alternation||S;for(var I=0;I<b.length;I++){var D=b[I];if(O.match.def===D.match.def&&("string"!=typeof w||-1!==e.inArray(O.locator[O.alternation].toString(),R))){O.match.mask===D.match.mask&&(k.splice(F,1),F--),-1===D.locator[O.alternation].toString().indexOf(O.locator[O.alternation])&&(D.locator[O.alternation]=D.locator[O.alternation]+","+O.locator[O.alternation],D.alternation=O.alternation);break}}}b=b.concat(k)}"string"==typeof w&&(b=e.map(b,function(t,i){if(isFinite(i)){var a=t.alternation,n=t.locator[a].toString().split(",");t.locator[a]=void 0,t.alternation=void 0;for(var r=0;r<n.length;r++)-1!==e.inArray(n[r],R)&&(void 0!==t.locator[a]?(t.locator[a]+=",",t.locator[a]+=n[r]):t.locator[a]=parseInt(n[r]),t.alternation=a);if(void 0!==t.locator[a])return t}})),f=P.concat(b),l=t,p=f.length>0}else o=u(x.matches[w]||i.matches[w],[w].concat(s),m);if(o)return!0}else if(o.isQuantifier&&m!==i.matches[e.inArray(o,i.matches)-1])for(var T=o,N=a.length>0?a.shift():0;N<(isNaN(T.quantifier.max)?N+1:T.quantifier.max)&&t>=l;N++){var G=i.matches[e.inArray(T,i.matches)-1];if(o=u(G,[N].concat(s),G)){if((r=f[f.length-1].match).optionalQuantifier=N>T.quantifier.min-1,h(r,G)){if(N>T.quantifier.min-1){p=!0,l=t;break}return!0}return!0}}else if(o=n(o,a,s,m))return!0}else l++}for(var m=a.length>0?a.shift():0;m<i.matches.length;m++)if(!0!==i.matches[m].isQuantifier){var h=u(i.matches[m],[m].concat(o),s);if(h&&l===t)return h;if(l>t)break}}var r,o,s=c().maskToken,l=i?a:0,u=i||[0],f=[],p=!1,d=i?i.join(""):"";if(t>-1){if(void 0===i){for(var m,h=t-1;void 0===(m=c().validPositions[h]||c().tests[h])&&h>-1;)h--;void 0!==m&&h>-1&&(u=((o=m)[0]||o).locator.slice(),d=u.join(""),m=m[0]||m,l=h)}if(c().tests[t]&&c().tests[t][0].cd===d)return c().tests[t];for(var v=u.shift();v<s.length;v++){if(n(s[v],u,[v])&&l===t||l>t)break}}return(0===f.length||p)&&f.push({match:{fn:null,cardinality:0,optionality:!0,casing:null,def:""},locator:[]}),c().tests[t]=e.extend(!0,[],f),c().tests[t]}function x(){return void 0===c()._buffer&&(c()._buffer=u(!1,1)),c()._buffer}function b(e){if(void 0===c().buffer||!0===e){if(!0===e)for(var t in c().tests)void 0===c().validPositions[t]&&delete c().tests[t];c().buffer=u(!0,p(),!0)}return c().buffer}function P(e,t,i){var a;if(i=i,!0===e)f(),e=0,t=i.length;else for(a=e;t>a;a++)delete c().validPositions[a],delete c().tests[a];for(a=e;t>a;a++)f(!0),i[a]!==r.skipOptionalPartCharacter&&A(a,i[a],!0,!0)}function S(e,t){switch(t.casing){case"upper":e=e.toUpperCase();break;case"lower":e=e.toLowerCase()}return e}function w(t,i){for(var a=r.greedy?i:i.slice(0,1),n=!1,o=0;o<t.length;o++)if(-1!==e.inArray(t[o],a)){n=!0;break}return n}function A(t,i,a,n){function o(t,i,a,n){var o=!1;return e.each(k(t),function(s,l){for(var u=l.match,h=i?1:0,v="",g=u.cardinality;g>h;g--)v+=_(t-(g-1));if(i&&(v+=i),b(!0),!1!==(o=null!=u.fn?u.fn.test(v,c(),t,a,r):(i===u.def||i===r.skipOptionalPartCharacter)&&""!==u.def&&{c:u.placeholder||u.def,pos:t})){var y=void 0!==o.c?o.c:i;y=y===r.skipOptionalPartCharacter&&null===u.fn?u.placeholder||u.def:y;var k=t,x=b();if(void 0!==o.remove&&(e.isArray(o.remove)||(o.remove=[o.remove]),e.each(o.remove.sort(function(e,t){return t-e}),function(e,t){m(t,t+1,!0)})),void 0!==o.insert&&(e.isArray(o.insert)||(o.insert=[o.insert]),e.each(o.insert.sort(function(e,t){return e-t}),function(e,t){A(t.pos,t.c,!1,n)})),o.refreshFromBuffer){var w=o.refreshFromBuffer;if(a=!0,P(!0===w?w:w.start,w.end,x),void 0===o.pos&&void 0===o.c)return o.pos=p(),!1;if((k=void 0!==o.pos?o.pos:t)!==t)return o=e.extend(o,A(k,y,!0,n)),!1}else if(!0!==o&&void 0!==o.pos&&o.pos!==t&&(k=o.pos,P(t,k,b().slice()),k!==t))return o=e.extend(o,A(k,y,!0)),!1;return(!0===o||void 0!==o.pos||void 0!==o.c)&&(s>0&&f(!0),d(k,e.extend({},l,{input:S(y,u)}),n)||(o=!1),!1)}}),o}function s(t,i){for(var a=c().validPositions[i].locator,n=a.length,r=t;i>r;r++)if(void 0===c().validPositions[r]&&!C(r,!0)){var o=k(r),s=o[0],l=-1;e.each(o,function(e,t){for(var i=0;n>i&&void 0!==t.locator[i]&&w(t.locator[i].toString().split(","),a[i].toString().split(","));i++)i>l&&(l=i,s=t)}),d(r,e.extend({},s,{input:s.match.placeholder||s.match.def}),!0)}}a=!0===a;for(var l=b(),u=t-1;u>-1&&!c().validPositions[u];u--);for(u++;t>u;u++)void 0===c().validPositions[u]&&((!C(u)||l[u]!==F(u))&&k(u).length>1||l[u]===r.radixPoint||"0"===l[u]&&e.inArray(r.radixPoint,l)<u)&&o(u,l[u],!0,n);var v=t,g=!1,x=e.extend(!0,{},c().validPositions);if(v<E()&&(g=o(v,i,a,n),(!a||!0===n)&&!1===g)){var j=c().validPositions[v];if(!j||null!==j.match.fn||j.match.def!==i&&i!==r.skipOptionalPartCharacter){if((r.insertMode||void 0===c().validPositions[R(v)])&&!C(v,!0)){var M;o(v,M=(M=h(v).match).placeholder||M.def,a,n);for(var O=v+1,I=R(v);I>=O;O++)if(!1!==(g=o(O,i,a,n))){s(v,O),v=O;break}}}else g={caret:R(v)}}if(!1===g&&r.keepStatic&&(g=function(t,i,a,n){for(var o,s,l,u,d,m,v=e.extend(!0,{},c().validPositions),g=e.extend(!0,{},c().tests),k=p();k>=0&&(!(u=c().validPositions[k])||void 0===u.alternation||(o=k,s=c().validPositions[o].alternation,h(o).locator[u.alternation]===u.locator[u.alternation]));k--);if(void 0!==s)for(var x in o=parseInt(o),c().validPositions)if(x=parseInt(x),u=c().validPositions[x],x>=o&&void 0!==u.alternation){var b;0===o?(b=[],e.each(c().tests[o],function(e,t){void 0!==t.locator[s]&&(b=b.concat(t.locator[s].toString().split(",")))})):b=c().validPositions[o].locator[s].toString().split(",");var P=void 0!==u.locator[s]?u.locator[s]:b[0];P.length>0&&(P=P.split(",")[0]);for(var S=0;S<b.length;S++){var w=[],C=0,E=0;if(P<b[S]){for(var R,j,_=x;_>=0;_--)if(void 0!==(R=c().validPositions[_])){var M=y(_,b[S]);c().validPositions[_].match.def!==M.match.def&&(w.push(c().validPositions[_].input),c().validPositions[_]=M,c().validPositions[_].input=F(_),null===c().validPositions[_].match.fn&&E++,R=M),j=R.locator[s],R.locator[s]=parseInt(b[S]);break}if(P!==R.locator[s]){for(d=x+1;d<p(void 0,!0)+1;d++)(m=c().validPositions[d])&&null!=m.match.fn?w.push(m.input):t>d&&C++,delete c().validPositions[d],delete c().tests[d];for(f(!0),r.keepStatic=!r.keepStatic,l=!0;w.length>0;){var O=w.shift();if(O!==r.skipOptionalPartCharacter&&!(l=A(p(void 0,!0)+1,O,!1,n)))break}if(R.alternation=s,R.locator[s]=j,l){var I=p(t)+1;for(d=x+1;d<p()+1;d++)(void 0===(m=c().validPositions[d])||null==m.match.fn)&&t>d&&E++;l=A((t+=E-C)>I?I:t,i,a,n)}if(r.keepStatic=!r.keepStatic,l)return l;f(),c().validPositions=e.extend(!0,{},v),c().tests=e.extend(!0,{},g)}}}break}return!1}(t,i,a,n)),!0===g&&(g={pos:v}),e.isFunction(r.postValidation)&&!1!==g&&!a&&!0!==n){var D=r.postValidation(b(!0),g,r);if(D){if(D.refreshFromBuffer){var T=D.refreshFromBuffer;P(!0===T?T:T.start,T.end,D.buffer),f(!0),g=D}}else f(!0),c().validPositions=e.extend(!0,{},x),g=!1}return g}function C(e,t){var i;return t?""==(i=h(e).match).def&&(i=v(e)):i=v(e),null!=i.fn?i.fn:!0!==t&&e>-1&&!r.keepStatic&&void 0===c().validPositions[e]&&k(e).length>2}function E(){var e;-1===(se=void 0!==re?re.maxLength:void 0)&&(se=void 0);var t,i=p(),a=c().validPositions[i],n=void 0!==a?a.locator.slice():void 0;for(t=i+1;void 0===a||null!==a.match.fn||null===a.match.fn&&""!==a.match.def;t++)n=(a=h(t,n,t-1)).locator.slice();return e=""!==v(t-1).def?t:t-1,void 0===se||se>e?e:se}function R(e,t){var i=E();if(e>=i)return i;for(var a=e;++a<i&&(!0===t&&(!0!==v(a).newBlockMarker||!C(a))||!0!==t&&!C(a)&&(!0!==r.nojumps||r.nojumpsThreshold>a)););return a}function j(e,t){var i=e;if(0>=i)return 0;for(;--i>0&&(!0===t&&!0!==v(i).newBlockMarker||!0!==t&&!C(i)););return i}function _(e){return void 0===c().validPositions[e]?F(e):c().validPositions[e].input}function M(t,i,a,n,o){if(n&&e.isFunction(r.onBeforeWrite)){var s=r.onBeforeWrite(n,i,a,r);if(s){if(s.refreshFromBuffer){var l=s.refreshFromBuffer;P(!0===l?l:l.start,l.end,s.buffer||i),i=b(!0)}void 0!==a&&(a=void 0!==s.caret?s.caret:a)}}t.inputmask._valueSet(i.join("")),void 0===a||void 0!==n&&"blur"===n.type||D(t,a),!0===o&&(fe=!0,e(t).trigger("input"))}function F(e,t){if(void 0!==(t=t||v(e)).placeholder)return t.placeholder;if(null===t.fn){if(e>-1&&!r.keepStatic&&void 0===c().validPositions[e]){var i,a=k(e),n=0;if(a.length>2)for(var o=0;o<a.length;o++)if(!0!==a[o].match.optionality&&!0!==a[o].match.optionalQuantifier&&(null===a[o].match.fn||void 0===i||!1!==a[o].match.fn.test(i.match.def,c(),e,!0,r))&&(n++,null===a[o].match.fn&&(i=a[o]),n>1))return r.placeholder.charAt(e%r.placeholder.length)}return t.def}return r.placeholder.charAt(e%r.placeholder.length)}function O(i,a,n,o){var s=o.slice(),l="",u=0;if(f(),c().p=R(-1),!n)if(!0!==r.autoUnmask){var d=x().slice(0,R(-1)).join(""),m=s.join("").match(new RegExp("^"+t.escapeRegex(d),"g"));m&&m.length>0&&(s.splice(0,m.length*d.length),u=R(u))}else u=R(u);e.each(s,function(t,a){if(void 0!==a){var o=new e.Event("keypress");o.which=a.charCodeAt(0),l+=a;var s=p(void 0,!0),f=c().validPositions[s],d=h(s+1,f?f.locator.slice():void 0,s);if(!function(){var e=!1,t=x().slice(u,R(u)).join("").indexOf(l);if(-1!==t&&!C(u)){e=!0;for(var i=x().slice(u,u+t),a=0;a<i.length;a++)if(" "!==i[a]){e=!1;break}}return e}()||n||r.autoUnmask){var m=n?t:null==d.match.fn&&d.match.optionality&&s+1<c().p?s+1:c().p;L.call(i,o,!0,!1,n,m),u=m+1,l=""}else L.call(i,o,!0,!1,!0,s+1)}}),a&&M(i,b(),document.activeElement===i?R(p(0)):void 0,new e.Event("checkval"))}function I(t){if(t&&void 0===t.inputmask)return t.value;var i=[],a=c().validPositions;for(var n in a)a[n].match&&null!=a[n].match.fn&&i.push(a[n].input);var o=0===i.length?null:(ue?i.reverse():i).join("");if(null!==o){var s=(ue?b().slice().reverse():b()).join("");e.isFunction(r.onUnMask)&&(o=r.onUnMask(s,o,r)||o)}return o}function D(e,t,i,a){function n(e){!0===a||!ue||"number"!=typeof e||r.greedy&&""===r.placeholder||(e=b().join("").length-e);return e}var s;if("number"!=typeof t)return e.setSelectionRange?(t=e.selectionStart,i=e.selectionEnd):window.getSelection?((s=window.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode===e||s.commonAncestorContainer===e)&&(t=s.startOffset,i=s.endOffset):document.selection&&document.selection.createRange&&(i=(t=0-(s=document.selection.createRange()).duplicate().moveStart("character",-1e5))+s.text.length),{begin:n(t),end:n(i)};t=n(t),i="number"==typeof(i=n(i))?i:t;var l=parseInt(((e.ownerDocument.defaultView||window).getComputedStyle?(e.ownerDocument.defaultView||window).getComputedStyle(e,null):e.currentStyle).fontSize)*i;if(e.scrollLeft=l>e.scrollWidth?l:0,o||!1!==r.insertMode||t!==i||i++,e.setSelectionRange)e.selectionStart=t,e.selectionEnd=i;else if(window.getSelection){if(s=document.createRange(),void 0===e.firstChild||null===e.firstChild){var u=document.createTextNode("");e.appendChild(u)}s.setStart(e.firstChild,t<e.inputmask._valueGet().length?t:e.inputmask._valueGet().length),s.setEnd(e.firstChild,i<e.inputmask._valueGet().length?i:e.inputmask._valueGet().length),s.collapse(!0);var c=window.getSelection();c.removeAllRanges(),c.addRange(s)}else e.createTextRange&&((s=e.createTextRange()).collapse(!0),s.moveEnd("character",i),s.moveStart("character",t),s.select())}function T(t){var i,a,n=b(),r=n.length,o=p(),s={},l=c().validPositions[o],u=void 0!==l?l.locator.slice():void 0;for(i=o+1;i<n.length;i++)u=(a=h(i,u,i-1)).locator.slice(),s[i]=e.extend(!0,{},a);var f=l&&void 0!==l.alternation?l.locator[l.alternation]:void 0;for(i=r-1;i>o&&(((a=s[i]).match.optionality||a.match.optionalQuantifier||f&&(f!==s[i].locator[l.alternation]&&null!=a.match.fn||null===a.match.fn&&a.locator[l.alternation]&&w(a.locator[l.alternation].toString().split(","),f.toString().split(","))&&""!==k(i)[0].def))&&n[i]===F(i,a.match));i--)r--;return t?{l:r,def:s[r]?s[r].match:void 0}:r}function N(e){for(var t=T(),i=e.length-1;i>t&&!C(i);i--);return e.splice(t,i+1-t),e}function G(t){if(e.isFunction(r.isComplete))return r.isComplete(t,r);if("*"!==r.repeat){var i=!1,a=T(!0),n=j(a.l);if(void 0===a.def||a.def.newBlockMarker||a.def.optionality||a.def.optionalQuantifier){i=!0;for(var o=0;n>=o;o++){var s=h(o).match;if(null!==s.fn&&void 0===c().validPositions[o]&&!0!==s.optionality&&!0!==s.optionalQuantifier||null===s.fn&&t[o]!==F(o,s)){i=!1;break}}}return i}}function B(i,a,n,o){if((r.numericInput||ue)&&(a===t.keyCode.BACKSPACE?a=t.keyCode.DELETE:a===t.keyCode.DELETE&&(a=t.keyCode.BACKSPACE),ue)){var s=n.end;n.end=n.begin,n.begin=s}a===t.keyCode.BACKSPACE&&(n.end-n.begin<1||!1===r.insertMode)?(n.begin=j(n.begin),void 0===c().validPositions[n.begin]||c().validPositions[n.begin].input!==r.groupSeparator&&c().validPositions[n.begin].input!==r.radixPoint||n.begin--):a===t.keyCode.DELETE&&n.begin===n.end&&(n.end=C(n.end)?n.end+1:R(n.end)+1,void 0===c().validPositions[n.begin]||c().validPositions[n.begin].input!==r.groupSeparator&&c().validPositions[n.begin].input!==r.radixPoint||n.end++),m(n.begin,n.end,!1,o),!0!==o&&function(){if(r.keepStatic){f(!0);var t,a=[],n=e.extend(!0,{},c().validPositions);for(t=p();t>=0;t--){var o=c().validPositions[t];if(o&&(null!=o.match.fn&&a.push(o.input),delete c().validPositions[t],void 0!==o.alternation&&o.locator[o.alternation]===h(t).locator[o.alternation]))break}if(t>-1)for(;a.length>0;){c().p=R(p());var s=new e.Event("keypress");s.which=a.pop().charCodeAt(0),L.call(i,s,!0,!1,!1,c().p)}else c().validPositions=e.extend(!0,{},n)}}();var l=p(n.begin);l<n.begin?(-1===l&&f(),c().p=R(l)):!0!==o&&(c().p=n.begin)}function K(i){var a,n,o,s,u=this,f=e(u),d=i.keyCode,m=D(u);if(d===t.keyCode.BACKSPACE||d===t.keyCode.DELETE||l&&127===d||i.ctrlKey&&88===d&&(a="cut",n=document.createElement("input"),(s=(o="on"+a)in n)||(n.setAttribute(o,"return;"),s="function"==typeof n[o]),n=null,!s))i.preventDefault(),88===d&&(ae=b().join("")),B(u,d,m),M(u,b(),c().p,i,ae!==b().join("")),u.inputmask._valueGet()===x().join("")?f.trigger("cleared"):!0===G(b())&&f.trigger("complete"),r.showTooltip&&(u.title=r.tooltip||c().mask);else if(d===t.keyCode.END||d===t.keyCode.PAGE_DOWN){i.preventDefault();var h=R(p());r.insertMode||h!==E()||i.shiftKey||h--,D(u,i.shiftKey?m.begin:h,h,!0)}else d===t.keyCode.HOME&&!i.shiftKey||d===t.keyCode.PAGE_UP?(i.preventDefault(),D(u,0,i.shiftKey?m.begin:0,!0)):(r.undoOnEscape&&d===t.keyCode.ESCAPE||90===d&&i.ctrlKey)&&!0!==i.altKey?(O(u,!0,!1,ae.split("")),f.trigger("click")):d!==t.keyCode.INSERT||i.shiftKey||i.ctrlKey?!0===r.tabThrough&&d===t.keyCode.TAB?(!0===i.shiftKey?(null===v(m.begin).fn&&(m.begin=R(m.begin)),m.end=j(m.begin,!0),m.begin=j(m.end,!0)):(m.begin=R(m.begin,!0),m.end=R(m.begin,!0),m.end<E()&&m.end--),m.begin<E()&&(i.preventDefault(),D(u,m.begin,m.end))):!1!==r.insertMode||i.shiftKey||(d===t.keyCode.RIGHT?setTimeout(function(){var e=D(u);D(u,e.begin)},0):d===t.keyCode.LEFT&&setTimeout(function(){var e=D(u);D(u,ue?e.begin+1:e.begin-1)},0)):(r.insertMode=!r.insertMode,D(u,r.insertMode||m.begin!==E()?m.begin:m.begin-1));r.onKeyDown.call(this,i,b(),D(u).begin,r),pe=-1!==e.inArray(d,r.ignorables)}function L(i,a,n,o,s){var l,u,p=e(this),m=i.which||i.charCode||i.keyCode;if(!(!0===a||i.ctrlKey&&i.altKey)&&(i.ctrlKey||i.metaKey||pe))return m===t.keyCode.ENTER&&ae!==b().join("")&&(ae=b().join(""),setTimeout(function(){p.trigger("change")},0)),!0;if(m){46===m&&!1===i.shiftKey&&","===r.radixPoint&&(m=44);var h,v=a?{begin:s,end:s}:D(this),g=String.fromCharCode(m),y=(l=v.begin,u=v.end,ue?l-u>1||l-u==1&&r.insertMode:u-l>1||u-l==1&&r.insertMode);y&&(c().undoPositions=e.extend(!0,{},c().validPositions),B(this,t.keyCode.DELETE,v,!0),v.begin=c().p,r.insertMode||(r.insertMode=!r.insertMode,d(v.begin,o),r.insertMode=!r.insertMode),y=!r.multi),c().writeOutBuffer=!0;var x=ue&&!y?v.end:v.begin,S=A(x,g,o);if(!1!==S){if(!0!==S&&(x=void 0!==S.pos?S.pos:x,g=void 0!==S.c?S.c:g),f(!0),void 0!==S.caret)h=S.caret;else{var w=c().validPositions;h=!r.keepStatic&&(void 0!==w[x+1]&&k(x+1,w[x].locator.slice(),x).length>1||void 0!==w[x].alternation)?x+1:R(x)}c().p=h}if(!1!==n){var C=this;if(setTimeout(function(){r.onKeyValidation.call(C,m,S,r)},0),c().writeOutBuffer&&!1!==S){var E=b();M(this,E,r.numericInput&&void 0===S.caret?j(h):h,i,!0!==a),!0!==a&&setTimeout(function(){!0===G(E)&&p.trigger("complete")},0)}else y&&(c().buffer=void 0,c().validPositions=c().undoPositions)}else y&&(c().buffer=void 0,c().validPositions=c().undoPositions);if(r.showTooltip&&(this.title=r.tooltip||c().mask),a&&e.isFunction(r.onBeforeWrite)){var _=r.onBeforeWrite(i,b(),h,r);if(_&&_.refreshFromBuffer){var F=_.refreshFromBuffer;P(!0===F?F:F.start,F.end,_.buffer),f(!0),_.caret&&(c().p=_.caret)}}if(i.preventDefault(),a)return S}}function H(t){var i=t.originalEvent||t,a=e(this),n=this.inputmask._valueGet(!0),o=D(this),s=n.substr(0,o.begin),l=n.substr(o.end,n.length);s===x().slice(0,o.begin).join("")&&(s=""),l===x().slice(o.end).join("")&&(l=""),window.clipboardData&&window.clipboardData.getData?n=s+window.clipboardData.getData("Text")+l:i.clipboardData&&i.clipboardData.getData&&(n=s+i.clipboardData.getData("text/plain")+l);var u=n;if(e.isFunction(r.onBeforePaste)){if(!1===(u=r.onBeforePaste(n,r)))return t.preventDefault(),!1;u||(u=n)}return O(this,!1,!1,ue?u.split("").reverse():u.toString().split("")),M(this,b(),void 0,t,!0),a.trigger("click"),!0===G(b())&&a.trigger("complete"),!1}function U(i){var a=this.inputmask._valueGet();if(b().join("")!==a){var n=D(this);if(a=a.replace(new RegExp("("+t.escapeRegex(x().join(""))+")*"),""),s){var r=a.replace(b().join(""),"");if(1===r.length){var o=new e.Event("keypress");return o.which=r.charCodeAt(0),L.call(this,o,!0,!0,!1,c().validPositions[n.begin-1]?n.begin:n.begin-1),!1}}if(n.begin>a.length&&(D(this,a.length),n=D(this)),b().length-a.length!=1||a.charAt(n.begin)===b()[n.begin]||a.charAt(n.begin+1)===b()[n.begin]||C(n.begin)){for(var l=p()+1,u=b().slice(l).join("");null===a.match(t.escapeRegex(u)+"$");)u=u.slice(1);O(this,!0,!1,a=(a=a.replace(u,"")).split("")),!0===G(b())&&e(this).trigger("complete")}else i.keyCode=t.keyCode.BACKSPACE,K.call(this,i);i.preventDefault()}}function Q(e){var t=e.originalEvent||e;ae=b().join(""),""===ne||t.data.indexOf(ne)}function V(t){var i=this,a=t.originalEvent||t,n=b().join("");0===a.data.indexOf(ne)&&(f(),c().p=R(-1));for(var o=a.data,s=0;s<o.length;s++){var l=new e.Event("keypress");l.which=o.charCodeAt(s),ce=!1,pe=!1,L.call(i,l,!0,!1,!1,c().p)}n!==b().join("")&&setTimeout(function(){var e=c().p;M(i,b(),r.numericInput?j(e):e)},0),ne=a.data}function q(e){}function z(t){var i=this.inputmask._valueGet();O(this,!0,!1,(e.isFunction(r.onBeforeMask)&&r.onBeforeMask(i,r)||i).split("")),ae=b().join(""),(r.clearMaskOnLostFocus||r.clearIncomplete)&&this.inputmask._valueGet()===x().join("")&&this.inputmask._valueSet("")}function W(e){var t=this,i=t.inputmask._valueGet();r.showMaskOnFocus&&(!r.showMaskOnHover||r.showMaskOnHover&&""===i)?t.inputmask._valueGet()!==b().join("")&&M(t,b(),R(p())):!1===de&&D(t,R(p())),!0===r.positionCaretOnTab&&setTimeout(function(){D(t,R(p()))},0),ae=b().join("")}function Y(e){if(de=!1,r.clearMaskOnLostFocus&&document.activeElement!==this){var t=b().slice(),i=this.inputmask._valueGet();i!==this.getAttribute("placeholder")&&""!==i&&(-1===p()&&i===x().join("")?t=[]:N(t),M(this,t))}}function $(t){if(document.activeElement===this){var i=D(this);if(i.begin===i.end)if(function(t){if(r.radixFocus&&""!==r.radixPoint){var i=c().validPositions;if(void 0===i[t]||i[t].input===F(t)){if(t<R(-1))return!0;var a=e.inArray(r.radixPoint,b());if(-1!==a){for(var n in i)if(n>a&&i[n].input!==F(n))return!1;return!0}}}return!1}(i.begin))D(this,r.numericInput?R(e.inArray(r.radixPoint,b())):e.inArray(r.radixPoint,b()));else{var a=i.begin,n=R(p(a));n>a?D(this,C(a)||C(a-1)?a:R(a)):((b()[n]!==F(n)||!C(n,!0)&&v(n).def===F(n))&&(n=R(n)),D(this,n))}}}function Z(e){var t=this;setTimeout(function(){D(t,0,R(p()))},0)}function J(i){var a=e(this),n=D(this),o=i.originalEvent||i,s=window.clipboardData||o.clipboardData,l=ue?b().slice(n.end,n.begin):b().slice(n.begin,n.end);s.setData("text",ue?l.reverse().join(""):l.join("")),document.execCommand&&document.execCommand("copy"),B(this,t.keyCode.DELETE,n),M(this,b(),c().p,i,ae!==b().join("")),this.inputmask._valueGet()===x().join("")&&a.trigger("cleared"),r.showTooltip&&(this.title=r.tooltip||c().mask)}function X(t){var i=e(this);if(this.inputmask){var a=this.inputmask._valueGet(),n=b().slice();ae!==n.join("")&&setTimeout(function(){i.trigger("change"),ae=n.join("")},0),""!==a&&(r.clearMaskOnLostFocus&&(-1===p()&&a===x().join("")?n=[]:N(n)),!1===G(n)&&(setTimeout(function(){i.trigger("incomplete")},0),r.clearIncomplete&&(f(),n=r.clearMaskOnLostFocus?[]:x().slice())),M(this,n,void 0,t))}}function ee(e){de=!0,document.activeElement!==this&&r.showMaskOnHover&&this.inputmask._valueGet()!==b().join("")&&M(this,b())}function te(e){ae!==b().join("")&&oe.trigger("change"),r.clearMaskOnLostFocus&&-1===p()&&re.inputmask._valueGet&&re.inputmask._valueGet()===x().join("")&&re.inputmask._valueSet(""),r.removeMaskOnSubmit&&(re.inputmask._valueSet(re.inputmask.unmaskedvalue(),!0),setTimeout(function(){M(re,b())},0))}function ie(e){setTimeout(function(){oe.trigger("setvalue")},0)}var ae,ne,re,oe,se,le,ue=!1,ce=!1,fe=!1,pe=!1,de=!0,me=!1,he={on:function(i,a,n){var o=function(i){if(void 0===this.inputmask&&"FORM"!==this.nodeName){var a=e.data(this,"_inputmask_opts");a?new t(a).mask(this):he.off(this)}else{if("setvalue"===i.type||!(this.disabled||this.readOnly&&!("keydown"===i.type&&i.ctrlKey&&67===i.keyCode||!1===r.tabThrough&&i.keyCode===t.keyCode.TAB))){switch(i.type){case"input":if(!0===fe||!0===me)return fe=me,i.preventDefault();break;case"keydown":ce=!1,fe=!1,me=!1;break;case"keypress":if(!0===ce)return i.preventDefault();ce=!0;break;case"compositionstart":me=!0;break;case"compositionupdate":fe=!0;break;case"compositionend":me=!1;break;case"cut":fe=!0;break;case"click":if(s){var o=this;return setTimeout(function(){n.apply(o,arguments)},0),!1}}return n.apply(this,arguments)}i.preventDefault()}};i.inputmask.events[a]=i.inputmask.events[a]||[],i.inputmask.events[a].push(o),-1!==e.inArray(a,["submit","reset"])?null!=i.form&&e(i.form).on(a,o):e(i).on(a,o)},off:function(t,i){var a;t.inputmask&&t.inputmask.events&&(i?(a=[])[i]=t.inputmask.events[i]:a=t.inputmask.events,e.each(a,function(i,a){for(;a.length>0;){var n=a.pop();-1!==e.inArray(i,["submit","reset"])?null!=t.form&&e(t.form).off(i,n):e(t).off(i,n)}delete t.inputmask.events[i]}))}};if(void 0!==i)switch(i.action){case"isComplete":return re=i.el,G(b());case"unmaskedvalue":return void 0!==(re=i.el)&&void 0!==re.inputmask?(a=re.inputmask.maskset,r=re.inputmask.opts,ue=re.inputmask.isRTL):(le=i.value,r.numericInput&&(ue=!0),le=(e.isFunction(r.onBeforeMask)&&r.onBeforeMask(le,r)||le).split(""),O(void 0,!1,!1,ue?le.reverse():le),e.isFunction(r.onBeforeWrite)&&r.onBeforeWrite(void 0,b(),0,r)),I(re);case"mask":re=i.el,a=re.inputmask.maskset,r=re.inputmask.opts,ue=re.inputmask.isRTL,ae=b().join(""),function(t){if(oe=e(re=t),r.showTooltip&&(re.title=r.tooltip||c().mask),("rtl"===re.dir||r.rightAlign)&&(re.style.textAlign="right"),("rtl"===re.dir||r.numericInput)&&(re.dir="ltr",re.removeAttribute("dir"),re.inputmask.isRTL=!0,ue=!0),he.off(re),function(t){function i(){return this.inputmask?this.inputmask.opts.autoUnmask?this.inputmask.unmaskedvalue():n.call(this)!==x().join("")?document.activeElement===this&&r.clearMaskOnLostFocus?(ue?N(b().slice()).reverse():N(b().slice())).join(""):n.call(this):"":n.call(this)}function a(t){o.call(this,t),this.inputmask&&e(this).trigger("setvalue")}var n,o;t.inputmask.__valueGet||(Object.getOwnPropertyDescriptor&&void 0===t.value?(n=function(){return this.textContent},o=function(e){this.textContent=e},Object.defineProperty(t,"value",{get:i,set:a})):document.__lookupGetter__&&t.__lookupGetter__("value")?(n=t.__lookupGetter__("value"),o=t.__lookupSetter__("value"),t.__defineGetter__("value",i),t.__defineSetter__("value",a)):(n=function(){return t.value},o=function(e){t.value=e},function(t){if(e.valHooks&&(void 0===e.valHooks[t]||!0!==e.valHooks[t].inputmaskpatch)){var i=e.valHooks[t]&&e.valHooks[t].get?e.valHooks[t].get:function(e){return e.value},a=e.valHooks[t]&&e.valHooks[t].set?e.valHooks[t].set:function(e,t){return e.value=t,e};e.valHooks[t]={get:function(e){if(e.inputmask){if(e.inputmask.opts.autoUnmask)return e.inputmask.unmaskedvalue();var t=i(e),a=e.inputmask.maskset._buffer;return t!==(a=a?a.join(""):"")?t:""}return i(e)},set:function(t,i){var n,r=e(t);return n=a(t,i),t.inputmask&&r.trigger("setvalue"),n},inputmaskpatch:!0}}}(t.type),function(t){he.on(t,"mouseenter",function(t){var i=e(this);this.inputmask._valueGet()!==b().join("")&&p()>0&&i.trigger("setvalue")})}(t)),t.inputmask.__valueGet=n,t.inputmask._valueGet=function(e){return ue&&!0!==e?n.call(this.el).split("").reverse().join(""):n.call(this.el)},t.inputmask.__valueSet=o,t.inputmask._valueSet=function(e,t){o.call(this.el,null==e?"":!0!==t&&ue?e.split("").reverse().join(""):e)})}(re),function(t,i){var a=t.getAttribute("type"),n="INPUT"===t.tagName&&-1!==e.inArray(a,i.supportsInputType)||t.isContentEditable||"TEXTAREA"===t.tagName;if(!n){var r=document.createElement("input");r.setAttribute("type",a),n="text"===r.type,r=null}return n}(re,r)&&(he.on(re,"submit",te),he.on(re,"reset",ie),he.on(re,"mouseenter",ee),he.on(re,"blur",X),he.on(re,"focus",W),he.on(re,"mouseleave",Y),he.on(re,"click",$),he.on(re,"dblclick",Z),he.on(re,"paste",H),he.on(re,"dragdrop",H),he.on(re,"drop",H),he.on(re,"cut",J),he.on(re,"complete",r.oncomplete),he.on(re,"incomplete",r.onincomplete),he.on(re,"cleared",r.oncleared),he.on(re,"keydown",K),he.on(re,"keypress",L),he.on(re,"input",U),o||(he.on(re,"compositionstart",Q),he.on(re,"compositionupdate",V),he.on(re,"compositionend",q))),he.on(re,"setvalue",z),""!==re.inputmask._valueGet()||!1===r.clearMaskOnLostFocus){var i=e.isFunction(r.onBeforeMask)&&r.onBeforeMask(re.inputmask._valueGet(),r)||re.inputmask._valueGet();O(re,!0,!1,i.split(""));var a=b().slice();ae=a.join(""),!1===G(a)&&r.clearIncomplete&&f(),r.clearMaskOnLostFocus&&(a.join("")===x().join("")?a=[]:N(a)),M(re,a),document.activeElement===re&&D(re,R(p()))}}(re);break;case"format":return r.numericInput&&(ue=!0),le=(e.isFunction(r.onBeforeMask)&&r.onBeforeMask(i.value,r)||i.value).split(""),O(void 0,!1,!1,ue?le.reverse():le),e.isFunction(r.onBeforeWrite)&&r.onBeforeWrite(void 0,b(),0,r),i.metadata?{value:ue?b().slice().reverse().join(""):b().join(""),metadata:n({action:"getmetadata"},a,r)}:ue?b().slice().reverse().join(""):b().join("");case"isValid":r.numericInput&&(ue=!0),i.value?(le=i.value.split(""),O(void 0,!1,!0,ue?le.reverse():le)):i.value=b().join("");for(var ve=b(),ge=T(),ye=ve.length-1;ye>ge&&!C(ye);ye--);return ve.splice(ge,ye+1-ge),G(ve)&&i.value===b().join("");case"getemptymask":return x();case"remove":var ke;re=i.el,oe=e(re),a=re.inputmask.maskset,r=re.inputmask.opts,re.inputmask._valueSet(I(re)),he.off(re),Object.getOwnPropertyDescriptor&&(ke=Object.getOwnPropertyDescriptor(re,"value")),ke&&ke.get?re.inputmask.__valueGet&&Object.defineProperty(re,"value",{get:re.inputmask.__valueGet,set:re.inputmask.__valueSet}):document.__lookupGetter__&&re.__lookupGetter__("value")&&re.inputmask.__valueGet&&(re.__defineGetter__("value",re.inputmask.__valueGet),re.__defineSetter__("value",re.inputmask.__valueSet)),re.inputmask=void 0;break;case"getmetadata":if(e.isArray(a.metadata)){for(var xe,be=p(),Pe=be;Pe>=0;Pe--)if(c().validPositions[Pe]&&void 0!==c().validPositions[Pe].alternation){xe=c().validPositions[Pe].alternation;break}return void 0!==xe?a.metadata[c().validPositions[be].locator[xe]]:a.metadata[0]}return a.metadata}}t.prototype={defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},alternatormarker:"|",escapeChar:"\\",mask:null,oncomplete:e.noop,onincomplete:e.noop,oncleared:e.noop,repeat:0,greedy:!0,autoUnmask:!1,removeMaskOnSubmit:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,aliases:{},alias:null,onKeyDown:e.noop,onBeforeMask:null,onBeforePaste:function(t,i){return e.isFunction(i.onBeforeMask)?i.onBeforeMask(t,i):t},onBeforeWrite:null,onUnMask:null,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:e.noop,skipOptionalPartCharacter:" ",showTooltip:!1,tooltip:void 0,numericInput:!1,rightAlign:!1,undoOnEscape:!0,radixPoint:"",groupSeparator:"",radixFocus:!1,nojumps:!1,nojumpsThreshold:0,keepStatic:null,positionCaretOnTab:!1,tabThrough:!1,supportsInputType:["text","tel","password"],definitions:{9:{validator:"[0-9]",cardinality:1,definitionSymbol:"*"},a:{validator:"[A-Za-zА-яЁёÀ-ÿµ]",cardinality:1,definitionSymbol:"*"},"*":{validator:"[0-9A-Za-zА-яЁёÀ-ÿµ]",cardinality:1}},ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],isComplete:null,canClearPosition:e.noop,postValidation:null,staticDefinitionSymbol:void 0,jitMasking:!1},masksCache:{},mask:function(r){var o=this;return"string"==typeof r&&(r=document.getElementById(r)||document.querySelectorAll(r)),r=r.nodeName?[r]:r,e.each(r,function(r,s){var l=e.extend(!0,{},o.opts);!function(t,a,n){function r(e,i){null!==(i=void 0!==i?i:t.getAttribute("data-inputmask-"+e))&&("string"==typeof i&&(0===e.indexOf("on")?i=window[i]:"false"===i?i=!1:"true"===i&&(i=!0)),n[e]=i)}var o,s,l,u,c=t.getAttribute("data-inputmask");if(c&&""!==c&&(c=c.replace(new RegExp("'","g"),'"'),s=JSON.parse("{"+c+"}")),s)for(u in l=void 0,s)if("alias"===u.toLowerCase()){l=s[u];break}for(o in r("alias",l),n.alias&&i(n.alias,n,a),a){if(s)for(u in l=void 0,s)if(u.toLowerCase()===o.toLowerCase()){l=s[u];break}r(o,l)}e.extend(!0,a,n)}(s,l,e.extend(!0,{},o.userOptions));var u=a(l,o.noMasksCache);void 0!==u&&(void 0!==s.inputmask&&s.inputmask.remove(),s.inputmask=new t,s.inputmask.opts=l,s.inputmask.noMasksCache=o.noMasksCache,s.inputmask.userOptions=e.extend(!0,{},o.userOptions),s.inputmask.el=s,s.inputmask.maskset=u,s.inputmask.isRTL=!1,e.data(s,"_inputmask_opts",l),n({action:"mask",el:s}))}),r&&r[0]&&r[0].inputmask||this},option:function(t){return"string"==typeof t?this.opts[t]:"object"==typeof t?(e.extend(this.opts,t),e.extend(this.userOptions,t),this.el&&(void 0!==t.mask||void 0!==t.alias?this.mask(this.el):(e.data(this.el,"_inputmask_opts",this.opts),n({action:"mask",el:this.el}))),this):void 0},unmaskedvalue:function(e){return n({action:"unmaskedvalue",el:this.el,value:e},this.el&&this.el.inputmask?this.el.inputmask.maskset:a(this.opts,this.noMasksCache),this.opts)},remove:function(){return this.el?(n({action:"remove",el:this.el}),this.el.inputmask=void 0,this.el):void 0},getemptymask:function(){return n({action:"getemptymask"},this.maskset||a(this.opts,this.noMasksCache),this.opts)},hasMaskedValue:function(){return!this.opts.autoUnmask},isComplete:function(){return n({action:"isComplete",el:this.el},this.maskset||a(this.opts,this.noMasksCache),this.opts)},getmetadata:function(){return n({action:"getmetadata"},this.maskset||a(this.opts,this.noMasksCache),this.opts)},isValid:function(e){return n({action:"isValid",value:e},this.maskset||a(this.opts,this.noMasksCache),this.opts)},format:function(e,t){return n({action:"format",value:e,metadata:t},this.maskset||a(this.opts,this.noMasksCache),this.opts)}},t.extendDefaults=function(i){e.extend(!0,t.prototype.defaults,i)},t.extendDefinitions=function(i){e.extend(!0,t.prototype.defaults.definitions,i)},t.extendAliases=function(i){e.extend(!0,t.prototype.defaults.aliases,i)},t.format=function(e,i,a){return t(i).format(e,a)},t.unmask=function(e,i){return t(i).unmaskedvalue(e)},t.isValid=function(e,i){return t(i).isValid(e)},t.remove=function(t){e.each(t,function(e,t){t.inputmask&&t.inputmask.remove()})},t.escapeRegex=function(e){return e.replace(new RegExp("(\\"+["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^"].join("|\\")+")","gim"),"\\$1")},t.keyCode={ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91};var r=navigator.userAgent,o=/mobile/i.test(r),s=/iemobile/i.test(r),l=/iphone/i.test(r)&&!s;/android.*safari.*/i.test(r),window.Inputmask=t}(jQuery),function(e,t){void 0===e.fn.inputmask&&(e.fn.inputmask=function(i,a){var n,r=this[0];if(a=a||{},"string"==typeof i)switch(i){case"unmaskedvalue":return r&&r.inputmask?r.inputmask.unmaskedvalue():e(r).val();case"remove":return this.each(function(){this.inputmask&&this.inputmask.remove()});case"getemptymask":return r&&r.inputmask?r.inputmask.getemptymask():"";case"hasMaskedValue":return!(!r||!r.inputmask)&&r.inputmask.hasMaskedValue();case"isComplete":return!r||!r.inputmask||r.inputmask.isComplete();case"getmetadata":return r&&r.inputmask?r.inputmask.getmetadata():void 0;case"setvalue":e(r).val(a),r&&void 0!==r.inputmask&&e(r).triggerHandler("setvalue");break;case"option":if("string"!=typeof a)return this.each(function(){return void 0!==this.inputmask?this.inputmask.option(a):void 0});if(r&&void 0!==r.inputmask)return r.inputmask.option(a);break;default:return a.alias=i,n=new t(a),this.each(function(){n.mask(this)})}else{if("object"==typeof i)return n=new t(i),void 0===i.mask&&void 0===i.alias?this.each(function(){return void 0!==this.inputmask?this.inputmask.option(i):void n.mask(this)}):this.each(function(){n.mask(this)});if(void 0===i)return this.each(function(){(n=new t(a)).mask(this)})}}),e.fn.inputmask}(jQuery,Inputmask),function(e,t){t.extendDefinitions({h:{validator:"[01][0-9]|2[0-3]",cardinality:2,prevalidator:[{validator:"[0-2]",cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:"[0-5]",cardinality:1}]},d:{validator:"0[1-9]|[12][0-9]|3[01]",cardinality:2,prevalidator:[{validator:"[0-3]",cardinality:1}]},m:{validator:"0[1-9]|1[012]",cardinality:2,prevalidator:[{validator:"[01]",cardinality:1}]},y:{validator:"(19|20)\\d{2}",cardinality:4,prevalidator:[{validator:"[12]",cardinality:1},{validator:"(19|20)",cardinality:2},{validator:"(19|20)\\d",cardinality:3}]}}),t.extendAliases({"dd/mm/yyyy":{mask:"1/2/y",placeholder:"dd/mm/yyyy",regex:{val1pre:new RegExp("[0-3]"),val1:new RegExp("0[1-9]|[12][0-9]|3[01]"),val2pre:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|[12][0-9]|3[01])"+i+"[01])")},val2:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|[12][0-9])"+i+"(0[1-9]|1[012]))|(30"+i+"(0[13-9]|1[012]))|(31"+i+"(0[13578]|1[02]))")}},leapday:"29/02/",separator:"/",yearrange:{minyear:1900,maxyear:2099},isInYearRange:function(e,t,i){if(isNaN(e))return!1;var a=parseInt(e.concat(t.toString().slice(e.length))),n=parseInt(e.concat(i.toString().slice(e.length)));return!isNaN(a)&&(a>=t&&i>=a)||!isNaN(n)&&(n>=t&&i>=n)},determinebaseyear:function(e,t,i){var a=(new Date).getFullYear();if(e>a)return e;if(a>t){for(var n=t.toString().slice(0,2),r=t.toString().slice(2,4);n+i>t;)n--;var o=n+r;return e>o?e:o}return a},onKeyDown:function(i,a,n,r){var o=e(this);if(i.ctrlKey&&i.keyCode===t.keyCode.RIGHT){var s=new Date;o.val(s.getDate().toString()+(s.getMonth()+1).toString()+s.getFullYear().toString()),o.trigger("setvalue")}},getFrontValue:function(e,t,i){for(var a=0,n=0,r=0;r<e.length&&"2"!==e.charAt(r);r++){var o=i.definitions[e.charAt(r)];o?(a+=n,n=o.cardinality):n++}return t.join("").substr(a,n)},definitions:{1:{validator:function(e,t,i,a,n){var r=n.regex.val1.test(e);return a||r||e.charAt(1)!==n.separator&&-1==="-./".indexOf(e.charAt(1))||!(r=n.regex.val1.test("0"+e.charAt(0)))?r:(t.buffer[i-1]="0",{refreshFromBuffer:{start:i-1,end:i},pos:i,c:e.charAt(0)})},cardinality:2,prevalidator:[{validator:function(e,t,i,a,n){var r=e;isNaN(t.buffer[i+1])||(r+=t.buffer[i+1]);var o=1===r.length?n.regex.val1pre.test(r):n.regex.val1.test(r);if(!a&&!o){if(o=n.regex.val1.test(e+"0"))return t.buffer[i]=e,t.buffer[++i]="0",{pos:i,c:"0"};if(o=n.regex.val1.test("0"+e))return t.buffer[i]="0",{pos:++i}}return o},cardinality:1}]},2:{validator:function(e,t,i,a,n){var r=n.getFrontValue(t.mask,t.buffer,n);-1!==r.indexOf(n.placeholder[0])&&(r="01"+n.separator);var o=n.regex.val2(n.separator).test(r+e);if(!a&&!o&&(e.charAt(1)===n.separator||-1!=="-./".indexOf(e.charAt(1)))&&(o=n.regex.val2(n.separator).test(r+"0"+e.charAt(0))))return t.buffer[i-1]="0",{refreshFromBuffer:{start:i-1,end:i},pos:i,c:e.charAt(0)};if(n.mask.indexOf("2")===n.mask.length-1&&o){if(t.buffer.join("").substr(4,4)+e!==n.leapday)return!0;var s=parseInt(t.buffer.join("").substr(0,4),10);return s%4==0&&(s%100!=0||s%400==0)}return o},cardinality:2,prevalidator:[{validator:function(e,t,i,a,n){isNaN(t.buffer[i+1])||(e+=t.buffer[i+1]);var r=n.getFrontValue(t.mask,t.buffer,n);-1!==r.indexOf(n.placeholder[0])&&(r="01"+n.separator);var o=1===e.length?n.regex.val2pre(n.separator).test(r+e):n.regex.val2(n.separator).test(r+e);return a||o||!(o=n.regex.val2(n.separator).test(r+"0"+e))?o:(t.buffer[i]="0",{pos:++i})},cardinality:1}]},y:{validator:function(e,t,i,a,n){if(n.isInYearRange(e,n.yearrange.minyear,n.yearrange.maxyear)){if(t.buffer.join("").substr(0,6)!==n.leapday)return!0;var r=parseInt(e,10);return r%4==0&&(r%100!=0||r%400==0)}return!1},cardinality:4,prevalidator:[{validator:function(e,t,i,a,n){var r=n.isInYearRange(e,n.yearrange.minyear,n.yearrange.maxyear);if(!a&&!r){var o=n.determinebaseyear(n.yearrange.minyear,n.yearrange.maxyear,e+"0").toString().slice(0,1);if(r=n.isInYearRange(o+e,n.yearrange.minyear,n.yearrange.maxyear))return t.buffer[i++]=o.charAt(0),{pos:i};if(o=n.determinebaseyear(n.yearrange.minyear,n.yearrange.maxyear,e+"0").toString().slice(0,2),r=n.isInYearRange(o+e,n.yearrange.minyear,n.yearrange.maxyear))return t.buffer[i++]=o.charAt(0),t.buffer[i++]=o.charAt(1),{pos:i}}return r},cardinality:1},{validator:function(e,t,i,a,n){var r=n.isInYearRange(e,n.yearrange.minyear,n.yearrange.maxyear);if(!a&&!r){var o=n.determinebaseyear(n.yearrange.minyear,n.yearrange.maxyear,e).toString().slice(0,2);if(r=n.isInYearRange(e[0]+o[1]+e[1],n.yearrange.minyear,n.yearrange.maxyear))return t.buffer[i++]=o.charAt(1),{pos:i};if(o=n.determinebaseyear(n.yearrange.minyear,n.yearrange.maxyear,e).toString().slice(0,2),n.isInYearRange(o+e,n.yearrange.minyear,n.yearrange.maxyear))if(t.buffer.join("").substr(0,6)!==n.leapday)r=!0;else{var s=parseInt(e,10);r=s%4==0&&(s%100!=0||s%400==0)}else r=!1;if(r)return t.buffer[i-1]=o.charAt(0),t.buffer[i++]=o.charAt(1),t.buffer[i++]=e.charAt(0),{refreshFromBuffer:{start:i-3,end:i},pos:i}}return r},cardinality:2},{validator:function(e,t,i,a,n){return n.isInYearRange(e,n.yearrange.minyear,n.yearrange.maxyear)},cardinality:3}]}},insertMode:!1,autoUnmask:!1},"mm/dd/yyyy":{placeholder:"mm/dd/yyyy",alias:"dd/mm/yyyy",regex:{val2pre:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[13-9]|1[012])"+i+"[0-3])|(02"+i+"[0-2])")},val2:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+i+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+i+"30)|((0[13578]|1[02])"+i+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyDown:function(i,a,n,r){var o=e(this);if(i.ctrlKey&&i.keyCode===t.keyCode.RIGHT){var s=new Date;o.val((s.getMonth()+1).toString()+s.getDate().toString()+s.getFullYear().toString()),o.trigger("setvalue")}}},"yyyy/mm/dd":{mask:"y/1/2",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",leapday:"/02/29",onKeyDown:function(i,a,n,r){var o=e(this);if(i.ctrlKey&&i.keyCode===t.keyCode.RIGHT){var s=new Date;o.val(s.getFullYear().toString()+(s.getMonth()+1).toString()+s.getDate().toString()),o.trigger("setvalue")}}},"dd.mm.yyyy":{mask:"1.2.y",placeholder:"dd.mm.yyyy",leapday:"29.02.",separator:".",alias:"dd/mm/yyyy"},"dd-mm-yyyy":{mask:"1-2-y",placeholder:"dd-mm-yyyy",leapday:"29-02-",separator:"-",alias:"dd/mm/yyyy"},"mm.dd.yyyy":{mask:"1.2.y",placeholder:"mm.dd.yyyy",leapday:"02.29.",separator:".",alias:"mm/dd/yyyy"},"mm-dd-yyyy":{mask:"1-2-y",placeholder:"mm-dd-yyyy",leapday:"02-29-",separator:"-",alias:"mm/dd/yyyy"},"yyyy.mm.dd":{mask:"y.1.2",placeholder:"yyyy.mm.dd",leapday:".02.29",separator:".",alias:"yyyy/mm/dd"},"yyyy-mm-dd":{mask:"y-1-2",placeholder:"yyyy-mm-dd",leapday:"-02-29",separator:"-",alias:"yyyy/mm/dd"},datetime:{mask:"1/2/y h:s",placeholder:"dd/mm/yyyy hh:mm",alias:"dd/mm/yyyy",regex:{hrspre:new RegExp("[012]"),hrs24:new RegExp("2[0-4]|1[3-9]"),hrs:new RegExp("[01][0-9]|2[0-4]"),ampm:new RegExp("^[a|p|A|P][m|M]"),mspre:new RegExp("[0-5]"),ms:new RegExp("[0-5][0-9]")},timeseparator:":",hourFormat:"24",definitions:{h:{validator:function(e,t,i,a,n){if("24"===n.hourFormat&&24===parseInt(e,10))return t.buffer[i-1]="0",t.buffer[i]="0",{refreshFromBuffer:{start:i-1,end:i},c:"0"};var r=n.regex.hrs.test(e);if(!a&&!r&&(e.charAt(1)===n.timeseparator||-1!=="-.:".indexOf(e.charAt(1)))&&(r=n.regex.hrs.test("0"+e.charAt(0))))return t.buffer[i-1]="0",t.buffer[i]=e.charAt(0),{refreshFromBuffer:{start:++i-2,end:i},pos:i,c:n.timeseparator};if(r&&"24"!==n.hourFormat&&n.regex.hrs24.test(e)){var o=parseInt(e,10);return 24===o?(t.buffer[i+5]="a",t.buffer[i+6]="m"):(t.buffer[i+5]="p",t.buffer[i+6]="m"),10>(o-=12)?(t.buffer[i]=o.toString(),t.buffer[i-1]="0"):(t.buffer[i]=o.toString().charAt(1),t.buffer[i-1]=o.toString().charAt(0)),{refreshFromBuffer:{start:i-1,end:i+6},c:t.buffer[i]}}return r},cardinality:2,prevalidator:[{validator:function(e,t,i,a,n){var r=n.regex.hrspre.test(e);return a||r||!(r=n.regex.hrs.test("0"+e))?r:(t.buffer[i]="0",{pos:++i})},cardinality:1}]},s:{validator:"[0-5][0-9]",cardinality:2,prevalidator:[{validator:function(e,t,i,a,n){var r=n.regex.mspre.test(e);return a||r||!(r=n.regex.ms.test("0"+e))?r:(t.buffer[i]="0",{pos:++i})},cardinality:1}]},t:{validator:function(e,t,i,a,n){return n.regex.ampm.test(e+"m")},casing:"lower",cardinality:1}},insertMode:!1,autoUnmask:!1},datetime12:{mask:"1/2/y h:s t\\m",placeholder:"dd/mm/yyyy hh:mm xm",alias:"datetime",hourFormat:"12"},"mm/dd/yyyy hh:mm xm":{mask:"1/2/y h:s t\\m",placeholder:"mm/dd/yyyy hh:mm xm",alias:"datetime12",regex:{val2pre:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[13-9]|1[012])"+i+"[0-3])|(02"+i+"[0-2])")},val2:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+i+"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])"+i+"30)|((0[13578]|1[02])"+i+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},leapday:"02/29/",onKeyDown:function(i,a,n,r){var o=e(this);if(i.ctrlKey&&i.keyCode===t.keyCode.RIGHT){var s=new Date;o.val((s.getMonth()+1).toString()+s.getDate().toString()+s.getFullYear().toString()),o.trigger("setvalue")}}},"hh:mm t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"h:s t":{mask:"h:s t\\m",placeholder:"hh:mm xm",alias:"datetime",hourFormat:"12"},"hh:mm:ss":{mask:"h:s:s",placeholder:"hh:mm:ss",alias:"datetime",autoUnmask:!1},"hh:mm":{mask:"h:s",placeholder:"hh:mm",alias:"datetime",autoUnmask:!1},date:{alias:"dd/mm/yyyy"},"mm/yyyy":{mask:"1/y",placeholder:"mm/yyyy",leapday:"donotuse",separator:"/",alias:"mm/dd/yyyy"},shamsi:{regex:{val2pre:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+i+"[0-3])")},val2:function(e){var i=t.escapeRegex.call(this,e);return new RegExp("((0[1-9]|1[012])"+i+"(0[1-9]|[12][0-9]))|((0[1-9]|1[012])"+i+"30)|((0[1-6])"+i+"31)")},val1pre:new RegExp("[01]"),val1:new RegExp("0[1-9]|1[012]")},yearrange:{minyear:1300,maxyear:1499},mask:"y/1/2",leapday:"/12/30",placeholder:"yyyy/mm/dd",alias:"mm/dd/yyyy",clearIncomplete:!0}})}(jQuery,Inputmask),function(e,t){t.extendDefinitions({A:{validator:"[A-Za-zА-яЁёÀ-ÿµ]",cardinality:1,casing:"upper"},"&":{validator:"[0-9A-Za-zА-яЁёÀ-ÿµ]",cardinality:1,casing:"upper"},"#":{validator:"[0-9A-Fa-f]",cardinality:1,casing:"upper"}}),t.extendAliases({url:{definitions:{i:{validator:".",cardinality:1}},mask:"(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",insertMode:!1,autoUnmask:!1},ip:{mask:"i[i[i]].i[i[i]].i[i[i]].i[i[i]]",definitions:{i:{validator:function(e,t,i,a,n){return i-1>-1&&"."!==t.buffer[i-1]?(e=t.buffer[i-1]+e,e=i-2>-1&&"."!==t.buffer[i-2]?t.buffer[i-2]+e:"0"+e):e="00"+e,new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(e)},cardinality:1}},onUnMask:function(e,t,i){return e}},email:{mask:"*{1,64}[.*{1,64}][.*{1,64}][.*{1,64}]@*{1,64}[.*{2,64}][.*{2,6}][.*{1,2}]",greedy:!1,onBeforePaste:function(e,t){return(e=e.toLowerCase()).replace("mailto:","")},definitions:{"*":{validator:"[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",cardinality:1,casing:"lower"}},onUnMask:function(e,t,i){return e}},mac:{mask:"##:##:##:##:##:##"}})}(jQuery,Inputmask),function(e,t){t.extendAliases({numeric:{mask:function(e){function t(t){for(var i="",a=0;a<t.length;a++)i+=e.definitions[t.charAt(a)]?"\\"+t.charAt(a):t.charAt(a);return i}if(0!==e.repeat&&isNaN(e.integerDigits)&&(e.integerDigits=e.repeat),e.repeat=0,e.groupSeparator===e.radixPoint&&("."===e.radixPoint?e.groupSeparator=",":","===e.radixPoint?e.groupSeparator=".":e.groupSeparator="")," "===e.groupSeparator&&(e.skipOptionalPartCharacter=void 0),e.autoGroup=e.autoGroup&&""!==e.groupSeparator,e.autoGroup&&("string"==typeof e.groupSize&&isFinite(e.groupSize)&&(e.groupSize=parseInt(e.groupSize)),isFinite(e.integerDigits))){var i=Math.floor(e.integerDigits/e.groupSize),a=e.integerDigits%e.groupSize;e.integerDigits=parseInt(e.integerDigits)+(0===a?i-1:i),e.integerDigits<1&&(e.integerDigits="*")}e.placeholder.length>1&&(e.placeholder=e.placeholder.charAt(0)),e.radixFocus=e.radixFocus&&""!==e.placeholder&&!0===e.integerOptional,e.definitions[";"]=e.definitions["~"],e.definitions[";"].definitionSymbol="~",1==e.numericInput&&(e.radixFocus=!1,e.digitsOptional=!1,isNaN(e.digits)&&(e.digits=2),e.decimalProtect=!1);var n=t(e.prefix);return n+="[+]",n+=!0===e.integerOptional?"~{1,"+e.integerDigits+"}":"~{"+e.integerDigits+"}",void 0!==e.digits&&(isNaN(e.digits)||parseInt(e.digits)>0)&&(n+=e.digitsOptional?"["+(e.decimalProtect?":":e.radixPoint)+";{1,"+e.digits+"}]":(e.decimalProtect?":":e.radixPoint)+";{"+e.digits+"}"),""!==e.negationSymbol.back&&(n+="[-]"),n+=t(e.suffix),e.greedy=!1,n},placeholder:"",greedy:!1,digits:"*",digitsOptional:!0,radixPoint:".",radixFocus:!0,groupSize:3,groupSeparator:"",autoGroup:!1,allowPlus:!0,allowMinus:!0,negationSymbol:{front:"-",back:""},integerDigits:"+",integerOptional:!0,prefix:"",suffix:"",rightAlign:!0,decimalProtect:!0,min:null,max:null,step:1,insertMode:!0,autoUnmask:!1,unmaskAsNumber:!1,postFormat:function(i,a,n,r){!0===r.numericInput&&(i=i.reverse(),isFinite(a)&&(a=i.join("").length-a-1));var o,s,l=!1;i.length>=r.suffix.length&&i.join("").indexOf(r.suffix)===i.length-r.suffix.length&&(i.length=i.length-r.suffix.length,l=!0);var u=!1,c=i[a=a>=i.length?i.length-1:a<r.prefix.length?r.prefix.length:a];if(""===r.groupSeparator||!0!==r.numericInput&&-1!==e.inArray(r.radixPoint,i)&&a>e.inArray(r.radixPoint,i)||new RegExp("["+t.escapeRegex(r.negationSymbol.front)+"+]").test(c)){if(l)for(o=0,s=r.suffix.length;s>o;o++)i.push(r.suffix.charAt(o));return{pos:a}}var f=i.slice();c===r.groupSeparator&&(f.splice(a--,1),c=f[a]),n?c!==r.radixPoint&&(f[a]="?"):f.splice(a,0,"?");var p=f.join(""),d=p;if(p.length>0&&r.autoGroup||n&&-1!==p.indexOf(r.groupSeparator)){var m=t.escapeRegex(r.groupSeparator);u=0===p.indexOf(r.groupSeparator);var h=(p=p.replace(new RegExp(m,"g"),"")).split(r.radixPoint);if((p=""===r.radixPoint?p:h[0])!==r.prefix+"?0"&&p.length>=r.groupSize+r.prefix.length)for(var v=new RegExp("([-+]?[\\d?]+)([\\d?]{"+r.groupSize+"})");v.test(p);)p=(p=p.replace(v,"$1"+r.groupSeparator+"$2")).replace(r.groupSeparator+r.groupSeparator,r.groupSeparator);""!==r.radixPoint&&h.length>1&&(p+=r.radixPoint+h[1])}for(u=d!==p,i.length=p.length,o=0,s=p.length;s>o;o++)i[o]=p.charAt(o);var g=e.inArray("?",i);if(-1===g&&c===r.radixPoint&&(g=e.inArray(r.radixPoint,i)),n?i[g]=c:i.splice(g,1),!u&&l)for(o=0,s=r.suffix.length;s>o;o++)i.push(r.suffix.charAt(o));return g=r.numericInput&&isFinite(a)?i.join("").length-g-1:g,r.numericInput&&(i=i.reverse(),e.inArray(r.radixPoint,i)<g&&i.join("").length-r.suffix.length!==g&&(g-=1)),{pos:g,refreshFromBuffer:u,buffer:i}},onBeforeWrite:function(i,a,n,r){if(i&&("blur"===i.type||"checkval"===i.type)){var o=a.join(""),s=o.replace(r.prefix,"");if(s=(s=s.replace(r.suffix,"")).replace(new RegExp(t.escapeRegex(r.groupSeparator),"g"),""),","===r.radixPoint&&(s=s.replace(t.escapeRegex(r.radixPoint),".")),isFinite(s)&&isFinite(r.min)&&parseFloat(s)<parseFloat(r.min))return e.extend(!0,{refreshFromBuffer:!0,buffer:(r.prefix+r.min).split("")},r.postFormat((r.prefix+r.min).split(""),0,!0,r));if(!0!==r.numericInput){var l=""!==r.radixPoint?a.join("").split(r.radixPoint):[a.join("")],u=l[0].match(r.regex.integerPart(r)),c=2===l.length?l[1].match(r.regex.integerNPart(r)):void 0;if(u){u[0]!==r.negationSymbol.front+"0"&&u[0]!==r.negationSymbol.front&&"+"!==u[0]||void 0!==c&&!c[0].match(/^0+$/)||a.splice(u.index,1);var f=e.inArray(r.radixPoint,a);if(-1!==f){if(isFinite(r.digits)&&!r.digitsOptional){for(var p=1;p<=r.digits;p++)(void 0===a[f+p]||a[f+p]===r.placeholder.charAt(0))&&(a[f+p]="0");return{refreshFromBuffer:o!==a.join(""),buffer:a}}if(f===a.length-r.suffix.length-1)return a.splice(f,1),{refreshFromBuffer:!0,buffer:a}}}}}if(r.autoGroup){var d=r.postFormat(a,r.numericInput?n:n-1,!0,r);return d.caret=n<=r.prefix.length?d.pos:d.pos+1,d}},regex:{integerPart:function(e){return new RegExp("["+t.escapeRegex(e.negationSymbol.front)+"+]?\\d+")},integerNPart:function(e){return new RegExp("[\\d"+t.escapeRegex(e.groupSeparator)+"]+")}},signHandler:function(e,t,i,a,n){if(!a&&n.allowMinus&&"-"===e||n.allowPlus&&"+"===e){var r=t.buffer.join("").match(n.regex.integerPart(n));if(r&&r[0].length>0)return t.buffer[r.index]===("-"===e?"+":n.negationSymbol.front)?"-"===e?""!==n.negationSymbol.back?{pos:r.index,c:n.negationSymbol.front,remove:r.index,caret:i,insert:{pos:t.buffer.length-n.suffix.length-1,c:n.negationSymbol.back}}:{pos:r.index,c:n.negationSymbol.front,remove:r.index,caret:i}:""!==n.negationSymbol.back?{pos:r.index,c:"+",remove:[r.index,t.buffer.length-n.suffix.length-1],caret:i}:{pos:r.index,c:"+",remove:r.index,caret:i}:t.buffer[r.index]===("-"===e?n.negationSymbol.front:"+")?"-"===e&&""!==n.negationSymbol.back?{remove:[r.index,t.buffer.length-n.suffix.length-1],caret:i-1}:{remove:r.index,caret:i-1}:"-"===e?""!==n.negationSymbol.back?{pos:r.index,c:n.negationSymbol.front,caret:i+1,insert:{pos:t.buffer.length-n.suffix.length,c:n.negationSymbol.back}}:{pos:r.index,c:n.negationSymbol.front,caret:i+1}:{pos:r.index,c:e,caret:i+1}}return!1},radixHandler:function(t,i,a,n,r){if(!n&&(-1!==e.inArray(t,[",","."])&&(t=r.radixPoint),t===r.radixPoint&&void 0!==r.digits&&(isNaN(r.digits)||parseInt(r.digits)>0))){var o=e.inArray(r.radixPoint,i.buffer),s=i.buffer.join("").match(r.regex.integerPart(r));if(-1!==o&&i.validPositions[o])return i.validPositions[o-1]?{caret:o+1}:{pos:s.index,c:s[0],caret:o+1};if(!s||"0"===s[0]&&s.index+1!==a)return i.buffer[s?s.index:a]="0",{pos:(s?s.index:a)+1,c:r.radixPoint}}return!1},leadingZeroHandler:function(t,i,a,n,r){if(!0===r.numericInput){if("0"===i.buffer[i.buffer.length-r.prefix.length-1])return{pos:a,remove:i.buffer.length-r.prefix.length-1}}else{var o=i.buffer.join("").match(r.regex.integerNPart(r)),s=e.inArray(r.radixPoint,i.buffer);if(o&&!n&&(-1===s||s>=a))if(0===o[0].indexOf("0")){a<r.prefix.length&&(a=o.index);var l=e.inArray(r.radixPoint,i._buffer),u=i._buffer&&i.buffer.slice(s).join("")===i._buffer.slice(l).join("")||0===parseInt(i.buffer.slice(s+1).join("")),c=i._buffer&&i.buffer.slice(o.index,s).join("")===i._buffer.slice(r.prefix.length,l).join("")||"0"===i.buffer.slice(o.index,s).join("");if(-1===s||u&&c)return i.buffer.splice(o.index,1),{pos:a=a>o.index?a-1:o.index,remove:o.index};if(o.index+1===a||"0"===t)return i.buffer.splice(o.index,1),{pos:a=o.index,remove:o.index}}else if("0"===t&&a<=o.index&&o[0]!==r.groupSeparator)return!1}return!0},postValidation:function(e,i,a){var n=!0,r=(a.numericInput?e.slice().reverse().join(""):e.join("")).replace(a.prefix,"");return r=(r=r.replace(a.suffix,"")).replace(new RegExp(t.escapeRegex(a.groupSeparator),"g"),""),","===a.radixPoint&&(r=r.replace(t.escapeRegex(a.radixPoint),".")),r=(r=(r=r.replace(new RegExp("^"+t.escapeRegex(a.negationSymbol.front)),"-")).replace(new RegExp(t.escapeRegex(a.negationSymbol.back)+"$"),""))===a.negationSymbol.front?r+"0":r,isFinite(r)&&(null!==a.max&&isFinite(a.max)&&(r=parseFloat(r)>parseFloat(a.max)?a.max:r,n=a.postFormat((a.prefix+r).split(""),0,!0,a)),null!==a.min&&isFinite(a.min)&&(r=parseFloat(r)<parseFloat(a.min)?a.min:r,n=a.postFormat((a.prefix+r).split(""),0,!0,a))),n},definitions:{"~":{validator:function(i,a,n,r,o){var s=o.signHandler(i,a,n,r,o);if(!s&&(!(s=o.radixHandler(i,a,n,r,o))&&(!0===(s=r?new RegExp("[0-9"+t.escapeRegex(o.groupSeparator)+"]").test(i):new RegExp("[0-9]").test(i))&&!0===(s=o.leadingZeroHandler(i,a,n,r,o))))){var l=e.inArray(o.radixPoint,a.buffer);s=-1!==l&&!1===o.digitsOptional&&!0!==o.numericInput&&n>l&&!r?{pos:n,remove:n}:{pos:n}}return s},cardinality:1,prevalidator:null},"+":{validator:function(e,t,i,a,n){var r=n.signHandler(e,t,i,a,n);return!r&&(a&&n.allowMinus&&e===n.negationSymbol.front||n.allowMinus&&"-"===e||n.allowPlus&&"+"===e)&&(r="-"!==e||(""!==n.negationSymbol.back?{pos:i,c:"-"===e?n.negationSymbol.front:"+",caret:i+1,insert:{pos:t.buffer.length,c:n.negationSymbol.back}}:{pos:i,c:"-"===e?n.negationSymbol.front:"+",caret:i+1})),r},cardinality:1,prevalidator:null,placeholder:""},"-":{validator:function(e,t,i,a,n){var r=n.signHandler(e,t,i,a,n);return!r&&a&&n.allowMinus&&e===n.negationSymbol.back&&(r=!0),r},cardinality:1,prevalidator:null,placeholder:""},":":{validator:function(e,i,a,n,r){var o=r.signHandler(e,i,a,n,r);if(!o){var s="["+t.escapeRegex(r.radixPoint)+",\\.]";(o=new RegExp(s).test(e))&&i.validPositions[a]&&i.validPositions[a].match.placeholder===r.radixPoint&&(o={caret:a+1})}return o?{c:r.radixPoint}:o},cardinality:1,prevalidator:null,placeholder:function(e){return e.radixPoint}}},onUnMask:function(e,i,a){var n=e.replace(a.prefix,"");return n=(n=n.replace(a.suffix,"")).replace(new RegExp(t.escapeRegex(a.groupSeparator),"g"),""),a.unmaskAsNumber?(""!==a.radixPoint&&-1!==n.indexOf(a.radixPoint)&&(n=n.replace(t.escapeRegex.call(this,a.radixPoint),".")),Number(n)):n},isComplete:function(e,i){var a=e.join(""),n=e.slice();if(i.postFormat(n,0,!0,i),n.join("")!==a)return!1;var r=a.replace(i.prefix,"");return r=(r=r.replace(i.suffix,"")).replace(new RegExp(t.escapeRegex(i.groupSeparator),"g"),""),","===i.radixPoint&&(r=r.replace(t.escapeRegex(i.radixPoint),".")),isFinite(r)},onBeforeMask:function(e,i){if(""!==i.radixPoint&&isFinite(e))e=e.toString().replace(".",i.radixPoint);else{var a=e.match(/,/g),n=e.match(/\./g);n&&a?n.length>a.length?e=(e=e.replace(/\./g,"")).replace(",",i.radixPoint):a.length>n.length?e=(e=e.replace(/,/g,"")).replace(".",i.radixPoint):e=e.indexOf(".")<e.indexOf(",")?e.replace(/\./g,""):e=e.replace(/,/g,""):e=e.replace(new RegExp(t.escapeRegex(i.groupSeparator),"g"),"")}if(0===i.digits&&(-1!==e.indexOf(".")?e=e.substring(0,e.indexOf(".")):-1!==e.indexOf(",")&&(e=e.substring(0,e.indexOf(",")))),""!==i.radixPoint&&isFinite(i.digits)&&-1!==e.indexOf(i.radixPoint)){var r=e.split(i.radixPoint)[1].match(new RegExp("\\d*"))[0];if(parseInt(i.digits)<r.toString().length){var o=Math.pow(10,parseInt(i.digits));e=e.replace(t.escapeRegex(i.radixPoint),"."),e=(e=Math.round(parseFloat(e)*o)/o).toString().replace(".",i.radixPoint)}}return e.toString()},canClearPosition:function(i,a,n,r,o){var s=i.validPositions[a].input,l=s!==o.radixPoint||null!==i.validPositions[a].match.fn&&!1===o.decimalProtect||isFinite(s)||a===n||s===o.groupSeparator||s===o.negationSymbol.front||s===o.negationSymbol.back;if(l&&isFinite(s)){var u,c=e.inArray(o.radixPoint,i.buffer),f=!1;if(void 0===i.validPositions[c]&&(i.validPositions[c]={input:o.radixPoint},f=!0),!r&&i.buffer){var p=a+1;if(null==(u=i.buffer.join("").substr(0,a).match(o.regex.integerNPart(o)))||0===parseInt(u[0].replace(new RegExp(t.escapeRegex(o.groupSeparator),"g"),"")))for(;i.validPositions[p]&&(i.validPositions[p].input===o.groupSeparator||"0"===i.validPositions[p].input);)delete i.validPositions[p],p++}var d=[];for(var m in i.validPositions)void 0!==i.validPositions[m].input&&d.push(i.validPositions[m].input);if(f&&delete i.validPositions[c],c>0){var h=d.join("");if(u=h.match(o.regex.integerNPart(o)))if(c>=a)if(0===u[0].indexOf("0"))l=u.index!==a||"0"===o.placeholder;else{var v=parseInt(u[0].replace(new RegExp(t.escapeRegex(o.groupSeparator),"g"),"")),g=parseInt(h.split(o.radixPoint)[1]);10>v&&i.validPositions[a]&&("0"!==o.placeholder||g>0)&&(i.validPositions[a].input="0",i.p=o.prefix.length+1,l=!1)}else 0===u[0].indexOf("0")&&3===h.length&&(i.validPositions={},l=!1)}}return l},onKeyDown:function(i,a,n,r){var o=e(this);if(i.ctrlKey)switch(i.keyCode){case t.keyCode.UP:o.val(parseFloat(this.inputmask.unmaskedvalue())+parseInt(r.step)),o.trigger("setvalue");break;case t.keyCode.DOWN:o.val(parseFloat(this.inputmask.unmaskedvalue())-parseInt(r.step)),o.trigger("setvalue")}}},currency:{prefix:"$ ",groupSeparator:",",alias:"numeric",placeholder:"0",autoGroup:!0,digits:2,digitsOptional:!1,clearMaskOnLostFocus:!1},decimal:{alias:"numeric"},integer:{alias:"numeric",digits:0,radixPoint:""},percentage:{alias:"numeric",digits:2,radixPoint:".",placeholder:"0",autoGroup:!1,min:0,max:100,suffix:" %",allowPlus:!1,allowMinus:!1}})}(jQuery,Inputmask),function(e,t){t.extendAliases({phone:{url:"phone-codes/phone-codes.js",countrycode:"",phoneCodeCache:{},mask:function(t){if(void 0===t.phoneCodeCache[t.url]){var i=[];t.definitions["#"]=t.definitions[9],e.ajax({url:t.url,async:!1,type:"get",dataType:"json",success:function(e){i=e},error:function(e,i,a){alert(a+" - "+t.url)}}),t.phoneCodeCache[t.url]=i.sort(function(e,t){return(e.mask||e)<(t.mask||t)?-1:1})}return t.phoneCodeCache[t.url]},keepStatic:!1,nojumps:!0,nojumpsThreshold:1,onBeforeMask:function(e,t){var i=e.replace(/^0{1,2}/,"").replace(/[\s]/g,"");return(i.indexOf(t.countrycode)>1||-1===i.indexOf(t.countrycode))&&(i="+"+t.countrycode+i),i}},phonebe:{alias:"phone",url:"phone-codes/phone-be.js",countrycode:"32",nojumpsThreshold:4}})}(jQuery,Inputmask),function(e,t){t.extendAliases({Regex:{mask:"r",greedy:!1,repeat:"*",regex:null,regexTokens:null,tokenizer:/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,quantifierFilter:/[0-9]+[^,]/,isComplete:function(e,t){return new RegExp(t.regex).test(e.join(""))},definitions:{r:{validator:function(t,i,a,n,r){function o(e,t){this.matches=[],this.isGroup=e||!1,this.isQuantifier=t||!1,this.quantifier={min:1,max:1},this.repeaterPart=void 0}function s(t,i){var a=!1;i&&(f+="(",d++);for(var n=0;n<t.matches.length;n++){var r=t.matches[n];if(!0===r.isGroup)a=s(r,!0);else if(!0===r.isQuantifier){var o=e.inArray(r,t.matches),u=t.matches[o-1],c=f;if(isNaN(r.quantifier.max)){for(;r.repeaterPart&&r.repeaterPart!==f&&r.repeaterPart.length>f.length&&!(a=s(u,!0)););(a=a||s(u,!0))&&(r.repeaterPart=f),f=c+r.quantifier.max}else{for(var p=0,m=r.quantifier.max-1;m>p&&!(a=s(u,!0));p++);f=c+"{"+r.quantifier.min+","+r.quantifier.max+"}"}}else if(void 0!==r.matches)for(var h=0;h<r.length&&!(a=s(r[h],i));h++);else{var v;if("["==r.charAt(0)){v=f,v+=r;for(var g=0;d>g;g++)v+=")";a=new RegExp("^("+v+")$").test(l)}else for(var y=0,k=r.length;k>y;y++)if("\\"!==r.charAt(y)){v=f,v=(v+=r.substr(0,y+1)).replace(/\|$/,"");for(g=0;d>g;g++)v+=")";if(a=new RegExp("^("+v+")$").test(l))break}f+=r}if(a)break}return i&&(f+=")",d--),a}var l,u,c=i.buffer.slice(),f="",p=!1,d=0;null===r.regexTokens&&function(){var e,t,i=new o,a=[];for(r.regexTokens=[];e=r.tokenizer.exec(r.regex);)switch(t=e[0],t.charAt(0)){case"(":a.push(new o(!0));break;case")":u=a.pop(),a.length>0?a[a.length-1].matches.push(u):i.matches.push(u);break;case"{":case"+":case"*":var n=new o(!1,!0),s=(t=t.replace(/[{}]/g,"")).split(","),l=isNaN(s[0])?s[0]:parseInt(s[0]),c=1===s.length?l:isNaN(s[1])?s[1]:parseInt(s[1]);if(n.quantifier={min:l,max:c},a.length>0){var f=a[a.length-1].matches;(e=f.pop()).isGroup||((u=new o(!0)).matches.push(e),e=u),f.push(e),f.push(n)}else(e=i.matches.pop()).isGroup||((u=new o(!0)).matches.push(e),e=u),i.matches.push(e),i.matches.push(n);break;default:a.length>0?a[a.length-1].matches.push(t):i.matches.push(t)}i.matches.length>0&&r.regexTokens.push(i)}(),c.splice(a,0,t),l=c.join("");for(var m=0;m<r.regexTokens.length;m++){var h=r.regexTokens[m];if(p=s(h,h.isGroup))break}return p},cardinality:1}}}})}(jQuery,Inputmask);

var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any()) { }

if (location.hash) {
	var hsh = location.hash.replace('#', '');
	if ($('.popup-' + hsh).length > 0) {
		popupOpen(hsh);
	} else if ($('div.' + hsh).length > 0) {
		$('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
	}
}
$('.wrapper').addClass('loaded');

var act = "click";
if (isMobile.iOS()) {
	var act = "touchstart";
}


//BURGER
let iconMenu = document.querySelector(".icon-menu");
let body = document.querySelector("body");
let menuBody = document.querySelector(".mob-menu");
if (iconMenu) {
	iconMenu.addEventListener("click", function () {
		iconMenu.classList.toggle("active");
		body.classList.toggle("lock");
		menuBody.classList.toggle("active");
	});
}


// // Закрытие моб меню при клике на якорную ссылку
$('.menu__list a').on('click', function () {
	if ($('.icon-menu').css('display') != 'none') {
		$(".icon-menu").trigger("click");
	}
});


// // Плавный скролл якорных ссылок
//     $(".menu__list").on("click","a", function (event) {
//         event.preventDefault();
//         var id  = $(this).attr('href'),
//             top = $(id).offset().top;
//         $('body,html').animate({scrollTop: top}, 1500);
//     });


// Открытие ПК меню при наведении до 1024px
if (document.body.clientWidth > 1024) {
	function hideMenu() {
		$('.mob-menu').slideUp(600);
	}
	function showMenu() {
		$('.mob-menu').slideDown(600);
	}
	$(document).ready(function () {
		$(".menu__catalogy").on("mouseover", showMenu);
		$(".header__menu").on("mouseleave", hideMenu);
	});
}

// Slider на главной
$('.info-sl__slider').slick({
	arrows: false,
	dots: true,
	infinite: true,
	speed: 1000,
	slidesToShow: 1,
	autoplay: true,
	autoplaySpeed: 1800,
	adaptiveHeight: true
});


// Slider вертикальный
$('.sidebar-slider').slick({
	arrows: true,
	dots: false,
	infinite: true,
	speed: 1000,
	slidesToShow: 1,
	autoplay: true,
	// autoplaySpeed: 1800,
	adaptiveHeight: true,
	vertical: true
});


// Slider Товара
$('.select-prod-slider').slick({
	arrows: false,
	dots: false,
	infinite: true,
	speed: 1000,
	slidesToShow: 4,
	slidesToScroll: 1,
	centerMode: true,
	focusOnSelect: true,
	autoplaySpeed: 1800,
	asNavFor: ".select-slider-big",
	adaptiveHeight: true
});
$('.select-slider-big').slick({
	arrows: false,
	dots: false,
	fade: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	draggable: false,
	asNavFor: ".select-prod-slider"
});


// Выбо колличества
$('.minus').click(function () {
	var $input = $(this).parent().find('input');
	var count = parseInt($input.val()) - 1;
	count = count < 1 ? 1 : count;
	$input.val(count);
	$input.change();
	return false;
});
$('.plus').click(function () {
	var $input = $(this).parent().find('input');
	$input.val(parseInt($input.val()) + 1);
	$input.change();
	return false;
});


// Маска телефона
var inputmask_phone = { "mask": "+9(999)999-99-99" };
jQuery("input[type=tel]").inputmask(inputmask_phone);



//Валидация телефона + Отправщик
jQuery('.header__form button').click(function (e) {
	e.preventDefault();

	let persPhone = jQuery('.header__form input[name=tel]').val();
	if ((persPhone == "") || (persPhone.indexOf("_") > 0)) {
		$(this).siblings('input[name=tel]').css("background-color", "#ff91a4")
		return;
	}

	var jqXHR = jQuery.post(
		"../sender/send.php",
		{
			phone: jQuery('.header__form input[name=tel]').val(),
			name: jQuery('.header__form input[name=name]').val(),
			mail: jQuery('.header__form textarea[name=text]').val(),
		}

	);


	jqXHR.done(function (responce) {
		console.log(responce);
		document.location.href = "../thank-you.html";
		jQuery('.header__form input[name=tel]').val("");
		jQuery('.header__form input[name=name]').val("");
		jQuery('.header__form textarea[name=text]').val("");
	});

	jqXHR.fail(function (responce) {
		console.log(responce);
		alert("Произошла ошибка попробуйте позднее!");
	});

});


$(".fancybox").fancybox();

//ZOOM
if ($('.gallery').length > 0) {
	baguetteBox.run('.gallery', {
		// Custom options
	});
}
/*
CLOUD-ZOOM
<a rel="position:'right',adjustX:25,adjustY:0,Width: 432" href="img/product/zoom.jpg" class="cloud-zoom product-main-mainimage__item">
	<img class="cloudzoom-gallery" src="img/product/zoom.jpg" alt="" />
</a>
*/


//POPUP
$('.pl').click(function (event) {
	var pl = $(this).attr('href').replace('#', '');
	var v = $(this).data('vid');
	popupOpen(pl, v);
	return false;
});
function popupOpen(pl, v) {
	$('.popup').removeClass('active').hide();
	if (!$('.menu__body').hasClass('active')) {
		//$('body').data('scroll',$(window).scrollTop());
	}
	if (!isMobile.any()) {
		$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
		$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
	} else {
		setTimeout(function () {
			$('body').addClass('lock');
		}, 300);
	}
	history.pushState('', '', '#' + pl);
	if (v != '' && v != null) {
		$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

	if ($('.popup-' + pl).find('.slick-slider').length > 0) {
		$('.popup-' + pl).find('.slick-slider').slick('setPosition');
	}
}
function openPopupById(popup_id) {
	$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
}
function popupClose() {
	$('.popup').removeClass('active').fadeOut(300);
	if (!$('.menu__body').hasClass('active')) {
		if (!isMobile.any()) {
			setTimeout(function () {
				$('body').css({ paddingRight: 0 });
				$('.pdb').css({ paddingRight: 0 });
			}, 200);
			setTimeout(function () {
				$('body').removeClass('lock');
				//$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}, 200);
		} else {
			$('body').removeClass('lock');
			//$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}
$('.popup-close,.popup__close').click(function (event) {
	popupClose();
	return false;
});
$('.popup').click(function (e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});
$(document).on('keydown', function (e) {
	if (e.which == 27) {
		popupClose();
	}
});

$('.goto').click(function () {
	var el = $(this).attr('href').replace('#', '');
	var offset = 0;
	$('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

	if ($('.menu__body').hasClass('active')) {
		$('.menu__body,.icon-menu').removeClass('active');
		$('body').removeClass('lock');
	}
	return false;
});


function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();


//Клик вне области
$(document).on('click touchstart', function (e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
	};
});

//UP
$(window).scroll(function () {
	var w = $(window).width();
	if ($(window).scrollTop() > 50) {
		$('#up').fadeIn(300);
	} else {
		$('#up').fadeOut(300);
	}
});
$('#up').click(function (event) {
	$('body,html').animate({ scrollTop: 0 }, 300);
});

$('body').on('click', '.tab__navitem', function (event) {
	var eq = $(this).index();
	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});
$.each($('.spoller.active'), function (index, val) {
	$(this).next().show();
});
$('body').on('click', '.spoller', function (event) {
	if ($(this).hasClass('mob') && !isMobile.any()) {
		return false;
	}

	if ($(this).parents('.one').length > 0) {
		$(this).parents('.one').find('.spoller').not($(this)).removeClass('active').next().slideUp(300);
		$(this).parents('.one').find('.spoller').not($(this)).parent().removeClass('active');
	}

	if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
		$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
			$(this).removeClass('active');
			$(this).next().slideUp(300);
		});
	}
	$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
		if ($(this).parent().find('.slick-slider').length > 0) {
			$(this).parent().find('.slick-slider').slick('setPosition');
		}
	});
	return false;
});



function scrolloptions() {
	var scs = 100;
	var mss = 50;
	var bns = false;
	if (isMobile.any()) {
		scs = 10;
		mss = 1;
		bns = true;
	}
	var opt = {
		cursorcolor: "#fff",
		cursorwidth: "4px",
		background: "",
		autohidemode: true,
		cursoropacitymax: 0.4,
		bouncescroll: bns,
		cursorborderradius: "0px",
		scrollspeed: scs,
		mousescrollstep: mss,
		directionlockdeadzone: 0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}
function scroll() {
	$('.scroll-body').niceScroll('.scroll-list', scrolloptions());
}
if (navigator.appVersion.indexOf("Mac") != -1) {
} else {
	if ($('.scroll-body').length > 0) { scroll(); }
}


// function scrollwhouse(){
// 		var scs=100;
// 		var mss=50;
// 		var bns=false;
// 	if(isMobile.any()){
// 		scs=10;
// 		mss=1;
// 		bns=true;
// 	}
// 	var opt={
// 		cursorcolor:"#afafaf",
// 		cursorwidth: "5px",
// 		background: "",
// 		autohidemode:false,
// 		railalign: 'left',
// 		cursoropacitymax: 1,
// 		bouncescroll:bns,
// 		cursorborderradius: "0px",
// 		scrollspeed:scs,
// 		mousescrollstep:mss,
// 		directionlockdeadzone:0,
// 		cursorborder: "0px solid #fff",
// 	};
// 	return opt;
// }
// $('.whouse-content-body').niceScroll('.whouse-content-scroll',scrollwhouse());
// $('.whouse-content-body').scroll(function(event) {
// 		var s=$(this).scrollTop();
// 		var r=Math.abs($(this).outerHeight()-$('.whouse-content-scroll').outerHeight());
// 		var p=s/r*100;
// 	$('.whouse-content__shadow').css({opacity:1-1/100*p});
// });



if ($('.t,.tip').length > 0) {
	tip();
}
function tip() {
	$('.t,.tip').webuiPopover({
		placement: 'top',
		trigger: 'hover',
		backdrop: false,
		//selector:true,
		animation: 'fade',
		dismissible: true,
		padding: false,
		//hideEmpty: true
		onShow: function ($element) { },
		onHide: function ($element) { },
	}).on('show.webui.popover hide.webui.popover', function (e) {
		$(this).toggleClass('active');
	});
}

//scrollToFixed Фиксовая шапка
  // $(".header").scrollToFixed({
  //   marginTop: -1
  // });
});
