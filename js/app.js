var frameNumber = 0,
	playback = 500,
	video = document.querySelector('video'),
	maxY = 750;

video.addEventListener('loadedmetadata', function() {
	console.log("video.duration", video.duration);
	window.requestAnimationFrame(scrollPlay);
});

function scrollPlay () {
	if (window.pageYOffset <= maxY) {
		var frameNumber = (window.pageYOffset / maxY) * video.duration;
		video.currentTime  = frameNumber;
		window.requestAnimationFrame(scrollPlay);
	}
}