/*! TSLib - v1.0.1 - 2017-08-22
* Includes: jquery-1.10.2.min.js、myAlert.js
* Copyright 2017 TSLib; Licensed Tristar 
* ===============================================
* Date	Name	Comment
* ===============================================
* 2017/08/22	TomLai	init
*/

$(document).ready(function(){
	$('.verify_phone').attr('maxlength',20);
	$('.verify_phone').keypress(function(event){
		return /[0-9\-\(\)\+]/.test(String.fromCharCode(event.which || event.keyCode));
	});

    $('.verify_number').keypress(function(event){
        return /[0-9\.]/.test(String.fromCharCode(event.which || event.keyCode));
    });

    $('.require').keyup(function(even){
        if($(this).val()!=''){
        	$(this).removeClass('error');
			$(this).closest('.fill_item').find('.error_message').hide(); 
        }
    });

    $('.verify_email').keyup(function(even){
        if($(this).val()!='' && Verify.ValidateEmail($(this).val())){
        	$(this).removeClass('error');
			$(this).closest('.fill_item').find('.error_message').hide(); 
        }
    });
});

function verifyNumberKeypress(event){
    return /[0-9\.]/.test(String.fromCharCode(event.which || event.keyCode));
}

function Verify() {
	
}

Verify.ValidRequire = function(selector) {
    return Verify.ValidRequireByObj($(selector));
}

Verify.ValidRequireByObj = function(objSelector) {
    var errorMsg = '';

    objSelector.find('.require').each(function(){
        $(this).removeClass('error');
        $(this).closest('.fill_item').find('.error_message').html('');    
        $(this).closest('.fill_item').find('.error_message').hide(); 
    });

    objSelector.find('.require').each(function(){
    	error ='';
        if($(this).val()=='') {
        	$(this).addClass('error');
			if($(this).attr('validName')==null) {
				if($(this).attr('type')=='text') {
					error = $(this).attr('placeholder')+'<br>';
				}
			} else {
				error = '請輸入'+$(this).attr('validName')+'<br>';
			}      

            var errorHtml = $(this).closest('.fill_item').find('.error_message').html();

            if(errorHtml=='') {
                errorHtml = error.replace('<br>','');
            } else {
                errorHtml = errorHtml + '、' + error.replace('<br>','');
            }

			$(this).closest('.fill_item').find('.error_message').html(errorHtml);    
			$(this).closest('.fill_item').find('.error_message').show();  
        }

        if(errorMsg=='' && error!='') $(this).focus();
        errorMsg+= error;
    });

    objSelector.find('.verify_email').each(function(){
    	error ='';
    	if(!Verify.ValidateEmail($(this).val())) {
    		$(this).addClass('error');
			error =  '請輸入正確的'+ $(this).attr('validName')+'格式<br>';
			$(this).closest('.fill_item').find('.error_message').html(error);    
			$(this).closest('.fill_item').find('.error_message').show();  
    	} 

    	if(errorMsg=='' && error!='') $(this).focus();
		errorMsg+= error;
    });

    return errorMsg;
}

Verify.ValidateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
