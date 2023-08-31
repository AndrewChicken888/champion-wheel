//AndrewChicken's 20k follower special

//Variables containing data for the randomizer
var championRepository = ["Androxus", "Ash", "Atlas", "Azaan", "Barik", "Betty la Bomba", "Bomb King", "Buck", "Cassie", "Caspian", "Corvus", "Dredge", "Drogoz", "Evie", "Fernando", "Furia", "Grohk", "Grover", "Imani", "Inara", "Io", "Jenos", "Kasumi", "Khan", "Kinessa", "Koga", "Lex", "Lian", "Lillith", "Maeve", "Makoa", "Mal'Damba", "Moji", "Nyx", "Octavia", "Omen", "Pip", "Raum", "Rei", "Ruckus", "Saati", "Seris", "Sha Lin", "Skye", "Strix", "Talus", "Terminus", "Tiberius", "Torvald", "Tyra", "Vatu", "VII", "Viktor", "Vivian", "Vora", "Willo", "Yagorath", "Ying", "Zhin"];
var champions = [];
var championsAlphabetical = [];
var removeNumber;
var champNumber;
var champion;
var rand = 0;
var oldRand = -1;
var matchRepos = false;
var matchPool = false;
var timerClock = -1;
var timerChamp = 0;
var oldTimerChamp = -1;
var toggleCredits = false;

//Media Variables
var soundWindup = new Audio("Funnel.wav");
var soundSelect = new Audio("Score.wav");

//Animation clock
setInterval(animTimer, 100);

function animTimer() {
	if (timerClock > 0) {
		timerClock -= 100;
		timerChamp = Math.floor(Math.random()*champions.length);
		if (champions.length != 1) {
			while (timerChamp === oldTimerChamp) {
				timerChamp = Math.floor(Math.random()*champions.length);
			}
		}
		oldTimerChamp = timerChamp;
		document.getElementById("championImage").src = champions[timerChamp] + ".png";
	} else if (timerClock === 0) {
		document.getElementById("championImage").src = champions[rand] + ".png";
		timerClock = -1;
		soundWindup.pause();
		soundWindup.currentTime = 0;
		soundSelect.currentTime = 0;
		soundSelect.play();
		document.getElementById("randomize").style.backgroundColor = "#FF0000";
		document.getElementById("randomize").style.backgroundImage = "";
	}
}

//Run this on startup
function init() {
	//Test alert
	//alert("here!");
	
	//Event listeners for enter key
	//Champion input field
	document.getElementById("inputNewChampion").addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("buttonNewChampion").click();
		}
	});
	//Champion remove field
	document.getElementById("inputRemoveChampion").addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("buttonRemoveChampion").click();
		}
	});
}

//Add a champion to the randomizer pool.
function addChampion() {
	//Get the champion's name
	champion = document.getElementById("inputNewChampion").value;
	document.getElementById("inputNewChampion").value="";
	//Check the champion name against the repository to ensure it's valid.
	checkName(champion);
	//Complete the addition if it is valid, otherwise throw the proper error.
	if (matchRepos && !matchPool) {
		champions.push(championRepository[champNumber]);
		document.getElementById("inputError").innerHTML = "";
		document.getElementById("randomError").innerHTML = "";
		updateChamps();
	} else if (matchRepos && matchPool) {
		//If the champion is valid but is in the pool, then warn the user of a duplicate.
		document.getElementById("inputError").innerHTML = "Error. This champion is already in the pool.";		
	} else {
		document.getElementById("inputError").innerHTML = "Error. Not a valid champion name.";
	}
	
}

//Remove a champion from the randomizer pool. 
function subChampion() {
	//Check if the champions pool is populated. If not, continue the function.
	if (champions.length === 0) { 
		document.getElementById("removeError").innerHTML = "Error. There are no more champions in the randomizer pool.";
		return;
	} else {
		//Get the champion's name
		champion = document.getElementById("inputRemoveChampion").value;
		document.getElementById("inputRemoveChampion").value = "";
		//Check the champion name against the repository to ensure it's valid.
		checkName(champion);
		//Complete the removal if it is valid, otherwise throw the proper error.
		if (matchRepos && matchPool) {
			champions.splice(removeNumber, 1);
			document.getElementById("removeError").innerHTML = "";
			updateChamps();
		} else if (matchRepos && !matchPool) {
			//If the champion is valid but is not in the pool, then an incorrect champion was input.
			document.getElementById("removeError").innerHTML = "Error. This champion is not in the pool.";
		} else {
			//Otherwise, the input is an invalid name.
			document.getElementById("removeError").innerHTML = "Error. Not a valid champion name.";
		}
	}
}

