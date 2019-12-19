var nums=new Array();   //创建一个数组

var hasConflicted=new Array();  //已经已叠加，用来解决单元格重复叠加的问题
var score=0;


var startx=0;
var starty=0
var endx=0;
var endy=0;

$(document).ready(function(){
	 newgame();
});

//开始新游戏
function newgame(){
	
	if(documentWidth>500){
		containerWidth=500;
		cellWidth=100;
		cellSpace=20;
	}else{
		//设置移动端尺寸
		setingForMobile();
	}
	
	//初始化页面
	init();
	
	//在随机的单元格生成两个数字
	genetaOneNumber();
	genetaOneNumber();
}

function setingForMobile(){
	$('#header .wrapper').css('width',containerWidth);


    $('#grid-container').css('width',containerWidth-cellSpace*2);
	$('#grid-container').css('height',containerWidth-cellSpace*2);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',containerWidth*0.02);
		
	
	$('.grid-cell').css('width',cellWidth);
	$('.grid-cell').css('height',cellWidth);
	$('.grid-cell').css('border-radius',cellWidth*0.06);
	
	
	
}

//初始化页面
function init(){
	//初始化单元格位置
	 for(var i=0;i<4;i++){
	 	for(var j=0;j<4;j++){
	 		var gridcell=$('#grid-cell-'+i+'-'+j);
	 		gridcell.css('top',getPosTop(i,j));
	 		gridcell.css('left',getPosLeft(i,j));
	 	}
	 }
	 
	 //初始化数组
	 for(var i=0;i<4;i++){
	 	nums[i]=new Array();
	 	hasConflicted[i]=new Array();
	 	for(var j=0;j<4;j++){
	 		nums[i][j]=0;
	 		hasConflicted[i][j]=false;  //false表示未曾叠加过，true表示已经叠加过
	 	}
	 }
	 
//	 nums[0][3]=4;
//	 nums[2][2]=8;
	 //动态创建上层单元格并初始化
	 updataView();
}

//更新上层单元格视图
function updataView(){
	//将上层所有单元格清空,然后重新初始化创建
	$('.number-cell').remove();
	
	for(var i=0;i<4;i++){
	 	for(var j=0;j<4;j++){
	 		$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
	 		var numberCell=$('#number-cell-'+i+'-'+j);
	 		if(nums[i][j]==0){
	 			numberCell.css('width','0px');
	 			numberCell.css('height','0px');
//	 			numberCell.css('top',getPosTop(i,j)+50);
//	 			numberCell.css('left',getPosLeft(i,j)+50);
	 			
	 			numberCell.css('top',getPosTop(i,j)+cellWidth*0.5);
	 			numberCell.css('left',getPosLeft(i,j)+cellWidth*0.5);
	 			
	        }else{
//	        	numberCell.css('width','100px');
//	 			numberCell.css('height','100px');
	 		
	 		    numberCell.css('width',cellWidth);
	 			numberCell.css('height',cellWidth);
	 			numberCell.css('top',getPosTop(i,j));
	 			numberCell.css('left',getPosLeft(i,j));
	 			numberCell.css('background-color',getbackdroundColor(nums[i][j]));
	 			numberCell.css('color',getnumberColor(nums[i][j]));
	 			numberCell.text(nums[i][j]);
	        }
	        hasConflicted[i][j]=false;	
	        
	        //移动端尺寸设置
	        $('.number-cell').css('border-radius',cellWidth*0.06);
	        $('.number-cell').css('font-size',cellWidth*0.5);
	        $('.number-cell').css('line-height',cellWidth+'px');
        }
	}
}

/*   在随机的单元格生成一个随机数。
 *   1.在空余的单元格中随机选一个；
 *   2.随机生成一个2或4；
 */
function genetaOneNumber(){
	//判断是否还有空间,没有空的空间则直接返回，有空的空间则返回一个单元格，一个数字
	if(noSpace(nums)){
		return;
	}else{
		
		  //生成一个空间
	var count=0;	  
	var temp=new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				temp[count]=i*4+j; // 1*4+3=7 ------>  7/4=1    7%4=3取余
				count++;
			}
		}
	}
	var pos=Math.floor(Math.random()*count);  //向下取整， [0,1)*6--->[0,6)  1.2--->1  随机一个整数
	var randx=Math.floor(temp[pos]/4);   //向下取整  
	var randy=Math.floor(temp[pos]%4);    
	    //生成一个随机数
	var randNum=Math.random()<0.5?2:4;   //三元运算，小于0.5 randNum=2  大于0.5 randNum=4    
	
	//在随机的位置上显示数字
	nums[randx][randy]=randNum;  //数字给坐标
	showNumberWithAnimation(randx,randy,randNum) //通过函数显示
	}
}

//实现键盘的响应
$(document).keydown(function(event){
	
	event.preventDefault();
	switch(event.keyCode){
		
		case 37: //left
		//判断是否可以向左移动
//		console.log(111);
		if(canMoveLeft(nums)){
			//向左移动
			moveLeft();
			setTimeout(genetaOneNumber,200);
			setTimeout(isGameOver,1000);
		}
		     break;
		case 38: //up
		if(canMoveUp(nums)){
			//向上移动
//			console.log(111);
			moveUp();
			setTimeout(genetaOneNumber,200);
			setTimeout(isGameOver,1000);
		}
		     break;
		case 39: //right
//		console.log(111);
		if(canMoveRight(nums)){
			//向右移动
			moveRight();
			setTimeout(genetaOneNumber,200);
			setTimeout(isGameOver,1000);
		}
		     break;
		case 40: //down
//		console.log(111);
		if(canMoveDown(nums)){
		    //向下移动
		    moveDown();
		    setTimeout(genetaOneNumber,200);
		    setTimeout(isGameOver,1000);
		}
		     break;     
	}
})
  
