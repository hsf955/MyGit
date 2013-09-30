/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.application({
    name: 'Pandora',  
    autoCreateViewport: true,
    
    models: ['AreaModel', 'GridModel','MysqlModel'],    
    stores: ['AreaStore', 'GridStore','MysqlStore'],
    controllers: ['InfoShow','MainTain']
});

