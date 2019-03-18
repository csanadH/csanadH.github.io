/*
	Typify by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

	});

})(jQuery);


let currentDrag;

document.addEventListener('DOMContentLoaded', (event) => {
	const images = document.getElementById('images').children;
	const leftside = document.getElementById('left-side');
	const rightside = document.getElementById('right-side');
	leftside.setAttribute('ondragover', 'onDragOver(event)');
	leftside.setAttribute('ondragleave', 'onDragLeave(event)');
	leftside.setAttribute('ondrop', 'onDrop(event)');
	
	rightside.setAttribute('ondragover', 'onDragOver(event)');
	rightside.setAttribute('ondragleave', 'onDragLeave(event)');
	rightside.setAttribute('ondrop', 'onDrop(event)');

	images[0].parentElement.setAttribute('ondragover', 'onDragOver(event)');
	images[0].parentElement.setAttribute('ondragleave', 'onDragLeave(event)');
	images[0].parentElement.setAttribute('ondrop', 'onDrop(event)');

	document.getElementById('save-button').addEventListener('click', onSaveClick);

	for (let i = 0; i < images.length; i++) {
		images[i].addEventListener('dragstart', onDragStart);
	};
});

function onDragStart() {
	currentDrag = this;
}

function onDragOver(event) {
	event.preventDefault();
	event.target.classList.add('dragged');
} 

function onDragLeave(event) {
	event.preventDefault();
	event.target.classList.remove('dragged');
}

function onDrop(event) {
	event.preventDefault();
	event.target.appendChild(currentDrag);
}

function onSaveClick() {
	const images = document.getElementById('images').children;
	const leftside = document.getElementById('left-side').children;
	const rightside = document.getElementById('right-side').children;

	console.log("images");
	for (let i = 0; i < images.length; i++) {
		console.log(images[i]);
	}
	console.log("leftside");
	for (let i = 0; i < leftside.length; i++) {
		console.log(leftside[i]);
	}
	console.log("rightside");
	for (let i = 0; i < rightside.length; i++) {
		console.log(rightside[i]);
	}
}