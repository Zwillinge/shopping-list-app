"use strict";

define([
    "app",
    "helpers/multiview_helper",
    "models/products"
], function(app, mview, products){

    var ui = {
        view:"unitlist",
        id:"catalog_group",
        uniteBy:function(obj){
            return "<div class='category_label' style='background-color:"+obj.color+"'>"+obj.category+"</div>";
        },
        template:function(obj){
            var checked = obj.checked?"<span class='webix_input_icon fa-check-square-o'></span>":"<span class='webix_input_icon fa-square-o'></span>";
            return checked+obj.value;
        },
        onClick:{
            'webix_input_icon':function(e, id){
                products.addToList(id, null, true);
                this.showItem(id);
            }
        }
    };

    return{
        $ui:ui,
        $oninit:function(view, scope){
            $$('catalog_group').sync(products.data);
        }
    };

});
