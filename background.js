'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.id == "hello") {
		chrome.storage.sync.get({'cut_time' : -1}, function (result) {
			var cut_time = result.cut_time;
			if (cut_time > 0) {
			chrome.history.search({text: 'google', maxResults: 10, startTime: cut_time-(1000*60*60*24*30)}, function(data) {
					var query_array = [];
					var id = 0;
					data.forEach(function(page) {
						console.log(page.url);
						var query = getUrlVars(page.url).q
						if (isEmpty(query)) {
							return;
						}
						query_array.push(query);
						id++;
					});
					sendResponse({farewell: "goodbye", results: query_array, cut_time: cut_time});
			});
			}
			else {
			chrome.history.search({text: 'google', maxResults: 10}, function(data) {
					var query_array = [];
					var id = 0;
					data.forEach(function(page) {
						console.log(page.url);
						var query = getUrlVars(page.url).q
						if (isEmpty(query)) {
							return;
						}
						query_array.push(query);
						id++;
					});
					sendResponse({farewell: "goodbye", results: query_array, cut_time: cut_time});
			});
			}
		});
		return true;
    }
    if (request.id == "set_time") {
		
		console.log('set_time');
		var d = new Date();
		var n = d.getTime();
		chrome.storage.sync.set({'cut_time': n}, function() {
			console.log(n);
		});
		sendResponse({farewell: "set_time"});
		return true;
	}
  }
);
  
function isEmpty(str)
{
	return (!str || 0 === str.length || /^\s*$/.test(str));
}
  
function getUrlVars(href)
{
    var vars = [], hash;
    var hashes = href.slice(href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}