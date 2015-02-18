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
var calculateCharts = function(){
    var charCount = msg.value.length;
	
	msg.setAttribute('maxlength', charLimit);
	
	if(charCount > charLimit){
		return false;
	}
	
	charTotal.innerHTML = charCount;
	charLeft.innerHTML  = charLimit - charCount
}

msg.addEventListener("keyup", calculateCharts);
