function VideoPlayOnScroll (params) {

	// properties
	this.frameNr = 0

	// catch error
	try {

		if (typeof params.el === 'undefined') {

            throw new Error('Initialisation error VideoPlayOnScroll: Element missing!');

		} else {

			this.video = params.el;

		}

	} catch (e) {	

		window.alert(e.name + " " + e.message);

	}
 
	/**
     * Event Listeners
     */

    // initilise the scroll play after the video metadata is available
	this.video.addEventListener('loadedmetadata', function () {

		window.requestAnimationFrame(this.scrollPlay.bind(this));

	}.bind(this));

	// execute any callbacks after  the video terminares
	this.video.addEventListener('ended', function () {

		this.videoEndedCallback.call(this);

	}.bind(this));

	this.scrollPlay = function () {

		this.isTouching(this.video, this.setTime.bind(this));

		window.requestAnimationFrame(this.scrollPlay.bind(this));

	}

	this.setTime = function () {
		this.frameNr = (window.pageYOffset / (this.video.offsetTop + this.video.offsetHeight)) * this.video.duration;
		this.video.currentTime = this.frameNr;
	}

	this.isTouching = function (el, callback) {

		// toggle active class and set the duration if inside the boundaries
		if (window.pageYOffset >= el.offsetTop && window.pageYOffset < (el.offsetTop + el.offsetHeight) && !el.classList.contains('active')) {

			el.classList.add('active');

		} else if (window.pageYOffset > (el.offsetTop + el.offsetHeight) && el.classList.contains('active'))  {

			el.classList.remove('active');
			this.video.currentTime = this.video.duration;

		} else if (window.pageYOffset < el.offsetTop && el.classList.contains('active')) {

			el.classList.remove('active');		

		}

		// optimised to call only if inside the boundaries
		if (window.pageYOffset >= el.offsetTop && window.pageYOffset <= el.offsetTop + el.offsetHeight) {

			callback.call(this);

		}

	}

	this.videoEndedCallback = function () {

		console.log('video ended call back!');

	}

}

document.addEventListener('DOMContentLoaded', function () {

	new VideoPlayOnScroll({
		el: document.querySelector('video')
	});

}, false);