if (window.innerHeight < window.innerWidth) $(".arrow").css("display", "block");

var click = new Audio();
click.src = "/preview/click.ogg";
click.load();

function playClick() { click.play(); }
function scrollDown(to) {
	$('html, body').animate({
		scrollTop: $(to).offset().top
	}, 1000);
}

$(window).scroll(function(){
	if ($(document).scrollTop() > 90)
		$("#arrowDown").css("display", "none");
});

function arrowScrol() {
	scrollDown('#scrollTo');
	setTimeout(function(){
		$(this).css('display', 'none');	
	}, 750);
}

$("#toDonate").click(function(e){
	e.preventDefault();
	scrollDown('#donate');
	playClick();
});

wow = new WOW({
	boxClass: 'wow',
	offset: 200,
	mobile: true,
	live: true
});
wow.init();

$(document).ready(function(){
	var s_bwidt = 870;
	var s_tpage = 5;
	var s_cpage = 1;
	$("#sfull").css("width", (s_bwidt * s_tpage) + "px");
	$("#sfull").css("margin-left", -(s_bwidt * s_cpage - s_bwidt) + "px");
	$("#snext").click(function() {
		if (s_cpage >= s_tpage) return;
		if (s_cpage == s_tpage-1) {$("#snext").css("opacity", "0.3"); $("#snext").css("cursor", "not-allowed");}
		$("#sprev").css("opacity", "1");
		$("#sprev").css("cursor", "pointer");
		++s_cpage;
		$("#sfull").animate({
			'marginLeft': -(s_bwidt * s_cpage - s_bwidt) + "px"
		}, 500);
	});
	$("#sprev").click(function() {
		if (s_cpage <= 1) return;
		if (s_cpage == 2) {$("#sprev").css("opacity", "0.3"); $("#sprev").css("cursor", "not-allowed");}
		$("#snext").css("opacity", "1");
		$("#snext").css("cursor", "pointer");
		--s_cpage;
		$("#sfull").animate({
			'marginLeft': -(s_bwidt * s_cpage - s_bwidt) + "px"
		}, 500);
	});
});