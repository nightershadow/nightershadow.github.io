$("document").ready(function() {
	var location = window.location.href.split("?id=");
	var api_base = "http://192.168.160.39/api/Directors/";
	var viewDirectors = new function(){
		var self = this;
		var directorID = location[1];
		console.log(directorID);

		self.director = ko.observableArray();
		self.previousDirector = ko.observableArray();
		self.nextDirector = ko.observableArray();
		self.uniqueC = ko.observableArray();
		self.uniqueL = ko.observableArray();
		self.uniqueG = ko.observableArray();
		self.uniqueA = ko.observableArray();
		var movieCountry = [];
		var movieLanguage = [];
		var movieGenre = [];
		var movieActor = [];
		getDirector = function () {
			var final_link = api_base + directorID;
			console.log(final_link);
			$.getJSON(final_link, function(data) {
				if (data[0].photo === '/images/nophoto.png') {
					data[0].photo = './images/nophoto.png';
				};
				data[0].directorFacebookLikes = data[0].directorFacebookLikes + "&nbsp;<i class='fa fa-thumbs-o-up' aria-hidden='true'></i>"
				self.director(data);
				console.log("data principal: ")
				console.log(data);
				getCLD = function(){
					var uniqueName = [];
					var uniqueLang = [];
					var uniqueGen = [];
					var uniqueAct = [];
					for (var i = 0; i <= data[0].movies.length - 1; i++) {
						$.getJSON("http://192.168.160.39/api/Movies/" + data[0].movies[i].movieID, function(data2) {
							if(uniqueName.indexOf(data2[0].countryName) == -1) {
								uniqueName.push(data2[0].countryName);
								movieCountry.push(data2[0]);
								self.uniqueC(movieCountry);
								console.log("Paises unicos:");
								console.log(self.uniqueC());
							}
							if(uniqueLang.indexOf(data2[0].languageName) == -1) {
								uniqueLang.push(data2[0].languageName);
								movieLanguage.push(data2[0]);
								self.uniqueL(movieLanguage);
								console.log("Linguas unicos:");
								console.log(self.uniqueL());
							}
							for(var j = 0; j <= data2[0].genres.length - 1; j++){
								if(uniqueGen.indexOf(data2[0].genres[j].genreName) == -1) {
									uniqueGen.push(data2[0].genres[j].genreName);
									movieGenre.push(data2[0].genres[j]);
									self.uniqueG(movieGenre);
								}
							}
							for(var j = 0; j <= data2[0].movie_actors.length - 1; j++){
								if(uniqueAct.indexOf(data2[0].movie_actors[j].actorName) == -1) {
									uniqueAct.push(data2[0].movie_actors[j].actorName);
									movieActor.push(data2[0].movie_actors[j]);
									self.uniqueA(movieActor);
								}

							}
						})
					}
				}
				getCLD();	
			})
		};
		getDirector();
		getPreviousDirector = function() {
			if (directorID != 1){
				var final_link = api_base + (parseInt(directorID-1)).toString();
				console.log(final_link);
				$.getJSON(final_link, function(data) {
					if (data[0].photo === '/images/nophoto.png') {
						data[0].photo = './images/nophoto.png';
					};
					self.previousDirector(data);
					console.log(self.previousDirector());
				})
			}
			else{
				var data = {photo:"", directorID:"", actorName: ""};
				self.previousDirector(data);
			};
		}
		getPreviousDirector();
		getNextActor = function () {
			var final_link = api_base + (parseInt(directorID)+1).toString();
			console.log(final_link);
			$.getJSON(final_link, function(data) {
				if (data[0].photo === '/images/nophoto.png') {
					data[0].photo = './images/nophoto.png';
				};
				self.nextDirector(data);
				console.log(data);
			})
		}
		getNextActor();
	}
	ko.applyBindings(viewDirectors);
});
