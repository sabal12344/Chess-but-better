const playbutton = document.getElementById("play");
const playsettings = document.getElementById("play-settings");
const startbutton = document.getElementById("start");

let hide = true;

    
playbutton.addEventListener("click",()=>{
    if(hide){
        hide = false;
        playbutton.textContent = "Nevermind";
        playsettings.style.display = "block";
        
    }

    else{
         playbutton.textContent = "Play";
        hide = true;
    playsettings.style.display = "none";
    }
    
});
 const rulesButton = document.getElementById("rules");
 const rules = document.getElementById("display-rules");
 const exitrules = document.getElementById("rules-exit");
 
    
    rules.style.display = "none";

 
 rulesButton.addEventListener("click", ()=>{
  rules.style.display = "block";
    

 })

 exitrules.addEventListener("click", ()=>{
    rules.style.display = "none";
 })

 export function gameState(){
    const color = document.getElementById("color");
    const time = document.getElementById("tc");
    const lives = document.getElementById("life");



   return {theme : color.value ,tc :time.value, lifespan : lives.value};
 }
 console.log (gameState());

 startbutton.addEventListener("click", ()=>{
   const settings = gameState();
   localStorage.setItem("settings", JSON.stringify(settings));
   
    window.location.href = "chess/ui/chess.html";
 })
