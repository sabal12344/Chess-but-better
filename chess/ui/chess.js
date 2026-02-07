import {startBoard} from "../data/chessdata.js";
import * as piss from "../data/pieces.js";
import {files} from "../data/chessdata.js";
import { knightking, rooknbishop } from "../data/movelogic.js";

let kinghealth1 = 1;
let kinghealth2 = 1;
let turn = "white";

const board = startBoard();
const boardelement = document.getElementById("board");
export const flatform = board.flat();


starty();

function starty(){

    turn = "white";
    kinghealth1 = 1;
    kinghealth2 = 1;
board.forEach(rank =>{
    rank.forEach(square =>{
                if(square.id[1]=='7'){
            square.piece = piss.blackpawn(square.id);


        }
        else if(square.id[1]=='2'){
            square.piece = piss.whitepawn(square.id);
        }

        else if(square.id[1]=='8')
{
    switch(square.id[0]){
        case 'a':
            case 'h':
            {
                square.piece = piss.blackrook(square.id);
                break;

            }

            case 'b' :
                case 'g' :
                    {
                        square.piece = piss.blackknight(square.id);
                        break;
                    }

                    case 'c' :
                case 'f' :
                    {
                        square.piece = piss.blackbishop(square.id);
                        break;
                    }

                    case 'e' :
                    {
                        square.piece = piss.blackking(square.id);
                        break;
                    }

                    case 'd' :
                    {
                        square.piece = piss.blackqueen(square.id);
                        break;
                    }
    }
} 

        else if(square.id[1]=='1')
{
    switch(square.id[0]){
        case 'a':
            case 'h':
            {
                square.piece = piss.whiterook(square.id);
                break;

            }

            case 'b' :
                case 'g' :
                    {
                        square.piece = piss.whiteknight(square.id);
                        break;
                    }

                    case 'c' :
                case 'f' :
                    {
                        square.piece = piss.whitebishop(square.id);
                        break;
                    }

                    case 'e' :
                    {
                        square.piece = piss.whiteking(square.id);
                        break;
                    }

                    case 'd' :
                    {
                        square.piece = piss.whitequeen(square.id);
                        break;
                    }


    }
}


        const div = document.createElement("div");
        div.classList.add("squares",square.color);
        if(square.piece != null){
            const img = document.createElement("img");
            img.src = square.piece.image;
            img.classList.add("images");
            div.appendChild(img);


        }


        div.id = square.id;

        boardelement.appendChild(div);

    } )
})}



const startbutton = document.getElementById("start-game");
const resignbutton = document.getElementById("resign");

function turnrender(){
    const whiteclock = document.getElementById("white-clock");
    const blackclock = document.getElementById("black-clock");

    if(turn=="white"){
    whiteclock.textContent = "White's turn";
    blackclock.textContent = "";

}

else{
    whiteclock.textContent = "";
    blackclock.textContent = "Black's turn";
    
}
}


function lifeupdate(){
    const lifelementW = document.getElementById("white-lifescore");
    const lifelementB = document.getElementById("black-lifescore");
    lifelementW.textContent = "White : "+kinghealth1;
    lifelementB.textContent = "Black : "+kinghealth2;

}


startbutton.addEventListener("click",function(){
    startclicked();

    startbutton.style.display = "none";
    resignbutton.style.display = "flex";
    lifeupdate();
    

    resignbutton.addEventListener("click",function(){
        nextturn();
        alert(turn + " won the game by resignation");
        location.reload();
    })


}
)

