window.onload = function() {

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('bg', 'assets/sprites/bg.png');
    game.load.image('floor', 'assets/sprites/platform.png');
    game.load.image('bottle', 'assets/sprites/potion.png');
    game.load.image('sand', 'assets/sprites/sand.png');
    game.load.image('sign', 'assets/sprites/sign.png');
    game.load.spritesheet('door', 'assets/sprites/door.png');
    game.load.spritesheet('key', 'assets/sprites/key.png');
    game.load.spritesheet('player', 'assets/sprites/player.png');
	game.load.spritesheet('enemy', 'assets/sprites/enemy.png');
	game.load.audio('music', 'assets/audio/Voices Over War.mp3');

}

var player;
var platforms;
var cursors;
var enemy;
var enemy2;
var enemy3;
var potions;
var percent = 0;
var text;
var music;
var sand;
var sign;
var door;
var key;

function create() {
	
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'bg');   
    platforms = game.add.group();
    platforms.enableBody = true;
    var floor = platforms.create(0, game.world.height - 64, 'floor');
    floor.scale.setTo(2, 2);
    floor.body.immovable = true;

    var ledge = platforms.create(400, 400, 'floor');	
    ledge.body.immovable = true;
	ledge.scale.setTo(0.5, 0.5);
    ledge = platforms.create(0, 400, 'floor');
    ledge.body.immovable = true;
	ledge.scale.setTo(0.5, 0.5);
	ledge = platforms.create(100, 300, 'floor');
    ledge.body.immovable = true;
	ledge.scale.setTo(1, 0.5);
	ledge = platforms.create(650, 300, 'floor');
    ledge.body.immovable = true;
	ledge.scale.setTo(0.5, 0.5);
	ledge = platforms.create(500, 200, 'floor');
    ledge.body.immovable = true;
	ledge.scale.setTo(0.5, 1);
	ledge = platforms.create(200, 150, 'floor');
    ledge.body.immovable = true;
	ledge.scale.setTo(1, 1);
	ledge = platforms.create(-100, 200, 'floor');
    ledge.body.immovable = true;
	ledge.scale.setTo(0.5, 0.5);
	
    sand = game.add.sprite(505, 500, 'sand');
    sign = game.add.sprite(700, 410, 'sign');
	
    player = game.add.sprite(32, game.world.height - 150, 'player');
	player.scale.setTo(0.5, 0.5);
	
	enemy = game.add.sprite(0, 0, 'enemy');
	enemy.scale.setTo(0.2, 0.2);
	
	enemy2 = game.add.sprite(200, 200, 'enemy');
	enemy2.scale.setTo(0.2, 0.2);
	
	enemy3 = game.add.sprite(200, 200, 'enemy');
	enemy3.scale.setTo(0.2, 0.2);
	
    game.physics.arcade.enable(player);
	game.physics.arcade.enable(enemy);
	game.physics.arcade.enable(enemy2);
	game.physics.arcade.enable(enemy3);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
	
	enemy.body.bounce.y = 0.2;
    enemy.body.gravity.y = 300;
    enemy.body.collideWorldBounds = true;
	
	enemy2.body.bounce.y = 0.2;
    enemy2.body.gravity.y = 300;
    enemy2.body.collideWorldBounds = true	
	
	enemy3.body.bounce.y = 0.2;
    enemy3.body.gravity.y = 300;
    enemy3.body.collideWorldBounds = true;

    potions = game.add.group();
    potions.enableBody = true;

    var random = game.rnd.realInRange(100, 500);
    var bottle = potions.create(random, random, 'bottle');
	bottle.scale.setTo(0.3, 0.3);
		
    bottle.body.gravity.y = 300;
		
    text = game.add.text(16, 16, "Collect the potions and don't get caught     	Human: 0%", {fontSize: '32px', fill: '#000' });

    cursors = game.input.keyboard.createCursorKeys();
	
	music = game.add.audio('music');
	music.volume = 0.08;
	music.allowMultiple = true;
	
}

function update() {
	
	game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(potions, platforms);
    game.physics.arcade.collide(player, key);
	
	game.physics.arcade.collide(enemy, platforms);
	game.physics.arcade.collide(enemy2, platforms);
	game.physics.arcade.collide(enemy3, platforms);
    
    game.physics.arcade.overlap(player, potions, collectPotion, collectPotion2);
	game.physics.arcade.overlap(player, enemy, collisionHandler);
	game.physics.arcade.overlap(player, enemy2, collisionHandler2);
	game.physics.arcade.overlap(player, enemy3, collisionHandler3);
	game.physics.arcade.overlap(key, player, collisionHandler4);
	
	
    player.body.velocity.x = 0;
	
	if (percent == 10) {
		text.text = "You are now fully human, grab the key and escape!";
		key = game.add.sprite(100, 270, 'key');
		door = game.add.sprite(650, 20, 'door');
	}
	
	game.physics.arcade.overlap(player, key, collision3);
	
    if (cursors.left.isDown) {
		player.body.velocity.x = -150;
		enemy.body.velocity.x = -200;
		enemy2.body.velocity.x = 200;
		enemy3.body.velocity.x = 50;
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
		enemy.body.velocity.x = 200;
		enemy2.body.velocity.x = -200;
		enemy3.body.velocity.x = -400;
    }
    else {
        player.animations.stop();
		enemy.animations.stop();
		enemy2.animations.stop();
		enemy3.animations.stop();
    }
    
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
		enemy.body.velocity.y = -350;
		enemy2.body.velocity.y = -350;
		enemy3.body.velocity.y = -350;
    }
}

function collectPotion (player, bottle) {
	
	music.play();
    bottle.kill();
    percent += 10;
    text.text = "Collect the potions and don't get caught     		Human: " + percent + "%";
}


function collectPotion2 (player, bottle) {
	
	if (percent < 90) {
		potions = game.add.group();
		potions.enableBody = true;
		var random = game.rnd.realInRange(100, 500);   
		var bottle = potions.create(random, random, 'bottle');
		bottle.scale.setTo(0.3, 0.3);
		bottle.body.gravity.y = 300;
	}   
}

function collisionHandler (player, enemy) {
    player.kill();
	enemy.kill();
	enemy2.kill();
	enemy3.kill();
	text.text = "You have been captured by your clones! \nBetter luck next time!";
}

function collisionHandler2 (player, enemy2) {
    player.kill();
	enemy.kill();
	enemy2.kill();
	enemy3.kill();
	text.text = "You have been captured by your clones! \nBetter luck next time!"; 
}

function collisionHandler3 (player, enemy3) {
    player.kill();
	enemy.kill();
	enemy2.kill();
	enemy3.kill();
	text.text = "You have been captured by your clones! \nBetter luck next time!"; 
}

function collisionHandler (player, key) {
    key.kill();
	text.text = "Go to the door!"; 
}
};