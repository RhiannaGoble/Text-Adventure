// TO DO: separate character description and speech.
// make possible commands bold or highlighted maybe?

// // CLASSES
//.......................................CHARACTERS.......................................
class Character {
    constructor(name, description, pronoun, speech, image, inventory) {
        this._name = name
        this._description = description
        this._pronoun = pronoun
        this._speech = speech
        this._image = image
        this._inventory = inventory
        this._alive = true
    }

    get name() {
      return this._name;
    }
    get description() {
      return this._description;
    }
    get pronoun() {
      return this._pronoun;
    }
    get speech() {
      return this._speech;
    }
    get image() {
      return this._image;
    }
    get inventory() {
      return this._inventory;
    }
    set inventory(inventory) {
      this._inventory = inventory;
    }
    get alive() {
      return this._alive
    }

    describe(){
      return `You meet ${this._name}, ${this._description}`;
    }
    speech(){
      return `${this._name}: "${this._speech}"`;
    }
    poeSpeak() {
      return `${this._name} does not respond`;
    }
    itemIsInInventory(item) {
      return this._inventory.filter(inventoryItem => inventoryItem.name === item.name).length > 0;
    }
    fight() {
      return `${this._name} will not fight you...`;
    }
    isEnemy() {
      return false;
    }
    growl() {
      return this.speech();
    }
    kill() {
      this._alive = false;
    }
    revive() {
      this._alive = true;
    }
}

class Friend extends Character {
  constructor(name, description, pronoun, speech, image, poeSpeech) {
    super(name, description, pronoun, speech, image)
    this._poeSpeech = poeSpeech
  }

  poeSpeak() {
    if (this.name === 'Billy'){
      return `Poe squawks "meat please" in a convincingly human voice. <p> ${this._name} says "${this._poeSpeech}"`
    }
    if (this.name === 'Chihuahua'){
      return `"${this._poeSpeech}"`
    }
    return `${this._name} says "${this._poeSpeech}"`;
  }



  assist() {
    // Change poe helping with human here
    return `${this.name} can't see anything of interest right now`;
  }
}

class Enemy extends Character {
  constructor(name, description, pronoun, speech, weakness, image, poeSpeech) {
    super(name, description, pronoun, speech)
    this._weakness = weakness
    this._image = image
    this._poeSpeech = poeSpeech
  }
  get weakness() {
    return this._weakness;
  }
  get image() {
    return this._image;
  }

  fight(bear) {
    if (this.name === 'Moose' && bear.itemIsInInventory({name: 'trash'})) {
      return `You fight the ${this.name}! AND WIN!`
    }
    // if (this.name === 'Chihuahua')
    console.log(this.name);
    if (this.name === 'Chihuahua') {
      bear.kill();
      return `This tiny ball of fluff seems to be made of KNIVES!`;
    }
    return `something about fighting a ${this.name}.`;
  }
  isEnemy() {
    return true;
  }
  growl(bear) {
    return `You approach the ${this.name} and quickly realise the animal is far more unhinged than you. On a physical level, you could probably win this battle. But the emotional scars would last a lifetime.`
  }
}

