Ext.define('Pandora.store.AreaStore', {
    extend: 'Ext.data.TreeStore',
    requires: 'Pandora.model.AreaModel',
    model: 'Pandora.model.AreaModel',
    root: {
        expanded: true,
        text: '按地区检索',
        checked:true
    }
});


