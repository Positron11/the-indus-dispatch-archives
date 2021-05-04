// Order newsletters by oldest/newest
function orderNewsletters() {
	$(".newsletter").each(function() {
		$(this).css("order", $(this).css("order") == this.id ? 9 - this.id : this.id);
	});
	$("#newsletter_order").text(function(i, text) {
		return text === "Newest" ? "Oldest" : "Newest"
	});
	$("#sort_btn i").toggleClass("fa-flip-vertical");
}