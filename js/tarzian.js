/**
 * Created by hecto on 4/3/2017.
 */
<script type="text/javascript">
    $(document).ready(function(){

        //Load all articles first and then fire off the draggable script...
        var ktlist = document.getElementById('kt-list');
        var lrlist = document.getElementById('lr-list');
        var drlist = document.getElementById('dr-list');
        var brlist = document.getElementById('br-list');
        var nrlist = document.getElementById('nr-list');
        var aplist = document.getElementById('ap-list');
        var polist = document.getElementById('po-list');
        var mslist = document.getElementById('ms-list');
        var oflist = document.getElementById('of-list');
        var bxlist = document.getElementById('bx-list');

        $.when(
            $.ajax( "http://www.tarzianmovers.com/articles/api?location=kt" ),
            $.ajax( "http://www.tarzianmovers.com/articles/api?location=lr" ),
            $.ajax( "http://www.tarzianmovers.com/articles/api?location=dr" ),
            $.ajax( "http://www.tarzianmovers.com/articles/api?location=br" ),
            $.ajax( "http://www.tarzianmovers.com/articles/api?location=nr" ),
            $.ajax( "http://www.tarzianmovers.com/articles/api?location=ap" ),
            $.ajax( "http://www.tarzianmovers.com/articles/api?location=po" ),
            $.ajax( "http://www.tarzianmovers.com/articles/api?location=ms" ),
            $.ajax( "http://www.tarzianmovers.com/articles/api?location=of" ),
            $.ajax( "http://www.tarzianmovers.com/articles/api?location=bx" )
        ).done( function( ktdata, lrdata, drdata, brdata, nrdata, apdata, podata, msdata, ofdata, bxdata){
            //console.log("Loaded");
            if (typeof ktdata !== 'undefined'){
                $.each( ktdata[0], function( i , v ){
                    $('#kt-list').append('<div value="' + v.aarea + '" data-value="' + v.aid + '" class="short ui-widget-content">' + v.anm + '</div>');
                });
            }
            if (typeof lrdata !== 'undefined'){
                $.each( lrdata[0], function( i , v ){
                    $('#lr-list').append('<div value="' + v.aarea + '" data-value="' + v.aid + '" class="short ui-widget-content">' + v.anm + '</div>');
                });
            }
            if (typeof drdata !== 'undefined'){
                $.each( drdata[0], function( i , v ){
                    $('#dr-list').append('<div value="' + v.aarea + '" data-value="' + v.aid + '" class="short ui-widget-content">' + v.anm + '</div>');
                });
            }
            if (typeof brdata !== 'undefined'){
                $.each( brdata[0], function( i , v ){
                    $('#br-list').append('<div value="' + v.aarea + '" data-value="' + v.aid + '" class="short ui-widget-content">' + v.anm + '</div>');
                });
            }
            if (typeof nrdata !== 'undefined'){
                $.each( nrdata[0], function( i , v ){
                    $('#nr-list').append('<div value="' + v.aarea + '" data-value="' + v.aid + '" class="short ui-widget-content">' + v.anm + '</div>');
                });
            }
            if (typeof apdata !== 'undefined'){
                $.each( apdata[0], function( i , v ){
                    $('#ap-list').append('<div value="' + v.aarea + '" data-value="' + v.aid + '" class="short ui-widget-content">' + v.anm + '</div>');
                });
            }
            if (typeof podata !== 'undefined'){
                $.each( podata[0], function( i , v ){
                    $('#po-list').append('<div value="' + v.aarea + '" data-value="' + v.aid + '" class="short ui-widget-content">' + v.anm + '</div>');
                });
            }
            if (typeof msdata !== 'undefined'){
                $.each( msdata[0], function( i , v ){
                    $('#ms-list').append('<div value="' + v.aarea + '" data-value="' + v.aid + '" class="short ui-widget-content">' + v.anm + '</div>');
                });
            }
            if (typeof ofdata !== 'undefined'){
                $.each( ofdata[0], function( i , v ){
                    $('#of-list').append('<div value="' + v.aarea + '" data-value="' + v.aid + '" class="short ui-widget-content">' + v.anm + '</div>');
                });
            }
            if (typeof bxdata !== 'undefined'){
                $.each( bxdata[0], function( i , v ){
                    $('#bx-list').append('<div value="' + v.aarea + '" data-value="' + v.aid + '" class="short ui-widget-content">' + v.anm + '</div>');
                });
            }

            //All set... call loadpu
            loadpu();
            //console.log("TEST");

        }).fail( function(){
            console.log("ERROR LOADING DATA");
        });

        $('#dt_qt').datepicker({dateFormat: 'yy-mm-dd'});

        $("#estimate_form").submit(function(evt){
            evt.preventDefault();
            var url=$(this).attr('action');
            var postData = $(this).serialize();
            $.post(url, postData, function(o){
                if(o.result == 1){
                    $('#modal-content').modal({show: true});
                    $('#modal-content').on('hidden.bs.modal', function () {window.location.href = "http://www.tarzianmovers.com/";});
                } else {
                    $('#modal-error').modal({show: true});
                    $('#modal-error').on('hidden.bs.modal', function () {window.location.href = "http://www.tarzianmovers.com/estimate";});
                }
            }, 'json');
        });

    });

