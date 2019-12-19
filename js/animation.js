//通过动画显示数字
function showNumberWithAnimation(i,j,randNumber){
//   console.log(i,j,randNumber);
    var numberCell=$('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',getbackdroundColor(randNumber));
    numberCell.css('color',getnumberColor(randNumber));
    numberCell.text(randNumber);
    
    numberCell.animate({
//  	width:'100px',
//  	height:'100px',

    	width:cellWidth,
    	height:cellWidth,
    	top:getPosTop(i,j),
    	left:getPosLeft(i,j)
    },500);
  }  

//通过动画显示移动
function showMoveAnimation(fromx,fromy,tox,toy){
//	console.log(111);
	var numberCell=$('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},500);
}













