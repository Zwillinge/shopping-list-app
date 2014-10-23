define(function(){

    /*overlay for shopping list and favourites list*/
    var overlay = {
        buy_list:null,
        favourites:null
    };

    function setListEmpty(list){
        if($$(list).count()==0 && !overlay[list]){
            overlay[list] = webix.html.create('DIV', { "class":"webix_list_overlay" }, "");
            $$(list).getNode().appendChild(overlay[list]);
            overlay[list].innerHTML = "List is empty";
        }else if($$(list).count()>0 && overlay[list]){
            webix.html.remove(overlay[list]);
            overlay[list] = null;
        }
    }

    return{
        setListEmpty:setListEmpty,
        setOverlayNull:function(list){
            overlay[list] = null;
        }
    }
});
