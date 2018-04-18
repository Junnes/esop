//ztree方式获取设备树,参考http://www.ztree.me/v3/api.php
var tree_setting={
	data:{
		simpleData:{
			enable:true
		}
	},
	view:{
		dbClickExpand:false,
		showLine:true,
		selectedMulti:false
	},
	callback:{
		onClick:function(event,treeId,treeNode){
			//
			$("#cameraid").val(treeNode.id);
			NetViewConfig.cameraid=treeNode.id;
			$("#encoderid").val(treeNode.pId);
			NetViewConfig.encoderid=treeNode.pId;
			$("#cameraport").val(treeNode.data.inport);
			NetViewConfig.cameraport=treeNode.data.inport;
			//NetViewControl.Video.Play();
		},
		onDblClick:function(event,treeId,treeNode){
			//播放视频
			$("#cameraid").val(treeNode.id);
			NetViewConfig.cameraid=treeNode.id;
			$("#encoderid").val(treeNode.pId);
			NetViewConfig.encoderid=treeNode.pId;
			$("#cameraport").val(treeNode.data.inport);
			NetViewConfig.cameraport=treeNode.data.inport;
			
			$("#startPlay").click();
		}
	}
}

var zNodes = [];

//获取图标
var IconTemplate={
		Icon:{
		"0_0":"images/root.gif",
		"0_1":"images/office.gif",
		"2_0":"images/encoder.gif",
		"2_1":"images/encoder_offline.gif",
		"2_2":"images/encoder_question.gif",
		"4_0":"images/camera.gif",
		"4_1":"images/camera_offline.gif"
		},
		getIcon:function(kind,status){
			switch(kind){
			case "0":
				return status=="0"?IconTemplate.Icon["0_0"]:IconTemplate.Icon["0_1"];
			case "2":
				if(status=="0"){
					return IconTemplate.Icon["2_0"];
				}else if(status=="1"){
					return IconTemplate.Icon["2_1"];
				}else{
					return IconTemplate.Icon["2_2"];
				}
			case "4":
			return status=="0"?IconTemplate.Icon["4_0"]:IconTemplate.Icon["4_1"];
			default:
			break;
		}
			//if(IconTemplate.Icon[type]){
			//	return IconTemplate.Icon[type];
			//}else{
			//	return IconTemplate.Icon[type];
			//}
		}
	}
