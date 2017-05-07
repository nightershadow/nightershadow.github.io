$("document").ready(function() {
	var location = window.location.href.split("?id=");
	var api_base = "http://192.168.160.39/api/Genres/";
	var viewGenres = new function(){
		var self = this;
		var genreID = location[1];
		console.log(genreID);

		self.genre = ko.observableArray();
		self.previousGenre = ko.observableArray();
		self.nextGenre = ko.observableArray();
		getGenre = function () {
			var final_link = api_base + genreID;
			console.log(final_link);
			$.getJSON(final_link, function(data) {
				self.genre(data);
				console.log(data);
			})
		}
		getGenre();
		getPreviousGenre = function() {
			if (genreID != 1){
				var final_link = api_base + (parseInt(genreID-1)).toString();
				console.log(final_link);
				$.getJSON(final_link, function(data) {
					self.previousGenre(data);
					console.log(self.previousGenre());
				})
			}
			else{
				var data = { genreID:"", genreName: ""};
				self.previousGenre(data);
				console.log(self.previousGenre());
			};
		}
		getPreviousGenre();
		getNextGenre = function () {
			var final_link = api_base + (parseInt(genreID)+1).toString();
			console.log(final_link);
			$.getJSON(final_link, function(data) {
				self.nextGenre(data);
				console.log(data);
			})
		}
		getNextGenre();
	}
	ko.applyBindings(viewGenres);
});
