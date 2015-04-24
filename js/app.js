//set variables
var msg            = document.querySelector('#js-message'),
    charTotal      = document.querySelector('#js-message-left-total'),
    charLeft       = document.querySelector('#js-message-left-symbols'),
    charLimit      = 10;

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

//disable typing
var disableCharts = function(event){
    var charCount = msg.value.length;
    var enableChars = [8, 16, 35, 36, 37, 38, 39, 40, 46];
    for(i = 0; i< enableChars.length; i++){
        if(event.keyCode == enableChars[i]){
            var isAvailable = true;
            break;
        }
    }

    if(charCount >= charLimit && !isAvailable){
        event.preventDefault();
    }
}

msg.addEventListener("keydown", disableCharts);
msg.addEventListener("keyup", calculateCharts);
calculateCharts();