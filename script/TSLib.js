/*! TSLib - v1.0.9 - 2017-12-05
* Includes: jquery-1.10.2.min.js、myAlert.js
* Copyright 2017 TSLib; Licensed Tristar 
* ===============================================
* Date	Name	Comment
* ===============================================
* 2017/08/22	TomLai	init
* 2017/11/03    Prefix Update fix
* 2017/12/05    AddControl and sortDataList
* 2017/12/06    initChkBoxId
* 2017/12/07    setLangData、setDataByObj
* 2017/12/08    sortDataListByObj
* 2017/12/08    getLangFieldValues,getLangFieldValuesByObj
* 2017/12/11    getCheckedArr
*/
function TSLib() {
    
}

TSLib.RootDir = '';
TSLib.countrys = new Object();
TSLib.citys = new Object();
TSLib.ajaxResult = '';

TSLib.getFieldId = function(source,attr,prefix) {
    var id = '';
    if($(source).attr('fieldName')!=null) {
        id = $(source).attr('fieldName');
    } else {
        id = String($(source).attr(attr)).replace(prefix,'');
    }
    return id;
}

TSLib.setFieldValuesInput = function(data,selector,prefix,inputName,attr,type) {
    $(selector+' '+inputName).each(function() {
        if($(this).attr('SpecField')=='true') {
            return;
        }

        var id = TSLib.getFieldId(this,attr,prefix);
        if(id==undefined) return;

        if(type=='val'){
            data[id] = $(this).val();
        }

        if(type=='html'){
            data[id] = $(this).html();
        }

        if(type=='radio') {
            if($(this).prop('checked')) {
                data[id] = $(this).val();
            }
        }

        if(type=='checkbox'){
            if(data[id]==null) {
                data[id] = [];
            }
            if($(this).prop('checked')) {
                var value = $(this).val();
                data[id].push(value);
            }
        }
    });
}

TSLib.resetLangData = function(data,name) {  
    var langTypes = data['LanguageType'];
    var i = 0;
    var langCheck = new Object();
    langCheck['tw'] = false;
    langCheck['us'] = false;
    langCheck['jp'] = false;
    langCheck['cn'] = false;

    for(i=0;i<langTypes.length;i++) {
        langCheck[langTypes[i]] = true;
    }

    var langData = new Object();
    var langs = ['tw','us','jp','cn'];
    langs.forEach(function(lang) {
        if(langCheck[lang]) {
            if(data[lang+'_'+name]!=null) { 
                langData[lang] = data[lang+'_'+name];
                delete data[lang+'_'+name];
            }
        } else {
            delete data[lang+'_'+name];
        }
    });

    data[name] = JSON.stringify(langData);
}

TSLib.getLangFieldValues = function(selector,name) {
    return TSLib.getLangFieldValuesByObj($(selector),name);
}

TSLib.getLangFieldValuesByObj = function(objSelector,name) {
    var langs = new Object();
    objSelector.find('input[fieldName='+name+']').each(function(){
        langs[$(this).attr('lang')] = $(this).val();
    });

    objSelector.find('textarea[fieldName='+name+']').each(function(){
        langs[$(this).attr('lang')] = $(this).val();
    });

    return langs;
}

TSLib.getPostData = function(selector) {
	return TSLib.getFieldValues(selector,'');
}

TSLib.getFieldValues = function(selector,prefix) {
    if(prefix==null) {
        prefix = '';
    }

    var data = new Object();
    TSLib.setFieldValuesInput(data,selector,prefix,'input[type=hidden]','id','val');
    TSLib.setFieldValuesInput(data,selector,prefix,'input[type=text]','id','val');
    TSLib.setFieldValuesInput(data,selector,prefix,'textarea','id','val');
    TSLib.setFieldValuesInput(data,selector,prefix,'select','id','val');
    TSLib.setFieldValuesInput(data,selector,prefix,'.field_div','id','html');
    TSLib.setFieldValuesInput(data,selector,prefix,'input[type=radio]','name','radio');
    TSLib.setFieldValuesInput(data,selector,prefix,'input[type=checkbox]','name','checkbox');
    return data;
}

