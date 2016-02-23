var enemy_data = {
	enemy1 : {
		step : 5,
		bulletNum : 2,
		sightRange : 600,
		shootRange : 1000,
		findPathSpeed : 10,
		shootSpeed : 10,
		bulletStep : 10,
		bulletStyle : 2,
		hp : 10,
		value : 5
	},

	enemy2 : {
		step : 8,
		bulletNum : 3,
		sightRange : 900,
		shootRange : 1800,
		findPathSpeed : 40,
		shootSpeed : 6,
		bulletStep : 15,
		bulletStyle : 2,
		hp : 30,
		value : 20
	},

	enemy3 : {
		step : 5,
		bulletNum : 5,
		sightRange : 1500,
		shootRange : 2200,
		findPathSpeed : 40,
		shootSpeed : 3,
		bulletStep : 25,
		bulletStyle : 2,
		hp : 100,
		value : 60,
		shapes : [
			[50, 95, 235, 111],
			[3, 3, 145, 100],
			[3, 180, 145, 105]
		]
	}
};