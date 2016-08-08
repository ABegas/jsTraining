var SeaBattle = {
	cellSize : 30,
    ship: null,
    shipsMainBase: null,
    shipStation: null,
    tableRow: null,
    tableCol: null,

    fourDeckedShip: null,
    threeDeckedShip: null,
    twoDeckedShip: null,
    oneDeckedShip: null,
    alphabetArray : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],


    init : function(){
        this.shipsMainBase = document.getElementById('shipsBase');
        this.battlefield = document.getElementById('battleField');
        this.shipsMainBase.style.paddingRight = "100px";
        this.shipsMainBase.style.float = "left";
        this.battlefield.style.float = "left";
        
        /**
         * Creating ships Objects
         *
         * @type {SeaBattle.createShipConstruct}
         */
        this.fourDeckedShip = new this.createShipConstruct(4, 1, this.cellSize);
        this.threeDeckedShip = new this.createShipConstruct(3, 2, this.cellSize);
        this.twoDeckedShip = new this.createShipConstruct(2, 3, this.cellSize);
        this.oneDeckedShip = new this.createShipConstruct(1, 4, this.cellSize);

        this.fourDeckedShip.appendShip();
        this.threeDeckedShip.appendShip();
        this.twoDeckedShip.appendShip();
        this.oneDeckedShip.appendShip();

        this.createBattlefield();

        this.events();
    },

    events : function(){
        (document).addEventListener("mousedown", this.dragAndDropTheShip.bind(this), false);
    },

    /**
     * Creating ships into wrappers via function constructor
     *
     * @param shipSize
     * @param qty
     * @param cellSize
     */
    createShipConstruct : function(shipSize, qty, cellSize){
        this.qty = qty;

        //styles for ship station
        this.shipStation = document.createElement('div');
        this.shipStation.className = "shipStation";
        this.shipStation.style.width = cellSize * shipSize + shipSize + "px";
        this.shipStation.style.height = cellSize + "px";
        this.shipStation.style.display = "inline-block";
        this.shipStation.style.margin = "10px";
        this.shipStation.style.border = "1px dotted green";
        this.shipStation.style.position = "relative";

        //styles for ship
        this.ship = document.createElement('span');
        this.ship.className = "ship";
        this.ship.style.width = cellSize * shipSize + shipSize + "px";
        this.ship.style.height = cellSize + "px";
        this.ship.style.background = "rgba(0,165,0,0.2)";
        this.ship.style.border = "2px solid green";
        this.ship.style.position = "absolute";
        this.ship.style.top = "-2px";
        this.ship.style.left = "-2px";
        this.ship.style.cursor = "pointer";

        //Creating ship wrapper for separate type of ships
        this.shipsWrap = document.createElement('div');
        this.shipsWrap.className = "ships-wrap";

        //Appending ships to ship stations and ship stations to ship wrappers
        this.appendShip = function(){
            SeaBattle.shipsMainBase.appendChild(this.shipsWrap);
            for (var i = 0; i < this.qty; i++) {
                this.shipsWrap.appendChild(this.shipStation.cloneNode(true)).appendChild(this.ship.cloneNode(true));
            }
        }
    },

    /**
     * Table creating
     *
     */
    createBattlefield : function(){

    	//Table creating
    	this.battlefieldTable = document.createElement('table');
    	this.battlefieldTable.style.borderCollapse = "collapse";
    	this.battlefieldTable.style.userSelect = "none";
    	
    	for (var i = 0; i <= 10; i++) {
    		this.tableRow = document.createElement('tr');
    		for (var g = 0; g <= 10; g++) {
    			this.tableCol = document.createElement('td');
    			this.tableRow.appendChild(this.tableCol);
    			this.tableCol.style.border = "2px solid #666";
    			this.tableCol.style.padding = "0";
    			this.tableCol.width = this.cellSize + "px";
    			this.tableCol.height = this.cellSize + "px";

    		}
    		this.battlefieldTable.appendChild(this.tableRow);
    	}

    	//Alphabetic row creating
    	var firstRow = this.battlefieldTable.firstElementChild;

       	for (j = 1; j <= 10; j++) {
    		firstRow.childNodes[j].innerHTML = this.alphabetArray[j - 1];
    		firstRow.childNodes[j].style.borderTop = "none";
    		firstRow.childNodes[j].style.textAlign = "center";
    		firstRow.firstElementChild.style.borderTop = "none";
    		firstRow.firstElementChild.style.borderLeft = "none";
    		firstRow.lastElementChild.style.borderRight = "none";

    		this.battlefieldTable.childNodes[j].firstElementChild.innerHTML = [j];
    		this.battlefieldTable.childNodes[j].firstElementChild.style.borderLeft = "none";
    		this.battlefieldTable.childNodes[j].firstElementChild.style.textAlign = "center";
    		this.battlefieldTable.childNodes[j].firstElementChild.style.borderBottom = "none";
    	}

    	this.battlefield.appendChild(this.battlefieldTable);
    },

    
   /**
     * Creating ships into wrappers via function constructor
     *
     * @param e
     *
     * @methos SeaBattle.moveTheShip(e)
     * @methos SeaBattle.moveTheShip(e)
     * 
     */
    dragAndDropTheShip : function(e){
        this.ship = e.target;
        if(this.ship.className == "ship"){
            this.shipStation = this.ship.parentNode;
            this.ship.style.position = "absolute";
            SeaBattle.moveTheShip(e);
            document.body.appendChild(this.ship);
            document.onmousemove = this.moveTheShip.bind(this);
            this.ship.onmouseup = this.backTheShip.bind(this);
        }
    },

    /**
     * Drag ships
     *
     */
    moveTheShip: function(e) {
        this.ship.style.left = e.pageX - this.ship.offsetWidth / 2 + 'px';
        this.ship.style.top = e.pageY - this.ship.offsetHeight / 2 + 'px';
    },

    /**
     * Back ship to base position
     *
     */
    backTheShip: function() {
        document.onmousemove = null;
        this.ship.onmouseup = null;
        this.shipStation.appendChild(this.ship);
        this.ship.style.top = "-2px";
        this.ship.style.left = "-2px";
        //console.log(this.ship.parentNode);
    }
};

SeaBattle.init();