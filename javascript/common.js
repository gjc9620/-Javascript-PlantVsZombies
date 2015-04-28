//屏蔽网页右键菜单
/*document.oncontextmenu = new Function("return false");*/



////////////////////////////////////////////////////////////////////



/////////////////////////////



//生产一个随机整数 x<random<y
function math_random(x, y) {

    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}



//随机掉落阳光
function Randomenergy() {
    //生成几率
    var roll = math_random(0, 10);
    if (roll == 1) {

        var Randomenergy_lawn = $("#lawn");

        //随机位置 left
        var randomleft = math_random(Randomenergy_lawn.offset().left, Randomenergy_lawn.offset().left + Randomenergy_lawn.width() - 150);
        //掉落最终的top
        var randomtop = math_random(Randomenergy_lawn.offset().top, Randomenergy_lawn.offset().top + Randomenergy_lawn.height() - 50);


        //形成一个随机数
        var random_produceEnergy = math_random(0, 1000000000000000);


        //获取当前时间
        var d = new Date();

        //id
        var id = random_produceEnergy + d.getDate() + d.getHours() + d.getMinutes();

        //添加太阳
        $("#courtyard").append("<img class='Randomenergy' id='" + id + "' src='pic/zombies/images/Sun.gif' />");

        $("#" + id).css({ "left": randomleft });

        //下降的动画
        $("#" + id).animate({ "top": randomtop }, 2000);

        //给他添加click事件
        $("#" + id).click(function () {


            if ($(this).is(":animated")) {
                $(this).stop(true);
            }


            //获得count阳光
            var countenergy_img = $("#countenergy_img");



            //执行飞向count阳光 动画
            $(this).animate({ "left": countenergy_img.offset().left, "top": countenergy_img.offset().top }, 2000)
                    .animate({ "opacity": "0" }, function () {
                        //移除自己
                        $(this).remove();


                        //给阳光加上25 （一个阳光25）
                        $("#countenergy_sum").html((25 + parseInt($("#countenergy_sum").html())));
                    });

        });



    }
}



  //////////////////铲子
  $("#Shovel").click(function(){
	  
	  
	  //判断玩家手里拿的是不是铲子
	  if(playerhand=="Shovel"){ 
	  		//拿的是铲子
			
		  //庭院的move去掉
		  $("#courtyard").unbind("mousemove");
		 
		  //去掉移动事件
		  $("#courtyard").unbind("mousemove");
		  
		  //植物失去click事件
		  $(".plant").unbind("click").unbind("hover");
		  
		  //去掉铲子
		  $("#relShovel").remove();
		  
		  //玩家手里的变成空气
		  playerhand="";
			
			
	  		return; 
	  };
	  
	  
	  //追加一个铲子
	  $("#courtyard").append("<img id='relShovel' src='pic/zombies/images/Shovel.png' />");	
	  
	  //消除所有草皮的hover事件
      $(".Turf").unbind("hover");
	  
	  //玩家手里的变成铲子
	  playerhand="Shovel";
	  
	  
	  //让铲子跟着鼠标动	
	  $("#courtyard").mousemove(function(e){
		  		//动起来
			  $("#relShovel").css({ "left":e.pageX+1,"top":e.pageY+1});
			
	  });

	  
	 
	 /// 鼠标移动变透明
	  $(".plant").hover(function(){
			  
			  //把这个植物的透明度
			$(this).css({"opacity":"0.3"});
			
			//去除这个植物的事件
			$(this).unbind("mousemove");
			
			//在植物里面移动事件
		    $(this).mousemove(function(){
		  
		       $(this).css({"opacity":"0.3"});
		  
	        });
			  
	  },function(){
		  		//去除这个植物的事件
		  	  $(this).unbind("mousemove");
			  
			  //还原透明度
			  $(this).css({"opacity":"1"});
	  });
 	  
	  
	  
	  //点下去 铲的瞬间
	  $(".plant").click(function(){
		  
		  //移除所有植物的 进入 出去的 透明效果
		  $(".plant").unbind("hover");
		  
		  
		  //铲除这颗植物
		  $(this).remove();
		  
		  var id=$(this).attr("id");
		  
		  /*//调用new 出来植物销毁的方法
		  eval(id+".bebomm()");*/
		  
		  //找出这个植物的index
		  var index=$(this).attr("index");
		  
		  //调用销毁方法
		  array[index].bebomm();
		  
		 //庭院的move去掉
		 $("#courtyard").unbind("mousemove");
		 
		 //去掉移动事件
		  $("#courtyard").unbind("mousemove");
		  
		  //植物失去click事件
		  $(".plant").unbind("click").unbind("hover");
		  
		  //去掉铲子
		  $("#relShovel").remove();
		  
		  //玩家手里的变成空气
		  playerhand="";
		  
			 
	  });
  });

//监听者
var listener=function(divid){

	    this.divid=divid; //监听者所在idiv
		
		this.interval=null; //监听者的计时器
		

		setInterval("listen('"+this.divid+"')",60);
		

};

