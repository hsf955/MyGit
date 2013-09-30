Ext.define('Pandora.model.AreaModel', {
    extend: 'Ext.data.Model', 
    fields:['text'],
    proxy: {
        type: 'ajax',
        url: 'data/getAreaTreeJson.json',
        reader: {
            type: 'json',
            root: 'children'
        }
    }
});