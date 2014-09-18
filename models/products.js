define(function(){

    var collection = new webix.DataCollection({
        scheme:{
            $init:function(){
                this.sort('#value#', 'asc');
            }
        },
        url:'cache->products.json',
        save:'cache->products.json'
    });

    /*clears list of bought items*/
    function clearBought(){
        collection.data.each(function(obj){
            obj.bought = 0;
            this.updateItem(obj.id, obj);
        });
    }

    /*clears list of products to buy*/
    function clearList(){
        collection.data.each(function(obj){
            obj.checked = 0;
            obj.bought = 0;
            this.updateItem(obj.id, obj);
        });
    }

    /*add and removes products between current shopping list and list of bought products*/
    function addToBought(id, add){
        var item = collection.getItem(id);
        item.bought = (add)?1:0;
        item.checked = (add)?0:1;
        webix.delay(function(){
            collection.updateItem(id, item);
        }, collection, null, 100);
    }

    /*add and removes products from current shopping list*/
    function addToList(id, count, turn){
        if(!id) return;
        var item = collection.getItem(id);
        if(!item.checked)item.star = (item.star)?item.star+1:1; //rating
        item.checked = (item.checked && turn)?0:1;
        item.bought = 0;
        item.count = count||'';

        collection.updateItem(id, item);
    }

    /*adds an item added via an input*/
    function isInCatalog(value){
        if(!value) return;
        var id = 0,
            parts = value.split(":"),
            name = parts[0].trim(),
            count = parts[1]?parseInt(parts[1]):'';

        collection.data.each(function(obj){
            if(obj.value.toLowerCase()===name.toLowerCase())
                id = obj.id;
        });

        if(!id){
            collection.add({
                value:name.charAt(0).toUpperCase()+name.slice(1),
                color:"#666",
                category:"Extra"
            });
            id = collection.getLastId();
        }
        addToList(id, count);
    }

        return {
         data : collection,
         clearBought: clearBought,
         clearList:clearList,
         addToBought:addToBought,
         addToList:addToList,
         isInCatalog:isInCatalog
    }
});
