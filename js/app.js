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
	this.video.addEventListener('loadedmetadata', function () {
		window.requestAnimationFrame(this.scrollPlay.bind(this));
	}.bind(this));

	this.video.addEventListener('ended', function () {
		console.log('video ended!');
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

		if (window.pageYOffset >= el.offsetTop && window.pageYOffset < (el.offsetTop + el.offsetHeight) && !el.classList.contains('active')) {
			el.classList.add('active');
			console.log("LOCK!");
		} else if (window.pageYOffset > (el.offsetTop + el.offsetHeight) && el.classList.contains('active'))  {
			el.classList.remove('active');
			this.video.currentTime = this.video.duration;
			console.log("UNLOCK 'A'!");
		} else if (window.pageYOffset < el.offsetTop && el.classList.contains('active')) {
			el.classList.remove('active');		
			console.log("UNLOCK 'B'!");
		}

		if (window.pageYOffset >= el.offsetTop && window.pageYOffset <= el.offsetTop + el.offsetHeight) {
			console.log('callback call');
			callback.call(this);
		}

	}

}

document.addEventListener('DOMContentLoaded', function () {

	new VideoPlayOnScroll({
		el: document.querySelector('video')
	});

}, false);