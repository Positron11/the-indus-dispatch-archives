// PDF presets
var total = 3;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Load thumbnails
for (var i = 1; i <= total; i++) {
	displayThumbnail("PDFs/" + pad(i, 2) + ".pdf");
}

// Main
$(function () {
	// dynamic date for copyright line
	var d = new Date(); 
	$("#year").text(d.getFullYear());

	// Set default has id no hash already
	if (!window.location.hash) {
		window.location.hash = "#archives";
	}
	
	// intial page
	changePage();

	// change page on hash change
	$(window).on('hashchange', function () {
		changePage();
	});
});


// Display thumbnail function 
function displayThumbnail(file_url) {
	// initialize container
	var container = document.createElement("a");
	var canvas = document.createElement("canvas");
	var info = document.createElement("div");
	
	// construct container
	$("#newsletters").append(container);
	$(container)
		.append(canvas)
		.append(info);
	
	// apply necessary attributes
	container.id = i;
	container.href = "PDFs/" + pad(i, 2) + ".pdf";
	$(container).addClass("unformatted newsletter loading"); 
	$(container).css("order", total - i);
	$(canvas).addClass("newsletter-canvas"); 
	$(info).addClass("newsletter-info"); 
	
	// calculate date
	var j = i + 7;
	var month = months[j % 12 != 0 ? (j % 12) - 1 : 11];
	var year = j % 12 != 0 ? 2020 + ((j - (j % 12)) / 12) : 2020 + (j / 12) - 1;
	
	// set info bar date text
	$(info).text(month + ", " + year + " • Issue #" + i); 

	// render thumbnail
	PDFJS.getDocument({ url: file_url }).then(function(pdf) {			
		pdf.getPage(1).then(function(page) {
			var scale_required = canvas.width / page.getViewport(1).width;
			var viewport = page.getViewport(scale_required);
			canvas.height = viewport.height;
			page.render({canvasContext: canvas.getContext('2d'), viewport: viewport}).then(function() {
				$(container).removeClass("loading"); 
			});
		});
	});
}


// Pad zeroes
function pad(num, size) {
	num = num.toString();
	while (num.length < size) num = "0" + num;
	return num;
}


// Order newsletters by oldest/newest
function orderNewsletters() {
	$(".newsletter").each(function() {
		$(this).css("order", $(this).css("order") == this.id ? total - this.id : this.id);
	});
	$("#newsletter_order").text(function(i, text) {
		return text === "Newest" ? "Oldest" : "Newest"
	});
	$("#sort_btn i").toggleClass("fa-flip-vertical");
}


// Dynamically change page content
function changePage() {
	$(".page").hide();
	$(window.location.hash + "_page").show();

	$(".nav-tab").removeClass("active");
	$("a[href$='" + window.location.hash + "']").addClass("active");

	$("#sort_btn").css("display", window.location.hash == "#archives" ? "inline-block" : "none");
}