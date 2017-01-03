/*jslint devel: true, esversion: 6 */
/*global $, jQuery*/

(function () {
	'use strict';

	function makeNextPagePanel(nextPageToken) {
		var output = '<div class="panel panel-default"><div class="panel-body media">';

		output += '<div class="media-body">' + nextPageToken + '</div></div></div>';

		return output;
	}

	function makeItemPanel(item) {
		var thumbnail = item.snippet.thumbnails.default.url;
		var title = item.snippet.thumbnails.title;
		var description = item.snippet.description;

		var output = '<div class="panel panel-default"><div class="panel-body media">';

		output += '<div class="media-left"><img class="media-object" src="' + thumbnail + '" alt="' + title  + '"></div>';

		output += '<div class="media-body">' + description + '</div></div></div>';

		return output;
	}

	function renderSearchResults(items, element, nextPageToken=null) {
		var output = "";

		items.forEach(function(item) {
			console.log(item);
			output += makeItemPanel(item);
		});

		if (nextPageToken) {
			output += makeNextPagePanel(nextPageToken);
		}

		element.append(output);
	}

	function getYoutubeVideo(query) {
		$.ajax({
			type: 'GET',
			url: 'https://www.googleapis.com/youtube/v3/search',
			data: {
				part: 'snippet',
				key: 'AIzaSyBVqUB0mGsExdfxq1x7LiK2KGvJTPWDGJ4',
				q: query,
				maxResults: 20
			},
			dataType: 'json',
			success: function (data) {
				console.log(data);
				renderSearchResults(data.items, $('.js-media-list'), data.nextPageToken);
			},
			error: function (error) {
				console.log("Error: " + error);
			}
		});
	}

	$(document).ready(function () {

		getYoutubeVideo("Sample");
	});

}());
