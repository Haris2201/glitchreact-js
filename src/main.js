var output;
var context;
var values = new Object();
var sound;
var width = 600;
var height = 400;

window.onload = function() {
	//width = window.innerWidth;
	//height = window.innerHeight;
	output = document.getElementById('output');
	context = output.getContext('2d');
	output.width = width;
	output.height = height;
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect (0, 0, width, height);

	var webaudio = new WebAudio();
	sound = webaudio.createSound();
	sound.load('./res/example.mp3', function(sound){
		sound.play();
	});

	window.setInterval("glitchToMusic()", 1000/30);
};

/*
window.onresize = function(event) {
	width = window.innerWidth;
	height = window.innerHeight;
	output.width = width;
	output.height = height;
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect (0, 0, width, height);
};
*/

function glitch() {
	getGlitchedImageSrc(context.getImageData(0, 0, width, height), values, draw);
}

function glitchToMusic() {
	var histogram = sound.makeHistogram(1);
	values.seed = (histogram[0]/10);
	values.quality = (histogram[0]/4)+75;
	values.amount = (histogram[0]/50);
	values.iterations = 1;
	glitch();
}

function draw(imageData) {
	output.width = imageData.width;
	output.height = imageData.height;
	context.putImageData(imageData, 0, 0);
}