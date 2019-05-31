keyboardJS.bind('w', function(e) {
  e.preventRepeat();
  socket.emit('keyDown', 'w');
}, function(e) {
  socket.emit('keyUp', 'w');
});

keyboardJS.bind('a', function(e) {
  socket.emit('keyDown', 'a');
  e.preventRepeat();
}, function(e) {
  socket.emit('keyUp', 'a');
});

keyboardJS.bind('s', function(e) {
  socket.emit('keyDown', 's');
  e.preventRepeat();
}, function(e) {
  socket.emit('keyUp', 's');
});

keyboardJS.bind('d', function(e) {
  socket.emit('keyDown', 'd');
  e.preventRepeat();
}, function(e) {
  socket.emit('keyUp', 'd');
});
