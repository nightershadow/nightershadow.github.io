$(function () {
	var ViewModel = function () {
		var self = this;

// Defenir as Pesquisas 

		self.pesquisaAtoresTexto = ko.observable("");
		self.atoresNumero = ko.observable(null);
		self.atores = ko.observableArray();
		self.ator_aleatorio = ko.observableArray();

		self.pesquisaDiretoresTexto = ko.observable("");
		self.diretoresNumero = ko.observable(null);
		self.diretores = ko.observableArray();

		self.pesquisaFilmesTexto = ko.observable("");
		self.filmesNumero = ko.observable(null);
		self.filmes = ko.observableArray();
		self.filme_aleatorio = ko.observableArray();

		self.pesquisaPaisesTexto = ko.observable("");
		self.paisesNumero = ko.observable(null);
		self.paises = ko.observableArray();

		self.pesquisaGenerosTexto = ko.observable("");
		self.generosNumero = ko.observable(null);
		self.generos = ko.observableArray();

		self.pesquisaLinguasTexto = ko.observable("");
		self.linguasNumero = ko.observable(null);
		self.linguas = ko.observableArray();

		var actorSort = $("#ordenacaoAct").val()
		$("#ordenacaoAct").change(function() {
			actorSort = $("#ordenacaoAct").val();
			if (self.pesquisaAtoresTexto().length == 0) {
				getAtores()
			};
		});

		var directorSort = $("#ordenacaoDir").val()
		$("#ordenacaoDir").change(function() {
			directorSort = $("#ordenacaoDir").val();
			if (self.pesquisaDiretoresTexto().length == 0) {
				getDiretores()
			};
		});

		var movieSort = $("#ordenacaoFil").val()
		$("#ordenacaoFil").change(function() {
			movieSort = $("#ordenacaoFil").val();
			if (self.pesquisaFilmesTexto().length == 0) {
				getFilmes()
			};
		});

		var randomMovieLock = 0
		var randomActorLock = 0

// Funções para Atores

		getAtores = function () {
			$.getJSON("http://192.168.160.39/api/Actors/Count", function(data) {
				self.atoresNumero(data);

				var numAtores = data;
				var ator1id = Math.floor(Math.random()*numAtores)+1
				if (randomActorLock != 1) {
					$.getJSON("http://192.168.160.39/api/Actors/" + ator1id, function(data) {
						if (data.lenght == 0) {
							getAtores;
						}
						else {
						randomActorLock = 1
						if (data[0].photo == '/images/nophoto.png') {
							data[0].photo = './images/nophoto.png'
						};
						self.ator_aleatorio(data);
						};
					});
				};
			});
			if (actorSort == "ALF") {
				$.getJSON("http://192.168.160.39/api/Actors", function(data) {
					self.atores(data);
				});	
			}
			else if (actorSort == "LIK") {
				$.getJSON("http://192.168.160.39/api/Actors/Likes", function(data) {
					self.atores(data);
				});	
			}
			else { console.log("BEEP BOOP ERROR")};
		};
		pesquisaAtores = function () {
			if (self.pesquisaAtoresTexto().length >= 3) {
			$.getJSON("http://192.168.160.39/api/Actors/Search/" + self.pesquisaAtoresTexto(), function(data) {
				self.atores(data);
			});
			}
			else if (self.pesquisaAtoresTexto().length >= 1) {
				$("#ordenacaoAct").prop("disabled", true);
			}
			else if (self.pesquisaAtoresTexto().length == 0) {
				$("#ordenacaoAct").prop("disabled", false);
				$.getJSON("http://192.168.160.39/api/Actors", function(data) {
				self.atores(data);
			});
			};
		};
		getAtores();

// Funções para Diretores

		getDiretores = function () {
			$.getJSON("http://192.168.160.39/api/Directors/Count", function(data) {
				self.diretoresNumero(data);
			});
			if (directorSort == "ALF") {
				$.getJSON("http://192.168.160.39/api/Directors", function(data) {
					self.diretores(data);
				});	
			}
			else if (directorSort == "LIK") {
				$.getJSON("http://192.168.160.39/api/Directors/Likes", function(data) {
					self.diretores(data);
				});	
			}
			else { console.log("BEEP BOOP ERROR")};
		};
		pesquisaDiretores = function () {
			if (self.pesquisaDiretoresTexto().length >= 3) {
			$.getJSON("http://192.168.160.39/api/Directors/Search/" + self.pesquisaDiretoresTexto(), function(data) {
				self.diretores(data);
			});
			}
			else if (self.pesquisaDiretoresTexto().length >= 1) {
				$("#ordenacaoDir").prop("disabled", true);
			}
			else if (self.pesquisaDiretoresTexto().length == 0) {
				$("#ordenacaoDir").prop("disabled", false);
				$.getJSON("http://192.168.160.39/api/Directors", function(data) {
				self.diretores(data);
			});
			};
		};
		getDiretores();

// Funções para Filmes
	
	getFilmes = function () {
			$.getJSON("http://192.168.160.39/api/Movies/Count", function(data) {
				self.filmesNumero(data);
				var numFilmes = data;
				var filme1id = Math.floor(Math.random()*numFilmes)+1
				if (randomMovieLock != 1) {
					$.getJSON("http://192.168.160.39/api/Movies/" + filme1id, function(data) {
						if (data.lenght == 0) {
							getFilmes;
						}
						else {
						randomMovieLock = 1
						if (data[0].poster == '/images/noposter.png') {
							data[0].poster = './images/noposter.png'
						};
						self.filme_aleatorio(data);
						console.log(data)
						};
					});
				};
			});
			if (movieSort == "ALF") {
				$.getJSON("http://192.168.160.39/api/Movies", function(data) {
					self.filmes(data);
				});	
			}
			else if (movieSort == "BUD") {
				$.getJSON("http://192.168.160.39/api/Movies/Budget", function(data) {
					self.filmes(data);
				});	
			}

			else if (movieSort == "GRO") {
				$.getJSON("http://192.168.160.39/api/Movies/Gross", function(data) {
					self.filmes(data);
				});	
			}
			else { console.log("BEEP BOOP ERROR")};
		};
		pesquisaFilmes = function () {
			if (self.pesquisaFilmesTexto().length >= 3) {
			$.getJSON("http://192.168.160.39/api/Movies/Search/" + self.pesquisaFilmesTexto(), function(data) {
				self.filmes(data);
			});
			}
			else if (self.pesquisaFilmesTexto().length >= 1) {
				$("#ordenacaoFil").prop("disabled", true);
			}
			else if (self.pesquisaFilmesTexto().length == 0) {
				$("#ordenacaoFil").prop("disabled", false);
				$.getJSON("http://192.168.160.39/api/Movies", function(data) {
				self.filmes(data);
			});
			};
		};
		getFilmes();

// Funções para Pesquisa Geográfica

	getPaises = function () {
			$.getJSON("http://192.168.160.39/api/Countries/Count", function(data) {
				self.paisesNumero(data);
			});
			$.getJSON("http://192.168.160.39/api/Countries", function(data) {
				self.paises(data);
			});
		};
		pesquisaPaises = function () {
			if (self.pesquisaPaisesTexto().length >= 3) {
			$.getJSON("http://192.168.160.39/api/Countries/Search/{}?name=" + self.pesquisaPaisesTexto(), function(data) {
				self.paises(data);
			});

			}
			else if (self.pesquisaPaisesTexto().length == 0) {
				$.getJSON("http://192.168.160.39/api/Countries", function(data) {
				self.paises(data);
			});
			};
		};
		getPaises();

// Funções para Pesquisa por Genero

	getGeneros = function () {
			$.getJSON("http://192.168.160.39/api/Genres/Count", function(data) {
				self.generosNumero(data);
			});
			$.getJSON("http://192.168.160.39/api/Genres", function(data) {
				self.generos(data);
			});
		};
		pesquisaGeneros = function () {
			if (self.pesquisaGenerosTexto().length >= 3) {
			$.getJSON("http://192.168.160.39/api/Genres/Search/" + self.pesquisaGenerosTexto(), function(data) {
				self.generos(data);
			});

			}
			else if (self.pesquisaGenerosTexto().length == 0) {
				$.getJSON("http://192.168.160.39/api/Genres", function(data) {
				self.generos(data);
			});
			};
		};
		getGeneros();

// Funções para Pesquisa por Lingua
	
	getLinguas = function () {
			$.getJSON("http://192.168.160.39/api/Languages/Count", function(data) {
				self.linguasNumero(data);
			});
			$.getJSON("http://192.168.160.39/api/Languages", function(data) {
				self.linguas(data);
			});
		};
		pesquisaLinguas = function () {
			if (self.pesquisaLinguasTexto().length >= 3) {
			$.getJSON("http://192.168.160.39/api/Languages/Search/" + self.pesquisaLinguasTexto(), function(data) {
				self.linguas(data);
			});

			}
			else if (self.pesquisaLinguasTexto().length == 0) {
				$.getJSON("http://192.168.160.39/api/Languages", function(data) {
				self.linguas(data);
			});
			};
		};
			;
		getLinguas();

	};
	ko.applyBindings(new ViewModel());
});

// Fim KO


