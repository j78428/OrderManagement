// JavaScript Document
$(document).ready(function(e) {
    /****** ToolTip 觸發 ******/
    $("[data-toggle='tooltip']").tooltip();




    /****** 置頂部按鈕偵測 *******/
    $("#BACKTO_TOP").click(function() {
        // 讓捲軸用動畫的方式移動到 0 的位置
        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $body.animate({
            scrollTop: 0
        }, 600);

        return false;
    });
    //超過某高度範圍顯示按鈕
    $(document).scroll(function() {
        var _jumpOutHeight = 500;
        //取得目前捲動的高度
        var height = $(document).scrollTop();
        if (height > _jumpOutHeight && $("#BACKTO_TOP").css("display") == "none") {
            $("#BACKTO_TOP").fadeIn();
        } else if (height < _jumpOutHeight && $("#BACKTO_TOP").css("display") == "block") {
            $("#BACKTO_TOP").fadeOut();
        }
    });




    /*********** sort icon設定 ***********/

    /*-----搜尋結果用-----*/
    $(".result_table button.sort_change").click(function(e) {
        var sort_status = $(this).val();
        if (sort_status == 0) {
            $(".result_table button.sort_change").removeClass("sorting_asc");
            $(".result_table button.sort_change").removeClass("sorting_desc");
            $(".result_table button.sort_change").val(0);
            $(this).addClass("sorting_asc");
            $(this).val(1);
        } else if (sort_status == 1) {
            $(this).removeClass("sorting_asc");
            $(this).addClass("sorting_desc");
            $(this).val(2);
        } else if (sort_status == 2) {
            $(this).addClass("sorting_asc");
            $(this).removeClass("sorting_desc");
            $(this).val(1);
        }

    });


    /*-----瀏覽訂單狀態用-----*/
    $("#OrderStatus1 button.sort_change").click(function(e) {
        var sort_status1 = $(this).val();
        if (sort_status1 == 0) {
            $("#OrderStatus1 button.sort_change").removeClass("sorting_asc");
            $("#OrderStatus1 button.sort_change").removeClass("sorting_desc");
            $("#OrderStatus1 button.sort_change").val(0);
            $(this).addClass("sorting_asc");
            $(this).val(1);
        } else if (sort_status1 == 1) {
            $(this).removeClass("sorting_asc");
            $(this).addClass("sorting_desc");
            $(this).val(2);
        } else if (sort_status1 == 2) {
            $(this).addClass("sorting_asc");
            $(this).removeClass("sorting_desc");
            $(this).val(1);
        }

    });

    $("#OrderStatus2 button.sort_change").click(function(e) {
        var sort_status = $(this).val();
        if (sort_status == 0) {
            $("#OrderStatus2 button.sort_change").removeClass("sorting_asc");
            $("#OrderStatus2 button.sort_change").removeClass("sorting_desc");
            $("#OrderStatus2 button.sort_change").val(0);
            $(this).addClass("sorting_asc");
            $(this).val(1);
        } else if (sort_status == 1) {
            $(this).removeClass("sorting_asc");
            $(this).addClass("sorting_desc");
            $(this).val(2);
        } else if (sort_status == 2) {
            $(this).addClass("sorting_asc");
            $(this).removeClass("sorting_desc");
            $(this).val(1);
        }

    });

    $("#OrderStatus3 button.sort_change").click(function(e) {
        var sort_status = $(this).val();
        if (sort_status == 0) {
            $("#OrderStatus3 button.sort_change").removeClass("sorting_asc");
            $("#OrderStatus3 button.sort_change").removeClass("sorting_desc");
            $("#OrderStatus3 button.sort_change").val(0);
            $(this).addClass("sorting_asc");
            $(this).val(1);
        } else if (sort_status == 1) {
            $(this).removeClass("sorting_asc");
            $(this).addClass("sorting_desc");
            $(this).val(2);
        } else if (sort_status == 2) {
            $(this).addClass("sorting_asc");
            $(this).removeClass("sorting_desc");
            $(this).val(1);
        }

    });

    $("#OrderStatus4 button.sort_change").click(function(e) {
        var sort_status = $(this).val();
        if (sort_status == 0) {
            $("#OrderStatus4 button.sort_change").removeClass("sorting_asc");
            $("#OrderStatus4 button.sort_change").removeClass("sorting_desc");
            $("#OrderStatus4 button.sort_change").val(0);
            $(this).addClass("sorting_asc");
            $(this).val(1);
        } else if (sort_status == 1) {
            $(this).removeClass("sorting_asc");
            $(this).addClass("sorting_desc");
            $(this).val(2);
        } else if (sort_status == 2) {
            $(this).addClass("sorting_asc");
            $(this).removeClass("sorting_desc");
            $(this).val(1);
        }

    });








    /****** 列表批次checkbox 開/關 ******/
    $(".btn_active_modal").click(function(e) {
        $(this).parents(".result_block").addClass("setting_modal");

    });

    $(".btn_cancel_modal").click(function(e) {
        $(this).parents(".result_block").removeClass("setting_modal");

    });





    /******** 建立訂單流程Step1 用 **********/

    /*----- 自訂數量欄位 顯示/隱藏 -----*/
    $(".quantity_option_group .quantity_option").on("change", function() {
       var QuantityTitle = $(this).attr("title");
       var ClassName = "." + QuantityTitle;
       if(QuantityTitle == "other_quantity_input"){
            $(".other_quantity_input").fadeIn();
       }

       else {
            $(".other_quantity_input").hide();
       }
    });







    /****** 建立訂單流程Step3 用  *******/

    /*----- 展開供應商/產品區塊 -----*/
    $(".select_product").click(function(e) {
        $(this).parent().siblings(".product_list_box").slideDown();

    });

    /*----- 選擇完商品後，關閉供應商/產品 -----*/
    $(".source_product ul li button").click(function(e) {
        $(this).parents(".product_list_box").hide();
        $(".product_source").show();
        $(".source_product").hide();
    });

    /*----- 開啟供應商的產品清單 -----*/
    $(".product_source ul li button").click(function(e) {
        $(this).parents(".product_source").hide();
        $(this).parents(".source_product").hide();
        var source_name = $(this).attr('id');
        var source_product = "#" + source_name + "_Product";
        $(source_product).show();
    });

    /*----- 返回供應商的清單 -----*/
    $(".back_source").click(function(e) {
        $(this).parents(".product_options").siblings(".product_source").show();
        $(this).parents(".source_product").hide();

    });


    /*----- 展開更多欄位 -----*/
    $(".add_item").click(function(e) {
        $(this).parent().siblings(".other_field").slideToggle();
    });


    /*----- 客戶選擇/新增畫面切換 -----*/
    $(".add_client").click(function(e) {
        $(".add_fillform").show();
        $(".client_list").hide();
    });

    $(".select_clients").click(function(e) {
        $(".add_fillform").hide();
        $(".client_list").show();
    });




    /************ 選擇付款方式 切換form ************/
    $("#PaymentMethod").change(function(e) {
        var optionValue = $("#PaymentMethod").find(":selected").val();
        var className = "." + optionValue;
        $(".form_modal .payment_input_group").hide();
        if (optionValue == "payment_bank_check") {
                $(className).show();
            }
        else if (optionValue == "payment_bank_transfer") {
                $(className).show();
            }  
        else if (optionValue == "payment_credit_card") {
                $(className).show();
            }
        else {}

    });



    /************ 關閉提示訊息 ************/
    $(".remove_notice").click(function(e) {
        $(this).parents(".notice_box").fadeOut(200);
    });



    /************ 偵測視窗高度 - 列表區塊(客服列表) ************/
    var Window_h = $(window).height();
    var tableBody_h = Window_h - 69 - 20 - 5 - 61 - 49 - 20 - 44;
    $(".result_table .table_body").height(tableBody_h);
    $(window).resize(function() {
        var Window_h = $(window).height();
        var tableBody_h = Window_h - 69 - 20 - 5 - 61 - 49 - 20 - 44;
        $(".result_table .table_body").height(tableBody_h);
    });


    /************ 偵測視窗高度 - 客服列表 詳細資料區塊 ************/
    var Window_h = $(window).height();
    var viewBlock_h = Window_h - 60 - 18 - 55 - 51 - 55 - 10 - 24;
    $(".view_block .block_body").height(viewBlock_h);
    $(window).resize(function() {
        var Window_h = $(window).height();
        var viewBlock_h = Window_h - 60 - 18 - 55 - 51 - 55 - 10 - 24;
        $(".view_block .block_body").height(viewBlock_h);
    });



    /************tooltip box show hide controls ************/
    $('body').click(function(event){
        if($(event.target).hasClass('tooltip_item') || $(event.target).hasClass('tooltip_control')) {
            if( $(event.target).hasClass('tooltip_control')) {
                if($(event.target).hasClass('tooltip_active')) {
                    
                } else {
                    $('.tooltip_active').removeClass('tooltip_active');
                    $(event.target).addClass('tooltip_active');

                    $('.tooltip_box').each(function(){
                        if($(this).closest('.fill_item').find('.tooltip_control').hasClass('tooltip_active')) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }                               
                    });
                }                       
            } 
        } else {                
            $('.tooltip_active').removeClass('tooltip_active');
            $('.tooltip_box').hide();   
        }      
    });
});


