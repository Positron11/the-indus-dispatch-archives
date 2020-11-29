var total = 3;

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var d = new Date();
$("#year").text(d.getFullYear());

for (var i = 1; i <= total; i++) {
	displayThumbnail("PDFs/" + pad(i, 2) + ".pdf");
}

async function displayThumbnail(file_url) {
	var container = document.createElement("a");
	var canvas = document.createElement("canvas");
	var info = document.createElement("div");
	
	$("#newsletters").append(container);
	$(container)
		.append(canvas)
		.append(info);
	
	container.id = i;
	container.href = "#";
	$(container).addClass("unformatted newsletter loading"); 
	$(container).css("order", total - i);
	$(canvas).addClass("newsletter-canvas"); 
	$(info).addClass("newsletter-info"); 
	
	var j = i + 7;
	var month = months[j % 12 != 0 ? (j % 12) - 1 : 11];
	var year = j % 12 != 0 ? 2020 + ((j - (j % 12)) / 12) : 2020 + (j / 12) - 1;
	
	$(info).text(month + ", " + year + " • Issue #" + i); 

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

function pad(num, size) {
	num = num.toString();
	while (num.length < size) num = "0" + num;
	return num;
}

function orderNewsletters() {
	$(".newsletter").each(function() {
		$(this).css("order", $(this).css("order") == this.id ? total - this.id : this.id);
	});
	$("#newsletter_order").text(function(i, text) {
		return text === "Newest" ? "Oldest" : "Newest"
	});
	$("#sort_btn i").toggleClass("fa-flip-vertical");
}
