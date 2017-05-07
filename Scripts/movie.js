$("document").ready(function() {
	var location = window.location.href.split("?id=");
	var api_base = "http://192.168.160.39/api/Movies/";
	var viewMovies = new function(){
		var self = this;
		var movieID = location[1];
		self.movie = ko.observableArray();
		getMovie = function () {
			var final_link = api_base + movieID;
			console.log(final_link);
			$.getJSON(final_link, function(data) {
				if (data[0].poster == '/images/noposter.png') {
					data[0].poster = './images/noposter.png';
				};
				if (data[0].title_year == null){
					data[0].title_year = "";
				}
				data[0].movie_facebook_likes = data[0].movie_facebook_likes + " <i class='fa fa-thumbs-o-up' aria-hidden='true'></i>"
				/*for (var i = 0; i < data[0].movie_actors.length; i++){
					var link = "http://192.168.160.39/api/Actors/" + data[0].movie_actors[i].actorID;
					var pot = i;
					console.log(link);
					$.getJSON(link, function(data2) {
						if (data2[0].photo == '/images/nophoto.png') {
							data2[0].photo = './images/nophoto.png';
						};
						data[0].movie_actors[pot].photo = data2[0].photo;
						console.log(data[0].movie_actors[pot].photo);
					})
				}*/
				console.log(data);
				self.movie(data);
			})			
		}
		getMovie();
	}
	ko.applyBindings(viewMovies);
});
