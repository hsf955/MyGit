Ext.define('Pandora.view.MysqlGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.mysqlgrid',
    tbar: [
        {
            text: '添加记录',
            itemId: 'addrecord'
        },{
            itemId: 'removerecord',
            text: '删除记录',
            disabled: true
        }
    ],
    store: 'MysqlStore',
    columnLines: true,
    columns: [],
    listeners: {
        'selectionchange': function(view, records) {
            this.down('#removerecord').setDisabled(!records.length);
        }
    },
    initComponent:function(config){
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        this.plugins = rowEditing;
        this.rowEditeOb = rowEditing;
        this.callParent(arguments);
    }
});