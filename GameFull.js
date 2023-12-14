// // // CLASSES
//.......................................CHARACTERS.......................................
class Character {
    constructor(name, description, pronoun, speech) {
        this._name = name
        this._description = description
        this._pronoun = pronoun
        this._speech = speech
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

    describe(){
      return `You meet ${this._name}, ${this._description}`;
    }
    speech(){
      return `${this._name} says ${this._speech}`;
      }
}

class Friend extends Character {
  constructor(name, description, pronoun, speech, weakness) {
  super(name, description, pronoun, speech)
  this._weakness = weakness
}
}

class Enemy extends Character {
  constructor(name, description, pronoun, speech, weakness) {
  super(name, description, pronoun, speech)
  this._weakness = weakness
}
fight(){}
}

// ...................................ROOMS.......................................
class Room {
    constructor(name) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = "";
    }

    get name() {
      return this._name;
    }
    get description() {
      return this._description;
    }
    get linkedRooms() {
      return this._linkedRooms;
    }
    get character() {
      return this._character
    }

    set name(value) {
      if (value.length < 3) {
        alert("Room name must be 3 characters or more");
        return;
      }
      this._name = value;
    }
  
    // set description(value) {
    //   if (value.length < 8) {
    //     alert("Room description must be 8 characters or more");
    //     return;
    //   }
    //   this._description = value;
    // }

    describe() {
      let roomDescription = `You are in the ${this._name}, you can see ${this._description}`;
      let occupantMsg = ""
      if (this.character === "") {
        occupantMsg = ""
      } else {
        occupantMsg = this.character.describe() + this.character.speech()
      }
      let fullRoomDisplay = roomDescription + 
      occupantMsg + this.getDetails();
      return fullRoomDisplay;
    }

    linkRoom(direction, roomBeingLinked) {
      this._linkedRooms[direction] = roomBeingLinked;
    }
  
    getDetails() {
      const entries = Object.entries(this._linkedRooms);
      let details = ""
      for (const [direction, room] of entries) {
        let text = `The ${room._name} is to the ${direction}`;
        details += text;
      }
      return details;
    }

    linkPersonToRoom(char) {
      this._character = char
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
    constructor(name) {
      this._name = name;
      this._description = ""
    }
 
    get name() {
      return this._name;
    }
    get description() {
      return this._description;
    }
  
    describe() {
      return `You found a ${item._name} It is ${item._description}`
    }

    use() {}  //TO DO: Work out how to use items
  }


// Characters: Bear, Poe, Moose, Billy The Blind Butcher, Chihuahua, Humans
// Rooms: Cave, Forest, Edge of Town, Butcher, Street, House, Garden
// Items: Bone, Trash 
/* Order: You begin in the forest.
You can go south to EDGE OF TOWN
*/
  // ...................................OBJECTS: ROOMS.......................................
const cave = new Room("cave")
cave.description = "the cosy nook which you call home"
const forest = new Room("forest")
forest.description = ""
const edgeOfTown = new Room("edge of town")
edgeOfTown.description = "the smell of meat wafts over from the Butcher's shop. Ahead of you lies a deserted street lined with human dwellings."
const butchersShop = new Room("butcher\'s shop")
butchersShop.description = ""
const street = new Room ("street")
street.description = ""
const house = new Room ("house")
house.description = ""
const garden = new Room ("garden")
garden.description = ""

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

// remember to linkPersonToRoom
  
// ...................................OBJECTS: CHARACTERS.......................................
// Characters: Bear, Poe, Moose, Billy The Blind Butcher, Chihuahua, Humans
// Player character: Bear
const Bear = new Character("Bear", "a slightly nervous creature with a rumbling tummy", "he", "hungry bear noises")

// Friends
const Poe = new Friend("Poe", "your friend, a highly intelligent raven", "she", "Quoth the raven, let's go and get some dinner", "Shiny things")
const Billy = new Friend("Billy", "A blind butcher, who is extremely fond of dogs.", "he", "Hello doggy! I'm afraid we're all out of meat this evening. But how about a bone for you, good boy?")
// Bear receives the item "bone" after this interaction
// extra idea: status effect, or skill/attribute "good boy" attained after this interaction

// Enemies
// const Spooky = new Enemy("Spooky", "a floaty apparition", "they", "woooooOOOOOooooo", "mean comments")
const Moose = new Character("Moose", "Primordial screaming emanates from the moose. You take this as a threat, and duly wish to avoid this animal.", "he", "")
const Chihuahua = new Character("Chihuahua", ".", "she", "")
const Human = new Character("Human", ".", "he", "")

// ...................................OBJECTS: ITEMS.......................................
const bone = new Item("bone", "a tasty treat for any carnivore")
const trash = new Item("trash", "your favourite meal")


// document.getElementById("textarea").innerHTML = textContent;
// document.getElementById("usertext").innerHTML = '><input type="text" id="usertext" />';
// document.getElementById("usertext").focus();
// where does this go and how do we link html and js together?

  function startGame() {
    //set and display start room
    // currentRoom = forest
    // console.log (currentRoom)
    let currentRoom = forest;
    // currentRoom variable will change when move function is initiated after keydown. We need to let this variable exist here, so we can say what we are moving to with move
    let RoomDescription = forest.describe();
    document.getElementById("textarea").innerHTML = RoomDescription
  
    //handle commands
    // an event contains all the info about what happened in the event listener. 
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        command = document.getElementById("playerInput").value;
        const directions = ["north", "south", "east", "west"]
        if (directions.includes(command.toLowerCase())) {
          currentRoom = currentRoom.move(command)
          // line above is the actual room change
          document.getElementById("playerInput").value = ""
          // the line above blanks the text box so you don't need to delete your last entry
          document.getElementById("textarea").innerHTML =  currentRoom.describe();
          // textarea is the division on the html where this will go
        } else {
          document.getElementById("playerInput").value = ""
          alert("Please select a valid command")

        }
  
      }
    });
  }
  startGame();
  
  // assignment stuff: in if(room.character)
  // let hasSword= false
  // if (character.name === "Gandalf") { hasSword = true}
  // OR e.g. this._isLocked = false; and change it when they get an item etc. so make rooms dynamic depending on conditions
  
  // this week's assignment