//监听的方法
function listen (divid){
	
	//获得div对象
	var div	= $("#"+divid);
	//获得行div对象
	var parent=$("#"+divid).parent();
	
	//获得他所有的子弹
	var div_bullet=$("#"+parent.prop("id")+" .bullet[divid="+divid+"]");
	
	//获得所有僵尸
	var zombies=$("#"+parent.prop("id")+" .zombies[blockdiv="+divid+"]");
	
	
	//------子弹击中判定
	//循环子弹
	for(var i=0;i<div_bullet.length;i++){
		for(var j=0;j<zombies.length;j++){
				
				var nowbullet=div_bullet.eq(i); //当前循环到的子弹对象
				var nowzombies=zombies.eq(j); //当前循环到的僵尸对象
				
				
				var nowbullet_left=nowbullet.position().left; //子弹现在的left
				var nowzombies_left = nowzombies.position().left; //僵尸现在的left
				
				//判断子弹的left是不是>=僵尸的left 并且<=僵尸的left+width
				if(nowbullet_left+nowbullet.width()>=nowzombies_left&&nowbullet_left<=nowzombies_left+nowzombies.width()){
						
						//子弹消失
							bullet_arr[nowbullet.attr("index")].death();
						
						//僵尸扣血
							//拿到子弹的
							var hurt=nowbullet.attr("hurt");
							//拿到当前僵尸的血
							var hp =zombies_arr[nowzombies.attr("index")].hp;
							//扣血
							zombies_arr[nowzombies.attr("index")].hp=hp-hurt;
							
						//如果这个僵尸的血变成o死亡
						if(hp-hurt<=0){
								zombies_arr[nowzombies.attr("index")].death();
						}
						
				}
		}	
	}
	
	//-*-----子弹击中判定结束
	
	//-------僵尸和植物战斗
	//获得这个div的植物
	//这个div的所有僵尸zombies
	var plant=$("#"+divid+" .plant");
	if(plant.length>0){
		var nowplant_left=plant.position().left+(87*plant.parent().index()); //植物现在的left
	
		for(var j=0;j<zombies.length;j++){
				
			var nowzombies=zombies.eq(j); //当前循环到的僵尸对象
			var nowzombies_left = nowzombies.position().left; //僵尸现在的left
			
			//植物的left+植物过去的格子的总长度<僵尸的left<植物的left+植物的width+植物过去的格子的长度
			if(nowplant_left<nowzombies_left&&nowzombies_left<nowplant_left+plant.width()-15){
				//判断当前僵尸是否再吃的状态
				if(!zombies_arr[nowzombies.attr("index")].iseat){
						zombies_arr[nowzombies.attr("index")].gobatttle();
				}
				 //拿到当前植物的血
				 var hp=array[plant.attr("index")].hp;
				 //拿到当前僵尸的攻
				var atk=zombies_arr[nowzombies.attr("index")].damage;
				//扣血
				array[plant.attr("index")].hp=hp-atk;
				
				if(hp-atk<=0){
					//植物死了
					array[plant.attr("index")].bebomm();
					plant.remove();
					//这个格子的所有僵尸退出战斗
					for(var k=0;k<zombies.length;k++){
						
						var nowzombies_index=zombies.eq(k).attr("index");
						zombies_arr[nowzombies_index].exitbaattle();
					}
				}
			}
		}		
	}
	//-------僵尸和植物战斗完
	
}

//////////////////////////监听方法完//////////////////////////
	
//随生成僵尸
function Randomzombie(){
		//计算是否有僵尸出现
		var random233=math_random(0,11);
		if(random233>1){
			return;	
		}
		
		//生成一个0-6的随机数
		var math_random1=math_random(0,6);
		
		var div=""; //僵尸起始的行
		var blackidvid="";//僵尸起始div
		
		//判断这个数字
		if(math_random1==1){
			 //在First10添加一个僵
			 div="First";
			 blackidvid="First10";
			 
			
		}else if(math_random1==2){
			//在Second10
			div="Second";
			blackidvid="Second10";
			
		}else if(math_random1==3){
			//在Third10
			div="Third";
			blackidvid="Third10";
			
		}else if(math_random1==4){
			
			//在Fourth10
			div="Fourth";
			blackidvid="Fourth10";
			
		}else if(math_random1==5){
			
			//在Fifth10
			div="Fifth";
			blackidvid="Fifth10";
		}
		
		//随机生辰僵尸的id
		 //形成一个随机数
        var random_zombie = math_random(0, 1000000000000000);


        //获取当前时间
        var d = new Date();

        //id
        var id = "zombies_"+random_zombie + d.getDate() + d.getHours() + d.getMinutes();
		
		//////要删
/*		div="Fifth";
		blackidvid="Fifth10"*/
		
		//添加一个僵尸
		$("#"+div).append("<div class='zombies' id='"+id+"' blockdiv='"+blackidvid+"' index='"+zombies_arr.length+"'  ></div>");
		
		//给他设置一个left
		$("#"+id).css({"left":"820px"});
		
		//实例化这个僵尸
		eval("var "+id+"=new ordinaryZombies('"+div+"','"+id+"')");
		
		//僵尸给僵尸的div赋值
		eval(id+".div='"+blackidvid+"'");
		
		//注册下标
		eval(id+".index="+zombies_arr.length);
		
		//把这个僵尸添加到数组里
		eval("zombies_arr.push("+id+")");
		
		//调用这个僵尸的方法
		eval(id+".action()");
		
}
	






