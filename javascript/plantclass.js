// JavaScript Document
//类名一定要和plantcard的id一致 (￣▽￣")
	

	
	//-----------------------------太阳花
   var SunFlower= function (
   		divid  //太阳花所在divid
     	){
		this.id=""; //太阳花的id
		
		this.divid=divid; //太阳花所在divid
		
		this.Interval=""; //太阳花吐阳光的计时器
		
		this.hp=100; //太阳花的血量
		
		this.speed=10000; //太阳花的吐阳光频率
		
		this.cost=50; //太阳花的花费
		
		this.colddown=10; //太阳花的cd
		
		
		//太阳花吐出阳光的方法
		this.action=function(){
			
			//给自己的成员方法添加计时器
			this.Interval=setInterval("produceEnergy('"+this.divid+"')",this.speed);
			 
	    };
		
		//太阳花销毁自己的方法
		this.bebomm=function(){
			
			//给自己的成员属性消除计时器
			clearInterval(this.Interval);
			 
	    };
		
		//太阳花的购买方法
		this.buy=function(){
			
			//扣去花费
			$("#countenergy_sum").html( parseInt($("#countenergy_sum").html())-this.cost);	
		};
	};
	
	//-------------------------------------------豌豆射手
	var Peashooter = function(
		divid ////豌豆射手所在divid
		){
		
		this.id=""; //豌豆射手的id
		
		this.divid=divid; //豌豆射手所在divid
		
		this.Interval=""; //豌豆射手观察这一行的计时器
		
		this.hp=100; //豌豆射手的血量
		
		this.damage =30; //豌豆射手的攻击力
		
		this.speed=4000; //豌豆射手的攻击频率
		
		this.cost=100; //豌豆射手的花费
		
		this.colddown=15; //豌豆射手的cd
		
		this.bulletspeed=5000;//豌豆射手发射的子弹的速度 2000秒每格 
		
		//豌豆new出来的方法
		this.action=function(){
			
			this.Interval=setInterval("array["+this.index+"].look()",this.speed);
	    };
		
		//豌豆射手销毁自己的方法
		this.bebomm=function(){
			clearInterval(this.Interval);
		};
		
		//豌豆射手的购买方法
		this.buy=function(){
			
			//扣去花费
			$("#countenergy_sum").html( parseInt($("#countenergy_sum").html())-this.cost);	
		};
		
		//豌豆射手的查看周围方法
		this.look=function(){
			/*alert(this.id+"我在看");*/
			var parentid=$("#"+this.divid).parent().attr("id");
			
			//这一行的div里的僵尸
			var parentzombies= $("#"+parentid+" .zombies");
			
			if(parentzombies.length>0)
			{
				//有僵尸
				
				//形成一个随机数
				var random_produceEnergy = math_random(0, 1000000000000000);
		
		
				//获取当前时间
				var d = new Date();
		
				//id
				var id = "bullet_"+random_produceEnergy + d.getDate() + d.getHours() + d.getMinutes();
				
				//获得当前植物的div
				var div=$("#"+this.divid);
				
				//往他所在的div添加一刻子弹
				div.parent().append("<img class='bullet' divid='"+this.divid+"' index='"+bullet_arr.length+"' speed='"+this.bulletspeed+"'  id='"+id+"' hurt='"+this.damage+"' src='pic/bullet/bullet_1_1.png'>");
				
				var left=parseInt(div.attr("left"))+50;
				//设置css
				$("#"+id).css({"left":left});
				
				//divid
				var divid=div.prop('id');
				
				//new出子弹对象
				eval("var "+id+"=new Peashooter_bullet('"+id+"','"+bullet_arr.length+"','"+divid+"')");
				
				//放入数组
				eval("bullet_arr.push("+id+")");
				//调用构造函数
				eval(id+".action()");
				
			}
		};
		
		
    };
	
	
	//////---------------------------------------坚果墙
	var TallNut=function(
		divid //坚果墙所在divid
		){
		
		this.id=""; //坚果墙的id
		
		this.divid=divid; //坚果墙所在divid
		
		this.Interval=""; //坚果检测自己血量换图片的计时器
		
		this.hp=1300; //坚果的血量
		
		this.cost=50; //坚果墙的花费
		
		this.colddown=20; //坚果墙的cd
		
		//坚果手攻击的方法
		this.action=function(){};
		
		//坚果销毁自己的方法
		this.bebomm=function(){};
		
		//坚果墙的购买方法
		this.buy=function(){
			
			//扣去花费
			$("#countenergy_sum").html( parseInt($("#countenergy_sum").html())-this.cost);	
		};
		
	};
	
	/////--------------------辣椒
	var Pepper=function(divid){
		
		this.id=null; //辣椒的id
		
		this.divid=divid; //辣椒所在divid
		
		this.timeout=null; //辣椒的延迟执行的计时器
		
		this.hp=10; //辣椒的血量
		
		this.cost=125; //辣椒的花费
		
		this.speed=750; //辣椒的导火索长度
		
		this.index=null; //在数组中的下标
		
		this.rowid=$("#"+divid).parent().prop("id"); //他的行id
		
	    //辣椒new出来调用的方法
		this.action=function(){
			
			//根据id获取下标
			var index=$("#"+this.id).attr("index");
			
			//点燃导火线 执行爆炸
			this.timeout=setTimeout("array["+index+"].boom()",this.speed);
			
		};
		
		//辣椒销毁自己的方法
		this.bebomm=function(){
			
			//把自己从div中去除
		   $("#"+this.id).remove();
		   //销毁自己的计时器
		   clearInterval(this.timeout);
		   
		   
		};
		
		//辣椒爆炸的方法
		this.boom=function(){
			
			
			//把id放到变量里否则settimeout不能用
			var id=this.id;
			var rowid=this.rowid;
			
			//把自己从div中去除
		    $("#"+this.id).remove();
			
			//获取辣椒的父节点
			var parent=$("#"+this.divid).parent();
			
			
			//在庭院内追加一个爆炸辣椒
			$("#courtyard").append("<img class='PepperAttack' id='"+this.id+"' index="+this.index+"  src='pic/zombies/images/PepperAttack.gif' />");
			
			//给这个辣椒添加css样式
			$("#"+this.id).css({"top":parent.offset().top});
			
			//等待烧的动画播放完成
			setTimeout(function(){
				
				//把自己销毁
				var index=$("#"+id).attr("index");
				array[index].bebomm();
				
				//把	parent的所有class叫僵尸消灭 分3步 一变成黑色烧焦图片 二变成粉末 三remove 四 调用所有僵尸的死亡方法 有空再说(￣▽￣")
					//获得这一行所有的僵尸
					
					var rowallzombie=$("#"+rowid+" .zombies");
					for(var i=0;i<rowallzombie.length;i++){
							
							//调用僵尸死亡方法
							zombies_arr[rowallzombie.eq(i).attr("index")].firedeath();
					}
					
				 
			},1200);
			
		}
		
		//辣椒的购买方法
		this.buy=function(){
			
			//扣去花费
			$("#countenergy_sum").html( parseInt($("#countenergy_sum").html())-this.cost);	
		};
		
	}


