var base_url = 'http://kreaserv-tech.com/mall_app/index.php/loader';
var mall_id = 0;
var event_id = 0;
var store_category_id = 0;
var start_date_test = '';
var end_date_test = '';
function j2s(json) {
    return JSON.stringify(json);
}

function goto_page(page) {
    if (page == 'tabs.html') {
        if (!load_ui) {
            return false;
        } else {
            load_ui = Lockr.get('load_ui');
            mainView.router.load({
                url: page,
                ignoreCache: false,
            });
        }
    } else {
        mainView.router.load({
            url: page,
            ignoreCache: false,
        });
    }
}

// function load_event_data() {
// 	$('#events_html').empty();
// }

function login(){
    console.log(Lockr.get('load_ui'));
    var emp_code = $('#emp_code').val();

    if (emp_code == '') {
        myApp.alert('Employee code should not be blank.');
        return false;
    }

    myApp.showIndicator();
    $.ajax({
        url: base_url + '/login_user',
        type: 'POST',
        crossDomain: true,
        data: {
            "emp_code": emp_code,
        },
    })
    .done(function(res) {
        myApp.hideIndicator();
        Lockr.set('login_status', 'status');
        if (res.status == 'SUCCESS') {
            mainView.router.load({
                url: 'sync.html',
                ignoreCache: false,
             });
        } else {
            myApp.alert('Employee Code is incorrect');
        }
    })
    .fail(function(err) {
        myApp.hideIndicator();
        myApp.alert('Some error occurred on connecting.');
    })
    .always(function() {});
}

function download_image(){
    // myApp.showIndicator();
    $('.login_box').hide();
    $('.progress_box').show();
    $.ajax({
        url: base_url + '/laod_image',
        type: 'POST',
        crossDomain: true,
    })
    .done(function(res) {
        // $('.bar_fill').animate({"width":"100%"});
        // myApp.hideIndicator();
        // myApp.alert('Activating Download Process');
        var counter_i = 1;
        var arr_length = Number(res.download_images.length) - 1;
        var animate_count = 100/Number(res.download_images.length);
        var animate_counter = animate_count;
        $.each(res.download_images, function( index, value ) {
            // console.log(cordova.file.externalApplicationStorageDirectory);
            $('.bar_fill').animate({"width":+animate_count+"%"});
            var fileTransfer = new FileTransfer();
            var uri = encodeURI("http://kreaserv-tech.com/mall_app/assets/app_assets/images/"+value.icon);

            fileTransfer.download(
                uri,
                // cordova.file.externalApplicationStorageDirectory + 'files/download/'+value.icon,
                cordova.file.dataDirectory + 'files/download/'+value.icon,
                function(entry) {
                    // myApp.alert('File ('+counter_i+') Download Completed');
                    var fileTransfer = new FileTransfer();
                    if (arr_length == counter_i) {
                        // $('.progress_text').text('THANK YOU FOR DOWNLOADING ');
                        // $('.p_t1').fadeIn();
                    }
            });

            // myApp.alert(cordova.file.dataDirectory + 'files/download/'+value.icon);
            console.log(cordova.file.dataDirectory + 'files/download/'+value.icon);
            counter_i = counter_i + 1;
            animate_count = animate_count + animate_counter;
            // console.log("Index value: "+index);
            // console.log("Array Lenght: "+arr_length);
        })
        var send_url = cordova.file.dataDirectory + 'files/download/';
        myApp.showIndicator();
        $.ajax({
            url: base_url+"/load_ui",
            type: 'POST',
            crossDomain: true,
            data: {
                send_url : send_url,
            }
        })
        .done(function(res) {
            load_ui = res;
            Lockr.set('load_ui', load_ui);
            // load_location_ui();
        })
        .fail(function(err) {
            myApp.hideIndicator();
            myApp.alert('Some error occurred on connecting.');
        })
        .always(function() {
            myApp.hideIndicator();
        });
        $('.progress_text').text('THANK YOU FOR DOWNLOADING ');
        $('.p_t1').fadeIn();
        // myApp.alert('Download Process Completed');
    })
    .fail(function(err) {
        myApp.hideIndicator();
        myApp.alert('Some error occurred on connecting.');
    })
    .always(function() {});
}

function load_mall_page(id) {
    mall_id = Number(id);
    goto_page('mall_facts.html');
}

function load_event_details_page(id) {
    event_id = id;
	start_date_test = new Date($(".display_event_id"+event_id).data('startdate'));
	end_date_test = new Date($(".display_event_id"+event_id).data('enddate'));
    goto_page('event_inner.html');
}

function load_stores_inner(id) {
    store_category_id = id;
    goto_page('store_inner.html');
}

function logout(){

    mainView.router.load({
        url: 'index.html',
        ignoreCache: false,
    });

}

function load_location_ui() {
    mainView.router.load({
        url: 'location.html',
        query: {
            loaction_load_status: 'true',
        },
        ignoreCache: false,
    });
    // $("#location_container").empty();
    // $("#location_container").html(load_ui.location_html);
}