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

    events : function() {
        this.textArea.addEventListener("keydown", this.disableCharts.bind(this));
        this.textArea.addEventListener("keyup", this.calculateCharts.bind(this));
        this.calculateCharts();
    },

    calculateCharts: function(e) {
        var charCount = this.textArea.value.length;
        if(charCount  > this.maxChar){
            e.preventDefault();
        }
        this.textAreaTotal.innerHTML = charCount;
        this.textAreaLeft.innerHTML  = this.maxChar - charCount;
    },

    disableCharts: function(event) {
        var charCount = this.textArea.value.length;
        var enableChars = [8, 16, 35, 36, 37, 38, 39, 40, 46];
        for(i = 0; i< enableChars.length; i++){
            if(event.keyCode == enableChars[i]){
                var isAvailable = true;
                break;
            }
        }

        if(charCount >= this.maxChar && !isAvailable){
            event.preventDefault();
        }
    },
};

TextCounter.init();
