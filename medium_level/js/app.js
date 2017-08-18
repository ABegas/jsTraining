var squaresGenerator = {

    sqrCount: 36,
    sqrTag: "li",
    clicksCountGenerate: 5,
    errorMsgForShow: 'Error',
    sqrCollection: null,
    clicksCount: null,
    clickedTarget: null,
    sqrWrap: null,
    generateButton: null,
    showResultButton: null,
    resetButton: null,

    init: function(config){
        this.sqrWrap = document.getElementById('squaresWrapper');
        this.generateButton = document.getElementById('generateButton');
        this.showResultButton = document.getElementById('showResultButton');
        this.resetButton = document.getElementById('resetButton');
        this.config = config;

        this.checkConfigData();
        this.buildTable();
        this.addBreakClass();
        this.events();
    },

    /**
     * EventListeners
     */
    events: function() {
        (this.sqrWrap).addEventListener("click", this.clickEvent.bind(this), false);
        (this.generateButton).addEventListener("click", this.generateClick.bind(this), false);
        (this.generateButton).addEventListener("click", this.isGenerateClicked.bind(this), false);
        (this.showResultButton).addEventListener("click", this.showResult.bind(this), false);
        (this.resetButton).addEventListener("click", this.resetResult.bind(this), false);
    },

    /**
     * Check config values
     */
    checkConfigData: function(){
        this.clicksCountGenerate = this.config.clicksCountGenerate || this.clicksCountGenerate;
        this.sqrCount = this.config.sqrCount || this.sqrCount;
        this.sqrTag = this.config.sqrTag || this.sqrTag;
        this.errorMsgForShow = this.config.errorMsgForShow || this.errorMsgForShow;
    },

    /**
     * Check if Generate button was clicked
     */
    isGenerateClicked: function() {
        this.generateClicked = true || false;
    },

    /**
     * Build necessary DOM structure
     */
    buildTable: function(){
        var sqrElem = document.createElement(this.sqrTag);
            sqrElem.className = "square";
            sqrElem.setAttribute('data-click-counts', '0');
            sqrElem.setAttribute('data-background-num', '0');

        for (var i = 0; i < this.sqrCount; i++) {
            this.sqrWrap.appendChild(sqrElem.cloneNode());
        }
    },

    /**
     * Add additional class for square to make proportional table
     */
    addBreakClass: function(){
        this.sqrCollection = this.sqrWrap.getElementsByTagName(this.sqrTag);
        var countSqrsInLine = Math.ceil(Math.sqrt(this.sqrCount));
        for (var j = 1; j < this.sqrCount; j++) {
            if(j % countSqrsInLine == 0) {
                this.sqrCollection[j].style.clear = "left";
            }
        }
    },

    /**
     * Get clicked target
     * @param e Event
     */
    clickEvent: function(e){
        if(this.generateClicked){
            this.clickedTarget = e.target;
            if(this.clickedTarget.tagName === this.sqrTag.toUpperCase()){
                this.clickCounter();
                this.setBackgroundColor();
            }
        }else{
            alert(this.errorMsgForShow);
        }
    },

    /**
     * Overwrite clicks values
     */
    clickCounter: function() {
        //rewrite clicks count
        this.clicksCount = parseInt(this.clickedTarget.getAttribute('data-click-counts')) + 1;

        //rewrite clicks count into data-click-counts parameter
        this.clickedTarget.setAttribute('data-click-counts', this.clicksCount);
    },

    /**
     * Set style for background color from config
     */
    setBackgroundColor: function(){
        for (var key in this.config.backgroundColors) {
            if(this.clicksCount == key) {
                this.clickedTarget.setAttribute('data-background-num', this.config.backgroundColors[key]);

            }
        }
    },

    /**
     * Click generator
     */
    generateClick: function(){
        this.generateClicked = true;
        this.sqrCollection = this.sqrWrap.getElementsByTagName(this.sqrTag);
        for(var q = 1; q <= this.clicksCountGenerate; q++) {
            var randomNum = Math.floor((Math.random() * this.sqrCollection.length));
            this.sqrCollection[randomNum].click();
        }
    },

    /**
     * Show/hide results (bg color & clicks count)
     */
    showResult: function(){
        if(this.generateClicked){
            for (var j = 0; j < this.sqrCount; j++) {
                if (this.sqrCollection[j].getAttribute('data-click-counts') > 0){
                    this.sqrCollection[j].innerHTML = this.sqrCollection[j].getAttribute('data-click-counts');
                }
                this.sqrCollection[j].style.backgroundColor = this.sqrCollection[j].getAttribute('data-background-num');
            }

        }else {
            alert(this.errorMsgForShow);
        }
    },

    /**
     * Set data to 0, remove clicks value from each block
     */
    resetResult: function(){
        for (var g = 0; g < this.sqrCount; g++) {
            this.sqrCollection[g].setAttribute('data-click-counts', '0');
            this.sqrCollection[g].setAttribute('data-background-num', '0');
            this.sqrCollection[g].style.backgroundColor = "#fff";
            this.sqrCollection[g].innerHTML = "";
        }
        this.generateClicked = false;
    }
};

squaresGenerator.init({
    backgroundColors: {
        5 : '#FCF6A9',
        10 : '#FCCF05',
        15 : '#FC8505',
        20 : "#F50202"
    },
    sqrTag: "li",
    clicksCountGenerate: 10,
    sqrCount: 16,
    errorMsgForShow: 'Please, enter "Generate" button firstly'
});