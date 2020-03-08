function E_Status(){
    
}

E_Status.none = 1;
E_Status.booking = 2;
E_Status.booking_success = 3;
E_Status.booking_fail = 4;
E_Status.rejecting = 5;
E_Status.reject_success = 6;

function showNotice(message) {
    $('#NoticeAlert .modal-body p').html(message);
    $('#NoticeAlert .btn_ok').unbind( "click" );
    $('#NoticeAlert').modal('show');
}

function showDeleteAlert(callback) {
    $('#DeleteComfirmAlert').modal('show');
    $('#DeleteComfirmAlert .btn_delete').unbind( "click" );
    $('#DeleteComfirmAlert .btn_delete').bind("click",callback);
}

function showComfirmAlert(message,callback) {
    $('#ConfirmAlert .modal-body p').html(message);
    $('#ConfirmAlert').modal('show');
    $('#ConfirmAlert .btn_ok').unbind( "click" );
    $('#ConfirmAlert .btn_ok').bind("click",callback);
}

function showNotifyAlert(message,callback) {
    $('#NoticeAlert .modal-body p').html(message);
    $('#NoticeAlert').modal('show');
    $('#NoticeAlert .btn_ok').unbind( "click" );
    $('#NoticeAlert .btn_ok').bind("click",callback);
}

function getCheckItemId(selector) {
    var Ids = [];

    $(selector+' .check_item').each(function(){
        if($(this).prop('checked')){
            Ids.push($(this).attr('itemId'));
        }
    });

    return Ids;
}

function getCheckItemAttr(selector,attr) {
    var Ids = [];

    $(selector+' .check_item').each(function(){
        if($(this).prop('checked')){
            Ids.push($(this).attr(attr));
        }
    });

    return Ids;
}

function initCheckItem(selector){
    var objSelector = $(selector);
    /*單一選擇*/
    objSelector.find(".list_table .check_item").change(function(e) {
        var checked = false;
        objSelector.find('.list_table .check_item').each(function() {
            if ($(this).prop('checked') == true) {
                checked = true;
            }
        });

        if (checked) {
            objSelector.find(".list_table .function_block").fadeIn(50);
            objSelector.find(".item_list .mask").fadeIn();
        } else {
            objSelector.find(".list_table .function_block").fadeOut(50);
            objSelector.find('.CheckAll').prop('checked', false);
            objSelector.find(".item_list .mask").fadeOut();
        }
    });

    /*選擇全部*/
    objSelector.find('.CheckAll').unbind('click');
    objSelector.find('.CheckAll').on('click', function() {
        objSelector.find('.list_table .check_item').prop('checked', objSelector.find('.CheckAll').prop('checked'));

        if (objSelector.find('.CheckAll').prop('checked')) {
            objSelector.find(".list_table .function_block").fadeIn(50);
            objSelector.find(".item_list .mask").fadeIn();
        } else {
            objSelector.find(".list_table .function_block").fadeOut(50);
            objSelector.find(".item_list .mask").fadeOut();
        }
    })

    /*取消選取*/
    objSelector.find('.function_block .btn_cancel_all').unbind('click');
    objSelector.find('.function_block .btn_cancel_all').on('click', function() {
        objSelector.find('.list_table .check_item').prop('checked', false);
        objSelector.find(".list_table .function_block").fadeOut(50);
        objSelector.find('.CheckAll').prop('checked', false);
        objSelector.find(".item_list .mask").fadeOut();
    })
}

$(document).ready(function(){
    $('.lang_view').each(function(){
        $('.'+$(this).val()+'_info').hide();
        $(this).unbind('click');
        $('.'+$(this).val()+'_view').unbind('click');
    });

    $('.lang_view').click(function(){
        $('.lang_view').each(function(){
            $('.'+$(this).val()+'_info').hide();
        });

        $('.'+$(this).val()+'_info').show();
    });

    var lang = $('.lang_view:checked').val();
    $('.'+lang+'_info').show();
});