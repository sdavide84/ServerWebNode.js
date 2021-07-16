var EventEmitter = require('events').EventEmitter;
var myModule = require('./myModule');

var game = new EventEmitter();

game.on('nomeEvento', function(param1, param2) {
    console.log(param1 + ' - ' + param2);
});

game.on('somma', function(a,b) {
    console.log(myModule.somma(a,b));    
});

game.emit('nomeEvento', 'parametro1', 2);
game.emit('somma', 45, 34);