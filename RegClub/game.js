const config = {
type: Phaser.AUTO,
width: 360,
height: 640,
backgroundColor: "#1a1a2e",
physics: { default: 'arcade', arcade: { debug: false }},
scene: { preload, create, update }
};

let player, fairies, score = 0, scoreText, timerText, timeLeft = 30, gameOver = false;
new Phaser.Game(config);

function preload() {
this.load.image('player', 'assets/girl.png');
this.load.image('fairy1', 'assets/fairy1.png');
this.load.image('fairy2', 'assets/fairy2.png');
this.load.image('fairy3', 'assets/fairy3.png');
this.load.image('win', 'assets/win.png');
}

function create() {
player = this.physics.add.sprite(180, 500, 'player').setScale(0.25);
fairies = this.physics.add.group();

scoreText = this.add.text(10, 10, 'Очки: 0', { fontSize: '20px', fill: '#fff' });
timerText = this.add.text(300, 10, '30', { fontSize: '20px', fill: '#fff' });

this.input.on('pointermove', (pointer)=> {
player.x = pointer.x;
player.y = pointer.y;
});

this.time.addEvent({ delay: 800, callback: spawnFairy, callbackScope: this, loop: true });

this.time.addEvent({
delay: 1000,
callback: ()=>{
if (gameOver) return;
timeLeft--;
timerText.setText(timeLeft);
if (timeLeft <= 0) endGame.call(this);
},
loop: true
});

this.physics.add.overlap(player, fairies, catchFairy, null, this);
}

function spawnFairy() {
if (gameOver) return;
const types = ['fairy1','fairy2','fairy3'];
const random = Phaser.Math.RND.pick(types);
const fairy = fairies.create(Phaser.Math.Between(50,310), -50, random);
fairy.setVelocityY(200);
fairy.setScale(0.3);
}

function catchFairy(player, fairy) {
fairy.destroy();
score++;
scoreText.setText('Очки: ' + score);
}

function endGame() {
gameOver = true;
this.cameras.main.setBackgroundColor('#000');
this.add.text(20, 200, 'Реджина стала феей 💖', { fontSize: '26px', fill: '#fff', wordWrap: { width: 320 }});
this.add.image(180, 380, 'win').setScale(0.4);
}
