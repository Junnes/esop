var BMapLib=window.BMapLib=BMapLib||{},BMAPLIB_TAB_SEARCH=0,BMAPLIB_TAB_TO_HERE=1,BMAPLIB_TAB_FROM_HERE=2;!function(){function t(t,e){this._point=t,this.guid=e}function e(t){this.iw=t}function i(t){var e=document.createElement("script");e.setAttribute("type","text/javascript"),e.setAttribute("src",t),e.addEventListener?e.addEventListener("load",function(t){var e=t.target||t.srcElement;e.parentNode.removeChild(e)},!1):e.attachEvent&&e.attachEvent("onreadystatechange",function(){var t=window.event.srcElement;!t||"loaded"!=t.readyState&&"complete"!=t.readyState||t.parentNode.removeChild(t)}),setTimeout(function(){document.getElementsByTagName("head")[0].appendChild(e),e=null},1)}var n,s=n=s||{version:"1.5.0"};s.guid="$BAIDU$",function(){window[s.guid]=window[s.guid]||{},s.lang=s.lang||{},s.lang.isString=function(t){return"[object String]"==Object.prototype.toString.call(t)},s.lang.Event=function(t,e){this.type=t,this.returnValue=!0,this.target=e||null,this.currentTarget=null},s.object=s.object||{},s.extend=s.object.extend=function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t},s.event=s.event||{},s.event._listeners=s.event._listeners||[],s.dom=s.dom||{},s.dom._g=function(t){return s.lang.isString(t)?document.getElementById(t):t},s._g=s.dom._g,s.event.on=function(t,e,i){e=e.replace(/^on/i,""),t=s.dom._g(t);var n,o=function(e){i.call(t,e)},a=s.event._listeners,r=s.event._eventFilter,h=e;return e=e.toLowerCase(),r&&r[e]&&(n=r[e](t,e,o),h=n.type,o=n.listener),t.addEventListener?t.addEventListener(h,o,!1):t.attachEvent&&t.attachEvent("on"+h,o),a[a.length]=[t,e,i,o,h],t},s.on=s.event.on,s.event.un=function(t,e,i){t=s.dom._g(t),e=e.replace(/^on/i,"").toLowerCase();for(var n,o,a,r=s.event._listeners,h=r.length,d=!i;h--;)n=r[h],n[1]!==e||n[0]!==t||!d&&n[2]!==i||(o=n[4],a=n[3],t.removeEventListener?t.removeEventListener(o,a,!1):t.detachEvent&&t.detachEvent("on"+o,a),r.splice(h,1));return t},s.un=s.event.un,s.dom.g=function(t){return"string"==typeof t||t instanceof String?document.getElementById(t):t&&t.nodeName&&(1==t.nodeType||9==t.nodeType)?t:null},s.g=s.G=s.dom.g,s.string=s.string||{},s.browser=s.browser||{},s.browser.ie=s.ie=/msie (\d+\.\d+)/i.test(navigator.userAgent)?document.documentMode||+RegExp.$1:void 0,s.dom._NAME_ATTRS=function(){var t={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",usemap:"useMap",frameborder:"frameBorder"};return s.browser.ie<8?(t["for"]="htmlFor",t["class"]="className"):(t.htmlFor="for",t.className="class"),t}(),s.dom.setAttr=function(t,e,i){return t=s.dom.g(t),"style"==e?t.style.cssText=i:(e=s.dom._NAME_ATTRS[e]||e,t.setAttribute(e,i)),t},s.setAttr=s.dom.setAttr,s.dom.setAttrs=function(t,e){t=s.dom.g(t);for(var i in e)s.dom.setAttr(t,i,e[i]);return t},s.setAttrs=s.dom.setAttrs,s.dom.create=function(t,e){var i=document.createElement(t),n=e||{};return s.dom.setAttrs(i,n)},s.cookie=s.cookie||{},s.cookie._isValidKey=function(t){return new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$').test(t)},s.cookie.getRaw=function(t){if(s.cookie._isValidKey(t)){var e=new RegExp("(^| )"+t+"=([^;]*)(;|$)"),i=e.exec(document.cookie);if(i)return i[2]||null}return null},s.cookie.get=function(t){var e=s.cookie.getRaw(t);return"string"==typeof e?e=decodeURIComponent(e):null},s.cookie.setRaw=function(t,e,i){if(s.cookie._isValidKey(t)){i=i||{};var n=i.expires;"number"==typeof i.expires&&(n=new Date,n.setTime(n.getTime()+i.expires)),document.cookie=t+"="+e+(i.path?"; path="+i.path:"")+(n?"; expires="+n.toGMTString():"")+(i.domain?"; domain="+i.domain:"")+(i.secure?"; secure":"")}},s.cookie.set=function(t,e,i){s.cookie.setRaw(t,encodeURIComponent(e),i)},s.cookie.remove=function(t,e){e=e||{},e.expires=new Date(0),s.cookie.setRaw(t,"",e)},s.isPhone=function(t){return/\d{11}/.test(t)},s.isActivateCode=function(t){return/\d{4}/.test(t)},n.undope=!0}();var o=BMapLib.SearchInfoWindow=function(t,e,i){this.guid=r++,BMapLib.SearchInfoWindow.instance[this.guid]=this,this._isOpen=!1,this._map=t,this._opts=i=i||{},this._content=e||"",this._opts.width=i.width,this._opts.height=i.height,this._opts._title=i.title||"",this._opts.offset=i.offset||new BMap.Size(0,0),this._opts.enableAutoPan=i.enableAutoPan===!1?!1:!0,this._opts._panel=i.panel||null,this._opts._searchTypes=i.searchTypes,this._opts.enableSendToPhone=i.enableSendToPhone};o.prototype=new BMap.Overlay,o.prototype.initialize=function(t){this._closeOtherSearchInfo();var e=this,i=this._createSearchTemplate(),n=t.getPanes().floatPane;return n.style.width="auto",n.appendChild(i),this._initSearchTemplate(),this._getSearchInfoWindowSize(),this._boxWidth=parseInt(this.container.offsetWidth,10),this._boxHeight=parseInt(this.container.offsetHeight,10),s.event.on(i,"onmousedown",function(t){e._stopBubble(t)}),s.event.on(i,"ontouchstart",function(t){e._stopBubble(t)}),s.event.on(i,"touchmove",function(t){e._stopBubble(t)}),s.event.on(i,"touchend",function(t){e._stopBubble(t)}),s.event.on(i,"onmouseover",function(t){e._stopBubble(t)}),s.event.on(i,"click",function(t){e._stopBubble(t)}),s.event.on(i,"dblclick",function(t){e._stopBubble(t)}),i},o.prototype.draw=function(){this._isOpen&&this._adjustPosition(this._point)},o.prototype.open=function(t){this._map.closeInfoWindow();var e,i=this;this._isOpen||(this._map.addOverlay(this),this._isOpen=!0,setTimeout(function(){i._dispatchEvent(i,"open",{point:i._point})},10)),t instanceof BMap.Point?(e=t,this._removeMarkerEvt(),this._marker=null):t instanceof BMap.Marker&&(this._marker&&this._removeMarkerEvt(),e=t.getPosition(),this._marker=t,!this._markerDragend&&this._marker.addEventListener("dragend",this._markerDragend=function(t){i._point=t.point,i._adjustPosition(i._point),i._panBox(),i.show()}),!this._markerDragging&&this._marker.addEventListener("dragging",this._markerDragging=function(){i.hide(),i._point=i._marker.getPosition(),i._adjustPosition(i._point)})),this.show(),this._point=e,this._panBox(),this._adjustPosition(this._point)},o.prototype.close=function(){this._isOpen&&(this._map.removeOverlay(this),this._disposeAutoComplete(),this._isOpen=!1,this._dispatchEvent(this,"close",{point:this._point}))},o.prototype.enableAutoPan=function(){this._opts.enableAutoPan=!0},o.prototype.disableAutoPan=function(){this._opts.enableAutoPan=!1},o.prototype.setContent=function(t){this._setContent(t),this._getSearchInfoWindowSize(),this._adjustPosition(this._point)},o.prototype.setTitle=function(t){this.dom.title.innerHTML=t,this._opts._title=t},o.prototype.getContent=function(){return this.dom.content.innerHTML},o.prototype.getTitle=function(){return this.dom.title.innerHTML},o.prototype.setPosition=function(t){this._point=t,this._adjustPosition(t),this._panBox(),this._removeMarkerEvt()},o.prototype.getPosition=function(){return this._point},o.prototype.getOffset=function(){return this._opts.offset},s.object.extend(o.prototype,{_closeOtherSearchInfo:function(){for(var t=BMapLib.SearchInfoWindow.instance,e=t.length;e--;)t[e]._isOpen&&t[e].close()},_setContent:function(t){if(this.dom&&this.dom.content){"undefined"==typeof t.nodeType?this.dom.content.innerHTML=t:this.dom.content.appendChild(t);var e=this;e._adjustContainerWidth(),this._content=t}},_adjustPosition:function(t){var e=this._getPointPosition(t),i=this._marker&&this._marker.getIcon();this._marker?(this.container.style.bottom=-(e.y-this._opts.offset.height-i.anchor.height+i.infoWindowAnchor.height)-this._marker.getOffset().height+2+30+"px",this.container.style.left=e.x-i.anchor.width+this._marker.getOffset().width+i.infoWindowAnchor.width-this._boxWidth/2+28+"px"):(this.container.style.bottom=-(e.y-this._opts.offset.height)+30+"px",this.container.style.left=e.x-this._boxWidth/2+25+"px")},_getPointPosition:function(t){return this._pointPosition=this._map.pointToOverlayPixel(t),this._pointPosition},_getSearchInfoWindowSize:function(){this._boxWidth=parseInt(this.container.offsetWidth,10),this._boxHeight=parseInt(this.container.offsetHeight,10)},_stopBubble:function(t){t&&t.stopPropagation?t.stopPropagation():window.event.cancelBubble=!0},_panBox:function(){if(this._opts.enableAutoPan){var t=parseInt(this._map.getContainer().offsetHeight,10),e=parseInt(this._map.getContainer().offsetWidth,10),i=this._boxHeight,n=this._boxWidth;if(!(i>=t||n>=e)){this._map.getBounds().containsPoint(this._point)||this._map.setCenter(this._point);var s,o,a=this._map.pointToPixel(this._point),r=n/2-28-a.x+10,h=n/2+28+a.x-e+10;if(this._marker)var d=this._marker.getIcon();var c=this._marker?d.anchor.height+this._marker.getOffset().height-d.infoWindowAnchor.height:0;s=i-a.y+this._opts.offset.height+c+31+10,panX=r>0?r:h>0?-h:0,o=s>0?s:0,this._map.panBy(panX,o)}}},_removeMarkerEvt:function(){this._markerDragend&&this._marker.removeEventListener("dragend",this._markerDragend),this._markerDragging&&this._marker.removeEventListener("dragging",this._markerDragging),this._markerDragend=this._markerDragging=null},_dispatchEvent:function(t,e,i){0!=e.indexOf("on")&&(e="on"+e);var n=new s.lang.Event(e);if(i)for(var o in i)n[o]=i[o];t.dispatchEvent(n)},_initSearchTemplate:function(){this._initDom(),this._initPanelTemplate(),this.setTitle(this._opts._title),this._opts.height&&(this.dom.content.style.height=parseInt(this._opts.height,10)+"px"),this._setContent(this._content),this._initService(),this._bind(),this._opts._searchTypes&&this._setSearchTypes(),this._mendIE6()},_createSearchTemplate:function(){if(!this._div){var t=s.dom.create("div",{"class":"BMapLib_SearchInfoWindow",id:"BMapLib_SearchInfoWindow"+this.guid}),e=['<div class="BMapLib_bubble_top">','<div class="BMapLib_bubble_title" id="BMapLib_bubble_title'+this.guid+'"></div>','<div class="BMapLib_bubble_tools">','<div class="BMapLib_bubble_close" title="关闭" id="BMapLib_bubble_close'+this.guid+'">',"</div>",'<div class="BMapLib_sendToPhone" title="发送到手机" id="BMapLib_sendToPhone'+this.guid+'">',"</div>","</div>","</div>",'<div class="BMapLib_bubble_center">','<div class="BMapLib_bubble_content" id="BMapLib_bubble_content'+this.guid+'">',"</div>",'<div class="BMapLib_nav" id="BMapLib_nav'+this.guid+'">','<ul class="BMapLib_nav_tab" id="BMapLib_nav_tab'+this.guid+'">','<li class="BMapLib_first BMapLib_current" id="BMapLib_tab_search'+this.guid+'" style="display:block;">','<span class="BMapLib_icon BMapLib_icon_nbs"></span>在附近找',"</li>",'<li class="" id="BMapLib_tab_tohere'+this.guid+'" style="display:block;">','<span class="BMapLib_icon BMapLib_icon_tohere"></span>到这里去',"</li>",'<li class="" id="BMapLib_tab_fromhere'+this.guid+'" style="display:block;">','<span class="BMapLib_icon BMapLib_icon_fromhere"></span>从这里出发',"</li>","</ul>",'<ul class="BMapLib_nav_tab_content">','<li id="BMapLib_searchBox'+this.guid+'">','<table width="100%" align="center" border=0 cellpadding=0 cellspacing=0>','<tr><td style="padding-left:8px;"><input id="BMapLib_search_text'+this.guid+'" class="BMapLib_search_text" type="text" maxlength="100" autocomplete="off"></td><td width="55" style="padding-left:7px;"><input id="BMapLib_search_nb_btn'+this.guid+'" type="submit" value="搜索" class="iw_bt"></td></tr>',"</table>","</li>",'<li id="BMapLib_transBox'+this.guid+'" style="display:none">','<table width="100%" align="center" border=0 cellpadding=0 cellspacing=0>','<tr><td width="30" style="padding-left:8px;"><div id="BMapLib_stationText'+this.guid+'">起点</div></td><td><input id="BMapLib_trans_text'+this.guid+'" class="BMapLib_trans_text" type="text" maxlength="100" autocomplete="off"></td><td width="106" style="padding-left:7px;"><input id="BMapLib_search_bus_btn'+this.guid+'" type="button" value="公交" class="iw_bt" style="margin-right:5px;"><input id="BMapLib_search_drive_btn'+this.guid+'" type="button" class="iw_bt" value="驾车"></td></tr>',"</table>","</li>","</ul>","</div>","</div>",'<div class="BMapLib_bubble_bottom"></div>','<img src="http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/iw_tail.png" width="58" height="31" alt="" class="BMapLib_trans" id="BMapLib_trans'+this.guid+'" style="left:144px;"/>'];t.innerHTML=e.join(""),this._div=t}return this._div},_initPanelTemplate:function(){var t=s.g(this._opts._panel);if(!this.dom.panel&&t){t.innerHTML="",this.dom.panel=t;var e=s.dom.create("div");e.style.cssText="display:none;background:#FD9;height:30px;line-height:30px;text-align:center;font-size:12px;color:#994C00;",t.appendChild(e),this.dom.panel.address=e;var i=s.dom.create("div");t.appendChild(i),this.dom.panel.localSearch=i}},_initDom:function(){this.dom||(this.dom={container:s.g("BMapLib_SearchInfoWindow"+this.guid),content:s.g("BMapLib_bubble_content"+this.guid),title:s.g("BMapLib_bubble_title"+this.guid),closeBtn:s.g("BMapLib_bubble_close"+this.guid),transIco:s.g("BMapLib_trans"+this.guid),navBox:s.g("BMapLib_nav"+this.guid),navTab:s.g("BMapLib_nav_tab"+this.guid),seartTab:s.g("BMapLib_tab_search"+this.guid),tohereTab:s.g("BMapLib_tab_tohere"+this.guid),fromhereTab:s.g("BMapLib_tab_fromhere"+this.guid),searchBox:s.g("BMapLib_searchBox"+this.guid),transBox:s.g("BMapLib_transBox"+this.guid),stationText:s.g("BMapLib_stationText"+this.guid),nbBtn:s.g("BMapLib_search_nb_btn"+this.guid),busBtn:s.g("BMapLib_search_bus_btn"+this.guid),driveBtn:s.g("BMapLib_search_drive_btn"+this.guid),searchText:s.g("BMapLib_search_text"+this.guid),transText:s.g("BMapLib_trans_text"+this.guid),sendToPhoneBtn:s.g("BMapLib_sendToPhone"+this.guid)},this.container=this.dom.container)},_adjustContainerWidth:function(){var t=250;this._opts.width?(t=parseInt(this._opts.width,10),t+=10):t=parseInt(this.dom.content.offsetWidth,10),250>t&&(t=250),this._width=t,this.container.style.width=this._width+"px",this._adjustTransPosition()},_adjustTransPosition:function(){this.dom.transIco.style.left=this.container.offsetWidth/2-2-29+"px",this.dom.transIco.style.top=this.container.offsetHeight-2+"px"},_initService:function(){var t=this._map,e=this,i={};i.map=t,this.dom.panel&&(i.panel=this.dom.panel.localSearch),this.localSearch||(this.localSearch=new BMap.LocalSearch(t,{renderOptions:i,onSearchComplete:function(){e._clearAddress(),e._drawCircleBound()}})),this.transitRoute||(this.transitRoute=new BMap.TransitRoute(t,{renderOptions:i,onSearchComplete:function(t){e._transitRouteComplete(e.transitRoute,t)}})),this.drivingRoute||(this.drivingRoute=new BMap.DrivingRoute(t,{renderOptions:i,onSearchComplete:function(t){e._transitRouteComplete(e.drivingRoute,t)}}))},_bind:function(){var t=this;s.on(this.dom.closeBtn,"click",function(){t.close()}),s.on(this.dom.closeBtn,"touchstart",function(){t.close()}),s.on(this.dom.sendToPhoneBtn,"click",function(){t._sendToPhone()}),s.on(this.dom.sendToPhoneBtn,"touchstart",function(){t._sendToPhone()}),s.on(this.dom.seartTab,"click",function(){t._showTabContent(BMAPLIB_TAB_SEARCH)}),s.on(this.dom.seartTab,"touchstart",function(){t._showTabContent(BMAPLIB_TAB_SEARCH)}),s.on(this.dom.tohereTab,"click",function(){t._showTabContent(BMAPLIB_TAB_TO_HERE)}),s.on(this.dom.tohereTab,"touchstart",function(){t._showTabContent(BMAPLIB_TAB_TO_HERE)}),s.on(this.dom.fromhereTab,"click",function(){t._showTabContent(BMAPLIB_TAB_FROM_HERE)}),s.on(this.dom.fromhereTab,"touchstart",function(){t._showTabContent(BMAPLIB_TAB_FROM_HERE)}),s.on(this.dom.searchText,"click",function(){t._localSearchAction()}),s.on(this.dom.searchText,"touchstart",function(){t._localSearchAction()}),s.on(this.dom.nbBtn,"click",function(){t._localSearchAction()}),s.on(this.dom.nbBtn,"touchstart",function(){t._localSearchAction()}),s.on(this.dom.busBtn,"click",function(){t._transitRouteAction(t.transitRoute)}),s.on(this.dom.busBtn,"touchstart",function(){t._transitRouteAction(t.transitRoute)}),s.on(this.dom.driveBtn,"click",function(){t._transitRouteAction(t.drivingRoute)}),s.on(this.dom.driveBtn,"touchstart",function(){t._transitRouteAction(t.drivingRoute)}),this._autoCompleteIni(),this._opts.enableSendToPhone===!1&&(this.dom.sendToPhoneBtn.style.display="none")},_showTabContent:function(t){this._hideAutoComplete();for(var e=this.dom.navTab.getElementsByTagName("li"),i=e.length,n=0,i=e.length;i>n;n++)e[n].className="";switch(t){case BMAPLIB_TAB_SEARCH:this.dom.seartTab.className="BMapLib_current",this.dom.searchBox.style.display="block",this.dom.transBox.style.display="none";break;case BMAPLIB_TAB_TO_HERE:this.dom.tohereTab.className="BMapLib_current",this.dom.searchBox.style.display="none",this.dom.transBox.style.display="block",this.dom.stationText.innerHTML="起点",this._pointType="endPoint";break;case BMAPLIB_TAB_FROM_HERE:this.dom.fromhereTab.className="BMapLib_current",this.dom.searchBox.style.display="none",this.dom.transBox.style.display="block",this.dom.stationText.innerHTML="终点",this._pointType="startPoint"}this._firstTab.className+=" BMapLib_first"},_autoCompleteIni:function(){this.searchAC=new BMap.Autocomplete({input:this.dom.searchText,location:this._map}),this.transAC=new BMap.Autocomplete({input:this.dom.transText,location:this._map})},_hideAutoComplete:function(){this.searchAC.hide(),this.transAC.hide()},_disposeAutoComplete:function(){this.searchAC.dispose(),this.transAC.dispose()},_localSearchAction:function(){var t=this._kw=this.dom.searchText.value;if(""==t)this.dom.searchText.focus();else{this._reset(),this.close();var e=this._radius=1e3;this.localSearch.searchNearby(t,this._point,e)}},_drawCircleBound:function(){this._closeCircleBound();var e=this._searchCircle=new BMap.Circle(this._point,this._radius,{strokeWeight:3,strokeOpacity:.4,strokeColor:"#e00",filColor:"#00e",fillOpacity:.4}),i=this._searchLabel=new t(this._point,this.guid);this._map.addOverlay(e),this._map.addOverlay(i),this._hasCircle=!0},_changeSearchRadius:function(){var t=parseInt(s.g("BMapLib_search_radius"+this.guid).value,10);t>0&&t!=this._radius&&(this._radius=t,this.localSearch.searchNearby(this._kw,this._point,t),this._closeCircleBound())},_closeCircleBound:function(){this._searchCircle&&this._map.removeOverlay(this._searchCircle),this._searchLabel&&this._map.removeOverlay(this._searchLabel),this._hasCircle=!1},_transitRouteAction:function(t){var e=this.dom.transText.value;if(""==e)this.dom.transText.focus();else{this._reset(),this.close();var i=this._getTransPoi(e);t.search(i.start,i.end)}},_transitRouteComplete:function(t,e){this._clearAddress();var i=t.getStatus();if(i==BMAP_STATUS_UNKNOWN_ROUTE){var n=e.getStartStatus(),s=e.getEndStatus(),o="";o="找不到相关的线路",n==BMAP_ROUTE_STATUS_EMPTY&&s==BMAP_ROUTE_STATUS_EMPTY?o="找不到相关的起点和终点":(n==BMAP_ROUTE_STATUS_EMPTY&&(o="找不到相关的起点"),s==BMAP_ROUTE_STATUS_EMPTY&&(o="找不到相关的终点")),"startPoint"==this._pointType&&s==BMAP_ROUTE_STATUS_ADDRESS||"endPoint"==this._pointType&&n==BMAP_ROUTE_STATUS_ADDRESS?this._searchAddress(t):(this.dom.panel.address.style.display="block",this.dom.panel.address.innerHTML=o)}},_searchAddress:function(t){var e=this,i=this.dom.panel;if(!this.lsAddress){var n={map:this._map};i&&(n.panel=this.dom.panel.localSearch),this.lsAddress=new BMap.LocalSearch(this._map,{renderOptions:n})}var o="startPoint"==e._pointType?"终点":"起点";i&&(this.dom.panel.address.style.display="block",this.dom.panel.address.innerHTML="请选择准确的"+o),this.lsAddress.setInfoHtmlSetCallback(function(i,n){var a=document.createElement("div");a.style.cssText="position:relative;left:50%;margin:5px 0 0 -30px;width:60px;height:27px;line-height:27px;border:1px solid #E0C3A6;text-align:center;color:#B35900;cursor:pointer;background-color:#FFEECC;border-radius:2px; background-image: -webkit-gradient(linear, left top, left bottom, from(#FFFDF8), to(#FFEECC))",a.innerHTML="设为"+o,n.appendChild(a),s.on(a,"click",function(){e._clearAddress();var n=i.marker.getPosition();"起点"==o?t.search(n,e._point):t.search(e._point,n)})}),this._reset(),this.lsAddress.search(this.dom.transText.value)},_getTransPoi:function(t){var e,i;return"startPoint"==this._pointType?(e=this._point,i=t):(e=t,i=this._point),{start:e,end:i}},_setSearchTypes:function(){var t,e=this._unique(this._opts._searchTypes),i=this.dom.navTab,n=[this.dom.seartTab,this.dom.tohereTab,this.dom.fromhereTab],o=0,a=0,r=0;if(this.tabLength=e.length,tabWidth=Math.floor((this._width-this.tabLength+1)/this.tabLength),0==e.length)this.dom.navBox.style.display="none";else{for(o=0,a=n.length;a>o;o++)n[o].className="",n[o].style.display="none";for(o=0;o<this.tabLength;o++){if(t=n[e[o]],0==o&&(t.className="BMapLib_first BMapLib_current",this._firstTab=t,r=e[o]),o==this.tabLength-1){var h=this._width-(this.tabLength-1)*(tabWidth+1);t.style.width=6==s.browser.ie?h-3+"px":h+"px"}else t.style.width=tabWidth+"px";t.style.display="block"}void 0!=e[1]&&i.appendChild(n[e[1]]),void 0!=e[2]&&i.appendChild(n[e[2]]),this._showTabContent(r)}this._adjustTransPosition()},_unique:function(t){for(var e,i,n=t.length,s=t.slice(0);--n>=0;)if(i=s[n],0>i||i>2)s.splice(n,1);else for(e=n;e--;)if(i==s[e]){s.splice(n,1);break}return s},_reset:function(){this.localSearch.clearResults(),this.transitRoute.clearResults(),this.drivingRoute.clearResults(),this._closeCircleBound(),this._hideAutoComplete()},_clearAddress:function(){this.lsAddress&&this.lsAddress.clearResults(),this.dom.panel&&(this.dom.panel.address.style.display="none")},_mendIE6:function(){if(s.browser.ie&&!(s.browser.ie>6))for(var t=this.container.getElementsByTagName("IMG"),e=0;e<t.length;e++)t[e].src.indexOf(".png")<0||(t[e].style.cssText+=";FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+t[e].src+",sizingMethod=crop)",t[e].src="http://api.map.baidu.com/images/blank.gif")},_sendToPhone:function(){this.showPopup()},showPopup:function(){this.pop||(this.pop=new e(this)),this._map.addOverlay(this.pop)}}),t.prototype=new BMap.Overlay,t.prototype.initialize=function(t){function e(t){t&&t.stopPropagation?t.stopPropagation():window.event.cancelBubble=!0}this._map=t;var i=this._div=document.createElement("div");s.on(i,"mousedown",e),s.on(i,"touchstart",e),s.on(i,"click",e),s.on(i,"dblclick",e);var n=BMapLib.SearchInfoWindow.instance[this.guid];return i.style.cssText="position:absolute;white-space:nowrap;background:#fff;padding:1px;border:1px solid red;z-index:99;",i.innerHTML='<input type="text" value="'+n._radius+'" style="width:30px;" id="BMapLib_search_radius'+this.guid+'"/>m <a href="javascript:void(0)" title="修改" onclick="BMapLib.SearchInfoWindow.instance['+this.guid+']._changeSearchRadius()" style="font-size:12px;text-decoration:none;color:blue;">修改</a><img src="http://api.map.baidu.com/images/iw_close1d3.gif" alt="关闭" title="关闭" style="cursor:pointer;padding:0 5px;" onclick="BMapLib.SearchInfoWindow.instance['+this.guid+']._closeCircleBound()"/>',t.getPanes().labelPane.appendChild(i),i},t.prototype.draw=function(){var t=this._map,e=t.pointToOverlayPixel(this._point);this._div.style.left=e.x+10+"px",this._div.style.top=e.y-25+"px"};var a="http://api.map.baidu.com";e.prototype=new BMap.Overlay,s.extend(e.prototype,{initialize:function(t){return this._map=t,this.container=this.generalDom(),this._map.getContainer().appendChild(this.container),this.initDom(),this.bind(),this.getAddressByPoint(),this.getRememberPhone(),this.addPhoneNum=0,this.container},draw:function(){},generalDom:function(){var t=document.createElement("div"),e=this._map.getSize(),i=0,n=0;e.width>450&&(n=(e.width-450)/2),e.height>260&&(i=(e.height-260)/2),t.style.cssText="position:absolute;background:#fff;width:480px;height:260px;top:"+i+"px;left:"+n+"px;ovflow:hidden;";var s=['<div class="BMapLib_sms_tab_container">',"<span>发送到手机</span>",'<span id="BMapLib_sms_tip" style="display:none;">',"</span>","</div>",'<div id="BMapLib_sms_pnl_phone" class="BMapLib_sms_pnl_phone" style="display: block;">','<div class="BMapLib_ap" id="pnl_phone_left" style="display: block;">',"<table>","<tr>","<th>发送方手机号</th>",'<td><input type="text" bid="" id="BMapLib_phone_0" maxlength="11" class="BMapLib_sms_input BMapLib_sms_input_l" /><span id="BMapLib_activateTip"></span></td>',"</tr>",'<tr id="BMapLib_activateBox" style="display:none;">',"<th>激活码</th>",'<td><input type="text" id="BMapLib_activate" class="BMapLib_sms_input BMapLib_sms_input_s" maxlength="4"/><input type="button" value="获取" id="BMapLib_activate_btn" bid="activate" />',"</tr>","<tr>","<th></th>","<td>","</td>","</tr>","<tr>",'<th style="vertical-align:top;padding-top:7px;">接收方手机号</th>','<td><div><input type="text" id="BMapLib_phone_1" class="BMapLib_sms_input BMapLib_sms_input_l" maxlength="11"/><input type="checkbox" id="BMapLib_is_remember_phone"/>记住此号</div>','<div id="BMapLib_add_phone_con"></div>','<div><a href="javascript:void(0)" id="BMapLib_add_phone_btn" bid="addPhone">新增</a></div>',"</td>","</tr>","<tr>","<th></th>",'<td ><input type="text" id="BMapLib_ver_input"  maxlength="4" style="width:67px;border: 1px solid #a5acb2;vertical-align: middle;height:18px;" tabindex="5" placeholder="验证码"><img width="69" height="20" id="BMapLib_ver_image" bid="BMapLib_ver_image" style="border: 1px solid #d5d5d5;vertical-align:middle;margin-left: 5px;" alt="点击更换数字" title="点击更换数字"></td>',"</tr>","<tr>","<th></th>",'<td><input type="button" value="免费发送到手机" bid="sendToPhoneBtn"/></td>',"</tr>","</table>","</div>",'<div class="BMapLib_mp" id="pnl_phone_right" style="display: block;">','<div class="BMapLib_mp_title">短信内容：</div>','<div id="BMapLib_msgContent" class="BMapLib_msgContent"></div>',"</div>",'<div style="clear:both;"></div>','<p id="BMapLib_sms_declare_phone" class="BMapLib_sms_declare_phone">百度保证不向任何第三方提供输入的手机号码</p>','<div id="tipError" class="tip fail" style="display:none;">','<span id="tipText"></span>','<a href="javascript:void(0)" id="tipClose" class="cut"></a>',"</div>",'<div id="sms_lack_tip" style="display:none;">已达每日5次短信上限</div>','<div id="sms_unlogin_tip" style="display:none;">','<div style="padding-left:40px;">','<ul class="login_ul"><li id="normal_login-2" class="login_hover"><a href="javascript:void(0)">手机登录</a></li></ul>','<div id="loginBox_02" class="loginBox">','<div id="pass_error_info-2" class="pass_error_style"></div>','<div id="passports-2"></div>','<div id="loginIframe_iph-2" style="display:none"></div>',"</div>","</div>",'<div class="nopass" style="padding-left:128px;">没有百度帐号？<a href="https://passport.baidu.com/v2/?reg&amp;regType=1&amp;tpl=ma" target="_blank">立即注册</a></div>',"</div>","</div>",'<button class="BMapLib_popup_close" bid="close"></button>','<div id="BMapLib_success_tip" style="display:none;">您的短信已经发送到您的手机，请注意查收!</div>'].join("");return t.innerHTML=s,t},initDom:function(){this.dom={sms_tip:s.g("BMapLib_sms_tip"),activate_btn:s.g("BMapLib_activate_btn"),fromphone:s.g("BMapLib_phone_0"),tophone:s.g("BMapLib_phone_1"),isRememberPhone:s.g("BMapLib_is_remember_phone"),sms_container:s.g("BMapLib_sms_pnl_phone"),success_tip:s.g("BMapLib_success_tip"),add_phone_con:s.g("BMapLib_add_phone_con"),add_phone_btn:s.g("BMapLib_add_phone_btn"),activateBox:s.g("BMapLib_activateBox"),activateTip:s.g("BMapLib_activateTip"),activate_input:s.g("BMapLib_activate"),ver_image:s.g("BMapLib_ver_image"),ver_input:s.g("BMapLib_ver_input")}},showTip:function(t){var e=t.error,i={PHONE_NUM_INVALID:"手机号码无效",SMS_SEND_SUCCESS:"发送到手机成功",AK_INVALID:"你所使用的key无效",INTERNAL_ERROR:"服务器错误",OVER_MAX_ACTIVATE_TIME:"今天已超过发送激活码最大次数",SMS_ACTIVATE_SUCCESS:"激活码已发送到您的手机，请注意查收！",ACTIVATE_FAIL:"手机激活码无效",SMS_LACK:"今天您还能往5个手机发送短信",PARAM_INVALID:"请填完所有选项",SEND_ACTIVATE_FAIL:"激活码发送失败",VCODE_VERITY_FAIL:"验证码校验失败"},n=i[e];if("SMS_LACK"==e){var s=t.res_sms;n="今天您还能往"+s+"个手机发送短信",this.addPhoneNum=s-1}this.renderImageVer(),n&&(this.dom.sms_tip.innerHTML=n,this.dom.sms_tip.style.display="inline"),"SMS_SEND_SUCCESS"==e&&(this.rememberPhone(),this.sendSuccess())},bind:function(){var t=this;t.renderImageVer(),s.on(this.container,"click",function(e){var i=e.target||e.srcElement,n=i.getAttribute("bid");switch(n){case"close":t.closeActon();break;case"sendToPhoneBtn":t.sendAction();break;case"activate":t.activateAction();break;case"addPhone":t.addPhoneAction();break;case"deletePhone":t.deletePhoneAction(i);break;case"BMapLib_ver_image":t.renderImageVer()}});s.g("BMapLib_phone_0"),s.g("BMapLib_phone_1");this.container.onkeypress=function(t){var e=t||window.e,i=e.which||e.keyCode,n=!1;return(i>=48&&57>=i||44==i||8==i)&&(n=!0),n},this.dom.ver_input.onkeypress=function(e){t._stopBubble(e);var i=e||window.e,n=i.which||i.keyCode,s=!1;return(n>=48&&57>=n||n>=65&&90>=n||n>=97&&122>=n)&&(s=!0),s},s.on(this.dom.fromphone,"blur",function(){s.isPhone(this.value)?t.checkActivateAction():(t.dom.activateTip.innerHTML="",t.dom.activateBox.style.display="none")}),s.on(this.dom.activate_input,"blur",function(){s.isActivateCode(this.value)&&t.checkActivateAction()})},_stopBubble:function(t){t&&t.stopPropagation?t.stopPropagation():window.event.cancelBubble=!0},renderImageVer:function(){var t=this;this.request("http://map.baidu.com/maps/services/captcha?",{cbName:"cb"},function(e){t.vcode=e.content.vcode,t.dom.ver_image.src="http://map.baidu.com/maps/services/captcha/image?vcode="+t.vcode})},checkActivateAction:function(){var t={phone:this.dom.fromphone.value,activate:this.dom.activate_input.value,cbName:"callback"},e=this;this.request(this.config.ckActivateURL,t,function(t){t&&0!=t.isactivate?(e.dom.activateBox.style.display="none",e.dom.activateTip.style.color="green",e.dom.activateTip.innerHTML="已激活"):(e.dom.activateBox.style.display="table-row",e.dom.activateTip.style.color="red",e.dom.activateTip.innerHTML="未激活")})},activateAction:function(){var t=this,e=this._map.getKey(),i={phone:this.dom.fromphone.value,ak:e,cbName:"callback"};s.isPhone(i.phone)?this.request(this.config.activateURL,i,function(e){e&&t.showTip(e)}):this.showTip({error:"PHONE_NUM_INVALID"})},closeActon:function(){this._map.removeOverlay(this)},getMessage:function(){},sendAction:function(){var t=this;if(this.validate()){tophoneStr=s.g("BMapLib_phone_1").value;for(var e=this.dom.add_phone_con.getElementsByTagName("input"),i=0,n=e.length;n>i;i++){if(!s.isPhone(e[i].value))return void this.showTip({error:"PHONE_NUM_INVALID"});tophoneStr+=","+e[i].value}var o=this._map.getKey(),a={fromphone:s.g("BMapLib_phone_0").value,tophone:tophoneStr,ak:o,activate:this.dom.activate_input.value,code_input:this.dom.ver_input.value,vcode:this.vcode,content:s.g("BMapLib_phone_0").value+"分享一个位置给您，"+this.messageContent,cbName:"callback"};this.request(this.config.sendURL,a,function(e){e&&t.showTip(e)})}},validate:function(){var t=!0;return s.isPhone(this.dom.fromphone.value)&&s.isPhone(this.dom.tophone.value)||(t=!1,this.showTip({error:"PHONE_NUM_INVALID"})),t},getAddressByPoint:function(){var t=this.iw._point,e=this,i=new BMap.Geocoder;i.getLocation(t,function(t){if(t&&t.addressComponents){var i=t.addressComponents;e.address=i.province+i.city+i.district+i.street+i.streetNumber,e.generalMessage()}})},generalMessage:function(){var t=s.g("BMapLib_msgContent"),e="",i=this.iw,n=i.getPosition();this.userPhone&&(e+=this.userPhone+"分享一个位置给您，"),i.getTitle&&(e+="名称为："+i.getTitle()+"，"),this.address&&(e+="大致位置在"+this.address+"，");var o="http://api.map.baidu.com/marker?location="+n.lat+","+n.lng+"&title="+encodeURIComponent(i.getTitle())+"&content="+encodeURIComponent(i.getContent())+"&output=html",a={url:encodeURIComponent(o),t:(new Date).getTime(),cbName:"callback"},r=this;this.request(this.config.shortURL,a,function(i){e+=i.url,r.messageContent=e,t.innerHTML=e})},rememberPhone:function(){if(this.dom.isRememberPhone.checked){var t=this.dom.tophone.value;s.cookie.set("BMapLib_phone",t,{path:"/",expires:2592e6})}},getRememberPhone:function(){var t=s.cookie.get("BMapLib_phone");t&&(this.dom.tophone.value=t,this.dom.isRememberPhone.checked=!0)},sendSuccess:function(){this.dom.sms_container.style.display="none",this.dom.success_tip.style.display="block";var t=this;setTimeout(function(){t._map.removeOverlay(t)},1500)},addPhoneAction:function(){if(this.addPhoneNum>=4);else{var t=document.createElement("div");t.innerHTML='<input type="text" class="BMapLib_sms_input BMapLib_sms_input_l" maxlength="11"/><a href="javascript:void(0);" style="margin-left:5px;" bid="deletePhone">删除</a>',this.dom.add_phone_con.appendChild(t),this.addPhoneNum++}},deletePhoneAction:function(t){t.parentNode.parentNode.removeChild(t.parentNode),this.addPhoneNum--
},request:function(t,e,n){var s=(1e5*Math.random()).toFixed(0);BMapLib["BMapLib_cbk"+s]=function(t){n&&n(t),delete BMapLib["BMapLib_cbk"+s]};for(var o in e)"cbName"!=o&&(t+="&"+o+"="+e[o]);t+="&"+e.cbName+"=BMapLib.BMapLib_cbk"+s,i(t)},config:{sendURL:a+"/ws/message?method=send",activateURL:a+"/ws/message?method=activate",ckActivateURL:a+"/ws/message?method=ckActivate",shortURL:"http://j.map.baidu.com/?"}});var r=0;BMapLib.SearchInfoWindow.instance=[]}();
var BMapLib=window.BMapLib=BMapLib||{};(function(){var d,c=d=c||{version:"1.3.8"};(function(){c.guid="$BAIDU$";window[c.guid]=window[c.guid]||{};c.dom=c.dom||{};c.dom.g=function(f){if("string"==typeof f||f instanceof String){return document.getElementById(f)}else{if(f&&f.nodeName&&(f.nodeType==1||f.nodeType==9)){return f}}return null};c.g=c.G=c.dom.g;c.dom.getDocument=function(f){f=c.dom.g(f);return f.nodeType==9?f:f.ownerDocument||f.document};c.lang=c.lang||{};c.lang.isString=function(f){return"[object String]"==Object.prototype.toString.call(f)};c.isString=c.lang.isString;c.dom._g=function(f){if(c.lang.isString(f)){return document.getElementById(f)}return f};c._g=c.dom._g;c.browser=c.browser||{};if(/msie (\d+\.\d)/i.test(navigator.userAgent)){c.browser.ie=c.ie=document.documentMode||+RegExp["\x241"]}c.dom.getComputedStyle=function(g,f){g=c.dom._g(g);var i=c.dom.getDocument(g),h;if(i.defaultView&&i.defaultView.getComputedStyle){h=i.defaultView.getComputedStyle(g,null);if(h){return h[f]||h.getPropertyValue(f)}}return""};c.dom._styleFixer=c.dom._styleFixer||{};c.dom._styleFilter=c.dom._styleFilter||[];c.dom._styleFilter.filter=function(g,k,l){for(var f=0,j=c.dom._styleFilter,h;h=j[f];f++){if(h=h[l]){k=h(g,k)}}return k};c.string=c.string||{};c.string.toCamelCase=function(f){if(f.indexOf("-")<0&&f.indexOf("_")<0){return f}return f.replace(/[-_][^-_]/g,function(g){return g.charAt(1).toUpperCase()})};c.dom.getStyle=function(h,g){var j=c.dom;h=j.g(h);g=c.string.toCamelCase(g);var i=h.style[g]||(h.currentStyle?h.currentStyle[g]:"")||j.getComputedStyle(h,g);if(!i){var f=j._styleFixer[g];if(f){i=f.get?f.get(h):c.dom.getStyle(h,f)}}if(f=j._styleFilter){i=f.filter(g,i,"get")}return i};c.getStyle=c.dom.getStyle;if(/opera\/(\d+\.\d)/i.test(navigator.userAgent)){c.browser.opera=+RegExp["\x241"]}c.browser.isWebkit=/webkit/i.test(navigator.userAgent);c.browser.isGecko=/gecko/i.test(navigator.userAgent)&&!/like gecko/i.test(navigator.userAgent);c.browser.isStrict=document.compatMode=="CSS1Compat";c.dom.getPosition=function(f){f=c.dom.g(f);var o=c.dom.getDocument(f),i=c.browser,l=c.dom.getStyle,h=i.isGecko>0&&o.getBoxObjectFor&&l(f,"position")=="absolute"&&(f.style.top===""||f.style.left===""),m={left:0,top:0},k=(i.ie&&!i.isStrict)?o.body:o.documentElement,p,g;if(f==k){return m}if(f.getBoundingClientRect){g=f.getBoundingClientRect();m.left=Math.floor(g.left)+Math.max(o.documentElement.scrollLeft,o.body.scrollLeft);m.top=Math.floor(g.top)+Math.max(o.documentElement.scrollTop,o.body.scrollTop);m.left-=o.documentElement.clientLeft;m.top-=o.documentElement.clientTop;var n=o.body,q=parseInt(l(n,"borderLeftWidth")),j=parseInt(l(n,"borderTopWidth"));if(i.ie&&!i.isStrict){m.left-=isNaN(q)?2:q;m.top-=isNaN(j)?2:j}}else{p=f;do{m.left+=p.offsetLeft;m.top+=p.offsetTop;if(i.isWebkit>0&&l(p,"position")=="fixed"){m.left+=o.body.scrollLeft;m.top+=o.body.scrollTop;break}p=p.offsetParent}while(p&&p!=f);if(i.opera>0||(i.isWebkit>0&&l(f,"position")=="absolute")){m.top-=o.body.offsetTop}p=f.offsetParent;while(p&&p!=o.body){m.left-=p.scrollLeft;if(!i.opera||p.tagName!="TR"){m.top-=p.scrollTop}p=p.offsetParent}}return m};c.event=c.event||{};c.event._listeners=c.event._listeners||[];c.event.on=function(g,j,l){j=j.replace(/^on/i,"");g=c.dom._g(g);var k=function(n){l.call(g,n)},f=c.event._listeners,i=c.event._eventFilter,m,h=j;j=j.toLowerCase();if(i&&i[j]){m=i[j](g,j,k);h=m.type;k=m.listener}if(g.addEventListener){g.addEventListener(h,k,false)}else{if(g.attachEvent){g.attachEvent("on"+h,k)}}f[f.length]=[g,j,l,k,h];return g};c.on=c.event.on;(function(){var f=window[c.guid];c.lang.guid=function(){return"TANGRAM__"+(f._counter++).toString(36)};f._counter=f._counter||1})();window[c.guid]._instances=window[c.guid]._instances||{};c.lang.isFunction=function(f){return"[object Function]"==Object.prototype.toString.call(f)};c.lang.Class=function(f){this.guid=f||c.lang.guid();window[c.guid]._instances[this.guid]=this};window[c.guid]._instances=window[c.guid]._instances||{};c.lang.Class.prototype.dispose=function(){delete window[c.guid]._instances[this.guid];for(var f in this){if(!c.lang.isFunction(this[f])){delete this[f]}}this.disposed=true};c.lang.Class.prototype.toString=function(){return"[object "+(this._className||"Object")+"]"};c.lang.Event=function(f,g){this.type=f;this.returnValue=true;this.target=g||null;this.currentTarget=null};c.lang.Class.prototype.addEventListener=function(i,h,g){if(!c.lang.isFunction(h)){return}!this.__listeners&&(this.__listeners={});var f=this.__listeners,j;if(typeof g=="string"&&g){if(/[^\w\-]/.test(g)){throw ("nonstandard key:"+g)}else{h.hashCode=g;j=g}}i.indexOf("on")!=0&&(i="on"+i);typeof f[i]!="object"&&(f[i]={});j=j||c.lang.guid();h.hashCode=j;f[i][j]=h};c.lang.Class.prototype.removeEventListener=function(i,h){if(typeof h!="undefined"){if((c.lang.isFunction(h)&&!(h=h.hashCode))||(!c.lang.isString(h))){return}}!this.__listeners&&(this.__listeners={});i.indexOf("on")!=0&&(i="on"+i);var g=this.__listeners;if(!g[i]){return}if(typeof h!="undefined"){g[i][h]&&delete g[i][h]}else{for(var f in g[i]){delete g[i][f]}}};c.lang.Class.prototype.dispatchEvent=function(j,f){if(c.lang.isString(j)){j=new c.lang.Event(j)}!this.__listeners&&(this.__listeners={});f=f||{};for(var h in f){j[h]=f[h]}var h,g=this.__listeners,k=j.type;j.target=j.target||this;j.currentTarget=this;k.indexOf("on")!=0&&(k="on"+k);c.lang.isFunction(this[k])&&this[k].apply(this,arguments);if(typeof g[k]=="object"){for(h in g[k]){g[k][h].apply(this,arguments)}}return j.returnValue};c.lang.inherits=function(l,j,i){var h,k,f=l.prototype,g=new Function();g.prototype=j.prototype;k=l.prototype=new g();for(h in f){k[h]=f[h]}l.prototype.constructor=l;l.superClass=j.prototype;if("string"==typeof i){k._className=i}};c.inherits=c.lang.inherits})();var b="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/images/m";var a="png";var e=BMapLib.TextIconOverlay=function(f,h,g){this._position=f;this._text=h;this._options=g||{};this._styles=this._options.styles||[];(!this._styles.length)&&this._setupDefaultStyles()};d.lang.inherits(e,BMap.Overlay,"TextIconOverlay");e.prototype._setupDefaultStyles=function(){var h=[53,56,66,78,90];for(var g=0,f;f=h[g];g++){this._styles.push({url:b+g+"."+a,size:new BMap.Size(f,f)})}};e.prototype.initialize=function(f){this._map=f;this._domElement=document.createElement("div");this._updateCss();this._updateText();this._updatePosition();this._bind();this._map.getPanes().markerMouseTarget.appendChild(this._domElement);return this._domElement};e.prototype.draw=function(){this._map&&this._updatePosition()};e.prototype.getText=function(){return this._text};e.prototype.setText=function(f){if(f&&(!this._text||(this._text.toString()!=f.toString()))){this._text=f;this._updateText();this._updateCss();this._updatePosition()}};e.prototype.getPosition=function(){return this._position};e.prototype.setPosition=function(f){if(f&&(!this._position||!this._position.equals(f))){this._position=f;this._updatePosition()}};e.prototype.getStyleByText=function(i,h){var g=parseInt(i);var f=parseInt(g/10);f=Math.max(0,f);f=Math.min(f,h.length-1);return h[f]};e.prototype._updateCss=function(){var f=this.getStyleByText(this._text,this._styles);this._domElement.style.cssText=this._buildCssText(f)};e.prototype._updateText=function(){if(this._domElement){this._domElement.innerHTML=this._text}};e.prototype._updatePosition=function(){if(this._domElement&&this._position){var f=this._domElement.style;var g=this._map.pointToOverlayPixel(this._position);g.x-=Math.ceil(parseInt(f.width)/2);g.y-=Math.ceil(parseInt(f.height)/2);f.left=g.x+"px";f.top=g.y+"px"}};e.prototype._buildCssText=function(g){var h=g.url;var n=g.size;var k=g.anchor;var j=g.offset;var l=g.textColor||"black";var f=g.textSize||10;var m=[];if(d.browser.ie<7){m.push('filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="'+h+'");')}else{m.push("background-image:url("+h+");");var i="0 0";(j instanceof BMap.Size)&&(i=j.width+"px "+j.height+"px");m.push("background-position:"+i+";")}if(n instanceof BMap.Size){if(k instanceof BMap.Size){if(k.height>0&&k.height<n.height){m.push("height:"+(n.height-k.height)+"px; padding-top:"+k.height+"px;")}if(k.width>0&&k.width<n.width){m.push("width:"+(n.width-k.width)+"px; padding-left:"+k.width+"px;")}}else{m.push("height:"+n.height+"px; line-height:"+n.height+"px;");m.push("width:"+n.width+"px; text-align:center;")}}m.push("cursor:pointer; color:"+l+"; position:absolute; font-size:"+f+"px; font-family:Arial,sans-serif; font-weight:bold");return m.join("")};e.prototype._bind=function(){if(!this._domElement){return}var g=this;var i=this._map;var f=d.lang.Event;function h(m,l){var k=m.srcElement||m.target;var j=m.clientX||m.pageX;var o=m.clientY||m.pageY;if(m&&l&&j&&o&&k){var n=d.dom.getPosition(i.getContainer());l.pixel=new BMap.Pixel(j-n.left,o-n.top);l.point=i.pixelToPoint(l.pixel)}return l}d.event.on(this._domElement,"mouseover",function(j){g.dispatchEvent(h(j,new f("onmouseover")))});d.event.on(this._domElement,"mouseout",function(j){g.dispatchEvent(h(j,new f("onmouseout")))});d.event.on(this._domElement,"click",function(j){g.dispatchEvent(h(j,new f("onclick")))})}})();
var BMapLib=window.BMapLib=BMapLib||{};(function(){var b=function(m,l,j){l=d(l);var n=m.pointToPixel(l.getNorthEast());var i=m.pointToPixel(l.getSouthWest());n.x+=j;n.y-=j;i.x-=j;i.y+=j;var h=m.pixelToPoint(n);var k=m.pixelToPoint(i);return new BMap.Bounds(k,h)};var d=function(i){var k=f(i.getNorthEast().lng,-180,180);var h=f(i.getSouthWest().lng,-180,180);var j=f(i.getNorthEast().lat,-74,74);var l=f(i.getSouthWest().lat,-74,74);return new BMap.Bounds(new BMap.Point(h,l),new BMap.Point(k,j))};var f=function(j,k,h){k&&(j=Math.max(j,k));h&&(j=Math.min(j,h));return j};var a=function(h){return"[object Array]"===Object.prototype.toString.call(h)};var c=function(l,n){var j=-1;if(a(n)){if(n.indexOf){j=n.indexOf(l)}else{for(var k=0,h;h=n[k];k++){if(h===l){j=k;break}}}}return j};var e=BMapLib.MarkerClusterer=function(l,h){if(!l){return}this._map=l;this._markers=[];this._clusters=[];var k=h||{};this._gridSize=k.gridSize||60;this._maxZoom=k.maxZoom||18;this._minClusterSize=k.minClusterSize||2;this._isAverageCenter=false;if(k.isAverageCenter!=undefined){this._isAverageCenter=k.isAverageCenter}this._styles=k.styles||[];var j=this;this._map.addEventListener("zoomend",function(){j._redraw()});this._map.addEventListener("moveend",function(){j._redraw()});var i=k.markers;a(i)&&this.addMarkers(i)};e.prototype.addMarkers=function(k){for(var j=0,h=k.length;j<h;j++){this._pushMarkerTo(k[j])}this._createClusters()};e.prototype._pushMarkerTo=function(h){var i=c(h,this._markers);if(i===-1){h.isInCluster=false;this._markers.push(h)}};e.prototype.addMarker=function(h){this._pushMarkerTo(h);this._createClusters()};e.prototype._createClusters=function(){var j=this._map.getBounds();var l=b(this._map,j,this._gridSize);for(var k=0,h;h=this._markers[k];k++){if(!h.isInCluster&&l.containsPoint(h.getPosition())){this._addToClosestCluster(h)}}};e.prototype._addToClosestCluster=function(l){var p=4000000;var n=null;var k=l.getPosition();for(var m=0,j;j=this._clusters[m];m++){var h=j.getCenter();if(h){var o=this._map.getDistance(h,l.getPosition());if(o<p){p=o;n=j}}}if(n&&n.isMarkerInClusterBounds(l)){n.addMarker(l)}else{var j=new g(this);j.addMarker(l);this._clusters.push(j)}};e.prototype._clearLastClusters=function(){for(var j=0,h;h=this._clusters[j];j++){h.remove()}this._clusters=[];this._removeMarkersFromCluster()};e.prototype._removeMarkersFromCluster=function(){for(var j=0,h;h=this._markers[j];j++){h.isInCluster=false}};e.prototype._removeMarkersFromMap=function(){for(var j=0,h;h=this._markers[j];j++){h.isInCluster=false;this._map.removeOverlay(h)}};e.prototype._removeMarker=function(h){var i=c(h,this._markers);if(i===-1){return false}this._map.removeOverlay(h);this._markers.splice(i,1);return true};e.prototype.removeMarker=function(h){var i=this._removeMarker(h);if(i){this._clearLastClusters();this._createClusters()}return i};e.prototype.removeMarkers=function(l){var k=false;for(var h=0;h<l.length;h++){var j=this._removeMarker(l[h]);k=k||j}if(k){this._clearLastClusters();this._createClusters()}return k};e.prototype.clearMarkers=function(){this._clearLastClusters();this._removeMarkersFromMap();this._markers=[]};e.prototype._redraw=function(){this._clearLastClusters();this._createClusters()};e.prototype.getGridSize=function(){return this._gridSize};e.prototype.setGridSize=function(h){this._gridSize=h;this._redraw()};e.prototype.getMaxZoom=function(){return this._maxZoom};e.prototype.setMaxZoom=function(h){this._maxZoom=h;this._redraw()};e.prototype.getStyles=function(){return this._styles};e.prototype.setStyles=function(h){this._styles=h;this._redraw()};e.prototype.getMinClusterSize=function(){return this._minClusterSize};e.prototype.setMinClusterSize=function(h){this._minClusterSize=h;this._redraw()};e.prototype.isAverageCenter=function(){return this._isAverageCenter};e.prototype.getMap=function(){return this._map};e.prototype.getMarkers=function(){return this._markers};e.prototype.getClustersCount=function(){var k=0;for(var j=0,h;h=this._clusters[j];j++){h.isReal()&&k++}return k};function g(h){this._markerClusterer=h;this._map=h.getMap();this._minClusterSize=h.getMinClusterSize();this._isAverageCenter=h.isAverageCenter();this._center=null;this._markers=[];this._gridBounds=null;this._isReal=false;this._clusterMarker=new BMapLib.TextIconOverlay(this._center,this._markers.length,{styles:this._markerClusterer.getStyles()})}g.prototype.addMarker=function(k){if(this.isMarkerInCluster(k)){return false}if(!this._center){this._center=k.getPosition();this.updateGridBounds()}else{if(this._isAverageCenter){var j=this._markers.length+1;var o=(this._center.lat*(j-1)+k.getPosition().lat)/j;var m=(this._center.lng*(j-1)+k.getPosition().lng)/j;this._center=new BMap.Point(m,o);this.updateGridBounds()}}k.isInCluster=true;this._markers.push(k);var h=this._markers.length;if(h<this._minClusterSize){this._map.addOverlay(k);return true}else{if(h===this._minClusterSize){for(var n=0;n<h;n++){this._markers[n].getMap()&&this._map.removeOverlay(this._markers[n])}}}this._map.addOverlay(this._clusterMarker);this._isReal=true;this.updateClusterMarker();return true};g.prototype.isMarkerInCluster=function(j){if(this._markers.indexOf){return this._markers.indexOf(j)!=-1}else{for(var k=0,h;h=this._markers[k];k++){if(h===j){return true}}}return false};g.prototype.isMarkerInClusterBounds=function(h){return this._gridBounds.containsPoint(h.getPosition())};g.prototype.isReal=function(h){return this._isReal};g.prototype.updateGridBounds=function(){var h=new BMap.Bounds(this._center,this._center);this._gridBounds=b(this._map,h,this._markerClusterer.getGridSize())};g.prototype.updateClusterMarker=function(){if(this._map.getZoom()>this._markerClusterer.getMaxZoom()){this._clusterMarker&&this._map.removeOverlay(this._clusterMarker);for(var l=0,j;j=this._markers[l];l++){this._map.addOverlay(j)}return}if(this._markers.length<this._minClusterSize){this._clusterMarker.hide();return}this._clusterMarker.setPosition(this._center);this._clusterMarker.setText(this._markers.length);var k=this._map;var h=this.getBounds();this._clusterMarker.addEventListener("click",function(i){k.setViewport(h)})};g.prototype.remove=function(){for(var j=0,h;h=this._markers[j];j++){this._markers[j].getMap()&&this._map.removeOverlay(this._markers[j])}this._map.removeOverlay(this._clusterMarker);this._markers.length=0;delete this._markers};g.prototype.getBounds=function(){var k=new BMap.Bounds(this._center,this._center);for(var j=0,h;h=this._markers[j];j++){k.extend(h.getPosition())}return k};g.prototype.getCenter=function(){return this._center}})();
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(h,r){var k={},l=k.lib={},n=function(){},f=l.Base={extend:function(a){n.prototype=this;var b=new n;a&&b.mixIn(a);b.hasOwnProperty("init")||(b.init=function(){b.$super.init.apply(this,arguments)});b.init.prototype=b;b.$super=this;return b},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
j=l.WordArray=f.extend({init:function(a,b){a=this.words=a||[];this.sigBytes=b!=r?b:4*a.length},toString:function(a){return(a||s).stringify(this)},concat:function(a){var b=this.words,d=a.words,c=this.sigBytes;a=a.sigBytes;this.clamp();if(c%4)for(var e=0;e<a;e++)b[c+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((c+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)b[c+e>>>2]=d[e>>>2];else b.push.apply(b,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,b=this.sigBytes;a[b>>>2]&=4294967295<<
32-8*(b%4);a.length=h.ceil(b/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var b=[],d=0;d<a;d+=4)b.push(4294967296*h.random()|0);return new j.init(b,a)}}),m=k.enc={},s=m.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var d=[],c=0;c<a;c++){var e=b[c>>>2]>>>24-8*(c%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c+=2)d[c>>>3]|=parseInt(a.substr(c,
2),16)<<24-4*(c%8);return new j.init(d,b/2)}},p=m.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var d=[],c=0;c<a;c++)d.push(String.fromCharCode(b[c>>>2]>>>24-8*(c%4)&255));return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c++)d[c>>>2]|=(a.charCodeAt(c)&255)<<24-8*(c%4);return new j.init(d,b)}},t=m.Utf8={stringify:function(a){try{return decodeURIComponent(escape(p.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return p.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new j.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=t.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,d=b.words,c=b.sigBytes,e=this.blockSize,f=c/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;c=h.min(4*a,c);if(a){for(var g=0;g<a;g+=e)this._doProcessBlock(d,g);g=d.splice(0,a);b.sigBytes-=c}return new j.init(g,c)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,d){return(new a.init(d)).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return(new u.HMAC.init(a,
d)).finalize(b)}}});var u=k.algo={};return k}(Math);
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var h=CryptoJS,j=h.lib.WordArray;h.enc.Base64={stringify:function(b){var e=b.words,f=b.sigBytes,c=this._map;b.clamp();b=[];for(var a=0;a<f;a+=3)for(var d=(e[a>>>2]>>>24-8*(a%4)&255)<<16|(e[a+1>>>2]>>>24-8*((a+1)%4)&255)<<8|e[a+2>>>2]>>>24-8*((a+2)%4)&255,g=0;4>g&&a+0.75*g<f;g++)b.push(c.charAt(d>>>6*(3-g)&63));if(e=c.charAt(64))for(;b.length%4;)b.push(e);return b.join("")},parse:function(b){var e=b.length,f=this._map,c=f.charAt(64);c&&(c=b.indexOf(c),-1!=c&&(e=c));for(var c=[],a=0,d=0;d<
e;d++)if(d%4){var g=f.indexOf(b.charAt(d-1))<<2*(d%4),h=f.indexOf(b.charAt(d))>>>6-2*(d%4);c[a>>>2]|=(g|h)<<24-8*(a%4);a++}return j.create(c,a)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
/**
 * @fileoverview 百度地图API事件包装器
 * 此代码可使用closure compiler的advanced模式进行压缩
 * @author Baidu Map Api Group 
 * @version 1.2
 */
/** 
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
window['BMapLib'] = window['BMapLib'] || {};
window['BMapLib']['EventWrapper'] = window['BMapLib']['EventWrapper'] || {};
(function(){
/**
 * 事件封装器的静态类
 * @class EventWrapper
 */
var EventWrapper = window['BMapLib']['EventWrapper'];
/**
 * 添加DOM事件监听函数
 * @param {HTMLElement} DOM元素
 * @param {String} 事件名称
 * @param {Function} 事件处理函数
 * @returns {MapsEventListener} 事件监听对象
 */
EventWrapper['addDomListener'] = function(instance, eventName, handler) {
    if (instance.addEventListener) {
        instance.addEventListener(eventName, handler, false);
    }
    else if (instance.attachEvent) {
        instance.attachEvent('on' + eventName, handler);
    }
    else {
        instance['on' + eventName] = handler;
    }
    return new MapsEventListener(instance, eventName, handler, MapsEventListener.DOM_EVENT);
};
/**
 * 添加DOM事件监听函数，函数仅执行一次
 * @param {HTMLElement} DOM元素
 * @param {String} 事件名称
 * @param {Function} 事件处理函数
 * @returns {MapsEventListener} 事件监听对象
 */
EventWrapper['addDomListenerOnce'] = function(instance, eventName, handler) {
    var eventListener = EventWrapper['addDomListener'](instance, eventName, function(){
        // 移除
        EventWrapper['removeListener'](eventListener);
        return handler.apply(this, arguments);
    });
    return eventListener;
};
/**
 * 添加地图事件监听函数
 * @param {Object} 实例
 * @param {String} 事件名称
 * @param {Function} 事件处理函数
 * @returns {MapsEventListener} 事件监听对象
 */
EventWrapper['addListener'] = function(instance, eventName, handler) {
    instance.addEventListener(eventName, handler);
    return new MapsEventListener(instance, eventName, handler, MapsEventListener.MAP_EVENT);
};
/**
 * 添加地图事件监听函数，函数仅执行一次
 * @param {Object} 需要监听的实例
 * @param {String} 事件名称
 * @param {Function} 事件处理函数
 * @returns {MapsEventListener} 事件监听对象
 */
EventWrapper['addListenerOnce'] = function(instance, eventName, handler){
    var eventListener = EventWrapper['addListener'](instance, eventName, function(){
        // 移除
        EventWrapper['removeListener'](eventListener);
        return handler.apply(this, arguments);
    });
    return eventListener;
};
/**
 * 移除特定实例的所有事件的所有监听函数
 * @param {Object} 需要移除所有事件监听的实例
 * @returns {None}
 */
EventWrapper['clearInstanceListeners'] = function(instance) {
    var listeners = instance._e_ || {};
    for (var i in listeners) {
        EventWrapper['removeListener'](listeners[i]);
    }
    instance._e_ = {};
};
/**
 * 移除特定实例特定事件的所有监听函数
 * @param {Object} 需要移除特定事件监听的实例
 * @param {String} 需要移除的事件名
 * @returns {None}
 */
EventWrapper['clearListeners'] = function(instance, eventName) {
    var listeners = instance._e_ || {};
    for (var i in listeners) {
        if (listeners[i]._eventName == eventName) {
            EventWrapper['removeListener'](listeners[i]);
        }
    }
};
/**
 * 移除特定的事件监听函数
 * @param {MapsEventListener} 需要移除的事件监听对象
 * @returns {None}
 */
EventWrapper['removeListener'] = function(listener) {
    var instance = listener._instance;
    var eventName = listener._eventName;
    var handler = listener._handler;
    var listeners = instance._e_ || {};
    for (var i in listeners) {
        if (listeners[i]._guid == listener._guid) {
            if (listener._eventType == MapsEventListener.DOM_EVENT) {
                // DOM事件
                if (instance.removeEventListener) {
                    instance.removeEventListener(eventName, handler, false);
                }
                else if (instance.detachEvent) {
                    instance.detachEvent('on' + eventName, handler);
                }
                else {
                    instance['on' + eventName] = null;
                }
            }
            else if (listener._eventType == MapsEventListener.MAP_EVENT) {
                // 地图事件
                instance.removeEventListener(eventName, handler);
            }
            delete listeners[i];
        }
    }
};
/**
 * 触发特定事件
 * @param {Object} 触发事件的实例对象
 * @param {String} 触发事件的名称
 * @param {Object} 自定义事件参数，可选
 * @returns {None}
 */
EventWrapper['trigger'] = function(instance, eventName) {
    var listeners = instance._e_ || {};
    for (var i in listeners) {
        if (listeners[i]._eventName == eventName) {
            var args = Array.prototype.slice.call(arguments, 2);
            listeners[i]._handler.apply(instance, args);
        }
    }
};

/**
 * 事件监听类
 * @constructor
 * @ignore
 * @private
 * @param {Object} 对象实例
 * @param {string} 事件名称
 * @param {Function} 事件监听函数
 * @param {EventTypes} 事件类型
 */
function MapsEventListener(instance, eventName, handler, eventType){
    this._instance = instance;
    this._eventName = eventName;
    this._handler = handler;
    this._eventType = eventType;
    this._guid = MapsEventListener._guid ++;
    this._instance._e_ = this._instance._e_ || {};
    this._instance._e_[this._guid] = this;
}
MapsEventListener._guid = 1;

MapsEventListener.DOM_EVENT = 1;
MapsEventListener.MAP_EVENT = 2;

})();
/**
 * @fileoverview GeoUtils类提供若干几何算法，用来帮助用户判断点与矩形、
 * 圆形、多边形线、多边形面的关系,并提供计算折线长度和多边形的面积的公式。 
 * 主入口类是<a href="symbols/BMapLib.GeoUtils.html">GeoUtils</a>，
 * 基于Baidu Map API 1.2。
 *
 * @author Baidu Map Api Group 
 * @version 1.2
 */

