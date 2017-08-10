/*
 *  TeacherList - v1.0
 *  Light-weight, responsive list.
 *  Base on Bootstrap3+/jQuery
 *
 *  Made by RT
 *  Mail:623059008@qq.com
 *  Under No License :)
 */
;( function( $, window, document, undefined ) {
		var pluginName="teacher_list";
		function a_l_Plugin (element, options) {
			this.element = element;
			this._name = pluginName;
			this.init(element,options[0],options[1],options[2],options[3],options[4]);
		}
		$.extend(a_l_Plugin.prototype, {
			AppendSync:function(aid,data,fn1,fn2,urlfn){
				var MyThis=this;
				try{
				var appendValue=parseInt($(aid).attr("value"));
				if(appendValue==data.length){$("#appendContinueDiv").remove();$(aid).append("<div class='ui message' style='margin:0 auto;'><p>已经到最后了,再怎么找也没有啦!</p></div>");return;}
				var appendEnd=0;
				if(appendValue+10<data.length)appendEnd=appendValue+10;
				else appendEnd=data.length;
				if(appendValue==0)
				{
					//第一次显示元素
					$(aid).empty();
					var htmlstr="<div class='ui link cards'>";
					htmlstr+=this.getCardHtml(data,appendValue,appendEnd);
					htmlstr+="</div>";
					$(aid).append(htmlstr);
					var Morestr='<div id="appendContinueDiv"><br /><div class="ui bottom attached basic button" style="border:0px;" id="appendContinue" tabindex="0">点击加载更多</div></div>';
					$(aid).after(Morestr);
				}else {
					$("#appendContinueDiv").remove();
					var htmlstr="";
					htmlstr+=this.getCardHtml(data,appendValue,appendEnd);
					//htmlstr+="<div class='ui attached message' style='text-align:center;margin:0 auto;background-color:white;border:0;' id='appendContinueDiv'><p><a id=\"appendContinue\">点击加载更多</a></p></div>";
					$(".cards").append(htmlstr);
					var Morestr='<div id="appendContinueDiv"><br /><div class="ui bottom attached basic button" style="border:0px;" id="appendContinue" tabindex="0">点击加载更多</div></div>';
					$(aid).after(Morestr);
				}
				/* 绑定继续加载的事件 */
				$("#appendContinue").click(function(event) {
				MyThis.AppendSync(aid,data,fn1,fn2,urlfn);
				});
				$(aid).attr("value",appendEnd);
				this.bindButtonEvent(appendValue,appendEnd,fn1,fn2,urlfn,data);
			}catch(e)
			{
				$(aid).append('<div class="lecture" style="background-color:white;color:red;">Error:请检查ID所对应Dom元素是否存在.<br />'+e+'</div>');
			}
			},
		AppendSearch:function(aid,data,fn1,fn2,urlfn){
			try{
			$(aid).empty();
			$("#appendContinueDiv").remove();
			var htmlstr="<div class='ui link cards'>";
			htmlstr+=this.getCardHtml(data,0,data.length);  //获取card个体的html
			htmlstr+="<div class='ui message'  style='margin:0 auto;'><p>已经到最后了,再怎么找也没有啦!</p></div>";
			htmlstr+="</div>";

			$(aid).append(htmlstr);
			$(aid).attr("value",'0');
			this.bindButtonEvent(0,data.length,fn1,fn2,urlfn,data);
			}catch(e)
			{
			$(aid).append('<div class="lecture" style="background-color:white;color:red;">Error:请检查ID所对应Dom元素是否存在.<br />'+e+'</div>');
				}
		},
		init:function(aid,data,fn1,fn2,urlfn,mode){
			if(mode==0)
			{
				//没有任何条件的控件显示(显示10个元素) 下拉触发时会继续增加10个
				this.AppendSync(aid,data,fn1,fn2,urlfn);
				return;
			}
			if(mode==1)
			{
			//搜索时的显示,一次显示所有搜索结果
			this.AppendSearch(aid,data,fn1,fn2,urlfn);
			}
			},
			bindButtonEvent:function(begin,end,fn1,fn2,urlfn,data){
				/* 绑定按钮事件 */
				for(var i=begin;i<end;i++)
				{
					var ordid="#order"+data[i]["id"];
					var comid="#comment"+data[i]["id"];
					var tid="#t"+data[i]["id"];
					$(tid).click(function(){
							urlfn.call(this,$(this).attr("id").substr(1,$(this).attr("id").length));
						});

					$(ordid).click(function(){
							fn1.call(this,$(this).attr("id"));
						});
					$(comid).click(function(){
						fn2.call(this,$(this).attr("id").substr(7,$(this).attr("id").length));
						});
					}
						/* 调整卡片居中 */
					$(".card").css("margin","1% auto");
			},
			getCardHtml:function(data,begin,end){
				var htmlstr="";
				for (var i=begin;i<end;i++)
				{
					htmlstr+= '<div class="card">'+
							'<div class="image">'+
								'<img src="'+data[i]['img_url']+'">'+
							'</div>'+
							'<div class="content" id=t'+data[i]['id']+'>'+
								'<div class="header"><i class="user icon"></i>'+data[i]['name']+'</div>'+
								'<div class="meta">'+data[i]['position']+'</div>'+
								'<div class="description">'+
									'<p>'+
								'<i class="tags icon"></i>院系:'+data[i]['apartment']+'<br />'+
								'<i class="mail icon"></i>邮箱:'+data[i]['email']+'<br />'+
									'<i class="phone icon"></i>联系电话:'+data[i]['telephone']+'<br />'+
							'</p>'+
								'</div>'+
							'</div>'+
							'<div class="extra content">'+
						'<div class="ui fluid buttons">'+
							'<button class="ui teal basic button" id=order'+data[i]['id']+'>预约</button>'+
							'<button class="ui orange basic button" id=comment'+data[i]['id']+'>评论</button>'+
						'</div>'+
							'</div>'+
						'</div>';
				}
				return htmlstr;
			},
		});
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {

					$.data( this, "plugin_" +
						pluginName, new a_l_Plugin( this, options ) );

			} );
		};
})( jQuery, window, document );
