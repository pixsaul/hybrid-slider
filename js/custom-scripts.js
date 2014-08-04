jQuery(document).ready(function($) {

//Convert vertical scroll to horizontal
$("#scroller").mousewheel(function(event, delta) {
	this.scrollLeft -= (delta * 2);
    event.preventDefault();
});


//Center scroller images when clicked
$("#scroller img").click(function() {
	var image_width = $(this).width() / 2;
	var window_width = $(window).width() / 2;
	var center_offset_width = window_width - image_width;
	$('#scroller').scrollTo(this, 600, {offset: function() { return {left: - center_offset_width}; }});
});

//Show description for the center image
//set scrolling flag
var lastScrollLeft = 0;
$('#scroller').scroll(function() {
    var documentScrollLeft = $('#scroller').scrollLeft();
    if (lastScrollLeft !== documentScrollLeft) {
		
		//Check to see if image is in center
		var horizontalCenter = Math.floor(window.innerWidth/2);
		
		$("#scroller li").each (function( index ) {
			var item_coords = $(this).position();
			var item_x_coord = item_coords['left'];
			//If image is already in center, do nothing.
			if ($(this).hasClass('active')) { } else {
				
				var item_width = $(this).width();
				//If the horizontal center falls within this image's dimensions, set it to active, son
				if ((horizontalCenter > item_x_coord) && (horizontalCenter < (item_x_coord + item_width))) {
			
					$("#scroller li").removeClass("active");
					$("#scroller li p.desc").stop().animate({opacity:0});
					$(this).addClass("active");
					$(this).children('p.desc').stop().animate({opacity:1});  
				}

			}

		});
		//update scrolling position
        lastScrollLeft = documentScrollLeft;
 	}
    
    
});





});


//Add margins to scroller, have to use window.load to wait for image loading.
(function($){
   $(window).load(function(){
		var window_width = $(window).width() / 2;

		var first_image_width = $("#scroller li img").first().width() / 2;
		//minus an extra 200 to account for left margin
		var first_offset_width = window_width - first_image_width - 200;
		//Have to set padding on the ul here to avoid conflicting with the center item detection later on
		$("#scroller ul").css('padding-left', first_offset_width);

		var last_image_width = $("#scroller li img").last().width() / 2;
		var last_offset_width = window_width - last_image_width;
		$("#scroller li").last().css('margin-right', last_offset_width);
		
		//Set correct scroller starting position
		$('#scroller').scrollTo(first_offset_width, 0);
		
		//fadeIn scroller once it's loaded
		//$('#scroller').animate({opacity:1});
		

   });
})(jQuery);