/** 
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};
(function() { 
    
    /**
     * 地球半径
     */
    var EARTHRADIUS = 6370996.81; 

    /** 
     * @exports GeoUtils as BMapLib.GeoUtils 
     */
    var GeoUtils =
    /**
     * GeoUtils类，静态类，勿需实例化即可使用
     * @class GeoUtils类的<b>入口</b>。
     * 该类提供的都是静态方法，勿需实例化即可使用。     
     */
    BMapLib.GeoUtils = function(){
        
    }
    
    /**
     * 判断点是否在矩形内
     * @param {Point} point 点对象
     * @param {Bounds} bounds 矩形边界对象
     * @returns {Boolean} 点在矩形内返回true,否则返回false
     */
    GeoUtils.isPointInRect = function(point, bounds){
        //检查类型是否正确
        if (!(point instanceof BMap.Point) || 
            !(bounds instanceof BMap.Bounds)) {
            return false;
        }
        var sw = bounds.getSouthWest(); //西南脚点
        var ne = bounds.getNorthEast(); //东北脚点
        return (point.lng >= sw.lng && point.lng <= ne.lng && point.lat >= sw.lat && point.lat <= ne.lat);
    }
    
    /**
     * 判断点是否在圆形内
     * @param {Point} point 点对象
     * @param {Circle} circle 圆形对象
     * @returns {Boolean} 点在圆形内返回true,否则返回false
     */
    GeoUtils.isPointInCircle = function(point, circle){
        //检查类型是否正确
        if (!(point instanceof BMap.Point) || 
            !(circle instanceof BMap.Circle)) {
            return false;
        }

        //point与圆心距离小于圆形半径，则点在圆内，否则在圆外
        var c = circle.getCenter();
        var r = circle.getRadius();

        var dis = GeoUtils.getDistance(point, c);
        if(dis <= r){
            return true;
        } else {
            return false;
        }
    }
    
    /**
     * 判断点是否在折线上
     * @param {Point} point 点对象
     * @param {Polyline} polyline 折线对象
     * @returns {Boolean} 点在折线上返回true,否则返回false
     */
    GeoUtils.isPointOnPolyline = function(point, polyline){
        //检查类型
        if(!(point instanceof BMap.Point) ||
            !(polyline instanceof BMap.Polyline)){
            return false;
        }

        //首先判断点是否在线的外包矩形内，如果在，则进一步判断，否则返回false
        var lineBounds = polyline.getBounds();
        if(!this.isPointInRect(point, lineBounds)){
            return false;
        }

        //判断点是否在线段上，设点为Q，线段为P1P2 ，
        //判断点Q在该线段上的依据是：( Q - P1 ) × ( P2 - P1 ) = 0，且 Q 在以 P1，P2为对角顶点的矩形内
        var pts = polyline.getPath();
        for(var i = 0; i < pts.length - 1; i++){
            var curPt = pts[i];
            var nextPt = pts[i + 1];
            //首先判断point是否在curPt和nextPt之间，即：此判断该点是否在该线段的外包矩形内
            if (point.lng >= Math.min(curPt.lng, nextPt.lng) && point.lng <= Math.max(curPt.lng, nextPt.lng) &&
                point.lat >= Math.min(curPt.lat, nextPt.lat) && point.lat <= Math.max(curPt.lat, nextPt.lat)){
                //判断点是否在直线上公式
                var precision = (curPt.lng - point.lng) * (nextPt.lat - point.lat) - 
                    (nextPt.lng - point.lng) * (curPt.lat - point.lat);                
                if(precision < 2e-10 && precision > -2e-10){//实质判断是否接近0
                    return true;
                }                
            }
        }
        
        return false;
    }
    
    /**
     * 判断点是否多边形内
     * @param {Point} point 点对象
     * @param {Polyline} polygon 多边形对象
     * @returns {Boolean} 点在多边形内返回true,否则返回false
     */
    GeoUtils.isPointInPolygon = function(point, polygon){
        //检查类型
        if(!(point instanceof BMap.Point) ||
            !(polygon instanceof BMap.Polygon)){
            return false;
        }

        //首先判断点是否在多边形的外包矩形内，如果在，则进一步判断，否则返回false
        var polygonBounds = polygon.getBounds();
        if(!this.isPointInRect(point, polygonBounds)){
            return false;
        }

        var pts = polygon.getPath();//获取多边形点
        
        //下述代码来源：http://paulbourke.net/geometry/insidepoly/，进行了部分修改
        //基本思想是利用射线法，计算射线与多边形各边的交点，如果是偶数，则点在多边形外，否则
        //在多边形内。还会考虑一些特殊情况，如点在多边形顶点上，点在多边形边上等特殊情况。
        
        var N = pts.length;
        var boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true
        var intersectCount = 0;//cross points count of x 
        var precision = 2e-10; //浮点类型计算时候与0比较时候的容差
        var p1, p2;//neighbour bound vertices
        var p = point; //测试点
        
        p1 = pts[0];//left vertex        
        for(var i = 1; i <= N; ++i){//check all rays            
            if(p.equals(p1)){
                return boundOrVertex;//p is an vertex
            }
            
            p2 = pts[i % N];//right vertex            
            if(p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)){//ray is outside of our interests                
                p1 = p2; 
                continue;//next ray left point
            }
            
            if(p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)){//ray is crossing over by the algorithm (common part of)
                if(p.lng <= Math.max(p1.lng, p2.lng)){//x is before of ray                    
                    if(p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)){//overlies on a horizontal ray
                        return boundOrVertex;
                    }
                    
                    if(p1.lng == p2.lng){//ray is vertical                        
                        if(p1.lng == p.lng){//overlies on a vertical ray
                            return boundOrVertex;
                        }else{//before ray
                            ++intersectCount;
                        } 
                    }else{//cross point on the left side                        
                        var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng;//cross point of lng                        
                        if(Math.abs(p.lng - xinters) < precision){//overlies on a ray
                            return boundOrVertex;
                        }
                        
                        if(p.lng < xinters){//before ray
                            ++intersectCount;
                        } 
                    }
                }
            }else{//special case when ray is crossing through the vertex                
                if(p.lat == p2.lat && p.lng <= p2.lng){//p crossing over p2                    
                    var p3 = pts[(i+1) % N]; //next vertex                    
                    if(p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)){//p.lat lies between p1.lat & p3.lat
                        ++intersectCount;
                    }else{
                        intersectCount += 2;
                    }
                }
            }            
            p1 = p2;//next ray left point
        }
        
        if(intersectCount % 2 == 0){//偶数在多边形外
            return false;
        } else { //奇数在多边形内
            return true;
        }            
    }

    /**
     * 将度转化为弧度
     * @param {degree} Number 度     
     * @returns {Number} 弧度
     */
    GeoUtils.degreeToRad =  function(degree){
        return Math.PI * degree/180;    
    }
    
    /**
     * 将弧度转化为度
     * @param {radian} Number 弧度     
     * @returns {Number} 度
     */
    GeoUtils.radToDegree = function(rad){
        return (180 * rad) / Math.PI;       
    }
    
    /**
     * 将v值限定在a,b之间，纬度使用
     */
    function _getRange(v, a, b){
        if(a != null){
          v = Math.max(v, a);
        }
        if(b != null){
          v = Math.min(v, b);
        }
        return v;
    }
    
    /**
     * 将v值限定在a,b之间，经度使用
     */
    function _getLoop(v, a, b){
        while( v > b){
          v -= b - a
        }
        while(v < a){
          v += b - a
        }
        return v;
    }

    /**
     * 计算两点之间的距离,两点坐标必须为经纬度
     * @param {point1} Point 点对象
     * @param {point2} Point 点对象
     * @returns {Number} 两点之间距离，单位为米
     */
    GeoUtils.getDistance = function(point1, point2){
        //判断类型
        if(!(point1 instanceof BMap.Point) ||
            !(point2 instanceof BMap.Point)){
            return 0;
        }

        point1.lng = _getLoop(point1.lng, -180, 180);
        point1.lat = _getRange(point1.lat, -74, 74);
        point2.lng = _getLoop(point2.lng, -180, 180);
        point2.lat = _getRange(point2.lat, -74, 74);
        
        var x1, x2, y1, y2;
        x1 = GeoUtils.degreeToRad(point1.lng);
        y1 = GeoUtils.degreeToRad(point1.lat);
        x2 = GeoUtils.degreeToRad(point2.lng);
        y2 = GeoUtils.degreeToRad(point2.lat);

        return EARTHRADIUS * Math.acos((Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1)));    
    }
    
    /**
     * 计算折线或者点数组的长度
     * @param {Polyline|Array<Point>} polyline 折线对象或者点数组
     * @returns {Number} 折线或点数组对应的长度
     */
    GeoUtils.getPolylineDistance = function(polyline){
        //检查类型
        if(polyline instanceof BMap.Polyline || 
            polyline instanceof Array){
            //将polyline统一为数组
            var pts;
            if(polyline instanceof BMap.Polyline){
                pts = polyline.getPath();
            } else {
                pts = polyline;
            }
            
            if(pts.length < 2){//小于2个点，返回0
                return 0;
            }

            //遍历所有线段将其相加，计算整条线段的长度
            var totalDis = 0;
            for(var i =0; i < pts.length - 1; i++){
                var curPt = pts[i];
                var nextPt = pts[i + 1]
                var dis = GeoUtils.getDistance(curPt, nextPt);
                totalDis += dis;
            }

            return totalDis;
            
        } else {
            return 0;
        }
    }
    
    /**
     * 计算多边形面或点数组构建图形的面积,注意：坐标类型只能是经纬度，且不适合计算自相交多边形的面积
     * @param {Polygon|Array<Point>} polygon 多边形面对象或者点数组
     * @returns {Number} 多边形面或点数组构成图形的面积
     */
    GeoUtils.getPolygonArea = function(polygon){
        //检查类型
        if(!(polygon instanceof BMap.Polygon) &&
            !(polygon instanceof Array)){
            return 0;
        }
        var pts;
        if(polygon instanceof BMap.Polygon){
            pts = polygon.getPath();
        }else{
            pts = polygon;    
        }
        
        if(pts.length < 3){//小于3个顶点，不能构建面
            return 0;
        }
        
        var totalArea = 0;//初始化总面积
        var LowX = 0.0;
        var LowY = 0.0;
        var MiddleX = 0.0;
        var MiddleY = 0.0;
        var HighX = 0.0;
        var HighY = 0.0;
        var AM = 0.0;
        var BM = 0.0;
        var CM = 0.0;
        var AL = 0.0;
        var BL = 0.0;
        var CL = 0.0;
        var AH = 0.0;
        var BH = 0.0;
        var CH = 0.0;
        var CoefficientL = 0.0;
        var CoefficientH = 0.0;
        var ALtangent = 0.0;
        var BLtangent = 0.0;
        var CLtangent = 0.0;
        var AHtangent = 0.0;
        var BHtangent = 0.0;
        var CHtangent = 0.0;
        var ANormalLine = 0.0;
        var BNormalLine = 0.0;
        var CNormalLine = 0.0;
        var OrientationValue = 0.0;
        var AngleCos = 0.0;
        var Sum1 = 0.0;
        var Sum2 = 0.0;
        var Count2 = 0;
        var Count1 = 0;
        var Sum = 0.0;
        var Radius = EARTHRADIUS; //6378137.0,WGS84椭球半径 
        var Count = pts.length;        
        for (var i = 0; i < Count; i++) {
            if (i == 0) {
                LowX = pts[Count - 1].lng * Math.PI / 180;
                LowY = pts[Count - 1].lat * Math.PI / 180;
                MiddleX = pts[0].lng * Math.PI / 180;
                MiddleY = pts[0].lat * Math.PI / 180;
                HighX = pts[1].lng * Math.PI / 180;
                HighY = pts[1].lat * Math.PI / 180;
            }
            else if (i == Count - 1) {
                LowX = pts[Count - 2].lng * Math.PI / 180;
                LowY = pts[Count - 2].lat * Math.PI / 180;
                MiddleX = pts[Count - 1].lng * Math.PI / 180;
                MiddleY = pts[Count - 1].lat * Math.PI / 180;
                HighX = pts[0].lng * Math.PI / 180;
                HighY = pts[0].lat * Math.PI / 180;
            }
            else {
                LowX = pts[i - 1].lng * Math.PI / 180;
                LowY = pts[i - 1].lat * Math.PI / 180;
                MiddleX = pts[i].lng * Math.PI / 180;
                MiddleY = pts[i].lat * Math.PI / 180;
                HighX = pts[i + 1].lng * Math.PI / 180;
                HighY = pts[i + 1].lat * Math.PI / 180;
            }
            AM = Math.cos(MiddleY) * Math.cos(MiddleX);
            BM = Math.cos(MiddleY) * Math.sin(MiddleX);
            CM = Math.sin(MiddleY);
            AL = Math.cos(LowY) * Math.cos(LowX);
            BL = Math.cos(LowY) * Math.sin(LowX);
            CL = Math.sin(LowY);
            AH = Math.cos(HighY) * Math.cos(HighX);
            BH = Math.cos(HighY) * Math.sin(HighX);
            CH = Math.sin(HighY);
            CoefficientL = (AM * AM + BM * BM + CM * CM) / (AM * AL + BM * BL + CM * CL);
            CoefficientH = (AM * AM + BM * BM + CM * CM) / (AM * AH + BM * BH + CM * CH);
            ALtangent = CoefficientL * AL - AM;
            BLtangent = CoefficientL * BL - BM;
            CLtangent = CoefficientL * CL - CM;
            AHtangent = CoefficientH * AH - AM;
            BHtangent = CoefficientH * BH - BM;
            CHtangent = CoefficientH * CH - CM;
            AngleCos = (AHtangent * ALtangent + BHtangent * BLtangent + CHtangent * CLtangent) / (Math.sqrt(AHtangent * AHtangent + BHtangent * BHtangent + CHtangent * CHtangent) * Math.sqrt(ALtangent * ALtangent + BLtangent * BLtangent + CLtangent * CLtangent));
            AngleCos = Math.acos(AngleCos);            
            ANormalLine = BHtangent * CLtangent - CHtangent * BLtangent;
            BNormalLine = 0 - (AHtangent * CLtangent - CHtangent * ALtangent);
            CNormalLine = AHtangent * BLtangent - BHtangent * ALtangent;
            if (AM != 0)
                OrientationValue = ANormalLine / AM;
            else if (BM != 0)
                OrientationValue = BNormalLine / BM;
            else
                OrientationValue = CNormalLine / CM;
            if (OrientationValue > 0) {
                Sum1 += AngleCos;
                Count1++;
            }
            else {
                Sum2 += AngleCos;
                Count2++;
            }
        }        
        var tempSum1, tempSum2;
        tempSum1 = Sum1 + (2 * Math.PI * Count2 - Sum2);
        tempSum2 = (2 * Math.PI * Count1 - Sum1) + Sum2;
        if (Sum1 > Sum2) {
            if ((tempSum1 - (Count - 2) * Math.PI) < 1)
                Sum = tempSum1;
            else
                Sum = tempSum2;
        }
        else {
            if ((tempSum2 - (Count - 2) * Math.PI) < 1)
                Sum = tempSum2;
            else
                Sum = tempSum1;
        }
        totalArea = (Sum - (Count - 2) * Math.PI) * Radius * Radius;

        return totalArea; //返回总面积
    }
   
})();//闭包结束
var BMapLib=window.BMapLib=BMapLib||{};(function(){var b=BMapLib.AreaRestriction=function(){};var a=false;var c=null;var d=null;b.setBounds=function(f,e){if(!f||!e||!(e instanceof BMap.Bounds)){throw"\u8bf7\u68c0\u67e5\u4f20\u5165\u53c2\u6570\u503c\u7684\u5408\u6cd5\u6027";return false}if(a){this.clearBounds()}c=f;d=e;c.addEventListener("moveend",this._mapMoveendEvent);a=true;return true};b._mapMoveendEvent=function(k){if(d.containsBounds(c.getBounds())){return}var i=c.getBounds(),h=i.getSouthWest(),g=i.getNorthEast(),m=d.getSouthWest(),j=d.getNorthEast();var l={n:0,e:0,s:0,w:0};l.n=(g.lat<j.lat)?g.lat:j.lat;l.e=(g.lng<j.lng)?g.lng:j.lng;l.s=(h.lat<m.lat)?m.lat:h.lat;l.w=(h.lng<m.lng)?m.lng:h.lng;var f=new BMap.Point(l.w+(l.e-l.w)/2,l.s+(l.n-l.s)/2);setTimeout(function(){c.panTo(f,{noAnimation:"no"})},1)};b.clearBounds=function(){if(!a){return}c.removeEventListener("moveend",this._mapMoveendEvent);a=false}})();