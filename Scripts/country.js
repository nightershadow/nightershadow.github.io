$("document").ready(function() {
	var location = window.location.href.split("?id=");
	var api_base = "http://192.168.160.39/api/Countries/";
	var viewCountries = new function(){
		var self = this;
		var countryID = location[1];
		self.country = ko.observableArray();
		self.previousCountry = ko.observableArray();
		self.nextCountry = ko.observableArray();
		getCountry = function () {
			var final_link = api_base + countryID;
			console.log(final_link);
			$.getJSON(final_link, function(data) {
				console.log(data);
				self.country(data);
			})			
		}
		getCountry();
		getPreviousCountry = function() {
			if (countryID != 1){
				var final_link = api_base + (parseInt(countryID-1)).toString();
				console.log(final_link);
				$.getJSON(final_link, function(data) {
					self.previousCountry(data);
					console.log(self.previousCountry());
				})
			}
			else{
				var data = { countryID:"", countryName: ""};
				self.previousCountry(data);
				console.log(self.previousCountry());
			};
		}
		getPreviousCountry();
		getNextCountry = function () {
			var final_link = api_base + (parseInt(countryID)+1).toString();
			console.log(final_link);
			$.getJSON(final_link, function(data) {
				self.nextCountry(data);
				console.log(data);
			})
		}
		getNextCountry();
	}
	ko.applyBindings(viewCountries);
});