TSLib.getFieldNames = function(selector,prefix) {    
    if(prefix==null) {
        prefix = '';
    }

    var data = '';
    var values = TSLib.getFieldValues(selector,prefix);
    for (var key in values){
        data += key + '\r\n';
    }
    return data;
}

TSLib.getFieldNamesByData = function(values) {    
    var data = '';
    for (var key in values){
        data += key + '\r\n';
    }
    return data;
}

TSLib.getCheckedValue = function(selector,inputSelector) {    
    var data =[];
    var i =0;
    $(selector).find(inputSelector).each(function(){  
        if($(this).prop('checked')) {
            data.push($(this).val());                        
        }
    });
    data = JSON.stringify(data);
    return data;
}

TSLib.getCheckedArr = function(selector,inputSelector) {    
    var data =[];
    var i =0;
    $(selector).find(inputSelector).each(function(){  
        if($(this).prop('checked')) {
            data.push($(this).val());                        
        }
    });
    return data;
}

TSLib.ajax = function(options) {
    var url =  TSLib.RootDir + options.url;
    var postData = options.data;
    var successFun = options.success;
    var failFun = options.error;
    var errorFun = options.ajax_error;

    $.ajax({
        type: 'POST',
        url: url,
        data: postData,
        dataType: 'json',
        success: function(re){   
            TSLib.ajaxResult = re;
            
            if(!re['return']) {
                if(re['relogin']) {
                    setMyalert(1, 0, "error", "重新登入", "", TSLib.RootDir + "/Login/logout", "" );
                    myAlert("帳號逾時或該帳號在其他地方重複登入，請重新登入");
                } else {                                  
                    showNotifyAlert(re['resultMsg'],failFun);
                }
            } else {
                successFun(re);
            }                        
        },
        error: function(xhr, status, error){
            if(errorFun!=null) {
                errorFun(xhr,status,error);
            }
        }
    });
}

TSLib.clearInput = function(selector) {
    var selectors = ['input[type=text]','textarea','select'];

    $.each(selectors,function(index,value){
        $(selector).find(value).each(function(){
            if($(this).attr('default') !=null && $(this).attr('default')!='') {
                $(this).val($(this).attr('default'));
            } else {
                $(this).val('');
            }
        });
    });

    $(selector).find('input[type=checkbox]').prop('checked',false);
}

TSLib.setData = function(selector,data) {
    TSLib.setDataByObj($(selector),data);
}

TSLib.setDataByObj = function(objSelector,data) {
    objSelector.find('input[type=text]').each(function(){
        if(data[TSLib.getFieldId(this,'id','')]!=null) {
            $(this).val(data[TSLib.getFieldId(this,'id','')]);
        }
    });

    objSelector.find('.field_div').each(function(){
        if(data[TSLib.getFieldId(this,'id','')]!=null) {
            $(this).html(data[TSLib.getFieldId(this,'id','')]);
        }
    });

    objSelector.find('input[type=radio]').each(function(){
        if(data[TSLib.getFieldId(this,'id','')]!=null) {
            if(data[TSLib.getFieldId(this,'name','')]==$(this).val()) {
                $(this).prop('checked',true);
            }          
        }          
    });

    objSelector.find('select').each(function(){
        if(data[TSLib.getFieldId(this,'id','')]!=null) {
            $(this).val(data[TSLib.getFieldId(this,'id','')]);
        }
    });

    objSelector.find('textarea').each(function(){
        if(data[TSLib.getFieldId(this,'id','')]!=null) {
            $(this).val(data[TSLib.getFieldId(this,'id','')]);
        }
    });

    objSelector.find('input[type=hidden]').each(function(){
        if(data[TSLib.getFieldId(this,'id','')]!=null) {
            $(this).val(data[TSLib.getFieldId(this,'id','')]);
        }
    });

    TSLib.setLangDataByObj(objSelector,data);
}

TSLib.setLangData = function(selector,data) {
    var selector_finds = ['input[type=text]','textarea'];
    TSLib.setLangDataByObj($(selector),data);
}

