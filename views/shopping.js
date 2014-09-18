"use strict";
define([
    "app",
    "models/products",
    "helpers/list_helper"
],function(app, products, list){


    function addLayer(){
        $$("lower").disable();
    }

    function removeLayer(){
        $$("lower").enable();
    }

    var buy_list = {
        view:'list',
        id:'buy_list',
        css:'buy',
        autoheight:true,
        minHeight:100,
        template: function(obj){
            var count = obj.count||"";
            return "<span style='background-color:"+obj.color+";' class='category'></span>"+obj.value+
                "<span class='count'>"+count+"</span><span class='webix_input_icon fa-trash-o'></span><span class='webix_input_icon fa-pencil'></span>";
        },
        on:{
            'onItemClick':function(id){ products.addToBought(id, true);},
            'data->onStoreUpdated':function(){list.setListEmpty('buy_list')}
        }
    };

    var bought_list = {
        view:'list',
        id:'bought_list',
        css:'bought',
        autoheight:true,
        template:function(obj){
            var count = obj.count||"";
            return "<span style='background-color:"+obj.color+";' class='category'></span>"+obj.value+
                "<span class='count'>"+count+"</span><span class='webix_input_icon fa-trash-o'>";
        },
        on:{
            'onItemClick':function(id){ products.addToBought(id, false);}
        }
    };

    var shopping_list = {
        view:'scrollview', body:{
            type:'clean',
            id:"lower",
            rows:[
                buy_list,
                bought_list
            ]
        }
    };

    return {
        $ui:shopping_list,
        $oninit:function(view, scope){

            $$('buy_list').sync(products.data, function(){
                this.filter(function(obj){
                    if(obj.checked ===1 && !obj.bought)
                        return true;
                });
            });

            $$('bought_list').sync(products.data, function(){
                this.filter(function(obj){
                    return obj.bought === 1;
                });
            });

            scope.on(app, "optionsShowHandler", addLayer);
            scope.on(app, "optionsHideHandler", removeLayer);
            scope.on(app, "isInCatalog", products.isInCatalog);
        },
        clearList:products.clearList,
        clearBought:products.clearBought
    }

});