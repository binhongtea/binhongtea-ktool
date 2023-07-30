let board = new Array()
let score = 0
let hasConflicted = new Array()




$(document).ready(function(){
    newgame()
    prepareForMobile()
  })

function prepareForMobile(){

    if( documentWidth > 500 ){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
  $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02*gridContainerWidth);

    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', 0.2 * cellSideLength);


  }




  function init(){
      for(let i=0;i < 4;i++){
        for(let j=0;j<4;j++){
          let gridCell = $(`#grid-cell-${i}-${j}`)
          gridCell.css("top",getPosTop(i,j))
          gridCell.css("left",getPosLeft(i,j))
        }
      }

      for(let i=0;i<4;i++){
        board[i] = new Array()
        hasConflicted[i] = new Array()
        for(let j=0;j<4;j++){
          board[i][j] = 0
          hasConflicted[i][j] = false
        }
      }

      updateBoardView()
      }
      
    
      function updateBoardView(){
          $(".number-cell").remove()
          for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
              $("#grid-container").append(`<div class="number-cell" id="number-cell-${i}-${j}"></div>`)
              let theNumberCell = $(`#number-cell-${i}-${j}`)

              if(board[i][j] === 0){
                theNumberCell.css("width","0px")
                theNumberCell.css("height","0px")
                theNumberCell.css("top",getPosTop(i,j)+50)
                theNumberCell.css("left",getPosLeft(i,j))
              }else{
                theNumberCell.css("width",cellSideLength)
                theNumberCell.css("height",cellSideLength)
                theNumberCell.css("top",getPosTop(i,j))
                theNumberCell.css("left",getPosLeft(i,j))
                theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]))
                theNumberCell.css("color",getNumberColor(board[i][j]))
                theNumberCell.text(board[i][j])
                
              }


            }
          }
        }
        
      

      function newgame(){
          //初始化
          init()

          //随机生成2个格子
          generateOneNumber()
          generateOneNumber()
      
        }



        function generateOneNumber() { 
   
    if( nospace( board ) )
        return false;

  
        
    var randx = parseInt(Math.floor(Math.random() * 4) )
    var randy = parseInt(Math.floor(Math.random() * 4) )


    var times = 0

    // 如果这个数上原来有数字，则不能生成，需要判断
    while( times < 50 ){
        if( board[randx][randy] == 0 )//如果位置为0，则这个位置是可用的
            break; //如果该位置是空的，则走出该死循环

        randx = parseInt(Math.floor(Math.random() * 4))//如果该位置不是空的，则还需要生成随机位置
        randy = parseInt(Math.floor(Math.random() * 4))

        times ++;
    }

    if( times == 50 ){
        for( var i = 0; i < 4; i++ )
            for( var j = 0; j<4; j++){
                if( board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
    }


    //随机生成 2或4
    // 让random随机生成数，比0.5大就生成2，比0.5小就生成4，比例相同
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx, randy, randNumber );

    return true;
 }

     $(document).keydown( function ( event ) { 
    switch( event.keyCode ){
        case 37://left
            if ( moveLeft() ){  
                setTimeout("generateOneNumber()",210) 
                setTimeout("isgameover()",300); 
            }   
            //还需要判断是否能向左（因为当左边满了不能左移）
            break;


            case 38://up
            if ( moveUp() ){
                setTimeout("generateOneNumber()",210) 
                setTimeout("isgameover()",300)
            }   
            break;


        case 39://right
            if ( moveRight() ){ 
                setTimeout("generateOneNumber()",210) 
                setTimeout("isgameover()",300)
            }   
            break;


        case 40://down
            if ( moveDown() ){  
                setTimeout("generateOneNumber()",210) 
                setTimeout("isgameover()",300)
            }   
            break;
            
        default:
            break;
    }

  })





          let startx,starty

          function getAngle(angx, angy){
              return Math.atan2(angy,angx)*180/Math.PI
            }

            function getDirection(startx, starty, endx, endy){
                //1向上 2向下 3向左 4向右 0未滑动
                let angx = endx - startx
                let angy = endy - starty
                let result = 0

                if(Math.abs(angx) <2 && Math.abs(angy)<2){
                  return result
                }

                let angle = getAngle(angx,angy)

                if(angle >= -135 && angle <= -45){
                  result = 1
                } else if(angle > 45 && angle < 135){
                  result = 2
                } else if((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)){
                  result = 3
                } else if(angle >= -45 && angle <= 45){
                  result = 4
                }

                return result
              }
            
            

              $("#grid-container").on("touchstart",function(e){
                
                  startx = e.touches[0].pageX
                  starty = e.touches[0].pageY

                })
              
              $("#grid-container").on("touchmove",function(e){
                  e.preventDefault()
                  })


                $("#grid-container").on("touchend",function(e){
                    
                    let endx,endy

                    endx = e.changedTouches[0].pageX
                    endy = e.changedTouches[0].pageY
                    let Direction = getDirection(startx,starty,endx,endy)
                    switch(Direction){
                      case 1:
                      if(moveUp()){
                        setTimeout("generateOneNumber()",210)
                        setTimeout("isgameover()",300)
                        }
                      break;
                      case 2:
                      if(moveDown()){
                        setTimeout("generateOneNumber()",210)
                        setTimeout("isgameover()",300)
                        }
                      break;
                      case 3:
                      if(moveLeft()){
                        setTimeout("generateOneNumber()",210)
                        setTimeout("isgameover()",300)
                        }
                      break;
                      case 4:
                      if(moveRight()){
                        setTimeout("generateOneNumber()",210)
                        setTimeout("isgameover()",300)
                        }
                      break;
                    }
                  })




                  function moveLeft(){
                      if(!canMoveLeft(board)){
                        return false
                      }

                      for(let i=0;i<4;i++){
                        for(let j=1;j<4;j++){
                          if(board[i][j] !== 0){
                            for(let k=0;k<j;k++){
                              if(board[i][k] === 0 && noBlockHorizontal(i,k,j,board)){
                                showMoveAnimation(i,j,i,k)
                                board[i][k] = board[i][j]
                                board[i][j] = 0
                                continue
                              }else if(board[i][k]=== board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                                showMoveAnimation(i,j,i,k)
                                board[i][k] *= 2
                                board[i][j] = 0
                                score += board[i][k]
                                updateScore(score)
                                hasConflicted[i][k] = true
                                continue
                              }
                            }
                          }

                        }
                      }
                      setTimeout("updateBoardView()",200)
                      return true
                    }

                    function moveRight(){
                        if( !canMoveRight( board ) )
                        return false;

                        //moveRight
                        
                        for( var i = 0 ; i < 4 ; i ++ )
                        for( var j = 2 ; j >= 0 ; j -- ){
                        if( board[i][j] != 0 ){
                          for( var k = 3 ; k > j ; k -- ){

                          if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                            showMoveAnimation( i , j , i , k );
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                          }
                        else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k]){
                            showMoveAnimation( i , j , i , k);
                            board[i][k] *= 2;
                            board[i][j] = 0;
                            score += board[i][k]
                            updateScore(score)
                            hasConflicted[i][k] = true
                            continue;
                          }
                        }
                      }
                    }

                    setTimeout("updateBoardView()",200);
                    return true;
                  }

                  function moveUp(){

                      if( !canMoveUp( board ) )
                      return false;

                      //moveUp
                      for( var j = 0 ; j < 4 ; j ++ )
                      for( var i = 1 ; i < 4 ; i ++ ){
                        if( board[i][j] != 0 ){
                          for( var k = 0 ; k < i ; k ++ ){

                            if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                              showMoveAnimation( i , j , k , j );
                              board[k][j] = board[i][j];
                              board[i][j] = 0;
                              continue;
                            }
                          else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j]){
                              showMoveAnimation( i , j , k , j );
                              board[k][j] *= 2;
                              board[i][j] = 0;
                              score += board[k][j]
                              updateScore(score)
                              hasConflicted[k][j] = true
                              continue;
                            }
                          }
                        }
                      }

                      setTimeout("updateBoardView()",200);
                      return true;
                    }

                    function moveDown(){
                        if( !canMoveDown( board ) )
                        return false;

                        //moveDown
                        for( var j = 0 ; j < 4 ; j ++ )
                        for( var i = 2 ; i >= 0 ; i -- ){
                        if( board[i][j] != 0 ){
                          for( var k = 3 ; k > i ; k -- ){

                          if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                            showMoveAnimation( i , j , k , j );
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                          }
                        else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j]){
                            showMoveAnimation( i , j , k , j );
                            board[k][j] *= 2;
                            board[i][j] = 0;
                            score += board[k][j]
                            updateScore(score)
                            hasConflicted[k][j] = true
                            continue;
                          }
                        }
                      }
                    }

                    setTimeout("updateBoardView()",200);
                    return true;
                  }



                  function isgameover(){
                      if(nospace(board) && nomove(board)){
                        gameover()
                        return "Game Over"
                      }
                    return false
                    }
                  
                  

                    function gameover(){
                        alert("Game Over")
                      }

