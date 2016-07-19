var frameNumber = 0,
	playback = 500,
	video = document.querySelector('video'),
	maxY = 750;

video.addEventListener('loadedmetadata', function() {
	console.log("video.duration", video.duration);
	window.requestAnimationFrame(scrollPlay);
});

function scrollPlay () {
	isTouching();
	//if (window.pageYOffset <= maxY) {
	//	var frameNumber = (window.pageYOffset / maxY) * video.duration;
	//	video.currentTime  = frameNumber;
	//	window.requestAnimationFrame(scrollPlay);
	//}
	var frameNumber = (window.pageYOffset / maxY) * video.duration;
	video.currentTime  = frameNumber;
	window.requestAnimationFrame(scrollPlay);
}

function isTouching () {
	if (window.pageYOffset >= video.offsetTop && window.pageYOffset < (video.offsetTop + video.offsetHeight) && !video.classList.contains('active')) {
		video.classList.add('active');
		console.log("LOCK!");
	} else if (window.pageYOffset > (video.offsetTop + video.offsetHeight) && video.classList.contains('active'))  {
		video.classList.remove('active');
		console.log("UNLOCK 'A'!");
	} else if (window.pageYOffset < video.offsetTop && video.classList.contains('active')) {
		video.classList.remove('active');		
		console.log("UNLOCK 'B'!");
	}
}