var documentWidth=document.documentElement.clientWidth;  //页面DOM宽度；
var containerWidth=documentWidth*0.92;  //容器宽度
var cellWidth=documentWidth*0.18;  //单元格宽度
var cellSpace=documentWidth*0.04;  //单元格的间隔宽度
console.log(documentWidth,containerWidth,cellWidth,cellSpace);


//获取距离上边的位置
function getPosTop(i,j){
//	return 20+120*i;   pc端
	return cellSpace+(cellWidth+cellSpace)*i;   //移动端
	
}

//获取距离左边的位置
function getPosLeft(i,j){
//	return 20+120*j;  //pc端
     return cellSpace+(cellWidth+cellSpace)*j; 

}

//获取文字背景颜色
function getbackdroundColor(num){
	switch(num){
		case 2:return '#eee4da'; break ;
		case 4:return '#ede0c8'; break;
		case 8:return "#f2b179"; break;
		case 16:return "#f59563"; break;
		case 32:return "#f67c5f"; break;
		case 64:return "#f65e3b"; break;
		case 128:return "#edcf72"; break;
		case 256:return "#edcc61"; break;
		case 512:return "#9c0";    break;
		case 1024:return "#33b5e5"; break;
		case 2048:return "#09c";    break;
	}
}


//获取文字颜色
function getnumberColor(num){
       if(num<=4){
       	return '#776e65';
       }else{
       	return '#fff';
       }
}

//判断是否没有空间
function noSpace(nums){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

//
function canMoveLeft(nums){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i][j-1]==0||nums[i][j-1]==nums[i][j]){     //左边为0或者两者相等
					return true;
				}  
			}
		}
	}
	return false;
}

function canMoveRight(nums){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(nums[i][j]!=0){
				if(nums[i][j+1]==0 || nums[i][j+1]==nums[i][j]){     //右边为0或者两者相等
					return true;
				}  
			}
		}
	}
	return false;
}

function canMoveUp(nums){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i-1][j]==0 || nums[i-1][j]==nums[i][j]){     //上边为0或者两者相等
					return true;
				}  
			}
		}
	}
	return false;
}

function canMoveDown(nums){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i+1][j]==0 || nums[i+1][j]==nums[i][j]){     //下边为0或者两者相等
					return true;
				}  
			}
		}
	}
	return false;
}

//判断水平方向上是否有障碍物
function noBlockHorizontal(row,col1,col2,nums){
	for(var i=col1+1;i<col2;i++){
		if(nums[row][i]!=0){
			return false;
		}
	}
	return true;
}

//判断垂直方向上是否有障碍物
function noBlockVertical(col,row1,row2,nums){
	for(var i=row1+1;i<row2;i++){
		if(nums[i][col]!=0){
			return false;
		}
	}
	return true;
}
//更新分数
function updataScore(score){
	$('#score').text(score);
}

function noMove(nums){
	if(canMoveLeft(nums) || canMoveRight(nums) || canMoveUp(nums) || canMoveDown(nums)){
		return false;
	}
	return true;
}

//判断游戏是否结束
//1.判断单元格是否为空
//2.判断是否不能上下左右移动
function isGameOver(){
	if(noSpace(nums) && noMove(nums)){
		alert('GameOver!');
	}
}