// ...................................ROOMS.......................................
class Room {
    constructor(name) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = "";
      this._item = "";
    }

    get name() {
      return this._name;
    }
    get description() {
      return this._description;
    }
    set description(description) {
      this._description = description
    }
    get linkedRooms() {
      return this._linkedRooms;
    }
    get character() {
      return this._character
    }
    set character(character) {
      this._character = character
    }
    get item() {
      return this._item
    }
    set item(item) {
      this._item = item
    }

    set name(value) {
      if (value.length < 3) {
        alert("Room name must be 3 characters or more");
        return;
      }
      this._name = value;
    }

    describeRoomInfo() {
      let roomDescription = `You are in the ${this._name}. ${this._description}`;
      return roomDescription;
    }

    describeChar(){
      let occupantMsg = ""
      if (this.character === "") {
        occupantMsg = ""
        // default speech box
      } else {
        occupantMsg = this.character.describe()
      }
      return occupantMsg;
    }

    describeItem(){
      let itemMsg = ""
      if (this.item === "") {
        itemMsg = ""
      } else {
        itemMsg = `${this.item.describe()}`
      }
      return itemMsg;
    }

    linkRoom(direction, roomBeingLinked) {
      this._linkedRooms[direction] = roomBeingLinked;
    }
  
    describeActionOptions(bear, assistant) {
      const entries = Object.entries(this._linkedRooms);
      let details = []
      for (const [direction, room] of entries) {
        let text = `The ${room._name} is to the <span class="text-white"> ${direction} </span>`;
        details.push(text);
      }
      if (this.character !== "") {
        if (this.character.isEnemy()) {
          details.push(`You can <span class="text-white">fight</span> ${this.character.name}`)
        }
        details.push(`You can <span class="text-white">growl</span> at ${this.character.name}`)
      }
      if (this.item !== "") {
        details.push(`You can <span class="text-white">take</span> ${this.item.name}`)
      }
      if (bear.itemIsInInventory(assistant)) {
        details.push(`You can ask ${assistant.name} to <span class="text-white">assist</span>`);
      }
      const itemCommands = bear.inventory
        .filter(item => item.name !== assistant.name)
        .map((inventoryItem) => `You can <span class="text-white">use ${inventoryItem.name}</span>`);
      details = details.concat(itemCommands);
      return details;
    }

    linkPersonToRoom(char) {
      this._character = char
    }

    linkItemToRoom(item) {
      this._item = item
    }

    getCharacterAvi() {
      console.log(this._character)
      let aviURL = ""
      if (this._character === "") {
        aviURL = ""
      } else {aviURL = this._character.image}
      return aviURL;
    }
  
    move(direction) {
      if (direction in this._linkedRooms) {
        return this._linkedRooms[direction];
      } else {
        alert("Please choose one of the available options",);
        alert(`You are in the ${this._name}`) 
        return this;
      }
    }
  }
  
  // ...................................ITEMS.......................................
  class Item {
    constructor(name, description) {
      this._name = name;
      this._description = description;
    }
 
    get name() {
      return this._name;
    }
    get description() {
      return this._description;
    }
  
    describe() {
      return `${this._name}: ${this._description}`
    }

    use() {
      return `You use the ${this.name}`
    }  //TO DO: Work out how to use items
  }


// Characters: Bear, Poe, Moose, Billy The Blind Butcher, Chihuahua, Humans
// Rooms: Cave, Forest, Edge of Town, Butcher, Street, House, Garden
// Items: Bone, Trash 
/* Order: You begin in the forest.
You can go south to EDGE OF TOWN
*/
  // ...................................OBJECTS: ROOMS.......................................
const cave = new Room("cave")
cave.description = "<p>the cosy nook which you call home"
const forest = new Room("forest")
forest.description = "<p>It is sunset, and the way back to your cave has been blocked by an aggressive moose. <p> Maybe if you had more energy, you would have a better chance at fighting. <p>Your stomach emits a rumble."
const edgeOfTown = new Room("edge of town")
edgeOfTown.description = "<p>The smell of meat wafts over from the butcher's shop.<p> Ahead of you lies a deserted street lined with human dwellings."
const butchersShop = new Room("butcher\'s shop")
butchersShop.description = ""
const street = new Room ("street")
street.description = "<p> You detect the smell of a barbecue happening somewhere nearby. The street is otherwise quiet."
const house = new Room ("house")
house.description = "<p>"
const garden = new Room ("garden")
garden.description = "<p>"

cave.linkRoom("south", forest);
forest.linkRoom("north", cave);
forest.linkRoom("south", edgeOfTown);
edgeOfTown.linkRoom("north", forest);
edgeOfTown.linkRoom("east", butchersShop);
edgeOfTown.linkRoom("south", street);
butchersShop.linkRoom("west", edgeOfTown);
street.linkRoom("north", edgeOfTown);
street.linkRoom("west", house);
house.linkRoom("east", street);
house.linkRoom("west", garden);
garden.linkRoom("east", house);

// ...................................OBJECTS: CHARACTERS.......................................
// Characters: Bear, Poe, Moose, Billy The Blind Butcher, Chihuahua, Humans
// Player character: Bear
const Bear = new Character("Bear", "a slightly nervous creature with a rumbling tummy", "he", "hungry bear noises", "https://www.dropbox.com/scl/fi/14zcqsv380b8l0di9gwab/bear.jpg?rlkey=w69o9hdsbjpkil2akcfseog20&dl=0", [])

