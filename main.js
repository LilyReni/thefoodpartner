$(document).ready(function(){
    i = 0;
    c = 0;
    
    var inflation = 0;
    var unit_move = 10;
    
    $(".curve").click(function(){
        $(".select").removeClass("select");
        $(this).addClass("select");
    });
    
    $(".curve").hover(function(){
        $(this).css({background: "pink"});
        }, function(){
        $(this).css({background: "cornflowerblue"});
    });
    
    $("#up").click(function(){
        inflation += unit_move/1.19175;
        $("#inf_tar").css({top: toPx(get_position("#inf_tar", "top") - unit_move)});
        $("#img_pi_tar").css({top: toPx(get_position("#img_pi_tar", "top") - unit_move)});
    });
    
    $("#down").click(function(){
        inflation -= unit_move/1.19175;
        $("#inf_tar").css({top: toPx(get_position("#inf_tar", "top") + unit_move)});
        $("#img_pi_tar").css({top: toPx(get_position("#img_pi_tar", "top") + unit_move)});
    });
    
    
    $("#freeze").click(function(){
        
        //$("#title").css({color: "red"});
        
        
        var bc = c;
        switch(bc) {
            case 0:
                
                $("#freeze").text("Back to the Targeted Inflation Rate");
                var ex_dash_left = get_position("#ex_dash", "left");
                $("#fixed_ex").css({left: toPx(ex_dash_left)}).show();
                
                c = 1;
                break;
            case 1:
                
                $("#freeze").text("Freeze the Exchange Rate");
                
                $("#fixed_ex").hide();
                $("#s_dash").hide();
                $("#img_pt").hide();
                inflation_fixed();
                c = 0;
                break;
        }
        
    });
    
    
    $(document).keypress(function(){
        
        
        
        var k = event.keyCode;       
        switch(k) {
            case 97:
                left(".select"); 
                break;
            case 100:
                right(".select"); 
                break;
            
        }
        
        //swith between cases
        var cs = c;      
        switch(cs) {
            case 0:
                inflation_fixed();
                break;
            case 1:
                ex_fixed(); 
                break;
        }
         
        //test
        /*
        var y0 = $("#sas").css("left");
        var y2 = $("#ad").css("left");
        var y4 = $("#cip").css("left");
        
        $("#keycode").text(i = k);
        $("#Y_0").text(i = y_dash_top);
        $("#Y_2").text(i = r_dash_left);
        $("#Y_4").text(i = r_dash_width);
        $("#r_0").text(i = ex_dash_height);
        */
        
    });
    
    function left(obj) {       
        var left = get_position(obj, "left") - unit_move;
        $(obj).css({left: left.toString() + 'px'});     
    }
    
    function right(obj) {
        var left = get_position(obj, "left") + unit_move;
        $(obj).css({left: left.toString() + 'px'});       
    }
    
    function get_position (cur, artt) {
        var current = $(cur).css( artt );
        var len = current.length;
        return parseInt(Number(current.substr(0,len - 2)));    
    }
    
    function toPx (pos) {
        return pos.toString() + 'px';
    }
    
    
    //dash lines
    function inflation_fixed() {
        
        //y_dash: left, y_dash: height, y_dash: top
        //!!!72 = 572 - 500, hardcode for now
        //!!!1.19175 = tan(50 degrees)
        var y_dash_left = get_position("#sas", "left") - 72 + 50/1.19175 + inflation;
        $("#y_dash").css({left: toPx(y_dash_left)});
        $("#img_y0").css({left: toPx(y_dash_left)});
        $("#img_y0_2").css({left: toPx(y_dash_left)});
        $("#img_arr_l").css({left: toPx(y_dash_left)});
        
        //!!!114 = 500 - 386
        var y_dash_height = 250 + (get_position("#ad", "left") + 114 - get_position("#y_dash", "left"))*1.19175 -1;
        $("#y_dash").css({height: toPx(y_dash_height)});
        
        //500 = supply origin
        var y_dash_top = 500 - y_dash_height +1;
        $("#y_dash").css({top: toPx(y_dash_top)});
        
        
        //r_dash: top, r_dash: left, r_width
        $("#r_dash").css({top: toPx(y_dash_top)});
        
        var r_dash_left = get_position("#cip", "left") - 72 + (250 - get_position("#r_dash", "top"))/1.19175;
        $("#r_dash").css({left: toPx(r_dash_left)});
        
        var r_dash_width = get_position("#y_dash", "left") - (get_position("#cip", "left") - 72) - (250 - get_position("#r_dash", "top"))/1.19175;
        $("#r_dash").css({width: toPx(r_dash_width)});
        
        
        //ex_dash: left, r_dash: height
        var ex_dash_height = 250 - get_position("#r_dash", "top");
        $("#ex_dash").css({height: toPx(ex_dash_height), left: toPx(r_dash_left), top: toPx(y_dash_top)});
    }
    
    function ex_fixed() {
        $("#s_dash").show();
        //ex_dash: top, ex_dash: height
        var ex_dash_left = get_position("#ex_dash", "left");
        $("#fixed_ex").css({left: toPx(ex_dash_left)}).show();
        
        var ex_dash_height = (ex_dash_left - (get_position("#cip", "left") - 72))*1.19175;
        $("#ex_dash").css({height: toPx(ex_dash_height)});
        
        var ex_dash_top = 250 - ex_dash_height;
        $("#ex_dash").css({top: toPx(ex_dash_top)});
        
        //y_dash: height, y_dash: left, y_dash: top
        var y_dash_left = (get_position("#ad", "left") + 114) - ex_dash_height/1.19175;
        $("#y_dash").css({left: toPx(y_dash_left), top: toPx(ex_dash_top)});
        $("#img_y0").css({left: toPx(y_dash_left)});
        $("#img_y0_2").css({left: toPx(y_dash_left)});
        $("#img_arr_l").css({left: toPx(y_dash_left)});
        
        var y_dash_height = 500 - ex_dash_top;
        $("#y_dash").css({height: toPx(y_dash_height)});
        
        //r_dash: top, width
        var r_dash_width = y_dash_left - get_position("#ex_dash", "left");
        $("#r_dash").css({width: toPx(r_dash_width), top: toPx(ex_dash_top), left: toPx(ex_dash_left)});
        
        //s_dash: top, width
        var s_dash_width = get_position("#y_dash", "left") - 500;
        var s_dash_top = 500 - (get_position("#y_dash", "left") - (get_position("#sas", "left") - 72))*1.19175;
        
        $("#s_dash").css({width: toPx(s_dash_width), top: toPx(s_dash_top)});
        $("#img_pt").css({top: toPx(s_dash_top - 10)}).show();
        
    }


});