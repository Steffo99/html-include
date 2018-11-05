function replace(element) {
    if(!element.children) return;
	for (var n in element.children) {
        console.info("Checking " + element.tagName + ".")
		if (element.children[n].hasAttribute && element.children[n].hasAttribute('data-include')) {
            loadIn(element.children[n], element.children[n].getAttribute('data-include'));
		}
        replace(element.children[n]);
	}
}

function loadIn(element, url) {
    console.info("Loading \"" + url + "\" .");
    fetch(url).done(function(response) {
        response.text().done(function(text) {
            element.innerHTML = text;
            replace(element.children[0]);
        });
    })
}

window.onload = function() {
    var body = document.getElementsByTagName("body")[0];
    replace(body);
}