// Friends
const Poe = new Friend("Poe", "a highly intelligent raven", "she", "Quoth the raven, let's go and find dinner!", "https://dl.dropboxusercontent.com/scl/fi/6of32rrk5o5zc9xzlwknt/pixelraven.webp?rlkey=pfheyec0oyw6qgk29od7k0ll4&dl=0")
const Billy = new Friend("Billy", "an elderly butcher. You can see that the man is blind.", "he", "Oh, what a lovely soft dog! I'm afraid we're all out of meat this evening. But how about a bone for you, good boy? <p>He holds out a bone.", "https://dl.dropboxusercontent.com/scl/fi/d67b2sd9g9bu0rd2dcjbj/billy.png?rlkey=w66nlec2bjskkckq8qrpl5qf3&dl=0", "Sorry, I'm closed for the day.")
// Bear receives the item "bone" after this growlion
// extra idea: status effect, or skill/attribute "good boy" attained after this growlion

// Enemies
// const Spooky = new Enemy("Spooky", "a floaty apparition", "they", "woooooOOOOOooooo", "mean comments")
const Moose = new Enemy("Moose", "Primordial screaming emanates from the moose. You take this as a threat, and duly wish to avoid this animal.", "he", "", "", "https://dl.dropboxusercontent.com/scl/fi/6balkonyi7cbw5yavhqfb/moose.jpg?rlkey=flr9cz21ro8jak9ddkdbt14dd&dl=0")
const Chihuahua = new Enemy("Chihuahua", "<p>Despite its small size, the dog is extremely aggressive.", "she", "", "bone", "https://dl.dropboxusercontent.com/scl/fi/vadd2j6uwghglt1fbjlzs/chihuahua-dog-breed.jpg?rlkey=r69jkfjfqo7op8lnayvy9u7gi&dl=0")
const Human = new Enemy("Human", "The human is throwing a party.", "she", "AAAAA, A BEAR! QUICK, CALL THE BEAR COPS!", "",  "https://dl.dropboxusercontent.com/scl/fi/vyzo3vr93y5u6y2rxiewa/monika.png?rlkey=3144kjy1ty6e63uvyvh0a8d1r&dl=0", "OMG, A raven and a bear that are friends!! Is anyone filming this??! <p>The humans allow you to root through their garbage whilst they film content.")

cave.linkPersonToRoom(Moose);
edgeOfTown.linkPersonToRoom(Poe);
butchersShop.linkPersonToRoom(Billy);
house.linkPersonToRoom(Chihuahua);
garden.linkPersonToRoom(Human);

// ...................................OBJECTS: ITEMS.......................................
const bone = new Item("Bone", "a tasty treat for any carnivore")
const trash = new Item("Trash", "your favourite meal")
const poeItem = new Item("Poe", "Friend-shaped bird")

butchersShop.linkItemToRoom(bone);
garden.linkItemToRoom(trash);
edgeOfTown.linkItemToRoom(poeItem);

const toListItem = (word) => `<li>${word}</li>`;

const showInventoryDescription = () => {
  const inventoryInListItems = Bear.inventory.map(item => toListItem(item.describe()))
  const inventoryPutTogether = inventoryInListItems.join("");
  document.getElementById("inventoryArea").innerHTML = `<ul>${inventoryPutTogether}</ul>`;
}

const showActionItems = (currentRoom) => {
  const actionList = currentRoom.describeActionOptions(Bear, Poe).map(action => toListItem(action))
  const actionListAsListItems = actionList.join("")
  document.getElementById("actionOptions").innerHTML =  `<ul>${actionListAsListItems}</ul>`;
}