/****** datepicker setting *******/
$.datepicker.regional['zh-TW'] = {
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    prevText: "上月",
    nextText: "次月",
    weekHeader: "週"
};
//將預設語系設定為中文
$.datepicker.setDefaults($.datepicker.regional["zh-TW"]);

$(document).ready(function(e) {

});

$(document).ready(function() {
    $("#StartDate1").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd',
        onClose: function(selectedDate) {
            $("#ToDate").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#EndDate1").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd',
        onClose: function(selectedDate) {
            $("#FromDate").datepicker("option", "maxDate", selectedDate);
        }
    });

    $('.start_date').each(function(){
        var end_date = $(this).closest('.fill_item').find('.end_date');

        $(this).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yy-mm-dd',
            onClose: function(selectedDate) {
                end_date.datepicker("option", "minDate", selectedDate);
            }
        });
    });

    $('.end_date').each(function(){
        var start_date = $(this).closest('.fill_item').find('.start_date');

        $(this).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yy-mm-dd',
            onClose: function(selectedDate) {
                start_date.datepicker("option", "maxDate", selectedDate);
            }
        });
    });

    $(".paymentDate").datepicker({
        maxDate: '0',
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });

    $(".departure_date").datepicker({
        minDate: 0,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });

     $(".notify_date").datepicker({
        minDate: 0,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });

     $(".birth_date").datepicker({  
        yearRange: "-100:+0",       
        maxDate: 0,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
     });

     $(".adult_birth_date").datepicker({ 
        yearRange: "-100:+0",            
        maxDate: -4383,
        minDate: -36500,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
     });

     $(".child_birth_date").datepicker({    
        yearRange: "-100:+0",    
        maxDate: 0,  
        minDate: -4383,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
     });
     
    $(".travel_date").datepicker({
        minDate: 0,
        maxDate: 3650,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function(dateText, inst) { 
            $(this).val(inst.selectedYear +'/'+ (inst.selectedMonth+1));
        }
    });
    $(".travel_date").focus(function () {
        $(".ui-datepicker-calendar").hide();
        $(".ui-datepicker-current").hide();
    });

});

function initNotifyDate() {
    $(".notify_date").datepicker({
        minDate: 0,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });
}


function showCheckInfo(selecter ,errorMsg){
    $(selecter).addClass('undone');
    if(errorMsg==""){
        $(selecter).removeClass('undone');
        $(selecter).addClass('complete');
    }
}


/*********** 旅客需求滑動效果 *************/
function initAccordionByObj(serlector){
    $(serlector).unbind('click');
    $(serlector).click(function(e) {
        var content_status = $(this).parent().find(".item_content").css("display");
        if (content_status == "none") {           
            $(this).parent().find(".item_content").slideDown();
            $(this).addClass("show");
        } else {
            $(this).parent().find(".item_content").slideUp();
            $(this).removeClass("show");
        }
    });
}

function numberFormatToInt(price){
    price = price.replace("TWD","").replace("JPD","").replace("$","").replace(",","").replace(",","").replace(",","").replace(",","");
    return parseInt(price);
}  