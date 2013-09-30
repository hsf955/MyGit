Ext.define('Pandora.store.GridStore', {
    extend: 'Ext.data.TreeStore',
    requires: 'Pandora.model.GridModel',
    model: 'Pandora.model.GridModel',
    root: {
        expanded: true,
        text: '按电网检索',
        checked:true
    }
});



