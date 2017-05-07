$("document").ready(function() {
	var location = window.location.href.split("?id=");
	var api_base = "http://192.168.160.39/api/Actors/";
	var viewActors = new function(){
		var self = this;
		var actorID = location[1];
		console.log(actorID);

		self.actor = ko.observableArray();
		self.previousActor = ko.observableArray();
		self.nextActor = ko.observableArray();
		self.uniqueC = ko.observableArray();
		self.uniqueL = ko.observableArray();
		self.uniqueD = ko.observableArray();
		self.uniqueG = ko.observableArray();
		var movieCountry = [];
		var movieLanguage = [];
		var movieDirector = [];
		var movieGenre = [];
		getActor = function () {
			var final_link = api_base + actorID;
			console.log(final_link);		
			$.getJSON(final_link, function(data) {
				if (data[0].photo === '/images/nophoto.png') {
					data[0].photo = './images/nophoto.png';
				};
				data[0].actorFacebookLikes = data[0].actorFacebookLikes + "&nbsp;<i class='fa fa-thumbs-o-up' aria-hidden='true'></i>"
				self.actor(data);
				console.log(data);
				getCLD = function(){
					var uniqueName = [];
					var uniqueLang = [];
					var uniqueDir = [];
					var uniqueGen = [];
					for (var i = 0; i <= data[0].actor_movies.length - 1; i++) {
						$.getJSON("http://192.168.160.39/api/Movies/" + data[0].actor_movies[i].movieID, function(data2) {

							if(uniqueName.indexOf(data2[0].countryName) == -1) {
								uniqueName.push(data2[0].countryName);
								movieCountry.push(data2[0]);
								self.uniqueC(movieCountry);
							}
							if(uniqueLang.indexOf(data2[0].languageName) == -1) {
								uniqueLang.push(data2[0].languageName);
								movieLanguage.push(data2[0]);
								self.uniqueL(movieLanguage);
							}
							if(uniqueDir.indexOf(data2[0].directorName) == -1) {
								uniqueDir.push(data2[0].directorName);
								movieDirector.push(data2[0]);
								self.uniqueD(movieDirector);
							}
							for(var j = 0; j <= data2[0].genres.length - 1; j++){
								if(uniqueGen.indexOf(data2[0].genres[j].genreName) == -1) {
									uniqueGen.push(data2[0].genres[j].genreName);
									movieGenre.push(data2[0].genres[j]);
									self.uniqueG(movieGenre);
								}

							}
							console.log(self.uniqueC());
						})
					}
				}
				getCLD();				
			})
		};
		getActor();
		getPreviousActor = function() {
			if (actorID != 1){
				var final_link = api_base + (parseInt(actorID-1)).toString();
				console.log(final_link);
				$.getJSON(final_link, function(data) {
					if (data[0].photo === '/images/nophoto.png') {
						data[0].photo = './images/nophoto.png';
					};
					self.previousActor(data);
					console.log(self.previousActor());
				})
			}
			else{
				var data = {photo:"", actorID:"", actorName: ""};
				self.previousActor(data);
			};
		}
		getPreviousActor();
		getNextActor = function () {
			var final_link = api_base + (parseInt(actorID)+1).toString();
			console.log(final_link);
			$.getJSON(final_link, function(data) {
				if (data[0].photo === '/images/nophoto.png') {
					data[0].photo = './images/nophoto.png';
				};
				self.nextActor(data);
				console.log(data);
			})
		}
		getNextActor();
	}
	ko.applyBindings(viewActors);
});
