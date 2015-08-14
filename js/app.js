/**
 * TextCounter
 */
var TextCounter = {
    maxChar: 10,
    textArea: null,
    textAreaTotal: null,
    textAreaLeft: null,
    init: function() {
        this.textArea = document.querySelector('#js-message');
        this.textAreaTotal = document.querySelector('#js-message-left-total');
        this.textAreaLeft = document.querySelector('#js-message-left-symbols');

        this.events();
    },

    events: function() {},
    // ... put you methods here
};


//set variables
var textArea       = document.querySelector('#js-message'),
    textAreaTotal      = document.querySelector('#js-message-left-total'),
    textAreaLeft       = document.querySelector('#js-message-left-symbols'),
    charLimit      = 10;

//set start limit value into html
textAreaLeft.innerHTML = charLimit;

//calculate symbols
var calculateCharts = function(e){
    var charCount = textArea.value.length;
    if(charCount  > charLimit){
        e.preventDefault();
    }
    textAreaTotal.innerHTML = charCount;
    textAreaLeft.innerHTML  = charLimit - charCount;
}

//disable typing
var disableCharts = function(event){
    var charCount = textArea.value.length;
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

textArea.addEventListener("keydown", disableCharts);
textArea.addEventListener("keyup", calculateCharts);
calculateCharts();