TSLib.setLangDataByObj = function(objSelector,data) {
    var selector_finds = ['input[type=text]','textarea'];

    $.each(selector_finds,function(index,selector_find){
        objSelector.find(selector_find).each(function(){
            if($(this).attr('lang')!=null && $(this).attr('fieldName')!=null && $(this).attr('lang')!='' && $(this).attr('fieldName')!='') {
                if(data[TSLib.getFieldId(this,'id','')]!=null && data[TSLib.getFieldId(this,'id','')][$(this).attr('lang')] !=null) {
                    $(this).val(data[$(this).attr('fieldName')][$(this).attr('lang')]);
                }
            }        
        });
    });
}

TSLib.loadCountrys = function(ProductCategoryCode) {
    TSLib.ajax({
        data:{ProductCategoryCode:ProductCategoryCode},
        url:'/Options/getCountrys',
        success:function(re){
            TSLib.countrys = re['items'];
        },
        error:function(){
            
        }
    });
}

TSLib.loadCitys = function(ProductCategoryCode,CountryCode) {
    TSLib.ajax({
        data:{ProductCategoryCode:ProductCategoryCode,CountryCode:CountryCode},
        url:'/Options/getCitys',
        success:function(re){
            TSLib.citys = re['items'];
        },
        error:function(){
            
        }
    });
}

TSLib.addControl = function(selector_list,selector_template,text){
    var objList = $(selector_list);
    return this.addControlByObj(objList,selector_template,text);
}

TSLib.addControlByObj = function(objList,selector_template,text){
    text = typeof text !== 'undefined' ? text + ' ': '';
    var retain = 1;

    var objTemp = $($(selector_template).html());
    if(objTemp.find('.remove').length>0){
        objTemp.find('.remove').click(function(){
            if($(this).attr('remove_target')!=null && $(this).attr('remove_target')!='') {
                $(this).closest('.'+$(this).attr('remove_target')).remove();
            } else {                
                $(this).parent().remove();    
            }
            
            if($(this).attr('retain')!=null ) {
                retain = $(this).attr('retain');
                
                if(objList.find('.remove').length<= retain){
                    objList.find('.remove').hide();
                }
            } else {
                if(objList.find('.remove').length==1){
                    objList.find('.remove').hide();
                }
            }
        });
    }

    objList.append(objTemp);

    if(objList.find('.remove').length>retain){
        objList.find('.remove').show();
    }

    if(objTemp.find('input[type=text]').length>0) {
        objTemp.find('input[type=text]').val(text);    
    }    

    return objTemp;
}

TSLib.setAddControl = function(selector_btn,selector_list,selector_template){
    $(selector_btn).click(function(){
        TSLib.addControl(selector_list,selector_template,'');
    });
}

TSLib.sortDataList = function(selector_list,target_selector,type,order) {
    $(target_selector).sort(function(a,b){
        compare = (order=='asc')?1:-1;      
        return ($(b).data(type)) < ($(a).data(type)) ? compare : -compare;
    }).appendTo(selector_list);
}

TSLib.sortDataListByObj = function(objList,target_selector,type,order) {
    objList.find(target_selector).sort(function(a,b){
        compare = (order=='asc')?1:-1;      
        return ($(b).data(type)) < ($(a).data(type)) ? compare : -compare;
    }).appendTo(objList);
}

TSLib.initChkBoxId = function(selector,prefixName){
    var ChkCount = 0;
    $(selector).find('.checkbox').each(function(){
        var chk = $(this).find('input[type=checkbox]');
        var label = $(this).find('label');
        ChkCount++;
        chk.attr('id',prefixName+'_'+ChkCount);
        label.attr('for',prefixName+'_'+ChkCount);
    });
}

    
TSLib.disableContorl = function(objSelector,disabled) {
    objSelector.prop('disabled', disabled);
}


TSLib.numberFormat = function(price){
        var priceString = price.toString();
        var priceStringFinal ="";
        var stringcount = 1;
        for (var i = priceString.length - 1; i >= 0; i--) {
            if (stringcount % 3 ==0 && i != 0){
                priceStringFinal = "," +  priceString[i] + priceStringFinal;
            }else{
                priceStringFinal =  priceString[i] + priceStringFinal;
            }
            stringcount ++;
        }
        return '$' + priceStringFinal;
     }  