function whitePawnClicked(square){

    const legalSquares = [];
    const id= square.id;
    const rank = parseInt(id[1]);
    const file = id[0];
    let twostep = null;
     if(rank==2) twostep = flatform.find((el)=>el.id == file+(rank+2));
    const onestep = flatform.find((el)=>el.id == file+(rank+1));

    
    let diagonalL = null;
    let diagonalR = null;
    if(file!='h'){
        let rightfile;
        files.forEach((member,index) =>{
            if(member == file){
                rightfile = files[index+1];

            }

        })
        diagonalR = flatform.find((el)=>el.id == rightfile+(rank+1));
        

    }
    if(file!='a'){
        let leftfile;
        files.forEach((member,index) =>{
            if(member == file){
                leftfile = files[index-1];

            }

        })
        diagonalL = flatform.find((el)=>el.id == leftfile+(rank+1));
        

    }
    if(diagonalR && diagonalR.piece && diagonalR.piece.color == "black"){
        legalSquares.push(diagonalR);

    }
    if(diagonalL && diagonalL.piece && diagonalL.piece.color == "black"){
        legalSquares.push(diagonalL);
    }

   
    if(!onestep.piece){
        legalSquares.push(onestep);
        if(twostep && !twostep.piece){
            legalSquares.push(twostep);

        }

    }
        return legalSquares;

}

function blackPawnClicked(square){
     const legalSquares = [];
    const id= square.id;
    
    const rank = parseInt(id[1]);
    const file = id[0];
    let twostep = null;
    if(rank == 7) twostep = flatform.find((el)=>el.id == file+(rank-2));
    const onestep = flatform.find((el)=>el.id == file+(rank-1));

    
    let diagonalL = null;
    let diagonalR = null;
    if(file!='a'){
        let rightfile;
        files.forEach((member,index) =>{
            if(member == file){
                rightfile = files[index-1];

            }

        })
        diagonalR = flatform.find((el)=>el.id == rightfile+(rank-1));
        

    }
    if(file!='h'){
        let leftfile;
        files.forEach((member,index) =>{
            if(member == file){
                leftfile = files[index+1];

            }

        })
        diagonalL = flatform.find((el)=>el.id == leftfile+(rank-1));
        

    }
    if(diagonalR && diagonalR.piece && diagonalR.piece.color == "white"){
        legalSquares.push(diagonalR);

    }
    if(diagonalL && diagonalL.piece && diagonalL.piece.color == "white"){
        legalSquares.push(diagonalL);
    }

   
    if(!onestep.piece){
        legalSquares.push(onestep);
        if(twostep && !twostep.piece){
            legalSquares.push(twostep);

        }

    }
        return legalSquares;


}



function rookClicked(square,oppcolor){
    const moves = [[1,0],[-1,0],[0,1],[0,-1]];
        return  rooknbishop(square,oppcolor,moves);     
      
}

function knightClicked(square,oppcolor){

  

    const moves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
    return knightking(square,oppcolor,moves);
   
    
   
}


function bishopClicked(square, oppcolor){
    
    const moves = [[1,1],[1,-1],[-1,1],[-1,-1]];
    return rooknbishop(square,oppcolor, moves);  
    
   
}

function kingClicked(square,oppcolor){
    const moves = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]];
    return knightking(square,oppcolor,moves);
    
    
}

function queenClicked(square,oppcolor){
    const moves = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]];
    return rooknbishop(square,oppcolor,moves);    
    
}

let highlighted = [];
function clearhighlight(){
    highlighted.forEach(hl =>{
        hl.style.border = "";
    })
    highlighted = [];
}

let click1 = null;

let leg = [];

function highlight(){
leg.forEach(sq =>{
                    const targett = document.getElementById(sq.id);
                    targett.style.border = "2px solid black";
                    highlighted.push(targett);
                })
            }


