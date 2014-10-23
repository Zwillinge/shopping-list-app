"use strict";

define([
    "app",
    "helpers/multiview_helper",
    "models/products"
], function(app, mview, products){

    var ui = {
        view:'list',
        id:'catalog_abc',
        template:function(obj, common){
            var checked = obj.checked?"<span class='webix_input_icon fa-check-square-o'></span>":"<span class='webix_input_icon fa-square-o'></span>";
            return "<span style='background-color:"+obj.color+";' class='category'></span>"+checked+obj.value;
        },
        onClick:{
            'webix_input_icon':function(e, id, node){app.addToList(id, null, true);}
        }
    };

    return{
        $ui:ui,
        $oninit:function(view, scope){
            $$('catalog_abc').sync(products.data);
        }
    };

});
