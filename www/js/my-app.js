var load_ui = [];
var threed_src = '';
var base_url = 'https://leasing.nexusmalls.com/index.php/loader';
var myApp = new Framework7({
    pushState: false,
    swipeBackPage: false,
    preloadPreviousPage: false,
    uniqueHistory: true,
    uniqueHistoryIgnoreGetParameters: true,
    modalTitle: 'Nexus',
    imagesLazyLoadPlaceholder: 'img/lazyload.jpg',
    imagesLazyLoadThreshold: 50,

});

var $$ = Dom7;

$$(document).on('pageInit', function(e) {
    var page = e.detail.page;
    $('.single-item').slick();
    $('.menu_sub').click(function() {
        $('.menu_i,.menu_p').removeClass('menu_active');
        $(this).find('.menu_i,.menu_p').addClass('menu_active');
    });
    if (page.name === 'about') {
        myApp.alert('Here comes About page');
    }
})

var mainView = myApp.addView('.view-main', {
    // dynamicNavbar: true
});

$$(document).on('deviceready', function() {
    if (Lockr.get('login_status') == 'status') {
        goto_page('sync.html');
    }
    //  var div = document.getElementById("map_box");
    // // Initialize the map view
    // map = plugin.google.maps.Map.getMap(div);
    // Wait until the map is ready status.
    // map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
});

myApp.onPageInit('index', function(page) {
    $('.box_height').animate({
        "height": "100%"
    }, 1000);
    $('.logo').animate({
        "opacity": "1",
        "top": "0"
    }, 1000, function() {
        $('.logo').delay(1000).animate({
            "top": "-87%",
            "left": "-81%",
            "width": "15%"
        }, 700);
        $('.box_height').delay(1000).animate({
            "height": "0%"
        }, 700);
        $('.red1').delay(1200).animate({
            "opacity": "1",
            "bottom": "0"
        }, 800);
        $('.enter_text').delay(1500).animate({
            "opacity": "1",
            "top": "28%"
        }, 1200);
        $('.login_sub').delay(2000).animate({
            "opacity": "1",
            "left": "38%"
        }, 1200);
    });
});

myApp.onPageInit('sync', function (page) {
    $('.sync_text').animate({"opacity":"1" , "left":"21%"}, 1000);
    $('.red2').delay(100).animate({"opacity":"1" , "right":"0"}, 700);
    $('.sync_box').delay(500).animate({"opacity":"1" , "right":"19%"}, 800);
    $('.skip_click').delay(400).animate({"opacity":"1" , "right":"2%"}, 500);
})

myApp.onPageInit('progress_bar', function (page) {
    $('.bar_fill').animate({"width":"100%"}, 5000);
})

myApp.onPageInit('tabs', function (page) {
    // alert(load_ui.mall_html);
    $('#tabs_data').empty();
    $('#tabs_data').html(load_ui.mall_html);
})

