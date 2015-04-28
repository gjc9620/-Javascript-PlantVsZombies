
//////////////////////植物

/*向日葵喷阳光的方法  
Sunflowerppositionid 向日葵所在div的id
*/
function produceEnergy(Sunflowerppositionid) { 

    //当前向日葵所在div
    var div = $("#" + Sunflowerppositionid);

    //庭院div
    var courtyard = $("#courtyard");


    //形成一个随机数
    var random_produceEnergy = math_random(0, 1000000000000000);


    //获取当前时间
    var d = new Date();

    var id = "energy_"+random_produceEnergy + d.getDate() + d.getHours() + d.getMinutes();

    //想庭院idv添加此太阳
    courtyard.append("<img class='Randomenergy' id='" + id + "' src='pic/zombies/images/Sun.gif' />");
    $("#" + id).css({ "left": div.offset().left + 10, "top": div.offset().top + 20 });
    $("#" + id).animate({ "top": "-=5", "left": "+=2", "opacity": "25" }, 100)
                         .animate({ "top": "-=8", "left": "+=5", "opacity": "25" }, 100)
                         .animate({ "top": "+=8", "left": "+=11", "opacity": "25" }, 100)
                         .animate({ "top": "+=5", "left": "+=5", "opacity": "25" }, 100)
                         .animate({ "top": "+=20" }, 100);


    //太阳的点击事件
    $("#" + id).click(function () {

        //停止动画
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






//点击植物卡片的事件
$(".plantcard").click(function () {
	
	  //判断是否买的起
	  if(parseInt($("#countenergy_sum").html())<$("#"+$(this).prop("id")).attr("cost")){
		  return;
	  }
	
	  //判断该植物是否cd
	  if($("#"+$(this).prop("id")).is(":animated")){ return;};
	
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
			
			
	  };


    //如果手里的植物==他点击的植物
    if (playerhand == $(this).prop("id")) {

        //放下植物
        playerhand = "";

        //消除所有草皮的hover事件
        $(".Turf").unbind("hover");
        return;
    }

    //玩家拿起点击的植物
    playerhand = $(this).prop("id");


    //消除所有草皮的hover事件
    $(".Turf").unbind("hover");

    //草皮的hover
    $(".Turf").hover(function () {
        //是否存在植物 不存在 做事
        if (!$(this).children().is(".plant")) {
            //添加一个临时植物
            $(this).append("<img id='tmpplant'  src='pic/zombies/images/" + playerhand + ".gif' />");

            //给当前div 添加click
            $(this).click(function () {
				
				//移除自己的click事件
                $(this).unbind("click");
				
				
				
                //移除tmp植物
                $("#tmpplant").remove();

                
				
				//形成一个随机数
				var random_id = math_random(0, 1000000000000000);
			
			
				//获取当前时间
				var d = new Date();
			
				var id = playerhand+"_"+random_id + d.getDate() + d.getHours() + d.getMinutes();
				
				//添加上一个真的植物
                $(this).append("<img class='plant' id='"+id+"' index='"+array.length+"'  src='pic/zombies/images/" + playerhand + ".gif' />");
				
				//new出这个植物
				eval("var "+id+" = new "+playerhand+"(\""+$(this).attr("id")+"\")");
				
				//给对象的id赋值
				eval(id+".id=\""+id+"\"");
				
				//给index赋值
				eval(id+".index=\""+array.length+"\"");
				
				//放到数组里
				eval("array.push("+id+")");
				
				//调用new 出来植物action的方法
				eval(id+".action()");
				
				//购买这个植物
				eval(id+".buy()");
				
				
				
				//取消草皮的hover click
				$(".Turf").unbind("hover")
						  .unbind("click");
				
				
				//该植物进入cd
                $("#"+playerhand).animate({"height":"1px"})
								.animate({"height":"72px"},(parseInt($("#"+playerhand).attr("cd"))));
								
				//放下玩家手中的植物
				playerhand="";
				
				
            });

        }
    }, function () {
        if (!$(this).children().is(".plant")) {

            //移除自己的click事件
            $(this).unbind("click");

            //去除临时植物
            $("#tmpplant").remove();
        }
    });

});






