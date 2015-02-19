//set variables
var msg = document.querySelector('#js-message'),
    charTotal = document.querySelector('#js-message-left-total'),
    charLeft = document.querySelector('#js-message-left-symbols'),
    charLimit = 10;

//clear textarea
msg.value = "";

//set start limit value into html
charLeft.innerHTML = charLimit;

//calculate symbols
var calculateCharts = function(e){
    var charCount = msg.value.length;
    if(charCount  > charLimit){
        e.preventDefault();
    }
    charTotal.innerHTML = charCount;
    charLeft.innerHTML  = charLimit - charCount;
}

//disable texting
var disableCharts = function(event){
    var charCount = msg.value.length;
    var chartKeyCode = event.keyCode;
    if(charCount >= charLimit && (chartKeyCode != 8 && chartKeyCode != 46 && chartKeyCode != 37 && chartKeyCode != 39)){
        event.preventDefault();
    }
}

msg.addEventListener("keydown", disableCharts);
msg.addEventListener("keyup", calculateCharts);
