var frameNumber = 0,
	playback = 500,
	video = document.querySelector('video'),
	maxY = 750;

video.addEventListener('loadedmetadata', function () {
	console.log("video.duration", video.duration);
	window.requestAnimationFrame(scrollPlay);
});

video.addEventListener('ended', function () {
	console.log("video ended!");
});


function scrollPlay () {
	//if (window.pageYOffset <= maxY) {
	//	var frameNumber = (window.pageYOffset / maxY) * video.duration;
	//	video.currentTime  = frameNumber;
	//	window.requestAnimationFrame(scrollPlay);
	//}

	var callback = function () {
		var frameNumber = (window.pageYOffset / (video.offsetTop + video.offsetHeight)) * video.duration;
		video.currentTime  = frameNumber;
	}

	isTouching(video, callback);
	window.requestAnimationFrame(scrollPlay);

}

function isTouching (el, callback) {
	if (window.pageYOffset >= el.offsetTop && window.pageYOffset < (el.offsetTop + el.offsetHeight) && !el.classList.contains('active')) {
		el.classList.add('active');
		console.log("LOCK!");
	} else if (window.pageYOffset > (el.offsetTop + el.offsetHeight) && el.classList.contains('active'))  {
		el.classList.remove('active');
		video.currentTime = video.duration;
		console.log("UNLOCK 'A'!");
	} else if (window.pageYOffset < el.offsetTop && el.classList.contains('active')) {
		el.classList.remove('active');		
		console.log("UNLOCK 'B'!");
	}

	if (window.pageYOffset >= el.offsetTop && window.pageYOffset <= el.offsetTop + el.offsetHeight) {
		console.log('callback call');
		callback();
	}

}