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
		var thumbnail = item.snippet.thumbnails.medium.url;
		var title = item.snippet.title;
		var description = item.snippet.description;
		var videoId = item.id.videoId;

		var output = '<div class="panel panel-default"><div class="panel-body media">';

		output += ('<div class="media-left">' +
			'<a href="https://www.youtube.com/watch?v=' + videoId + '">' +
			'<img class="media-object" src="' + thumbnail + '" alt="' + title  + '"></a></div>');

		output += ('<div class="media-body"><h3 class="media-heading">' + title + '</h3>' + description + '</div>');
		output += '</div></div>';

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
				maxResults: 10,
				type: 'video'
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

		$('.js-search-btn').on('click', function (event) {
			event.preventDefault();

			$('.js-media-list').empty();
			getYoutubeVideo($(this).parent().siblings('input').val());
		});
	});

}());
