var squaresGenerator = {

    sqrCount: 16,
    sqrTag: "li",
    clicksCountGenerate: 10,
    clicksBackgroundChange: 5,
    sqrCollection: null,
    clicksCount: null,
    clickedTarget: null,
    sqrWrap: null,
    generateButton: null,
    showResultButton: null,
    resetButton: null,

    init: function(){
        this.sqrWrap = document.getElementById('squaresWrapper');
        this.generateButton = document.getElementById('generateButton');
        this.showResultButton = document.getElementById('showResultButton');
        this.resetButton = document.getElementById('resetButton');

        this.buildTable();
        this.addBreakClass();

        this.events();
    },

    events: function() {
        (this.sqrWrap).addEventListener("click", this.clickEvent.bind(this), false);
        (this.generateButton).addEventListener("click", this.generateClick.bind(this), false);
        (this.showResultButton).addEventListener("click", this.showResult.bind(this), false);
        (this.resetButton).addEventListener("click", this.resetResult.bind(this), false);
    },

    /**
     * Build necessary DOM structure
     */
    buildTable: function(){
        for (var i = 0; i < this.sqrCount; i++) {
            var sqrElem = document.createElement(this.sqrTag);
            sqrElem.className = "square";
            sqrElem.setAttribute('data-click-counts', '0');
            sqrElem.setAttribute('data-click-counts-color', '0');
            sqrElem.setAttribute('data-show-result', 'false');
            this.sqrWrap.appendChild(sqrElem);
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
                this.sqrCollection[j].className += " break";
            }
        }
    },

    /**
     * Get clicked target
     * @param e Event
     */
    clickEvent: function(e){
        this.clickedTarget = e.target;
        if(this.clickedTarget.tagName === this.sqrTag.toUpperCase()){
            this.clickCounter();
            this.setBackgroundNum();
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

        //rewrite clicks count into square block
        this.clickedTarget.innerHTML = this.clicksCount;
    },


    /**
     * Set value for background color (clicksForBackground)
     */
    setBackgroundNum: function(){
        // value 4 - is a count of click sessions(background colors). For more colors just set value of colors and add styles for data selectors into css
        if(this.clicksCount % this.clicksBackgroundChange == 0 && this.clicksCount < this.clicksBackgroundChange * 4){
            this.clickedTarget.setAttribute('data-click-counts-color', (this.clicksCount / this.clicksBackgroundChange).toString());
        }else if(this.clicksCount >= this.clicksBackgroundChange * 4){
            this.clickedTarget.setAttribute('data-click-counts-color', 'infinity');
        }
    },

    /**
     * Click generator
     */
    generateClick: function(){
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
        for (var i = 0; i < this.sqrCount; i++) {
            if(this.sqrCollection[i].getAttribute('data-show-result') == 'false'){
                this.sqrCollection[i].setAttribute('data-show-result', 'true');
            }else {
                this.sqrCollection[i].setAttribute('data-show-result', 'false');
            }
        }
    },

    /**
     * Set data to 0, remove clicks value from each block
     */
    resetResult: function(){
        for (var g = 0; g < this.sqrCount; g++) {
            this.sqrCollection[g].setAttribute('data-click-counts', '0');
            this.sqrCollection[g].setAttribute('data-click-counts-color', '0');
            this.sqrCollection[g].innerHTML = "";
        }
    }
};

squaresGenerator.init();