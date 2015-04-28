// JavaScript Document


	
	//最的普通僵尸  
	/*
		@divid                     僵尸创建的所在div
		@ordinaryZombies_id        僵尸id
	**/
	var ordinaryZombies=function(divid,ordinaryZombies_id){
		
		this.speed=3; //普通僵尸的速度
		
		this.hp=100; //普通僵尸的血
		
		this.damage =3; //普通僵尸的攻击力
		
		this.positiondiv=divid; //僵尸所在的rowdiv也就是行
		
		this.div=null; //僵尸所在的他站的blackdivid
		
		this.id=ordinaryZombies_id;  //僵尸的id
		
		this.index=null; //僵尸在数组的下表
		
		
		this.check_left_interval=null; //僵尸检测自己的left的计时器
		
		this.check_left_time=170; //僵尸检测自己的left的计时器 间隔
		
		this.walk_interval=null; //僵尸往前走的计时器
		
		this.walk_interval_time=300; //僵尸往前走的计时器 间隔
		
		this.iseat=false; //是否正在吃
		
		this.obj=10;
		
		
		
		//诞生调用的方法
		this.action=function(){
			
			//注册检测left的计时器
			this.check_left_interval=setInterval("zombies_check_left('"+this.id+"','"+this.index+"')",this.check_left_time);
			
			//注册行走的计时器
			this.walk_interval=setInterval("zombie_walk('"+this.id+"',"+this.speed+")",this.walk_interval_time);
			
			
		};
		
		//僵尸消失的方法
		this.death=function(){
			
			//清除自己的left的计时器
			clearTimeout(this.walk_interval);
			
			//清除自己walk的计时器
			//清除自己的left的计时器
			clearTimeout(this.check_left_interval);
			
			
			//remove掉自己	
			$("#"+this.id).remove();
			
			//+分
			$("#obj").html(parseInt($("#obj").html())+this.obj);
		};
		
		//僵尸烧死的方法
		this.firedeath=function(){
			
			//清除自己的left的计时器
			clearTimeout(this.walk_interval);
			
			//清除自己walk的计时器
			//清除自己的left的计时器
			clearTimeout(this.check_left_interval);
			
			//改变自己的bg
			$("#"+this.id).css({"background-image":"url(pic/zombies/images/BoomDie.gif)"});
			
			//remove掉自己	
			var id =this.id;
			//过一会消失
			setTimeout(function(){
			$("#"+id).remove();	
			},1000);	
		
			//+分
			$("#obj").html(parseInt($("#obj").html())+this.obj);
		};
		
		//僵尸被打掉头的方法
		this.deathhead=function(){
			
			//清除自己的left的计时器
			clearTimeout(this.walk_interval);
			
			//清除自己walk的计时器
			//清除自己的left的计时器
			clearTimeout(this.check_left_interval);
			
			//改变自己的bg
			$("#"+this.id).css({"position":"","background-size":"","width":"120px","height":"100px","background-position":"+20 0"});
			$("#"+this.id).css({"background-image":"url(pic/zombies/images/Zombie/ZombieDie.gif)"});
			
			
			//remove掉自己	
			var id =this.id;
			//过一会消失
			setTimeout(function(){
			$("#"+id).remove();	
			},1000);	
		};
		
		//进入战斗
		this.gobatttle=function(){
			//改变背景
			$("#"+this.id).css({"background-image":"url(pic/zombies/images/ZombieAttack.gif)"});
			//关闭行走的计时器
			clearTimeout(this.walk_interval);
			
			this.iseat=true;
			
		};
		
		//退出战斗
		this.exitbaattle=function(){
			//改变背景
			$("#"+this.id).css({"background-image":"url(pic/zombies/images/ordinaryZombies.gif)"});
			//打开行走计时器
			this.walk_interval=setInterval("zombie_walk('"+this.id+"',"+this.speed+")",this.walk_interval_time);
			
			this.iseat=false;
		};
		
	};
	
	
	/////////////////////////////////僵尸通用方法///////////////////////////////////
	//僵尸确认自己left的方法
	function zombies_check_left(zombieid,index){
		
		var zombie=$("#"+zombieid); //当前僵尸
		
		var blockdiv=zombie.attr("blockdiv"); //当前僵尸的当前站的div的id
		
		var zleft=zombie.position().left;// 当前僵尸的left
		
		if(blockdiv[blockdiv.length-1]=='0'){
			blockdiv=blockdiv.substr(0,blockdiv.length-2);
		}
		else{
			blockdiv=blockdiv.substr(0,blockdiv.length-1);
		}
		
				
		//判断div
		if(zleft>=0&&zleft<87){
			//第一个	
			
			//改变僵尸dom的 blackidvid属性
			zombie.attr({"blockdiv":blockdiv+"1"});
			
			//改变僵尸对象的div属性
			var index=zombie.attr("index");  //下标
			
			zombies_arr[index].div=blockdiv+"1";
			
		}else if(zleft>=87&&zleft<87*2){
			//第二个
			
			//改变僵尸dom的 blackidvid属性
			zombie.attr({"blockdiv":blockdiv+"2"});
			
			//改变僵尸对象的div属性
			var index=zombie.attr("index");  //下标
			
			zombies_arr[index].div=blockdiv+"2";
			
		}else if(zleft>=87*2&&zleft<87*3){
			//第三个
			
			//改变僵尸dom的 blackidvid属性
			zombie.attr({"blockdiv":blockdiv+"3"});
			
			//改变僵尸对象的div属性
			var index=zombie.attr("index");  //下标
			
			zombies_arr[index].div=blockdiv+"3";
			
		}else if(zleft>=87*3&&zleft<87*4){
			//第四个
			//改变僵尸dom的 blackidvid属性
			zombie.attr({"blockdiv":blockdiv+"4"});
			
			//改变僵尸对象的div属性
			var index=zombie.attr("index");  //下标
			
			zombies_arr[index].div=blockdiv+"4";
						
		}else if(zleft>=87*4&&zleft<87*5){
			//第五个
			
			//改变僵尸dom的 blackidvid属性
			zombie.attr({"blockdiv":blockdiv+"5"});
			
			//改变僵尸对象的div属性
			var index=zombie.attr("index");  //下标
			
			zombies_arr[index].div=blockdiv+"5";
			
		}else if(zleft>=87*5&&zleft<87*6){
			//第六个
			
			//改变僵尸dom的 blackidvid属性
			zombie.attr({"blockdiv":blockdiv+"6"});
			
			//改变僵尸对象的div属性
			var index=zombie.attr("index");  //下标
			
			zombies_arr[index].div=blockdiv+"6";
			
		}else if(zleft>=87*6&&zleft<87*7){
			//第七个
			
			//改变僵尸dom的 blackidvid属性
			zombie.attr({"blockdiv":blockdiv+"7"});
			
			//改变僵尸对象的div属性
			var index=zombie.attr("index");  //下标
			
			zombies_arr[index].div=blockdiv+"7";
			
			
		}else if(zleft>=87*7&&zleft<87*8){
			//第八个
			
			//改变僵尸dom的 blackidvid属性
			zombie.attr({"blockdiv":blockdiv+"8"});
			
			//改变僵尸对象的div属性
			var index=zombie.attr("index");  //下标
			
			zombies_arr[index].div=blockdiv+"8";
			
			
		}else if(zleft>=87*8&&zleft<87*9){
			//第九个
			//改变僵尸dom的 blackidvid属性
			zombie.attr({"blockdiv":blockdiv+"9"});
			
			//改变僵尸对象的div属性
			var index=zombie.attr("index");  //下标
			
			zombies_arr[index].div=blockdiv+"9";
		}
		
		/*	alert(zombie.attr("blockdiv"));
			alert(zombies_arr[index].div);*/
		
	}
	
	//僵尸向前走的方法
	function zombie_walk (zombieid,speed){
		//left--
		$("#"+zombieid).css({"left":"-="+speed});
		
		//是否走进了你家
		if($("#"+zombieid).position().left<0){
				//你就输了
					//弹出你被吃了
					var a=$("#eatyou");
					a.css({"display":"block"});
					
					//三秒后提交ajax
					setTimeout(function(){
						location.href="index.html";	
					},3000);
				
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	