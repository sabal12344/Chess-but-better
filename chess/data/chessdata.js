function square(color, id, piece ){
    return {color, id, piece};
}
export const files = ["a","b","c","d","e","f","g","h"];
function squareRow(rank){
    const Ranks = [];
    

    if(rank%2==0){
        files.forEach((element,index)=>
        {
            if(index%2==0){
                Ranks.push(square("light",element+rank,null));

            }
            else{
                Ranks.push(square("dark",element+rank,null));

            }
        })

    }

    else{
        files.forEach((element,index)=>
        {
            if(index%2==0){
                Ranks.push(square("dark",element+rank,null));

            }
            else{
                Ranks.push(square("light",element+rank,null));

            }
        })

    }
    return Ranks;


}

export function startBoard(){   

    const board = [];

    for(let i = 8; i>0;i--){
        board.push(squareRow(i));
        
    }
    return board;

}
