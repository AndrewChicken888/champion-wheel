//AndrewChicken's 20k follower special

//Variables containing data for the randomizer
var championRepository = ["Androxus", "Ash", "Atlas", "Azaan", "Barik", "Betty la Bomba", "Bomb King", "Buck", "Cassie", "Caspian", "Corvus", "Dredge", "Drogoz", "Evie", "Fernando", "Furia", "Grohk", "Grover", "Imani", "Inara", "Io", "Jenos", "Kasumi", "Khan", "Kinessa", "Koga", "Lex", "Lian", "Lillith", "Maeve", "Makoa", "Mal'Damba", "Moji", "Nyx", "Octavia", "Omen", "Pip", "Raum", "Rei", "Ruckus", "Saati", "Seris", "Sha Lin", "Skye", "Strix", "Talus", "Terminus", "Tiberius", "Torvald", "Tyra", "Vatu", "VII", "Viktor", "Vivian", "Vora", "Willo", "Yagorath", "Ying", "Zhin"];
var nicknameRepository = ["Andro", "Andrew", "AndrewChicken", "Betty", "BK", "Cass", "Corv", "Fern", "Kin", "Nessa", "Lilly", "Lilith", "Lily", "Koa", "Mal Damba", "Damba", "Mal", "MalDamba", "Sonej", "Sati", "Sha", "ShaLin", "Term", "Tib", "Tibby", "Torv", "Va'u", "Vik", "Viv", "Yag", "Yago"];
var nicknameLineup = ["Androxus", "Barik", "Barik", "Betty la Bomba", "Bomb King", "Cassie", "Corvus", "Fernando", "Kinessa", "Kinessa", "Lillith", "Lillith", "Lillith", "Makoa", "Mal'Damba", "Mal'Damba", "Mal'Damba", "Mal'Damba", "Omen", "Saati", "Sha Lin", "Sha Lin", "Terminus", "Tiberius", "Tiberius", "Torvald", "Vatu", "Viktor", "Vivian", "Yagorath", "Yagorath"];
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
var locked = false;
var elemTest = null;

//Media Variables
var soundWindup = new Audio("Funnel.wav");
var soundSelect = new Audio("Score.wav");

//Animation clock
setInterval(animTimer, 100);

