'use strict';

chrome.runtime.sendMessage({id: "hello"}, function(response) {
	var query_array = response.results;
	var cut_time = response.cut_time;
	var html = '<p>';
	if (cut_time > 0) {
		html += 'Queries since ' + cut_time;
	}
	else {
		html += 'Queries since 24h ago';
	}
    html += '<ul>';
	var id = 0;
	query_array.forEach(function(query) {
			html += '<li><button id="' + id + '">&#10006;</button> ' + query + '</li>';
			console.log(query);
			id++;
		}
	);
	html += '</ul>';
	html += '</p>';
	$('#result_list').html(html);
});

  document.getElementById('keepButton').addEventListener('click', keep_fun);
  document.getElementById('resetButton').addEventListener('click', reset_fun);



function keep_fun() {
	console.log('keep');
}

function reset_fun() {
	console.log('reset');
	chrome.runtime.sendMessage({id: "set_time"}, function(response) {
	});
}