function ready() {
//this message is recieved once connected to the server and contains every player's data
socket.on('connectedPlayers', (data) => {
  for(item of data) {
    addPlayer(item);
  }
})

socket.on('newPlayer', (data) => {
  //new player
  addPlayer(data);
})

socket.on('updatePlayers', (data) => {
  //when recieve data from the server, update player
  for(var item of data) {
    //iterate through all players and match the one with the same id. then update with new properties

    game.players.getChildren().forEach((player)=> {
      if(player.id === item.id) {
        //transfer every property in item to the player
        for( i in item ) {
          player[i] = item[i];
        }
      }
    });
  }
})

socket.on('createBlocks', (data) => {
    //This recieves all the data for the blocks create on the screen
    for(var block of data) {
        addBlock(block)
    }

})

}