function animTimer() {
	//Check if on the main screen by searching for the "randomize" element
	elemTest = document.getElementById("randomize");
	//If not on the main screen, do not play the animations - just run the clock and make sure that the sound stops properly. Otherwise, operate as normal.
	if (elemTest === null) {
		if (timerClock > 0) {
			timerClock -= 100;
		} else if (timerClock === 0) {
			timerClock = -1;
			locked = false;
			soundWindup.pause();
			soundWindup.currentTime = 0;
			soundSelect.currentTime = 0;
			soundSelect.play();
		}
	} else {
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
			locked = false;
			document.getElementById("buttonNewChampion").style.border = "2px solid #0D2533";
			document.getElementById("buttonRemoveChampion").style.border = "2px solid #0D2533";
			document.getElementById("buttonAddAll").style.border = "2px solid #0D2533";
			document.getElementById("buttonRemoveAll").style.border = "2px solid #0D2533";
			document.getElementById("inputNewChampion").style.borderBottom = "2px solid #FFFFFF";
			document.getElementById("inputRemoveChampion").style.borderBottom = "2px solid #FFFFFF";
			document.getElementById("buttonNewChampion").style.backgroundColor = "#18445e";
			document.getElementById("buttonRemoveChampion").style.backgroundColor = "#18445e";
			document.getElementById("buttonAddAll").style.backgroundColor = "#18445e";
			document.getElementById("buttonRemoveAll").style.backgroundColor = "#18445e";
			document.getElementById("inputNewChampion").style.setProperty("--color", "#18445e");
			document.getElementById("inputRemoveChampion").style.setProperty("--color", "#18445e");
			document.getElementById("inputNewChampion").style.setProperty("--focuscolor", "#0D2533");
			document.getElementById("inputRemoveChampion").style.setProperty("--focuscolor", "#0D2533");
			document.getElementById("buttonNewChampion").style.setProperty("--fontcolor", "#309bd9");
			document.getElementById("buttonRemoveChampion").style.setProperty("--fontcolor", "#309bd9");
			document.getElementById("buttonAddAll").style.setProperty("--fontcolor", "#309bd9");
			document.getElementById("buttonRemoveAll").style.setProperty("--fontcolor", "#309bd9");
		}
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
	//If the system is not locked continue the function.
	if (!locked) {
		//Get the champion's name
		champion = document.getElementById("inputNewChampion").value;
		document.getElementById("inputNewChampion").value="";
		//Check for nicknames
		champion = checkNickname(champion);
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
}

//Add all champions to the randomizer pool.
function addAll() {
	//If the system is not locked continue the function.
	if (!locked) {
		//Remove all champions from the pool to avoid duplicates.
		removeAll();
		//Set the champion array equal to the champion repository.
		champions = [...championRepository];
		updateChamps();
	}
}

//Remove a champion from the randomizer pool. 
function subChampion() {
	//If the system is not locked continue the function.
	if (!locked) {
		//Check if the champions pool is populated. If not, continue the function.
		if (champions.length === 0) { 
			document.getElementById("removeError").innerHTML = "Error. There are no more champions in the randomizer pool.";
			return;
		} else {
			//Get the champion's name
			champion = document.getElementById("inputRemoveChampion").value;
			document.getElementById("inputRemoveChampion").value = "";
			//Check for nicknames
			champion = checkNickname(champion);
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
}

//Remove all champions from the randomizer pool.
function removeAll() {
	//If the system is not locked continue the function.
	if (!locked) {
		champions = [];
		updateChamps();
	}
}

//Check a name against the repository of nicknames, and set it to the proper name if a nickname was submitted.
function checkNickname(name) {
	for (let y = nicknameRepository.length-1; y >= 0; y--) {
		if (nicknameRepository[y].toLowerCase() === name.toLowerCase()) {
			name = nicknameLineup[y];
			y = -1;
		}
	}
	return name;
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
	//If the system is not locked, continue with the function
	if (!locked) {
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
			document.getElementById("buttonNewChampion").style.border = "2px solid #FF0000";
			document.getElementById("buttonRemoveChampion").style.border = "2px solid #FF0000";
			document.getElementById("inputNewChampion").style.borderBottom = "2px solid #FF0000";
			document.getElementById("inputRemoveChampion").style.borderBottom = "2px solid #FF0000";
			document.getElementById("buttonAddAll").style.border = "2px solid #FF0000";
			document.getElementById("buttonRemoveAll").style.border = "2px solid #FF0000";
			document.getElementById("buttonNewChampion").style.setProperty("--fontcolor", "#FF0000");
			document.getElementById("buttonRemoveChampion").style.setProperty("--fontcolor", "#FF0000");
			document.getElementById("buttonAddAll").style.setProperty("--fontcolor", "#FF0000");
			document.getElementById("buttonRemoveAll").style.setProperty("--fontcolor", "FF0000");
			document.getElementById("buttonNewChampion").style.backgroundColor = "#550001";
			document.getElementById("buttonRemoveChampion").style.backgroundColor = "#550001";
			document.getElementById("buttonAddAll").style.backgroundColor = "#550001";
			document.getElementById("buttonRemoveAll").style.backgroundColor = "#550001";
			document.getElementById("inputNewChampion").style.setProperty("--color", "#550001");
			document.getElementById("inputRemoveChampion").style.setProperty("--color", "#550001");
			document.getElementById("inputNewChampion").style.setProperty("--focuscolor", "#300001");
			document.getElementById("inputRemoveChampion").style.setProperty("--focuscolor", "#300001");
			
			locked = true;
		} else {
			document.getElementById("randomError").innerHTML = "Error. No champions in the pool.";
		}
	}
}

//Toggle credits
function credits() {
	//If credits are on, turn them off and revert to the main menu. Restore the event listeners for the input fields. Otherwise, show credits.
	if (toggleCredits) {
		toggleCredits = false;
		document.getElementById("main").innerHTML = '<p>This randomizer lets you choose among a specific pool of champions you select! This randomizer is updated to include Omen.</p><p>Also try the <a id="champRandom" href="https://andrewchicken888.github.io/paladins-randomizer/" target="_blank" rel="noopener noreferrer">Paladins Randomizer</a> and the <a id="champRandom" href="https://andrewchicken888.github.io/paladins-random-team/" target="_blank" rel="noopener noreferrer">Team Randomizer!</a></p><br><button id="randomize" onclick="randomize()" type="button"><img id="championImage" src="DefaultChamp.png"/></button><p id="randomError" class="error"></p><br><p>Input a new champion: <input id="inputNewChampion" placeholder="Add a champion" autofocus></input> <button id="buttonNewChampion" onclick="addChampion()" type="submit" value="Submit">Submit</button></p> <p id="inputError" class="error"></p> <p>Remove a champion: <input id="inputRemoveChampion" placeholder="Remove a champion"></input> <button id="buttonRemoveChampion" onclick="subChampion()" type="submit">Submit</button></p> <p id="removeError" class="error"></p><p><button id="buttonAddAll" onclick="addAll()" type="button">Add All</button> <button id="buttonRemoveAll" onclick="removeAll()" type="button">Remove All</button></p><div id="champsList"><p class="error">There are no champions in the pool.</p></div>';
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
		if (oldRand != -1) {
			document.getElementById("championImage").src = champions[rand] + ".png";
			document.getElementById("randomize").style.backgroundColor = "#FF0000";
		}
	} else {
		toggleCredits = true;
		document.getElementById("main").innerHTML = '<p>Version 1.4.1 designed by AndrewChicken</p><p>Sound effects from \'Sonic Mania\' by Sega</p><p>Champions and champion images from \'Paladins, Champions of the Realm\' by Evil Mojo Studios</p><button type="button" id="goBack" onclick="credits()">Back</button>';
	}
}