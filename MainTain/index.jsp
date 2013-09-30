<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>读写MySQL</title>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/lib/extjs4.2/resources/css/ext-all-neptune.css" />
        <script type="text/javascript" src="<%=basePath%>/lib/extjs4.2/bootstrap.js"></script>
	<script type="text/javascript" src="<%=basePath%>/lib/extjs4.2/locale/ext-lang-zh_CN.js"></script>
        <script type="text/javascript" src="<%=basePath%>/common/js/MsgTip.js"></script>
        
	<script type="text/javascript" src="app/app.js"></script>
<!-- </x-compile> -->
</head>
<body>

</body>
</html>
