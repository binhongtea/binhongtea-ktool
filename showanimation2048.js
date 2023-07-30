function showNumberWithAnimation(i,j,randNumber){
let numberCell = $(`#number-cell-${i}-${j}`)
numberCell.css("background-color",getNumberBackgroundColor(randNumber))
numberCell.css("color",getNumberColor(randNumber))
numberCell.text(randNumber)

numberCell.animate({
  width:cellSideLength,
  height:cellSideLength,
  top:getPosTop(i,j),
  left:getPosLeft(i,j)
  },50)


}

function showMoveAnimation(fromx,fromy,tox,toy){
    let numberCell = $(`#number-cell-${fromx}-${fromy}`)
    numberCell.animate({
      top:getPosTop(tox,toy),
      left:getPosLeft(tox,toy)
      },200)
    }

function updateScore(score){
   // $("#score").text(score)
   let count = parseInt($("#score").text())
   
   let target = count + score
   
   let step =Math.ceil((target - count) / 50)
   
   $("#score").animate({
     num:target
     },{
     duration:450,
     step:function(now,fx){
         $(this).text(Math.ceil(now))
         }
     })
    }
