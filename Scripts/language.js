$("document").ready(function() {
	var location = window.location.href.split("?id=");
	var api_base = "http://192.168.160.39/api/Languages/";
	var viewLanguages = new function(){
		var self = this;
		var languageID = location[1];
		self.language = ko.observableArray();
		self.previousLanguage = ko.observableArray();
		self.nextLanguage = ko.observableArray();
		getLanguage = function () {
			var final_link = api_base + languageID;
			console.log(final_link);
			$.getJSON(final_link, function(data) {
				console.log(data);
				self.language(data);
			})			
		}
		getLanguage();
		getPreviousLanguage = function() {
			if (languageID != 1){
				var final_link = api_base + (parseInt(languageID-1)).toString();
				console.log(final_link);
				$.getJSON(final_link, function(data) {
					self.previousLanguage(data);
					console.log(self.previousLanguage());
				})
			}
			else{
				var data = { languageID:"", languageName: ""};
				self.previousLanguage(data);
				console.log(self.previousLanguage());
			};
		}
		getPreviousLanguage();
		getNextLanguage = function () {
			var final_link = api_base + (parseInt(languageID)+1).toString();
			console.log(final_link);
			$.getJSON(final_link, function(data) {
				self.nextLanguage(data);
				console.log(data);
			})
		}
		getNextLanguage();
	}
	ko.applyBindings(viewLanguages);
});