// ...................................START GAME.......................................
  function startGame() {
    //set and display start room
    let currentRoom = forest;
    Bear.revive();
    // currentRoom variable will change when move function is initiated after keydown. We need to let this variable exist here, so we can say what we are moving to with move
    document.getElementById("roomInfo").innerHTML =  currentRoom.describeRoomInfo();
    document.getElementById("actionResultArea").innerHTML =  currentRoom.describeChar();
    // document.getElementById("itemArea").innerHTML =  currentRoom.describeItem();
    document.getElementById("characterAvi").src = currentRoom.getCharacterAvi();
    if (currentRoom.getCharacterAvi() === "") {
      document.getElementById("characterAvi").src = "https://dl.dropboxusercontent.com/scl/fi/14zcqsv380b8l0di9gwab/bear.jpg?rlkey=w69o9hdsbjpkil2akcfseog20&dl=0"
    }
    document.getElementById("actionResultArea").innerHTML =  "";
    showActionItems(currentRoom);
    showInventoryDescription();

    // The above is to set up the game starting in forest
  
    //handle commands
    // an event contains all the info about what happened in the event listener. 
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        if (Bear.alive !== true) {
          // startGame();
          return;
        }
        
        command = document.getElementById("playerInput").value;
        const directions = ["north", "south", "east", "west"]

        if (currentRoom.name === forest.name && command === "north" && !Bear.itemIsInInventory(trash)) {
          document.getElementById("speechArea").innerHTML =  "GAME OVER! <p>You have been killed by a furious moose. Refresh the page to try again.";
          Bear.kill();
          return
        } 

        if (currentRoom.name === house.name && command === "west" && currentRoom.character !== "") {
          document.getElementById("speechArea").innerHTML =  "GAME OVER! <p>The chihuahua defended its home. Refresh the page to try again.";
          Bear.kill();
          return
        } 

        // if (currentRoom.name === garden.name && !Bear.itemIsInInventory(poeItem))) {
        //   document.getElementById("speechArea").innerHTML =  "GAME OVER! <p>You go to bear jail for your. Refresh the page to try again.";
        //   Bear.kill();
        //   return
        // } 

        if (directions.includes(command.toLowerCase())) {
          currentRoom = currentRoom.move(command)
          // line above is the actual room change
          document.getElementById("playerInput").value = ""
          // the line above blanks the text box so you don't need to delete your last entry
          document.getElementById("roomInfo").innerHTML =  currentRoom.describeRoomInfo();
          showActionItems(currentRoom);
          // document.getElementById("itemArea").innerHTML =  currentRoom.describeItem();
          showInventoryDescription()
          document.getElementById("actionResultArea").innerHTML =  "";
          document.getElementById("replyBox").innerHTML =  "";
          document.getElementById("itemArea").innerHTML =  ""

          if (Bear.itemIsInInventory(currentRoom.character)) {
            currentRoom.character = ""
          }

          document.getElementById("actionResultArea").innerHTML =  currentRoom.describeChar();
          document.getElementById("characterAvi").src = currentRoom.getCharacterAvi();
          if (currentRoom.getCharacterAvi() === "") {
            document.getElementById("characterAvi").src = "https://dl.dropboxusercontent.com/scl/fi/14zcqsv380b8l0di9gwab/bear.jpg?rlkey=w69o9hdsbjpkil2akcfseog20&dl=0"
          }

          // roomInfo is the division on the html where this will go
        } else if (command.toLowerCase() === 'fight') {
          if (currentRoom.character !== "") {
            document.getElementById("actionResultArea").innerHTML = currentRoom.character.fight(Bear);
          } else {
            document.getElementById("actionResultArea").innerHTML = "You shadow box for a while...";
          }
          document.getElementById("playerInput").value = ""
        } else if (command.toLowerCase() === 'growl') {
          if (currentRoom.character !== "") {
            console.log(currentRoom.character);
            document.getElementById("replyBox").innerHTML = currentRoom.character.growl(Bear);
          } else {
            document.getElementById("replyBox").innerHTML = "There is no one here...";
          }
          document.getElementById("playerInput").value = ""
        } else if (command.toLowerCase() === 'take') {
          if (currentRoom.item !== "") {
            if (currentRoom.item.name === trash.name && !Bear.itemIsInInventory(poeItem)) {
              // Change text for loss by human here
              document.getElementById("speechArea").innerHTML =  "GAME OVER! <p>Having terrified a group of humans, you are taken to bear jail for your crimes.";
              Bear.kill();
              return;
            } else  if (currentRoom.item.name === trash.name) {
              document.getElementById("speechArea").innerHTML = currentRoom.character.poeSpeech();
            }

            document.getElementById("itemArea").innerHTML = `You got ${currentRoom.item.name}`
            Bear.inventory.push(currentRoom.item)
            if (currentRoom.item == poeItem) {
              document.getElementById("itemArea").innerHTML = `Poe flies gracefully onto your back. You can now ask her for assistance with certain tasks!`
            }
            console.log(Bear)
            if (currentRoom.character.name === currentRoom.item.name) {
              currentRoom.character = ""
            }
            currentRoom.item = ""
            showActionItems(currentRoom)
            showInventoryDescription()
            document.getElementById("actionResultArea").innerHTML =  currentRoom.describeChar();
            // document.getElementById("itemArea").innerHTML =  currentRoom.describeItem();
            document.getElementById("characterAvi").src = currentRoom.getCharacterAvi();
            if (currentRoom.getCharacterAvi() === "") {
              document.getElementById("characterAvi").src = "https://dl.dropboxusercontent.com/scl/fi/14zcqsv380b8l0di9gwab/bear.jpg?rlkey=w69o9hdsbjpkil2akcfseog20&dl=0"
            }} 
          else {
            document.getElementById("actionResultArea").innerHTML =  `There is nothing here...`
          }
          document.getElementById("playerInput").value = ""
        } else if (command.toLowerCase() === 'assist') {
          let speech = "You currently have no assistant";
          if (Bear.itemIsInInventory(poeItem)) {
            if (currentRoom.character === "") {
              speech = Poe.assist()
            } else {
              speech = currentRoom.character.poeSpeak();
            }
          }
          document.getElementById("playerInput").value = ""
          document.getElementById("itemArea").innerHTML = speech;
        } else if (command.toLowerCase().startsWith('use')) {
          const commandParts = command.split(' ');
          const nameOfItemToUse = commandParts[1];
          const itemsThatCouldBeUsed = Bear.inventory.filter(item => item.name === nameOfItemToUse);
          if (itemsThatCouldBeUsed.length === 0) {
            document.getElementById("actionResultArea").innerHTML = `You don't have an item called ${nameOfItemToUse}`;
          } else {
            const itemToUse = itemsThatCouldBeUsed.pop();
            let useText = itemToUse.use();
            console.log(itemToUse);
            if (currentRoom.character.isEnemy() && currentRoom.character.weakness.toLowerCase() === itemToUse.name.toLowerCase()) {
              useText += ` and ${currentRoom.character.name} is distracted chomping away on it.`;
              console.log(useText);
              currentRoom.character = "";
            }
            document.getElementById("itemArea").innerHTML = useText;
            Bear.inventory = Bear.inventory.filter(item => item.name !== nameOfItemToUse);
          }
          showActionItems(currentRoom)
          showInventoryDescription()
          document.getElementById("actionResultArea").innerHTML =  currentRoom.describeChar();
          // document.getElementById("itemArea").innerHTML =  currentRoom.describeItem();
          document.getElementById("characterAvi").src = currentRoom.getCharacterAvi();
          if (currentRoom.getCharacterAvi() === "") {
            document.getElementById("characterAvi").src = "https://dl.dropboxusercontent.com/scl/fi/14zcqsv380b8l0di9gwab/bear.jpg?rlkey=w69o9hdsbjpkil2akcfseog20&dl=0"
          }
          document.getElementById("playerInput").value = "";
        } else {
          document.getElementById("playerInput").value = ""
          alert("Please select a valid command")
        }

        if (!Bear.alive) {
          document.getElementById("speechArea").innerHTML = "YOU DIED. REFRESH PAGE TO TRY AGAIN";
        }
      }
    });
  }
  startGame();

          
//   function(){
//     if (currentRoom == "butcher")  {
//         stop the function somehoww";
//     }else if () {
//       return;
//     }
// };
  
  // assignment stuff: in if(room.character)
  // let hasSword= false
  // if (character.name === "Gandalf") { hasSword = true}
  // OR e.g. this._isLocked = false; and change it when they get an item etc. so make rooms dynamic depending on conditions
  
  // this week's assignment
