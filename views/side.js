"use strict";

define([
    "app",
    "helpers/list_helper",
    "helpers/multiview_helper",
    "models/products"
],function(app, list, mview, products){

    function switchViews(view){
        $$(view).show();
    }

    function highlightView(oldv, newv){
        mview.setActiveCell(newv);
        var els = $$('side').getChildViews()[0].elements;
        if(oldv) els[oldv].getNode().firstChild.firstChild.style.backgroundColor = '#fff';
        if(newv) els[newv].getNode().firstChild.firstChild.style.backgroundColor = '#fff004';
    }

    var catalog_abc = {
        view:'list',
        id:'catalog_abc',
        template:function(obj, common){
            var checked = obj.checked?"<span class='webix_input_icon fa-check-square-o'></span>":"<span class='webix_input_icon fa-square-o'></span>";
            return "<span style='background-color:"+obj.color+";' class='category'></span>"+checked+obj.value;
        },
        onClick:{
            'webix_input_icon':function(e, id, node){products.addToList(id, null, true);}
        }
    };

    var catalog_group = {
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
            'webix_input_icon':function(e, id){ products.addToList(id, null, true);}
        }
    };

    var favourites = {
        id:"favourites",
        view:"list",
        template:function(obj, common){
            var checked = obj.checked?"<span class='webix_input_icon fa-check-square-o'></span>":"<span class='webix_input_icon fa-square-o'></span>";
            return "<span style='background-color:"+obj.color+";' class='category'></span>"+checked+obj.value;
        },
        onClick:{
            'webix_input_icon':function(e, id, node){products.addToList(id, null, true);}
        },
        on:{
            'data->onStoreUpdated':function(){
                list.setListEmpty('favourites');
            }}
    };

    var sidebar = {
        view:'toolbar', elements:[
            {view:'icon', width:55, name:"catalog_abc", icon:'sort-alpha-asc', click:function(){switchViews(this.config.name);}, on:{
                'onAfterRender':webix.once(function(){highlightView(null, this.config.name)})
            }},
            {view:'icon', width:55, name:"catalog_group", icon:'list-ul', click:function(){switchViews(this.config.name);}},
            {view:'icon', width:55, name:"favourites", icon:'star', click:function(){switchViews(this.config.name);}},
            {},
            {view:'icon', width:55, icon:'check', click:function(){this.$scope.show("main/shopping/");}}
        ]
    };

    var ui = {
        id:'side',
        rows:[
            sidebar, { id:"lists", cells:[
                catalog_abc, catalog_group, favourites
            ],
            on:{
                'onViewChange':function(oldv, newv){
                    highlightView(oldv, newv)
                }
            }}
        ]
    };

    return {
        $ui:ui,
        $oninit:function(view, scope){
            //restore last opened tab
            var active = mview.getActiveCell()||"catalog_abc";
            $$(active).show();
            highlightView(null, active);

            $$('catalog_abc').sync(products.data);

            $$('catalog_group').sync(products.data);

            //favourite products - chosen more than 5 times
            $$('favourites').sync(products.data, function(){
                this.filter(function(obj){
                    return obj.star>5;
                });
            });
        }
    };
});