<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.*"%>
<%@page import="java.net.*"%>
<%@page import="com.mysql.jdbc.Driver"%>
<%@page import="java.sql.*"%>
<%@page import="com.mysql.jdbc.ResultSetMetaData"%>

<%
    String type = request.getParameter("type");
    String sql = request.getParameter("sql");
    String columnsStr = request.getParameter("columnsStr");
    String columnsType = request.getParameter("columnsType");

    
    StringBuffer buf = new StringBuffer();
    buf.append("{");
    buf.append("\"type\":\"read\"");
    buf.append(",");
    if (type == null || sql == null){
        buf.append("\"data\":[]");
        buf.append(",");
        buf.append("\"result\":\"fail\"");
        buf.append(",");
        buf.append("\"err\":\"params are null!\"");
        buf.append("}");
        out.println(buf.toString());
    }
    else{
        try{
            String path = request.getContextPath();
            String basePath = request.getScheme() + "://"
                    + request.getServerName() + ":" + request.getServerPort()
                    + path + "/";

            /** 链接数据库参数 **/
            String driverName = "com.mysql.jdbc.Driver"; //驱动名称
            String DBUser = "his"; //mysql用户名
            String DBPasswd = "his1234"; //mysql密码
            String DBName = "PCS9700"; //数据库名

            //数据库完整链接地址
            String connUrl = "jdbc:mysql://localhost/" + DBName + "?user="
                    + DBUser + "&password=" + DBPasswd;

            //加载数据库驱动
            Class.forName(driverName).newInstance();

            //链接数据库并保存到 conn 变量中
            Connection conn = DriverManager.getConnection(connUrl);

            //申明～？
            Statement stmt = conn.createStatement();

            //设置字符集
            stmt.executeQuery("SET NAMES UTF8");

            if (type.equals("read")){
                if (columnsStr == null || columnsType == null){
                    buf.append("\"data\":[]");
                    buf.append(",");
                    buf.append("\"result\":\"fail\"");
                    buf.append(",");
                    buf.append("\"err\":\"params are null!\"");
                    buf.append("}");
                    out.println(buf.toString());
                }
                else{
                    String strArr[] = columnsStr.split(",");
                    String typeArr[] = columnsType.split(",");
                    ResultSet rs = stmt.executeQuery(sql);
                    buf.append("\"data\":[");
                    while(rs.next()){
                            buf.append("{");
                            for (int i=0; i<strArr.length; i++){
                                if(typeArr[i].equals("int")){
                                    buf.append("\"" + strArr[i] + "\":");
                                    buf.append("\"" + rs.getInt(strArr[i]) + "\"");
                                    if (i != strArr.length - 1)
                                        buf.append(",");
                                }
                                else if (typeArr[i].equals("float")){
                                    buf.append("\"" + strArr[i] + "\":");
                                    buf.append("\"" + rs.getFloat(strArr[i]) + "\"");
                                    if (i != strArr.length - 1)
                                        buf.append(",");
                                }
                                else{
                                    buf.append("\"" + strArr[i] + "\":");
                                    buf.append("\"" + rs.getString(strArr[i]) + "\"");
                                    if (i != strArr.length - 1)
                                        buf.append(",");
                                }
                            }
                            buf.append("}");
                            //System.out.println(buf);
                            if (!rs.isLast()){
                                    buf.append(",");
                            }
                    };
                    buf.append("]");
                    buf.append(",");
                    buf.append("\"result\":\"success\"");
                    buf.append(",");
                    buf.append("\"err\":\"\"");
                    buf.append("}");
                    out.println(buf.toString());
                    /** 关闭连接 **/
                    conn.close();
                    stmt.close();
                    rs.close();
                }
            }
            else{
                PreparedStatement stm = conn.prepareStatement(sql);
                try{
                        stm.executeUpdate();
                        buf.append("\"data\":[]");
                        buf.append(",");
                        buf.append("\"result\":\"success\"");
                        buf.append(",");
                        buf.append("\"err\":\"\"");
                        buf.append("}");
                        out.println(buf.toString());
                }
                catch(Exception e){  
                        e.printStackTrace();
                        buf.append("\"data\":[]");
                        buf.append(",");
                        buf.append("\"result\":\"fail\"");
                        buf.append(",");
                        buf.append("\"err\":\"" + e.toString().replace("\"","'") + "\"");
                        buf.append("}");
                        out.println(buf.toString());
                }
                /** 关闭连接 **/
                conn.close();
                stmt.close();
            }
        }
        catch(Exception e)   
        {  
            e.printStackTrace();
            buf.append("\"data\":[]");
            buf.append(",");
            buf.append("\"result\":\"fail\"");
            buf.append(",");
            buf.append("\"err\":\"" + e.toString().replace("\"","'") + "\"");
            buf.append("}");
            out.println(buf.toString());
        }
    }
%>
