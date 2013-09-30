Ext.define('Pandora.model.GridModel', {
    extend: 'Ext.data.Model',
    fields:['text'],
    proxy: {
        type: 'ajax',
        url: 'data/getGridTreeJson.json',
        reader: {
            type: 'json',
            root: 'children'
        }
    }
});