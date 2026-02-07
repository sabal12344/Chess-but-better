
import {flatform} from "../ui/chess.js";
import {files} from "./chessdata.js";




export function rooknbishop(square, oppcolor, moves){    

    
    const legalSquares = [];

    const file = square.id[0];
        const rank = parseInt(square.id[1]);
        let fileindex;
        for(let i = 0;i<8;i++){
            if(files[i]==file){
              fileindex = i;
              break;
            }
        }
        let tempF = fileindex;
        let tempR = rank;

 moves.forEach(([r,f])=>{
        while(tempR<=8 && tempF<=7 && tempR>=1 && tempF>=0){
            if(tempR==rank && tempF==fileindex){
                tempF  += f;
                tempR += r;
                continue;
            }
            let nextsq = flatform.find((ele)=>ele.id == files[tempF]+tempR);
        if(nextsq.piece){
            if(nextsq.piece.color == oppcolor) legalSquares.push(nextsq);
            
            break;
        }
        legalSquares.push(nextsq);
        tempF+=f;
        tempR+=r;


        }
        tempF=fileindex;
        tempR = rank;


    }) 

    return legalSquares;
}

export function knightking(square, oppcolor, moves){
    const legalSquares = [];

    const file = square.id[0];
        const rank = parseInt(square.id[1]);
        let fileindex;
        for(let i = 0;i<8;i++){
            if(files[i]==file){
              fileindex = i;
              break;
            }
        }
        let tempF = fileindex;
        let tempR = rank;

        moves.forEach(([r,f])=>{
        let tempR = rank + r;
        let tempF = fileindex + f;


        if(tempR<=8 && tempR>=1 && tempF<=7 &&tempF>=0){
        const nextsq = flatform.find((sqr)=>sqr.id == files[tempF]+(tempR));
        if(!nextsq.piece || nextsq.piece.color == oppcolor){
            legalSquares.push(nextsq);

        }
    }

    })
    

    return legalSquares;
}