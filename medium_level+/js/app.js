var tableEditor = {

    //Table
    dataTable : null,
    tableRow : null,
    tableRowCount : null,

    //Table Data
    rowIdBlock : null,
    rowNameBlock : null,
    rowNameValue : null,
    rowQtyBlcok : null,
    rowAvailabilityBlock : null,
    rowDeleteBlock: null,

    //Caption
    addDataFrom : null,
    showDataFormButton : null,
    addDataButton : null,
    clearDataButton : null,
    deleteRowButton : null,

    init: function(config){
        this.dataTable = document.getElementById('dataTable');
        this.addDataFrom = document.getElementById('addDataFrom');
        this.showDataFormButton = document.getElementById('showDataFormButton');
        this.clearDataButton = document.getElementById('clearTableButton');
        this.deleteRowButton = document.getElementById('deleteRowButton');

        this.addDataButton = document.getElementById('addDataButton');

        this.config = config;

        this.checkConfigData();
        
        
        this.events();
    },

    /**
     * EventListeners
     */
    events: function() {
        (this.showDataFormButton).addEventListener("click", this.showFormBlock.bind(this), false);
        
        (this.addDataButton).addEventListener("click", this.addDataRow.bind(this), false);
        (this.clearDataButton).addEventListener("click", this.clearData.bind(this), false);
        (this.deleteRowButton).addEventListener("click", this.deleteRow.bind(this), false);

    },

    /**
     * Check config values
     */
    checkConfigData: function() {
        
    },

    /**
     * Show block with Form
     */
    showFormBlock: function() {
        this.addDataFrom.classList.add('visible');
    },

    /**
     * Set row ID 
     */
    setRowId: function() {

        this.rowIdBlock = document.createElement('li');
        this.rowIdBlock.classList.add('table-id');
        this.rowIdBlock.innerHTML = this.dataTable.children.length++;
        this.tableRow.appendChild(this.rowIdBlock);
        
    },

    /**
     * Set row Name 
     */
    setRowName: function() {
        this.rowNameBlock = document.createElement('li');
        this.rowNameBlock.classList.add('table-name');

        this.rowNameValue = document.forms['itemForm']['name'].value;

        this.rowNameBlock.innerHTML = this.rowNameValue;

        this.tableRow.appendChild(this.rowNameBlock);
    },

    /**
     * Set row Qty 
     */
    setRowQty: function() {
        this.rowQtyBlock = document.createElement('li');
        this.rowQtyBlock.classList.add('table-qty');

        this.rowQtyBlock.innerHTML = document.forms['itemForm']['qty'].value;

        this.tableRow.appendChild(this.rowQtyBlock);
    },

    /**
     * Set row Availability 
     */
    setRowAvailability: function() {
        this.rowAvailabilityBlock = document.createElement('li');
        this.rowAvailabilityBlock.classList.add('table-availability');
        
        if(document.getElementById('fieldAvailability').checked){
            this.rowAvailabilityBlock.innerHTML = "yes" 
        }else {
            this.rowAvailabilityBlock.innerHTML = "no"
        }
        
        this.tableRow.appendChild(this.rowAvailabilityBlock);
    },

    /**
     * Add Delete option
     */
    setRowDelete: function() {
        this.rowDeleteBlock = document.createElement('li');
        this.rowDeleteBlock.classList.add('table-delete');
        
        this.rowDeleteBlock.innerHTML = "<input type='checkbox' class='delete-checkbox' />"    
        
        
        this.tableRow.appendChild(this.rowDeleteBlock);
    },

    /**
     * Add Data row
     */
    addDataRow: function(e) {
        e.preventDefault();
        
        this.tableRow = document.createElement('ul');
        this.dataTable.appendChild(this.tableRow);
        
        this.setRowId();
        this.setRowName();
        
        this.setRowQty();
        this.setRowAvailability();
        this.setRowDelete();

        // To add some animation via css3
        setTimeout(function(){
            tableEditor.tableRow.classList.add('data-row');
        }, 100);
        
    },

    /**
     * Delete selected rows
     */
    deleteRow: function() {
        var deleteCheckbox = this.dataTable.getElementsByClassName('delete-checkbox');
        var arr = this.dataTable.getElementsByClassName('data-row');
        var elemsArray = [];

        for (var i = 0; i < arr.length; i++) {
            if(!deleteCheckbox[i].checked){
                elemsArray.push(arr[i]);    
            }else {
                // To add some animation via ccs3
                arr[i].classList.add('deleting-row');
            }
        }
        
        // Set timeout for css animation
        setTimeout(function(){
            this.dataTable.innerHTML = "";

            elemsArray.forEach(function(item, j, elemsArray) {
                tableEditor.dataTable.appendChild(item);
            });
        }, 300);

        
    },

    /**
     * Remove all data
     */
    clearData: function() {
        // To add some animation via css3
        this.dataTable.classList.add('deleting-data-table');
    
        setTimeout(function(){
            this.dataTable.innerHTML = "";
            this.dataTable.classList.remove('deleting-data-table');
        }, 300);
    }
};

tableEditor.init();