function movelist(square){
switch(square.piece.name){
            case "BlackPawn" :{
                return blackPawnClicked(square);              
                }

            case "WhitePawn" :{
                
                return whitePawnClicked(square);
                
               
            }

             case "BlackBishop" :{
                return bishopClicked(square, "white");
                
            }

             case "WhiteBishop" :{
                return bishopClicked(square, "black");
                
            }

             case "BlackRook" :{
                return rookClicked(square, "white");
                
            }

             case "WhiteRook" :{
                return rookClicked(square, "black");
                
            }

             case "BlackKnight" :{
                return knightClicked(square, "white");
               
            }
             case "WhiteKnight" :{
                return knightClicked(square, "black");
                
            }

             case "BlackKing" :{
                return kingClicked(square, "white");
                
            }

             case "WhiteKing" :{
                return kingClicked(square, "black");
            }

             case "BlackQueen" :{
                return queenClicked(square, "white");

            }

             case "WhiteQueen" :{
                return queenClicked(square, "black");
            }
                    

        }
    }
    function nextturn(){

        
        if(turn=="white")
            turn = "black";

        else
            turn = "white";
    }

    function healthincre(turn){
         if(turn == "white"){
            kinghealth1++;
            return kinghealth1;
        }
        
            kinghealth2++;
            return kinghealth2;

    }

    function healthdecre(turn){
        if(turn == "white"){
            kinghealth1--;
            return kinghealth1;
        }
        
            kinghealth2--;
            return kinghealth2;
        

    }
    function peekHealth(turn){
        if(turn=="white")
            return kinghealth1;

        return kinghealth2;
    }




    function piecemove(source, destination){
        let gameend = false;
        let healthAttack = false;
        if(destination.piece && (destination.piece.name == "BlackKing"||destination.piece.name=="WhiteKing")){
            nextturn();
           

            if(healthdecre(turn)==0)            
            gameend = true;

            else{
                healthAttack= true;
            }
            lifeupdate();

        }
        let ispromotion = false;
        if((source.piece.name == "WhitePawn" && destination.id[1]=="8")||(source.piece.name =="BlackPawn" &&destination.id[1]=="1")){
           ispromotion = true;

        }
        let tempd = destination.piece;
        destination.piece = source.piece;
        source.piece = null;
        const srcElement = document.getElementById(source.id);
        const destelement = document.getElementById(destination.id);
        srcElement.innerHTML = "";
        destelement.innerHTML = "";

         if(gameend){
            nextturn();
            alert(turn + " won the game");
            location.reload();
            return;
        }

        if(healthAttack){
            
            alert("Bingoo!! now your opponent's health decreased to " + peekHealth(turn) );
           destination.piece = tempd;

            const newpiece = document.createElement("img");
        newpiece.src = destination.piece.image;
        destelement.appendChild(newpiece);
        turnrender();
        return;

        }

        if(ispromotion){
            
            alert("Pawn made it to the end!!, Now,,"+turn+" 's king health is updraded to level "+ healthincre(turn) + " !!!");
            lifeupdate();
            nextturn();
            turnrender();
            return;
        }

        const newpiece = document.createElement("img");
        newpiece.src = destination.piece.image;
        destelement.appendChild(newpiece);

       
     
     nextturn();
     turnrender();

    }



function afterclicked(square){
    if(!click1 && !square.piece){
        clearhighlight();
        return;
    }
    if(!click1){
        if(square.piece.color != turn) return;
        click1 = square;
        leg = movelist(square);
        highlight();
        return;
    }
    if(square == click1){
        clearhighlight();
        click1 = null;
        leg = [];
        return;
    } 
    if(leg.includes(square)){
        piecemove(click1,square);
        clearhighlight();
        click1 = null;
        leg = [];
        return;

    }
    if(square.piece && square.piece.color == turn){
        clearhighlight();
        click1 = square;
        leg = movelist(square);
        highlight();

        return;
    }
  

}


function startclicked(){
boardelement.addEventListener("click", function(event){
    
        //clearhighlight();
        let clickedID;
       
        if(event.target.localName=="img")
        clickedID = event.target.parentNode.id;

        else
        clickedID = event.target.id;

        console.log(clickedID);
        
        
        const square = flatform.find((el)=>el.id == clickedID);

        afterclicked(square);     
                         
   
 

})
}

