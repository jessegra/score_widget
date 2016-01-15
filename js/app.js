console.log("JS connected!");

function ScoreWidget(session_stamp)  {
    this.scoreList = [];
    this.sessionStamp = session_stamp;
    this.scoresHolder = document.getElementById('scores_list-'+ session_stamp);
    this.scorePercentText = document.getElementById('score_percent-' + session_stamp);
    this.scoreRatioText = document.getElementById('score_ratio-' + session_stamp);
    this.ratioDenomText = document.getElementById('ratio_denom-' + session_stamp);
    this.btnPlusScore = document.getElementById('plus_button-' + session_stamp);
    this.btnZeroScore = document.getElementById ('zero_button-' + session_stamp);
    this.btnBsScore = document.getElementById ('bs_button-' + session_stamp);
    this.btnSaveScore = document.getElementById ('save_button-' + session_stamp);
    this.objSessionNotes = document.getElementById ('objective_session_notes-' + session_stamp);
    console.log("Object created for session stamp: " + session_stamp);
}

//Instantiate widget
function instWidget(sessionStamp)    {
console.log("Inst called with session_id: "+ sessionStamp);
    var widget = new ScoreWidget (sessionStamp);
    
    //buttons
    widget.btnPlusScore.onclick = function ()  {
        console.log("Plus pressed");
        widget.addPlusScore();
    }

    widget.btnZeroScore.onclick = function ()  {
        console.log("zero pressed");
        widget.addZeroScore();
    }

    widget.btnBsScore.onclick = function ()  {
        console.log("BS pressed");
        widget.removeLastScore();
    }

    widget.btnSaveScore.onclick = function ()  {
        console.log("Save pressed");
        widget.storeScore();
    }
}

//called to add a +1 score to scoreList array
ScoreWidget.prototype.addPlusScore = function()	{
    if (this.scoreList.length < 99) {
        this.scoreList.push(1);
        console.log(this.sessionStamp);
        console.log("Add +1");
        this.displayScore(1);
        this.displayScorePercent();
        this.displayScoreRatio();
    }
}

//called to add a 0 score to scoreList array
ScoreWidget.prototype.addZeroScore = function()	{
    if(this.scoreList.length < 99)    {    
        this.scoreList.push(0);
        console.log("Add 0");
        this.displayScore(0);
        this.displayScorePercent();
        this.displayScoreRatio();
    }
}

//called to add score to ul holder
ScoreWidget.prototype.displayScore = function( score )	{
	console.log("display function called for: " + score);
    //console.log(this.scoresHolder);
	var elem = document.createElement("li");
	elem.value[0];
	//code color of score as green for 1 and red for 0
	if(score === 1){
		elem.className = "green";
	} else {
		elem.className = "black";		
	}	
	elem.innerHTML = score;
	this.scoresHolder.appendChild(elem);
	if (this.scoreList.length > 10 ) {
		console.log("Remove first li score from display");
		var parent = this.scoresHolder;
		var firstScore = this.scoresHolder.firstChild;
		//Remove the last child ul score
		parent.removeChild(firstScore);
		}
    }

//called to remove the last score in the array and from the display ul
ScoreWidget.prototype.removeLastScore = function()	{
	//Conditional to check for values to remove and or add
	if(this.scoreList.length >= 1)	{
		this.scoreList.pop();
		console.log("Remove last");
		var parent = this.scoresHolder;
		var lastScore = this.scoresHolder.lastChild;
		//Remove the last child ul score
		parent.removeChild(lastScore);
	}
    
    //Add back first score to display ul if over 10 places
	if (this.scoreList.length > 9) {
		console.log("Add back preScore called");
		var preScorePosition = this.scoreList.length - 10; // Location of bit to grab from scoreList array
		var preScore = this.scoreList[preScorePosition]; //preScore is score to be added back as first li
		console.log("Added back: "+ preScore);
		var elem = document.createElement('li'); //element to add
		elem.innerHTML=preScore //Set HTML of li to preScore value
		if(preScore === 1){
			elem.className = "green";
		} else {
			elem.className = "black";		
		}
		this.scoresHolder.insertBefore(elem, this.scoresHolder.childNodes[0]);				
	}
	this.displayScorePercent();
	this.displayScoreRatio();
}

//Called to figure and display percentage in widget
ScoreWidget.prototype.displayScorePercent = function ()	{
	console.log("Percent called");
	var scorePercent;
	//Check for empty score
	if(this.scoreList.length > 0) {	
	//count scores of 1
	var count = 0;
	for(var i = 0; i < this.scoreList.length; ++i){
		if(this.scoreList[i] == 1)
			count++;
		}
	//Calculate percent value of score array conents
	scorePercent = Math.floor((count / this.scoreList.length) * 100);
	} else {
        scorePercent = "";
    }
	//replace existing <p> tag with calculated percent value with score percentage
	this.scorePercentText.innerHTML=scorePercent+"%";
}

//Called to display ratio in widget
ScoreWidget.prototype.displayScoreRatio = function ()	{
	console.log("Ratio called");
	var scoreRatio = "-";
	//Check for empty ratio
	if(this.scoreList.length > 0) {	
	//count scores of 1
	var count = 0;
	for(var i = 0; i < this.scoreList.length; ++i){
		if(this.scoreList[i] == 1)
			count++;
			scoreRatio = count; // set numerator to count of 1 scores
		}
	   ratioDenom = "/"+ this.scoreList.length; // set denominator if > 0
	} else {
		ratioDenom = "/-"; // set denom if !> 0
	}	 
	//replace existing <p> tag with calculated percent value with score ratio
	this.scoreRatioText.innerHTML=scoreRatio;
	this.ratioDenomText.innerHTML=ratioDenom;
}

//Check for initial save or update, call AJAX to post values for DB
ScoreWidget.prototype.storeScore = function (){
    console.log("storeScore called");    
    var numResponses = this.scoreList.length;
    var correctResponses = parseInt(this.scoreRatioText.innerHTML);
    var sendSessionStamp = this.sessionStamp;
    var sessionNotes = this.objSessionNotes.value;
    console.log(sessionNotes);
    if (this.btnSaveScore.innerHTML == "Update") {
        var isUpdate = "Y";
        console.log("isUpdate is found to be  Y");
    } else {
        var isUpdate = "N";
        console.log("isUpdate is N");
    }
    console.log("session stamp set to: " + this.sessionStamp);

//start AJAX
var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4){
				console.log('values sending completed');
                console.log(xhr.responseText);
			}
		};
        //Check for empty values
    if (numResponses > 0 && numResponses < 100) {
        //Upate HTML table for this example only
        document.getElementById('total').value = numResponses;
        document.getElementById('correct').value = correctResponses;
        document.getElementById('notes').innerHTML = sessionNotes;
        xhr.open('POST', 'store_score.php');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        this.btnSaveScore.innerHTML = "Update";
        xhr.send('number_of_responses=' + encodeURIComponent(numResponses) + "&" + 'correct_responses=' + encodeURIComponent(correctResponses) + "&" + 'obj_session_stamp=' + encodeURIComponent(sendSessionStamp) + "&" + 'obj_session_notes=' + encodeURIComponent(sessionNotes) + "&" + 'isUpdate=' + encodeURIComponent(isUpdate));
        console.log("values sent");
        console.log(sendSessionStamp);
    } else {
        console.log("no values to send");
    }
}