//设备树数据
var videoDevice = {
	office : {},
	encoder : {},
	camera : {},
	arrRootNode : [],
	getOffice : function () {
		return videoDevice.office;
	},
	getEncoder : function () {
		return videoDevice.encoder;
	},
	getCamera : function () {
		return videoDevice.camera;
	},
	addOffice : function (domain) {
		//判断是否登录
		var office_Obj = $("#NetViewPlayX")[0].QueryOffice(domain);	
		//alert(office_Obj);
		
		//xml转成json
		var xmlOffice = NetViewConfig.DOM(office_Obj);
		if (xmlOffice && xmlOffice.documentElement) {
			var blsCheck = NetViewConfig.checkError(xmlOffice, "Office");
			if (blsCheck == false) {
				return;
			}
		
			var nodeOffice = xmlOffice.documentElement.getElementsByTagName("IE_OFFICETREE_QUERY_RES");
			if(nodeOffice==null ||nodeOffice.length==0){
				nodeOffice = xmlOffice.documentElement.getElementsByTagName("OFFICE");
			}
			var officeID = null;
			var upofficeID = null;
			var officeName = null;
			for (var i = 0; i < nodeOffice.length; i++) {
				// 考虑多级域ID@Domain
				// officeID = (domain == "" ? nodeOffice[i].getAttribute("officeID") : (nodeOffice[i].getAttribute("officeID")+"@"+domain));
				
				officeID = nodeOffice[i].getAttribute("OfficeID");
				upofficeID = nodeOffice[i].getAttribute("UpOfficeID");
				officeName = nodeOffice[i].getAttribute("OfficeName");
				
				videoDevice.arrRootNode.push({
					'office_id' : officeID,
					'upoffice_id' : upofficeID
				});
				
				if (!videoDevice.office[officeID]) {
					videoDevice.office[officeID] = {};
					videoDevice.office[officeID].PropertyBags = {
						'office_id' : officeID,
						'upoffice_id' : upofficeID,
						'office_name' : officeName,
						'device_type' : "0",
						'domain' : domain
					};
					zNodes.push({
						"id" : officeID,
						"pId" : upofficeID,
						"name" : officeName,
						"open" : upofficeID=="0"?true:false,
						"checked" : false,
						"isHover" : true,
						"data" : {
							"office_id" : officeID,
							"office_name" : officeName,
							"upoffice_id" : upofficeID
						},
						"kind" : "0",
						"icon" :IconTemplate.getIcon("0",upofficeID)
					});
				}
			}
		}
		var loadEncoder = function () {
			return function () {
				videoDevice.addEncoder(domain);
			}
		}
		//var getIcon=function(upofficeID){		
		//	if(upofficeID){
		//		IconTemplate.getIcon["0_0"]
		//	}else{
		//		IconTemplate.getIcon["0_1"]
		//	}
		//}
		window.setTimeout(loadEncoder(), 0);
	},
	
	addEncoder : function (domain) {
		var encoder = $("#NetViewPlayX")[0].QueryDevice(2, domain);
		// alert(encoder);
		var xmlEncoder = NetViewConfig.DOM(encoder);
		if (xmlEncoder && xmlEncoder.documentElement) {
			var blsCheck = NetViewConfig.checkError(xmlEncoder, "Encoder");
			if (blsCheck == false) {
				return;
			}
			var nodeEncoder = xmlEncoder.getElementsByTagName("IE_ENCODER_DEVICE_RES");
			if(nodeEncoder==null ||nodeEncoder.length==0){
				nodeEncoder = xmlEncoder.documentElement.getElementsByTagName("ENCODER");
			}
			var device_id = null;
			var office_id = null;
			var device_name = null;
			var encoder_state = null;
			var privilege_flag = null;
			var image_path = null;
			
			for (var i = 0; i < nodeEncoder.length; i++) {
				// device_id = (domain == "" ? nodeEncoder[i].getAttribute("device_id") : (nodeEncoder[i].getAttribute("device_id")+"@"+domain));
				
				device_id = nodeEncoder[i].getAttribute("device_id");
				office_id = nodeEncoder[i].getAttribute("office_id");
				device_name = nodeEncoder[i].getAttribute("device_name");
				encoder_state = nodeEncoder[i].getAttribute("encoder_state");
				privilege_flag = nodeEncoder[i].getAttribute("privilege_flag");
				
				// 用户是否拥有浏览权限
				if ((privilege_flag.split(""))[0] != "1") {
					continue;
				}
				
				if (!videoDevice.encoder[device_id]) {
					videoDevice.encoder[device_id] = {};
					videoDevice.encoder[device_id].PropertyBags = {
						'device_id' : device_id,
						'office_id' : office_id,
						'device_name' : device_name,
						'encoder_state' : encoder_state,
						'privilege_flag' : privilege_flag,
						'device_type' : "2",
						'domain' : domain
					};
					
					zNodes.push({
						"id" : device_id,
						"pId" : office_id,
						"name" : device_name,
						"open" : false,
						"checked" : false,
						"isHover" : true,
						"data" : {
							"device_id" : device_id,
							"device_name" : device_name,
							"office_id" : office_id
						},
						"kind" : "2",
						"icon" : IconTemplate.getIcon("2",encoder_state)
					});
				}
			}
		}
		var loadCamera = function () {
			return function () {
				videoDevice.addCamera(domain);
			}
		}
		window.setTimeout(loadCamera(), 0);
	},
	
	addCamera : function (domain) {
		var camera = $("#NetViewPlayX")[0].QueryDevice(4, domain);
		// alert(camera);
		var xmlCamera = NetViewConfig.DOM(camera);
		if (xmlCamera && xmlCamera.documentElement) {
			var blsCheck = NetViewConfig.checkError(xmlCamera, "Camera");
			if (blsCheck == false) {
				return;
			}
			var nodeCamera = xmlCamera.getElementsByTagName("IE_CAMERA_DEVICE_RES");
			if(nodeCamera==null ||nodeCamera.length==0){
				nodeCamera = xmlCamera.documentElement.getElementsByTagName("CAMERA");
			}
			var device_id = null;
			var parent_device_id = null;
			var device_name = null;
			var inport = null;
			var privilege_flag = null;
			var is_controlable = null;
			var control_port = null;
			
			for (var i = 0; i < nodeCamera.length; i++) {
				device_id = (domain == "" ? nodeCamera[i].getAttribute("device_id") : (nodeCamera[i].getAttribute("device_id") + "@" + domain));
				device_id = nodeCamera[i].getAttribute("device_id");
				parent_device_id = nodeCamera[i].getAttribute("parent_device_id");
				
				device_name = nodeCamera[i].getAttribute("device_name");
				inport = nodeCamera[i].getAttribute("inport");
				is_controlable = nodeCamera[i].getAttribute("is_controlable");
				control_port = nodeCamera[i].getAttribute("control_port");
				privilege_flag = nodeCamera[i].getAttribute("privilege_flag");
				
				// 用户是否拥有浏览权限
				if ((privilege_flag.split(""))[0] != "1") {
					continue;
				}
				
				if (!videoDevice.camera[device_id]) {
					videoDevice.camera[device_id] = {};
					videoDevice.camera[device_id].PropertyBags = {
						'device_id' : device_id,
						'parent_device_id' : parent_device_id,
						'device_name' : device_name,
						'inport' : inport,
						'privilege_flag' : privilege_flag,
						'is_controlable' : is_controlable,
						'control_port' : control_port,
						'device_type' : "4",
						'domain' : domain
					};
					zNodes.push({
						"id" : device_id,
						"pId" : parent_device_id,
						"name" : device_name,
						"open" : false,
						"checked" : false,
						"isHover" : true,
						"data" : {
							"device_id" : device_id,
							"device_name" : device_name,
							'inport' : inport,
							'privilege_flag' : privilege_flag,
							'is_controlable' : is_controlable,
							'control_port' : control_port
						},
						"kind" : "4",
						"icon" : "images/camera.gif"
					});
				}
			}
		}
		var initTree = function () {
			return function () {
				$.fn.zTree.init($("#deviceTree"),tree_setting,zNodes);
			}
		}
		window.setTimeout(initTree(), 0);
	}
	
}