myApp.onPageInit('mall_facts', function (page) {
    $('#mall_logog_images').empty();
    $("#mall_logog_images").append(load_ui.mall_logo);

    $('#mall_data').empty();
    $('#mall_data').append(load_ui.mall_fact_data).append(load_ui.anchors_html).append(load_ui.floor_plan_html).append(load_ui.walkthrough_html).append(load_ui.pictures_html).append(load_ui.transformation_html).append(load_ui.store_names_html).append(load_ui.store_html).append(load_ui.event_inner_html).append(load_ui.event_html).append(load_ui.location_html);

    // Mall Facts Section Start
    $(".hide_all_tabs_page").hide();
    $("#mall_facts_page_dynamic").fadeIn();
    $(".mall_facts_hide").hide();
    $(".mall_facts_"+mall_id).fadeIn();
    // Mall Facts Section End

    $(".mall_id_floor_hide").hide();
    $(".slider_box_floor_hide").hide();
    $(".mall_id_floor_"+mall_id).show();
    $(".slider_box_floor_1").show();

    $('.single-item').slick();

    $(".click_menu_sub").click(function(){
        $(".menu_i, .menu_p, .menu_sub").removeClass('menu_active');
        $(this).addClass('menu_active');
        var data_disp_id = "#"+$(this).data('iddisp');
        $(".hide_all_tabs_page").hide();
        $(data_disp_id).fadeIn();
        // Floor Plan Section
        if (data_disp_id == '#floor_plan_page_dynamic') {
            $('.single-item').slick('unslick');
            $('.single-item').slick();
            $(".event_select_sub").click(function(){
                $(".event_select_sub").removeClass('event_select_active');
                $(this).addClass('event_select_active');
                var floor_id = $(this).data('floorid');
                $(".mall_id_floor_hide").hide();
                $(".slider_box_floor_hide").hide();
                $(".slick-track, .slick-slide").css('width', '100%');
                $(".mall_id_floor_"+mall_id).show();
                $(".slider_box_floor_"+floor_id).show();
                $('.single-item').slick('unslick');
                $('.single-item').slick();
            })
        }

        // Anchors Section
        if (data_disp_id == '#anchors_page_dynamic') {
            $(".mall_id_hide").hide();
            $(".mall_id_"+mall_id).show();
            $(".anchores_filter_data").click(function(){
                var selected_floor_id = $("#anchors_floor_drop").val();
                var selected_name_id = $("#anchors_name_drop").val();
                $(".anchors_inner_sub").hide();
                var categories = $(".anchors_inner_sub");

                $(categories).each(function(){
                    var floor_filter = $(this).data('floorid');
                    var name_filter = $(this).data('storeid');
                    var mall_id_filter = $(this).data('mallid');

                    if (name_filter) {
                        var name_split = name_filter.toString().split();
                        if (name_split.indexOf(selected_name_id) !== -1 && mall_id_filter == mall_id) {
                            $(this).show();
                        }
                    }

                    if (floor_filter) {
                        var floor_split = floor_filter.toString().split(",");
                        if (floor_split.indexOf(selected_floor_id) !== -1 && mall_id_filter == mall_id) {
                            $(this).show();
                        }
                    }
                })
            })
        }

        // Stores Section
        if (data_disp_id == '#stores_page_dynamic') {
            $(".mall_id_hide").hide();
            $(".mall_id_"+mall_id).show();
            $(".stores_filter_data").click(function(){
                var selected_category_id = $("#stores_category_drop").val();
                var selected_floor_id = $("#stores_floor_drop").val();
                var selected_name_id = $("#stores_name_drop").val();
                $(".store_sub").hide();
                var categories = $(".store_sub");

                $(categories).each(function(){
                    var category_filter = $(this).data('categoryid');
                    var floor_filter = $(this).data('floorid');
                    var name_filter = $(this).data('storeid');
                    var mall_id_filter = $(this).data('mallid');

                    if (category_filter == selected_category_id && mall_id_filter == mall_id) {
                        $(this).show();
                    }

                    if (name_filter) {
                        var name_split = name_filter.toString().split();
                        if (name_split.indexOf(selected_name_id) !== -1 && mall_id_filter == mall_id) {
                            $(this).show();
                        }
                    }

                    if (floor_filter) {
                        var floor_split = floor_filter.toString().split(",");
                        if (floor_split.indexOf(selected_floor_id) !== -1 && mall_id_filter == mall_id) {
                            $(this).show();
                        }
                    }
                })
            })

            $(".load_stores_inner").click(function(){
                var data_disp_id = "#stores_inner_page_dynamic";
                $(".hide_all_tabs_page").hide();
                $(data_disp_id).fadeIn();

                // Stores Inner Section
                if (data_disp_id == '#stores_inner_page_dynamic') {
                    store_category_id = $(this).data('categoryid');
                    $(".store_mall_id_hide").hide();
                    $(".store_mall_id_"+mall_id+store_category_id).show();

                    $(".stores_categories_filter_data").click(function(){
                        var selected_category_id = $("#stores_category_drop").val();
                        var selected_floor_id = $("#stores_floor_drop").val();
                        var selected_name_id = $("#stores_name_drop").val();
                        $(".store_inner_sub").hide();
                        var categories = $(".store_inner_sub");

                        $(categories).each(function(){
                            var category_filter = $(this).data('categoryid');
                            var floor_filter = $(this).data('floorid');
                            var name_filter = $(this).data('storeid');
                            var mall_id_filter = $(this).data('mallid');

                            if (category_filter == selected_category_id && mall_id_filter == mall_id) {
                                $(this).show();
                            }

                            if (name_filter) {
                                var name_split = name_filter.toString().split();
                                if (name_split.indexOf(selected_name_id) !== -1 && mall_id_filter == mall_id) {
                                    $(this).show();
                                }
                            }

                            if (floor_filter) {
                                var floor_split = floor_filter.toString().split(",");
                                if (floor_split.indexOf(selected_floor_id) !== -1 && mall_id_filter == mall_id) {
                                    $(this).show();
                                }
                            }
                        })
                    })
                }
            })
        }

        // Pictures Section
        if (data_disp_id == '#pictures_page_dynamic') {
            $(".pictures_malls_hide").hide();
            $(".pictures_malls_"+mall_id).show();
            $('.slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-nav'
            });
            
            $('.slider-nav').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                centerMode: true,
                focusOnSelect: true
            });
        }

        // Events Section
        if (data_disp_id == '#event_page_dynamic') {
            $(".display_mallid_hide").hide();
            $(".display_mallid"+mall_id).show();
            $(".event_sub").hide();
            var events = $(".event_sub");
            $(events).each(function(){
                var startdate = new Date($(this).data('startdate'));
                var enddate = new Date($(this).data('enddate'));
                var cur_date = new Date();
                if(startdate <= cur_date && enddate >= cur_date){
                    $(this).show();
                }
            })

            $('.event_select_sub').click(function() {
                $('.event_select_sub').removeClass('event_select_active');
                $(this).addClass('event_select_active');
                var filter_id = $(this).data('filterid');
                if (filter_id == 'current_events') {
                    var filter = $(this).data('filter');
                    $(".event_sub").hide();
                    var events = $(".event_sub");
                    $(events).each(function(){
                        var startdate = new Date($(this).data('startdate'));
                        var enddate = new Date($(this).data('enddate'));
                        var cur_date = new Date();
                        if(startdate <= cur_date && enddate >= cur_date){
                            $(this).show();
                        }
                    })
                } else if (filter_id == 'upcoming_events') {
                    var filter = $(this).data('filter');
                    $(".event_sub").hide();
                    var events = $(".event_sub");
                    $(events).each(function(){
                        var startdate = new Date($(this).data('startdate'));
                        var enddate = new Date($(this).data('enddate'));
                        var cur_date = new Date();
                        if(startdate >= cur_date && enddate >= cur_date){
                            $(this).show();
                        }
                    })
                } else if (filter_id == 'past_events') {
                    $(".event_sub").hide();
                    var events = $(".event_sub");
                    $(events).each(function(){
                        var startdate = new Date($(this).data('startdate'));
                        var enddate = new Date($(this).data('enddate'));
                        var cur_date = new Date();
                        if(startdate <= cur_date && enddate <= cur_date){
                            $(this).show();
                        }
                    })
                }
                $('.down_arrow1').fadeOut();
                $(this).find('.down_arrow1').fadeIn();
            });

            $(".load_event_details_page").click(function(){
                var data_disp_id = "#event_inner_page_dynamic";
                $(".hide_all_tabs_page").hide();
                $(data_disp_id).fadeIn();
                // Events Inner Section
                if (data_disp_id == '#event_inner_page_dynamic') {
                    // eventid
                    event_id = $(this).data('eventid');
                    $(".event_sec_hide").hide();
                    $(".event_sec_"+event_id).show();
                    var cur_date = new Date();

                    if(start_date_test <= cur_date && end_date_test >= cur_date){
                        $(".dynamic_event_time").html("Current Event");
                    }
                    
                    if(start_date_test >= cur_date && end_date_test >= cur_date){
                        $(".dynamic_event_time").html("Upcoming Event");
                    }
                    
                    if(start_date_test <= cur_date && end_date_test <= cur_date){
                        $(".dynamic_event_time").html("Past Event");
                    }
                }

                $(".go_back_to_events").click(function(){
                    $(".event_page_dynamic").click();
                })
            })
        }

        // Walkthrough Section
        if (data_disp_id == '#walkthrough_page_dynamic') {
            $(".mall_id_floor_hide").hide();
            $(".mall_id_floor_"+mall_id).show();
            var map_id = 'map_canvas'+mall_id;
            threed_src = $("#"+map_id).data('imgsrc');
            initialize(map_id);
        }

        // Transformation Section
        if (data_disp_id == '#transformation_page_dynamic') {
            $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.7});
            $(".twentytwenty-container[data-orientation='vertical']").twentytwenty({default_offset_pct: 0.3, orientation: 'vertical'});
            $(".twentytwenty-container").css('height', '490px');
            $(".mall_id_floor_hide").hide();
            $(".mall_id_floor_"+mall_id).show();
        }

        // Location Section
        if (data_disp_id == '#location_page_dynamic') {
            $(".location_containers_hide").hide();
            $(".location_containers_"+mall_id).show();

            var element = document.getElementById("map_container1");

            var mapTypeIds = [];
            for(var type in google.maps.MapTypeId) {
                mapTypeIds.push(google.maps.MapTypeId[type]);
            }

            mapTypeIds.push("OSM");
            mapTypeIds.push("MyGmap");
            mapTypeIds.push("LocalGmap");
            mapTypeIds.push("WebStorageGmap");
            mapTypeIds.push("LocalMyGmap");
            mapTypeIds.push("WebStorageMyGmap");

            var map = new google.maps.Map(element, {
                center: new google.maps.LatLng(53.902254, 27.561850),
                zoom: 15,
                mapTypeId: "MyGmap",
                mapTypeControlOptions: {
                    mapTypeIds: mapTypeIds,
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                }
            });

            var marker = new google.maps.Marker({
                position: {lat: 53.902254, lng: 27.561850},
                map: map,
            });

            map.mapTypes.set("OSM", new google.maps.ImageMapType({
                getTileUrl: getOsmTileImgSrc,
                tileSize: new google.maps.Size(256, 256),
                name: "OSM",
                maxZoom: 15
            }));

            map.mapTypes.set("MyGmap", new google.maps.ImageMapType({
                getTileUrl: getGmapTileImgSrc,
                tileSize: new google.maps.Size(256, 256),
                name: "MyGmap",
                maxZoom: 15
            }));

            map.mapTypes.set("LocalGmap", new google.maps.ImageMapType({
                getTileUrl: getLocalTileImgSrc,
                tileSize: new google.maps.Size(256, 256),
                name: "LocalGmap",
                maxZoom: 15
            }));

            map.mapTypes.set("WebStorageGmap", new google.maps.ImageMapType({
                getTileUrl: getWebStorageTileImgSrc,
                tileSize: new google.maps.Size(256, 256),
                name: "WebStorageGmap",
                maxZoom: 15
            }));

            map.mapTypes.set("LocalMyGmap", new google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                    return checkTileInSprites(coord, zoom) ?
                        getLocalTileImgSrc(coord, zoom) :
                        getGmapTileImgSrc(coord, zoom);
                },
                tileSize: new google.maps.Size(256, 256),
                name: "LocalMyGmap",
                maxZoom: 15
            }));

            map.mapTypes.set("WebStorageMyGmap", new google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                    var image = getWebStorageTileImgSrc(coord, zoom);
                    return image ? image :  getGmapTileImgSrc(coord, zoom);
                },
                tileSize: new google.maps.Size(256, 256),
                name: "WebStorageMyGmap",
                maxZoom: 15
            }));

            google.maps.event.addListener(map, 'click', function(point) {
                var marker = new google.maps.Marker({
                    position: point.latLng,
                    map: map
                });

                google.maps.event.addListener(marker, 'dblclick', function() {
                    marker.setMap(null);
                });

                google.maps.event.addListener(marker, 'click', function() {
                    new google.maps.InfoWindow({
                        content: 'lat: ' + point.latLng.lat() + '<br>lng:' + point.latLng.lng()
                    }).open(map, marker);
                });
            });

            function CustomControl(controlDiv, map, title, handler) {
                controlDiv.style.padding = '5px';

                var controlUI = document.createElement('DIV');
                controlUI.style.backgroundColor = 'white';
                controlUI.style.borderStyle = 'solid';
                controlUI.style.borderWidth = '2px';
                controlUI.style.cursor = 'pointer';
                controlUI.style.textAlign = 'center';
                controlUI.title = title;
                controlDiv.appendChild(controlUI);

                var controlText = document.createElement('DIV');
                controlText.style.fontFamily = 'Arial,sans-serif';
                controlText.style.fontSize = '12px';
                controlText.style.paddingLeft = '4px';
                controlText.style.paddingRight = '4px';
                controlText.innerHTML = title;
                controlUI.appendChild(controlText);

                google.maps.event.addDomListener(controlUI, 'click', handler);
            }

            var clearWebStorageDiv = document.createElement('DIV');
            var clearWebStorageButton = new CustomControl(clearWebStorageDiv, map,
                'Clear Web Storage',  clearWebStorage);

            var prepareWebStorageDiv = document.createElement('DIV');
            var prepareWebStorageButton = new CustomControl(prepareWebStorageDiv, map,
                'Prepare Web Storage', prepareWebStorage);

            clearWebStorageDiv.index = 1;
            prepareWebStorageDiv.index = 1;
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(clearWebStorageDiv);
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(prepareWebStorageDiv);

        }
    })
})


