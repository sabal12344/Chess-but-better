import {startBoard} from "../data/chessdata.js";
import * as piss from "../data/pieces.js";
import {files} from "../data/chessdata.js";
import { knightking, rooknbishop } from "../data/movelogic.js";


const settings = JSON.parse(localStorage.getItem("settings"));
console.log(settings);

let turn = "white";
let kinghealth1 = parseInt(settings.lifespan);
let kinghealth2 = parseInt(settings.lifespan);


let timer = null;

function countdown(){
    let totaltime = settings.tc;
let timeleft = totaltime;


    document.getElementById("count").textContent = "00:"+timeleft;

    timer = setInterval(()=>{
        timeleft--;
        document.getElementById("count").textContent = Math.floor(timeleft/60)+":"+(timeleft%60);

        if(timeleft<=0){
            clearInterval(timer);
            alert (turn + " lost by time");
            window.location.reload();
        }

    },1000);
}

const board = startBoard();
const boardelement = document.getElementById("board");
export const flatform = board.flat();





function flipBoard() {
    boardelement.classList.toggle("flipped", turn == "black");
   
}


starty();

function starty(){

    turn = "white";
    
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
        div.classList.add("squares",square.color,settings.theme);
        console.log(div.classList);
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
   
    const tungtung = document.getElementById("black-clock");

    if(turn=="white"){
    tungtung.textContent = "White's turn";
    

}

else{
 
    tungtung.textContent = "Black's turn";
    
}
}


function lifeupdate(){
    const lifelementW = document.getElementById("white-lifescore");
    const lifelementB = document.getElementById("black-lifescore");
    lifelementW.textContent = "White : "+kinghealth1;
    
    console.log(kinghealth2 + ","+ kinghealth1);

    lifelementB.textContent = "Black : "+kinghealth2;

}


startbutton.addEventListener("click",function(){
    startclicked();
    turnrender();
    countdown();
    document.getElementById("heading").textContent = "The game has started!!";
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
    function healthpeek(turn){
        if(turn=="white")
            return kinghealth1;

        return kinghealth2;
    }

function gameend(turn){
    alert(turn + " won the game ");
    location.reload();

}



    function piecemove(source, destination){

    

        if(healthpeek(turn)==0)
            gameend(turn);


         const srcElement = document.getElementById(source.id);
        const destelement = document.getElementById(destination.id);
        let tempd = destination.piece;
        
        let healthAttack = false;

        let kingtakesking = false;

        

        if(destination.piece && (destination.piece.name.includes("King"))){

            if(source.piece.name.includes("King"))
            kingtakesking = true;
            nextturn();

           

            if(healthdecre(turn)==0){ 
                nextturn();          
            gameend(turn);
        }

            else{
                healthAttack= true;
            }
            lifeupdate();

        }
        let ispromotion = false;
        if((source.piece.name == "WhitePawn" && destination.id[1]=="8")||(source.piece.name =="BlackPawn" &&destination.id[1]=="1")){
           ispromotion = true;

        }

         if(kingtakesking){
            nextturn();
            
            alert(turn + "'s king took a life of its opponent's king and its life increased to "+healthincre(turn));
           
            let safesquare=null;
        

            
           
           for(let i = 0;i <64; i++){
                let redzone = false;
            if(!flatform[i].piece){
                flatform[i].piece = destination.piece;
                for(let area of movelist(flatform[i])){
                    if(area.piece && area.piece.color != flatform[i].piece.color){
                        redzone = true;
                        break;
                    }
                }
                if(!redzone){
                    safesquare = flatform[i];
                    destination.piece = null;
                    break;

                }
                else{
                    flatform[i].piece = null;
                    continue;
                }
            }
           }
           if(!safesquare){
            alert ("As there are no safesquares left," +turn+ " won the game!!");
            location.reload();
           }
           else{
            const pisspic = document.createElement("img");
            pisspic.src = safesquare.piece.image;

            document.getElementById(safesquare.id).appendChild(pisspic);
            document.getElementById(safesquare.id).style.background = "blue";
            document.getElementById(destination.id).innerHTML = "";
           }
           
            nextturn();
            turnrender();
            flipBoard();
            
            lifeupdate();
          clearInterval(timer);
            countdown();                      
                      
            return;
            
        }
        if(healthAttack){
            
            alert("woahh! now "+turn+" life has decreased to" + healthpeek(turn) );
           destination.piece = tempd;
            source.piece = null;

            destelement.innerHTML = "";

            const newpiece = document.createElement("img");
        newpiece.src = destination.piece.image;
        destelement.appendChild(newpiece);
        srcElement.innerHTML= "";
        lifeupdate();
        turnrender();
        flipBoard();
        clearInterval(timer);
   
        countdown();
        
        return;

        }

        
        destination.piece = source.piece;
        source.piece = null;
       
        

       
        srcElement.innerHTML = "";
        destelement.innerHTML = "";

         

        

        if(ispromotion){
            
            alert("Pawn made it to the end!!, Now,,"+turn+" 's king health is updraded to level "+ healthincre(turn) + " !!!");
            lifeupdate();
            nextturn();
            turnrender();
            flipBoard();
            clearInterval(timer);
            
            countdown();

           
            return;
        }

        const newpiece = document.createElement("img");
        newpiece.src = destination.piece.image;
        destelement.appendChild(newpiece);

       
     
     nextturn();
     lifeupdate();
     turnrender();
     flipBoard();
    clearInterval(timer);
     countdown();


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

       
        
        
        const square = flatform.find((el)=>el.id == clickedID);

        afterclicked(square);     
                         
   
 

})
}

