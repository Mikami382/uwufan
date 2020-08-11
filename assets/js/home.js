$('.text').html(function(i, html) {
  var chars = $.trim(html).split("");
  return '<span>' + chars.join('</span><span>') + '</span>';
});

$( ".title" ).click(function() {
	 $(".title").addClass("color-text-flow");
	 if (typeof authorized === 'undefined') {
	 	$('#login').css("display", "flex").hide().fadeIn('slow');
	 }
});

$("#login").on("submit", function(){
	$.post("/", $( this ).serialize(), function( data) {			
		let obj = jQuery.parseJSON(data);
		$('#login').fadeOut('fast', function() {			
			$('.info').fadeOut('slow', function () { 
				$('.info').html('');
				$.each(obj, function (index, value) {
					$('.info').append(`<a href="downloads/${value}">${value}</a>\n`);
				});		
				
				$('.info').fadeIn('fast', function() {
					$(".title").addClass("color-text-flow");
				});
			});		
		});	
	}).fail(function(data) {
		console.log(`Error POST login: ${data.status}`);
		alert('Invalid credentials');
	});

	return false;
});

jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

$(".error-wrapper").fadeIn();	

$(function() {
	count = 0
	$('body').vegas({
	  preload: true,
	  animation: 'random',
	  autoplay: false,
	  delay: 7000,
	  transition: [ 'fade', 'fade2', 'burn', 'blur', 'blur2', 'flash' ],
	  overlay: './overlays/05.png',
	  slides: [
		{ src: './slides/8mY1wUp.png' },
		{ src: './slides/snapshot_20171224_225328.jpg' },
		{ src: './slides/snapshot_20180111_191422.jpg' },
		{ src: './slides/snapshot_20171225_003200.jpg' },
		{ src: './slides/snapshot_20180112_213057.jpg' },
		{ src: './slides/snapshot_20180211_124702.jpg' },
		{ src: './slides/snapshot_20180211_125345.jpg' },
		{ src: './slides/snapshot_20180211_144417.jpg' },
		{ src: './slides/snapshot_20180211_170236.jpg' },
		{ src: './slides/snapshot_20180127_002127.jpg' },
		{ src: './slides/snapshot_20180211_205842.jpg' },
		{ src: './slides/snapshot_20180211_211055.jpg' },
		{ src: './slides/snapshot_20180211_214726.jpg' },
		{ src: './slides/snapshot_20180212_200442.jpg' },
		{ src: './slides/snapshot_20180317_213749.jpg' },
		{ src: './slides/snapshot_20180512_220756.jpg' },
		{ src: './slides/snapshot_20180513_145104.jpg' },
		{ src: './slides/snapshot_20180602_215436.jpg' },
	  ]
	});
	$(".vegas-overlay").hide();	
	$("html").click(function() {
		count++;
		console.log(count);
		if (count >= 10 && $(".error-wrapper").is(":visible")) {
			$('#music').trigger("play");
			$('#music').on('playing', function() {			
				$(".title").hide()
				$(".contact").hide()
				$(".man-icon").hide()
				$(".form-group").hide()
				$(".info").hide().fadeIn(3000).text("au cœur brisé..")
				setTimeout(function() {
					$(".error-wrapper").fadeOut();	
					$(".vegas-overlay").fadeIn();	
					$('body').vegas('play')
				}, 6000);
				
			});
		}
	});

});
	  