function initialize(mapid) {
    // Set up Street View and initially set it visible. Register the
    // custom panorama provider function. Set the StreetView to display
    // the custom panorama 'reception' which we check for below.
    $("#" + mapid).css('height', '500px');
    var panoOptions = {
        pano: 'reception',
        visible: true,
        panoProvider: getCustomPanorama
    };

    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById(mapid), panoOptions
    );
}

// Return a pano image given the panoID.
function getCustomPanoramaTileUrl(pano, zoom, tileX, tileY) {
    // Note: robust custom panorama methods would require tiled pano data.
    // Here we're just using a single tile, set to the tile size and equal
    // to the pano "world" size.
    return threed_src.toString();
}

// Construct the appropriate StreetViewPanoramaData given
// the passed pano IDs.
function getCustomPanorama(pano, zoom, tileX, tileY) {
    if (pano == 'reception') {
        return {
            location: {
                pano: 'reception',
                description: 'Nexus Mall'
            },
            links: [],
            // The text for the copyright control.
            copyright: 'Imagery by Google',
            // The definition of the tiles for this panorama.
            tiles: {
                tileSize: new google.maps.Size(4000, 2000),
                worldSize: new google.maps.Size(4000, 2000),
                // The heading in degrees at the origin of the panorama
                // tile set.
                centerHeading: 105,
                getTileUrl: getCustomPanoramaTileUrl
            }
        };
    }
}

// Map Function
function CustomControl(controlDiv, map, title, handler) {
    controlDiv.style.padding = '5px';

    var controlUI = document.createElement('DIV');
    controlUI.style.backgroundColor = 'white';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '2px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = title;
    controlDiv.appendChild(controlUI);

    var controlText = document.createElement('DIV');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = title;
    controlUI.appendChild(controlText);

    google.maps.event.addDomListener(controlUI, 'click', handler);
}