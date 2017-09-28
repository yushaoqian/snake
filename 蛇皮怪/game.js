//案例目的:
//1.训练逻辑思维能力
//2.数组操作
//3.ECMA Script基本语法
//4.DOM操作
//游戏参数配置对象
var config={
	map:{width:800,height:600},
	square:{width:50,height:50},
	getRows:function(){return this.map.height/this.square.height;},
	getCols:function(){return this.map.width/this.square.width;},
	getNum:function(){return this.getRows()*this.getCols();}
};
//游戏辅助对象
var help={
	squares:[],
	snake:[],
	foods:[],
	foodIndex:-1,
	dir:3,
	handler:null
};

function removeEleFromArr(arr,ele){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==ele){
			arr.splice(i,1);
			break;
		}
	}
}
function getNewHeadIndex(h_index){
	var h_new_index=-1;//新蛇头位置编号
	switch(help.dir){
		case 1://向左
			//h_new_index=h_index-1;
			h_new_index=h_index%config.getCols()==0
						?h_index+(config.getCols()-1)
						:h_index-1;
			break;
		case 2://向上
			h_new_index=h_index<config.getCols()
						?(config.getRows()-1)*config.getCols()+h_index
						:h_index-config.getCols();
			break;
		case 3://向右
			h_new_index=h_index+1;
			h_new_index=h_new_index%config.getCols()==0
						?h_new_index-config.getCols()
						:h_new_index;
			break;
		case 4://向下
			h_new_index=h_index+config.getCols();
			h_new_index=h_new_index>=config.getNum()
						?h_new_index-config.getNum()
						:h_new_index;
			break;
	}
	return h_new_index;
}
function isInBody(h_new_index){
	for(var i=0;i<help.snake.length-1;i++){
		if(help.snake[i]==h_new_index)
			return ture;
	}
	return false;
}
//初始化地图
function initMap(){
	id('map').style.width=config.map.width+'px';
	id('map').style.height=config.map.height+'px';
	var num=config.getNum();
	for(var i=0;i<num;i++){
		var span=document.createElement('span');
		span.style.width=config.square.width+'px';
		span.style.height=config.square.height+'px';
		id('map').appendChild(span);
		//初始化全局辅助变量
		help.squares.push(span);
		if(i<=4) {
			help.snake.push(i);
			span.className='snake';
		}
		else help.foods.push(i);
	}
}
//随机在地图中刷新一个食物
function showFood(){
	var index=Math.floor(Math.random()*help.foods.length);
	help.foodIndex=help.foods[index];
	help.squares[help.foods[index]].className='food';
}
function snakeMove(){
	//处理蛇头
	var h_index=help.snake[help.snake.length-1];
	var h_new_index=getNewHeadIndex(h_index);
	// 判断蛇头有没有撞死
	if(isInBody(h_new_index)){
		clearInterval(help.handler);
		alert('game over...');
		if(confirm('once game?'))
			window.location.href=window.location.href;
		else
			window.close();
		return;
	}
	help.squares[h_new_index].className='snake';
	removeEleFromArr(help.foods,h_new_index);
	help.snake.push(h_new_index);
	//处理蛇尾
	if(h_new_index!=help.foodIndex){
	help.squares[help.snake[0]].className='';
	help.foods.push(help.snake.shift());
	}
	else{
		showFood();
	}
}
window.onload=function(){
	initMap();
	showFood();
	setInterval(snakeMove,500);
	document.onkeyup=function(e){
		if(e.keyCode>=37&&e.keyCode<=40)
			help.dir=e.keyCode-36;
	}
}