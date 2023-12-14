


class Room {
    constructor(name, description, linkedRooms) {
        this._name = name
        this._description = description
        this._linkedRooms = linkedRooms
    }

    describe() {
        return `You have entered ${this._name} ${this._description}.`
    }

    linkRoom(direction, roomToLink){
        this._linkedRooms[direction] = roomToLink
    }
}

class Friend extends Character {
    constructor(name, description, pronoun, conversation, weakness) {
    super(name, description, pronoun, conversation)
    this._weakness = weakness
}
}

class Enemy extends Character {
    constructor(name, description, pronoun, conversation, weakness) {
    super(name, description, pronoun, conversation)
    this._weakness = weakness
}
fight(){}
}

// Classes end, individual objects start here
// Haven't added getters and setters yet

// Characters
const Bob = new Character("Bob", "a boring main Character", "he", "Hi\, my name is Bob")
const Jane = new Character("Jane", "a budding martial artist", "she", "Is it time to kick ass yet?")
const Doug = new Character("Doug", "a highly intelligent man", "he", "\(A Simpsons quote you do not recognise\)")

// Enemies
const Spooky = new Enemy("Spooky", "a floaty apparition", "they", "woooooOOOOOooooo", "mean comments")

// Rooms
const atrium = new Room("atrium", "A fancy glass entrance hall", "livingRoom")
const livingRoom = new Room("Living room", "a cosy lounge with a blue sofa, television set, and ominous glowing chest used casually as a coffee table", "atrium, janesRoom, kitchen, stairs")
const kitchen = new Room("Kitchen", "A cluttered dining table fills most of the kitchen.", "livingRoom")
const janesRoom = new Room("Jane's Room", "The walls are adorned with posters of 70's Kung Fu movies", "livingRoom")
const stairs = new Room("Stairs", "a dreadful creak is summoned with every step. Bad carpentry?! Spooky. Also, something appeared to move in the dark doorway at the top of the stairs", "livingRoom, attic")
const attic = new Room("Attic", "you cannot see anything of note, though the silence in this room makes you uneasy")

// Link rooms together
livingRoom.linkRoom('South', atrium)
livingRoom.linkRoom('East', janesRoom)
livingRoom.linkRoom('West', kitchen)
livingRoom.linkRoom('North', stairs)
atrium.linkRoom('North', livingRoom)
janesRoom.linkRoom('West', livingRoom)
kitchen.linkRoom('East', livingRoom)
stairs.linkRoom('South', livingRoom)
stairs.linkRoom('North', attic)

// Display room information
function displayRoomInfo(Room) {
    let occupantSpeech = ""
    if (room.Character === "") {
        occupantSpeech = ""
    } else {
        occupantSpeech = room.Character.describe() + ". " + room.Character.talk()
    }
}

// Set and display start room
function startGame() {
    currentRoom = livingRoom
    console.log (currentRoom)
    displayRoomInfo(currentRoom);

    //handle commands
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        command = document.getElementById("usertext").value;
        const directions = ["North", "South", "East", "West"]
        if (directions.includes(command.toLowerCase())) {
          currentRoom = currentRoom.move(command)
          displayRoomInfo(currentRoom);
        } else {
          document.getElementById("usertext").value = ""
          alert("that is not a valid command please try again")
        }
  
      }
    });
  }
  startGame();