//Check a name against the repository of names and 
function checkName(name) { //name is the champion name to be checked, remove is a boolean which marks if the champion is to be removed.
	matchRepos = false;
	matchPool = false;
	//Refresh error messages
	document.getElementById("inputError").innerHTML = "";
	document.getElementById("removeError").innerHTML = "";
	//Check the inputted name against every champion name in the repository. If it matches, end the search and set matchRepos to true.
	for (let i = championRepository.length-1; i >= 0; i--) {
		if (championRepository[i].toLowerCase() === name.toLowerCase()) {
			matchRepos = true;
			champNumber = i;
			i = -1;
		}
	}
	//Check the inputted name against every champion name in the current champion pool. If it matches, set removeNumber, end the search, and set matchPool to true.
	if (champions.length > 0 && matchRepos) {
		for (let j = champions.length-1; j >= 0; j--) {
			if (champions[j].toLowerCase() === name.toLowerCase()) {
				matchPool = true;
				removeNumber = j;
				j = -1;
			}
		}
	}
}

//Update the champions list that's displayed on screen
function updateChamps() {
	var str;
	/* Text based system
	if (champions.length > 0) {
		str = "<p>Current champions in the pool: ";
		championsAlphabetical = champions.sort().reverse();
		if (championsAlphabetical.length === 1) {
			str = "<p>Current champion in the pool: " + championsAlphabetical[0] + ".";
		} else if (championsAlphabetical.length === 2) {
			str += championsAlphabetical[1] + " and " + championsAlphabetical[0] + ".";
		} else {
			for (let x = championsAlphabetical.length-1; x >= 0; x--) {
				if (x === 0) {
					str += "and " + championsAlphabetical[x] + ".";
				} else {
					str += championsAlphabetical[x] + ", ";
				}
			}
		}
		str += "</p>";
	} else {
		str = "<p class=\"error\">There are no champions in the pool.</p>";
	}
	document.getElementById("champsList").innerHTML = str;*/
	
	//Image based system
	if (champions.length > 0) {
		str = "<p>Current champions in the pool (" + champions.length + "):</p>";
		championsAlphabetical = champions.sort().reverse();
		for (let x = championsAlphabetical.length-1; x >= 0; x--) {
			str += "<img class=\"pool\" src=\"" + championsAlphabetical[x] + ".png\"/>";
		}
	} else {
		str = "<p class=\"error\">There are no champions in the pool.</p>";
	}
	document.getElementById("champsList").innerHTML = str;
}

//Randomize function
function randomize() {
	//If there are champions in the pool, randomize.
	if (champions.length > 0) {
		document.getElementById("randomError").innerHTML = "";
		//Randomize once, then if the champion is the same as the previously selected champion, keep randomizing until that's not the case.
		rand = Math.floor(Math.random()*champions.length);
		if (champions.length != 1) {
			while (rand === oldRand) {
				rand = Math.floor(Math.random()*champions.length);
			}
		}
		oldRand = rand;
		timerClock = 3200;
		soundWindup.load();
		soundWindup.play();
		document.getElementById("randomize").style.backgroundImage = "url('Rainbow Gradient.gif')";
	} else {
		document.getElementById("randomError").innerHTML = "Error. No champions in the pool.";
	}
}

//Toggle credits
function credits() {
	//If credits are on, turn them off and revert to the main menu. Restore the event listeners for the input fields. Otherwise, show credits.
	if (toggleCredits) {
		toggleCredits = false;
		document.getElementById("main").innerHTML = '<p>This randomizer lets you choose among a specific pool of champions you select! This randomizer is updated to include Omen.</p><br><button id="randomize" onclick="randomize()" type="button"><img id="championImage" src="DefaultChamp.png"/></button><p id="randomError" class="error"></p><br><p>Input a new champion: <input id="inputNewChampion" placeholder="Add a champion" autofocus></input> <button id="buttonNewChampion" onclick="addChampion()" type="submit" value="Submit">Submit</button></p> <p id="inputError" class="error"></p> <p>Remove a champion: <input id="inputRemoveChampion" placeholder="Remove a champion"></input> <button id="buttonRemoveChampion" onclick="subChampion()" type="submit">Submit</button></p> <p id="removeError" class="error"></p><div id="champsList"><p>There are no champions in the pool.</p></div>';
		document.getElementById("inputNewChampion").addEventListener("keypress", function(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				document.getElementById("buttonNewChampion").click();
			}
		});
		//Champion remove field
		document.getElementById("inputRemoveChampion").addEventListener("keypress", function(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				document.getElementById("buttonRemoveChampion").click();
			}
		});
		updateChamps();
		document.getElementById("championImage").src = champions[rand] + ".png";
		document.getElementById("randomize").style.backgroundColor = "#FF0000";
	} else {
		toggleCredits = true;
		document.getElementById("main").innerHTML = '<p>Version 1.2.0 designed by AndrewChicken</p><p>Sound effects from \'Sonic Mania\' by Sega</p><p>Champions and champion images from \'Paladins, Champions of the Realm\' by Evil Mojo Studios</p><button type="button" id="goBack" onclick="credits()">Back</button>';
	}
}