//实现触摸滑块响应
document.addEventListener('touchstart',function(event){
//	console.log(event);
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
//	console.log(event);
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;
	
	var deletex=endx-startx;
	var deletey=endy-starty;
	
	//判断当滑动距离小于一定的值域时，不做任何移动
	if(Math.abs(deletex)<documentWidth*0.06 && Math.abs(deletey)<documentWidth*0.06){
		return;
	}
	if(Math.abs(deletex)>=Math.abs(deletey)){ //判断是否水平方向上移动, yes 水平移动
		if(deletex>0){//向右移动
			if(canMoveRight(nums)){
				//向右移动
				moveRight();
				setTimeout(genetaOneNumber,200);
				setTimeout(isGameOver,1000);
			}	 
		}else{  //向左移动
			if(canMoveLeft(nums)){
				//向左移动
				moveLeft();
				setTimeout(genetaOneNumber,200);
				setTimeout(isGameOver,1000);
			}
		}
		
	}else{  //垂直方向移动
		if(deletey>0){
			if(canMoveDown(nums)){
		    //向下移动
		    moveDown();
		    setTimeout(genetaOneNumber,200);
		    setTimeout(isGameOver,1000);
		}
		}else{  //向上移动
			if(canMoveUp(nums)){
				//向上移动
//				console.log(111);
				moveUp();
				setTimeout(genetaOneNumber,200);
				setTimeout(isGameOver,1000);
			}	
		}
	}
})




/*
 * 向左移动
 * 需要对每一个数字的左边进行判断，选择落脚点，落脚点有两种情况：
 * 1.落脚点没有数字，并且移动路劲没有障碍物；
 * 2.落脚点数字和自己相同，并且移动路劲没有障碍物；
 */
function moveLeft(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
            if(nums[i][j]!=0){
            	for(var k=0;k<j;k++){
            		if(nums[i][k]==0 && noBlockHorizontal(i,k,j,nums)){ //从i行的第k--到j列是否有障碍物
            			//真移动操作
            			showMoveAnimation(i,j,i,k);
            			//
            			nums[i][k]=nums[i][j];
            			nums[i][j]=0;
            			break;
            		}else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,k,j,nums) && !hasConflicted[i][k]){
            			showMoveAnimation(i,j,i,k);
            			nums[i][k]+=nums[i][j];
            			nums[i][j]=0;
            			//更新分数
            			//统计分数
            			score+=nums[i][k];
            			updataScore(score);
            			
            			hasConflicted[i][k]=true; //已经叠加 
            			break;
            		}
            	}
            }
		}
    }
	//更新页面上的数字单元格，此处才是真正显示数字移动的动画效果
	setTimeout(updataView,500);    
}

function moveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
            if(nums[i][j]!=0){
            	for(var k=3;k>j;k--){
            		if(nums[i][k]==0 && noBlockHorizontal(i,j,k,nums)){ //从i行的第j--到k列是否有障碍物
            			//真移动操作
            			showMoveAnimation(i,j,i,k);
            			//
            			nums[i][k]=nums[i][j];
            			nums[i][j]=0;
            			break;
            		}else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,j,k,nums) && !hasConflicted[i][k]){
            			showMoveAnimation(i,j,i,k);
            			nums[i][k]+=nums[i][j];
            			nums[i][j]=0;
            			//更新分数
            			//统计分数
            			score+=nums[i][k];
            			updataScore(score);
            			hasConflicted[i][k]=true; //已经叠加 
            			break;
            		}
            	}
            }
		}
    }
	//更新页面上的数字单元格，此处才是真正显示数字移动的动画效果
	setTimeout(updataView,500);
}

function moveUp(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
            if(nums[i][j]!=0){
            	for(var k=0;k<i;k++){
            		if(nums[k][j]==0 && noBlockVertical(j,k,i,nums)){ //从j列的第k--到i行是否有障碍物
            			//真移动操作
            			showMoveAnimation(i,j,k,j);
            			//
            			nums[k][j]=nums[i][j];
            			nums[i][j]=0;
            			break;
            		}else if(nums[k][j]==nums[i][j] && noBlockVertical(j,k,i,nums) && !hasConflicted[k][j]){
            			showMoveAnimation(i,j,k,j);
            			nums[k][j]+=nums[i][j];
            			nums[i][j]=0;
            			//更新分数
            			//统计分数
            			score+=nums[k][j];
            			updataScore(score);
            			hasConflicted[k][j]=true; //已经叠加 
            			break;
            		}
            	}
            }
		}
    }
	//更新页面上的数字单元格，此处才是真正显示数字移动的动画效果
	setTimeout(updataView,500);
}

function moveDown(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(nums[i][j]!=0){
				for(var k=3;k>i;k--){
					if(nums[k][j]==0 && noBlockVertical(j,i,k,nums)){  //第j列的第i-k行之间是否有障碍物
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j] && noBlockVertical(j,i,k,nums) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[k][j];
						updataScore(score);
						
						hasConflicted[k][j]=true;
						break;
					}
				}
			}
		}
	}
	setTimeout(updataView,500);
}




