//	//////-----------------食人花
	var Piranha=function(divid){
			
		this.id=null; //食人花的id
		
		this.divid=divid; //食人花所在divid
		
		this.iseat=false; //食人花是否在吃
		
		this.interval=null;//食人花观察巡逻当前div僵尸的计时器
		
		this.time=1000; //食人花每次间隔time巡逻一次div
		
		this.hp=80; //食人花的血量
		
		this.cost=150; //食人花的花费
		
		this.speed=6000; //食人花的(￣～￣)嚼~ 的时间
		
		this.index=null;
		
		//食人花new出来调用的方法
		this.action=function(){
			/*alert(this.id+" 创建了");*/
			
			//获取下标
			var index=$("#"+this.id).attr("index");
			
			this.interval=setInterval("array["+index+"].look()",this.time);
			
		};
		
		//食人花看周围的方法
		this.look=function(){
			
			/*alert(this.id+"在看");*/
			//获取他所在div的僵尸
			var div_zombies=$(".zombies[blockdiv='"+this.divid+"']");
					
				//判断他是否在吃 并且div里有僵尸
				if((!this.iseat)&&div_zombies.length>0){
					var id=this.id;
					var speed=this.speed;
					
					/*alert(this.id+"有僵尸");*/
					
					//把它吃掉
						//获得div中僵尸的第一个 调用这个僵尸对象的 死亡方法death()
						zombies_arr[div_zombies.eq(0).attr("index")].death();
						
						
					
						//清除计时器计时器 （切换到吃人模式）
						clearInterval(this.interval);
						
						//把iseat改变成turn
						this.iseat=true;
						
						//更换食人花的背景图片
						$("#"+this.id).prop({"src":"./pic/zombies/images/Piranha_Attack.gif"});
						
						
						
						
						//设置timeout 激活
						setTimeout(function(){
							//获取下标
							var index=$("#"+id).attr("index");
							
							/*alert(id+"我吃好了")*/
							
							
							//改成没再吃
							array[index].iseat=false;
							
							
							//给计时器重新加上一个计时器（切换到巡逻模式）
							array[index].interval=setInterval("array["+index+"].look()",2000);	
							
						},speed);//speed是嚼的时间
				}else{
						
						//没僵尸
						//改变背景图片
							$("#"+this.id).attr({"src":"./pic/zombies/images/Piranha.gif"});
				}
					
		};
		
		//食人花销毁自己的方法
		this.bebomm=function(){
		
		   //销毁自己的计时器
		   clearInterval(this.interval);
		   /*alert(this.id+"销毁了");*/
		   
		};
		
		//食人花的购买方法
		this.buy=function(){
			
			//扣去花费
			$("#countenergy_sum").html( parseInt($("#countenergy_sum").html())-this.cost);	
		};
			
	};
	
	////////////////////////////////////子弹/////////////////////////////////////////////
	
	
	//豌豆射手子弹
	//@id 子弹id
	//@index 在子弹数组里下标
	//@divid 起始divid
	var Peashooter_bullet=function(id,index,divid){
			
			this.id=id; //子弹的id
				
			this.divid=divid; //子弹初始化的divid
			
			this.index=index; // 子弹在bullet_arr的下标
			
			this.runinterval=null;	//跑的计时器
			
			this.runtime=170; //每隔多少时间跑一下
			
			this.checkleftinterval=null; //检查自己left的计时器
				
			this.checklefttime=200; //每隔多少时间检查自己的left
			
			this.speed=5; //子弹跑的速度
			
			
			//构造函数
			this.action=function(){
				
					//开启检查left的计时器
					this.checkleftinterval=setInterval("checkleft('"+this.id+"','"+this.index+"')",this.checklefttime);
					
					//开启跑计时器
					this.runinterval=setInterval("fly('"+this.id+"','"+this.speed+"')",this.runtime);
					
			};
			
			//销毁自己的方法
			this.death=function(){
					//把自己remove掉
					$("#"+this.id).remove();
					//清空计时器
					clearInterval(this.runinterval);
					clearInterval(this.checkleftinterval);
			};
			
			
	};
	
	/////////////--------------子弹通用方法-----------
	
	//子弹飞的方法
	//@子弹id
	var fly=function(bulletid,speed){
			$("#"+bulletid).css({"left":"+="+speed});
	};	
	
	//检查自己当前div的方法
	//@子弹id
	//@子弹在bullet_arr里的下标
	var checkleft=function(bulletid,index){
		
			var bullet=$("#"+bulletid); //当前子弹
			
			var bullet_left=bullet.position().left; //当前子弹的left
			
			var bullet_divid=bullet.attr("divid"); //当前子弹所在的divid
			
			if(bullet_divid[bullet_divid.length-1]=='0'){
				bullet_divid=bullet_divid.substr(0,bullet_divid.length-2);
			}
			else{
				bullet_divid=bullet_divid.substr(0,bullet_divid.length-1);
			}
			
			//如果left《0移除自己
			if(bullet_left>=87*9){
				
				//消除这个子弹
				bullet_arr[index].death();
			}
			
			
			//检查自己的left 判断 然后修改
			
			if(bullet_left>=0&&bullet_left<87){
				//第一个	
				
				//改变子弹dom的 divid属性
				bullet.attr({"divid":bullet_divid+"1"});
				
				//改变子弹对象的div属性
				var index=bullet.attr("index");  //下标
				
				bullet_arr[index].divid=bullet_divid+"1";
			
			}else if(bullet_left>87&&bullet_left<87*2){
				
				//第二个	
				
				//改变子弹dom的 divid属性
				bullet.attr({"divid":bullet_divid+"2"});
				
				//改变子弹对象的div属性
				var index=bullet.attr("index");  //下标
				
				bullet_arr[index].divid=bullet_divid+"2";
					
			}else if(bullet_left>87*2&&bullet_left<87*3){
				
				//第三个	
				
				//改变子弹dom的 divid属性
				bullet.attr({"divid":bullet_divid+"3"});
				
				//改变子弹对象的div属性
				var index=bullet.attr("index");  //下标
				
				bullet_arr[index].divid=bullet_divid+"3";
					
			}else if(bullet_left>87*3&&bullet_left<87*4){
				
				//第四个	
				
				//改变子弹dom的 divid属性
				bullet.attr({"divid":bullet_divid+"4"});
				
				//改变子弹对象的div属性
				var index=bullet.attr("index");  //下标
				
				bullet_arr[index].divid=bullet_divid+"4";
					
			}else if(bullet_left>87*4&&bullet_left<87*5){
				
				//第5个	
				
				//改变子弹dom的 divid属性
				bullet.attr({"divid":bullet_divid+"5"});
				
				//改变子弹对象的div属性
				var index=bullet.attr("index");  //下标
				
				bullet_arr[index].divid=bullet_divid+"5";
					
			}else if(bullet_left>87*5&&bullet_left<87*6){
				
				//第6个	
				
				//改变子弹dom的 divid属性
				bullet.attr({"divid":bullet_divid+"6"});
				
				//改变子弹对象的div属性
				var index=bullet.attr("index");  //下标
				
				bullet_arr[index].divid=bullet_divid+"6";
					
			}else if(bullet_left>87*6&&bullet_left<87*7){
				
				//第7个	
				
				//改变子弹dom的 divid属性
				bullet.attr({"divid":bullet_divid+"7"});
				
				//改变子弹对象的div属性
				var index=bullet.attr("index");  //下标
				
				bullet_arr[index].divid=bullet_divid+"7";
					
			}else if(bullet_left>87*7&&bullet_left<87*8){
				
				//第8个	
				
				//改变子弹dom的 divid属性
				bullet.attr({"divid":bullet_divid+"8"});
				
				//改变子弹对象的div属性
				var index=bullet.attr("index");  //下标
				
				bullet_arr[index].divid=bullet_divid+"8";
					
			}else if(bullet_left>87*8&&bullet_left<87*9){
				
				//第9个	
				
				//改变子弹dom的 divid属性
				bullet.attr({"divid":bullet_divid+"9"});
				
				//改变子弹对象的div属性
				var index=bullet.attr("index");  //下标
				
				bullet_arr[index].divid=bullet_divid+"9";
					
			}
			
	
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	