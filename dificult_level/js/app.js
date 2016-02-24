var SeaBattle = {

    ship: null,
    shipsMainBase: null,
    shipStation: null,

    fourDeckedShip: null,
    threeDeckedShip: null,
    twoDeckedShip: null,
    oneDeckedShip: null,


    init : function(){
        this.shipsMainBase = document.getElementById('shipsBase');
        this.shipsMainBase.style.width = "500px";

        /**
         * Creating ships Objects
         *
         * @type {SeaBattle.createShipConstruct}
         */
        this.fourDeckedShip = new this.createShipConstruct(4, 1);
        this.threeDeckedShip = new this.createShipConstruct(3, 2);
        this.twoDeckedShip = new this.createShipConstruct(2, 3);
        this.oneDeckedShip = new this.createShipConstruct(1, 4);

        this.fourDeckedShip.appendShip();
        this.threeDeckedShip.appendShip();
        this.twoDeckedShip.appendShip();
        this.oneDeckedShip.appendShip();

        this.events();
    },

    events : function(){
        (this.shipsMainBase).addEventListener("mousedown", this.pickUpTheShip.bind(this), false);
    },

    /**
     * Creating ships into wrappers via function constructor
     *
     * @param shipSize
     * @param qty
     */
    createShipConstruct : function(shipSize, qty){
        this.deckSize = 30;
        this.qty = qty;

        //styles for ship station
        this.shipStation = document.createElement('div');
        this.shipStation.className = "shipStation";
        this.shipStation.style.width = this.deckSize * shipSize + "px";
        this.shipStation.style.height = this.deckSize + "px";
        this.shipStation.style.display = "inline-block";
        this.shipStation.style.margin = "10px";
        this.shipStation.style.border = "1px dotted green";
        this.shipStation.style.position = "relative";

        //styles for ship
        this.ship = document.createElement('span');
        this.ship.className = "ship";
        this.ship.style.width = this.deckSize * shipSize + "px";
        this.ship.style.height = this.deckSize + "px";
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
     * Picking up the ship
     *
     * @param e
     */
    pickUpTheShip : function(e){
        this.ship = e.target;
        if(this.ship.className == "ship"){
            console.log(this.ship);
        }
    }
};

SeaBattle.init();