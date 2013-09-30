Ext.define('Pandora.view.LoginForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.loginform',
    width: 320,
    title: '维护登录',
    modal: true,
    layout: 'fit',
    defaultFocus: '#user',
    closable: false,
    initComponent: function() {
        Ext.apply(this, {
            buttons: [{
                text: '登录',
                action: "login"
            }, {
                text: '取消',
                action: "cancel"
            }],
            items: [{
                xtype: 'form',
                frame:false,
                bodyPadding: 10,
                border:false,
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        itemId: 'user',
                        allowBlank: false,
                        fieldLabel: '用户名',
                        name: 'userName',
                        emptyText: 'username'
                    },
                    {
                        allowBlank: false,
                        fieldLabel: '密码',
                        name: 'passWord',
                        emptyText: 'password',
                        inputType: 'password'
                    },
                    {
                        xtype:'label',
                        name: 'label',
                        forId: 'label',
                        style: {color:'red'}
                    }
                ]
            }]
        });
        this.callParent(arguments);
    }
});