function loadpu(){
    var drg;
    var a = 0;
    var cln;
    var i = 0;
    $(".short").draggable({
        drag: function (event, ui) {
            drg = $(this);
            $("#droppable").droppable('enable');
        },
        helper: 'clone'
    });
    $("#droppable").droppable({
        drop: function () {
            a = a + parseInt(drg.attr('value'));
            $("#counter").html(a);
            if ( $("#" + drg.attr('data-value')).length > 0) {
                var txt = drg.attr('data-value') + "1";
                var txt2 = drg.attr('data-value') + "-2";
                $("#" + txt).html(parseInt($("#" + txt).text()) + 1);
                var newv = parseInt($("#" + txt2).text()) + 1;
                $("#" + txt2).html(newv);
                $("#" + txt2).attr('value', drg.attr('data-value')+'-'+newv);
            } else
            {
                $(this).append("<div id='" + drg.attr('data-value') + "' value='" + drg.attr('value') + "' class='val'>" + drg.text() + "</div>");
                $(this).append("<div id='" + drg.attr('data-value') + "1' style='float:right'>" + $("#" + drg.attr('data-value')).length + "</div><br>");
                $('#arts').append("<option id='" + drg.attr('data-value') + "-2' selected='1' class='count' value='" + drg.attr('data-value') + "-"+
                    $("#" + drg.attr('data-value')).length+"'>" + $("#" + drg.attr('data-value')).length + "</option>");
            }
            $("#" + drg.attr('data-value')).draggable({
                drag: function (event, ui) {
                    $("#droppable").droppable('disable');
                    drg = $(this);
                },
                stop: function (event, ui) {
                    var tt = drg.attr('id') + "1";
                    var vv = drg.attr('id') + "-2";
                    if (parseInt($("#" + tt).text()) > 1) {
                        $("#" + tt).html(parseInt($("#" + tt).text()) - 1);
                    } else {
                        $("#" + drg.text()).remove();
                        $(this).remove();
                        $("#" + tt + " + br ").remove();
                        $("#" + tt).remove();
                    }
                    if (parseInt($("#" + vv).text()) > 1) {
                        $("#" + vv).html(parseInt($("#" + vv).text()) - 1);
                    } else {
                        $("#" + drg.text()).remove();

                        $(this).remove();
                        $("#" + vv + " + br ").remove();
                        $("#" + vv).remove();
                    }
                    a = a - parseInt(drg.attr('value'));
                    $("#counter").html(a);
                },
                helper: 'clone'
            });
        }
    });
}//end loadpu
function resetstuff(){
    $('#droppable').html('');
    $('#counter').html('0');
    $('#arts').html('');
}


</script>