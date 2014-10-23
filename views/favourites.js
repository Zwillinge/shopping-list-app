"use strict";

define([
    "app",
    "helpers/list_helper",
    "helpers/multiview_helper",
    "models/products"
], function(app, list, mview, products){

    var ui = {
        id:"favourites",
        view:"list",
        template:function(obj, common){
            var checked = obj.checked?"<span class='webix_input_icon fa-check-square-o'></span>":"<span class='webix_input_icon fa-square-o'></span>";
            return "<span style='background-color:"+obj.color+";' class='category'></span>"+checked+obj.value;
        },
        onClick:{
            'webix_input_icon':function(e, id, node){
                products.addToList(id, null, true);
                this.showItem(id);
            }
        },
        on:{
            'data->onStoreUpdated':function(){ list.setListEmpty('favourites');}
        }
    };

    return{
        $ui:ui,
        $oninit:function(view, scope){
            $$('favourites').sync(products.data, function(){
                this.filter(function(obj){
                    return obj.star>5;
                });
            });
        }
    };
});