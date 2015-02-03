/*jshint camelcase: true, browser:true, maxlen: 100, curly: true, eqeqeq: true, immed: true, latedef: true, noarg: true, noempty: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, maxdepth: 3, maxstatements:20, maxcomplexity: 5 */
/* global Fish:true, Food:true, Sim:true ,  sea:true*/


sea.randomPoint = function() {
	return {
		x: Math.random() * this.width,
		y: Math.random() * this.height
	};
};

sea.populateFish = function() {
	//console.log(Sim.threeD.dae);
	for (var i = 0; i < Sim.globals.POPULATION; i++) {

		var randomPoint = this.randomPoint();

		var fourRandoms = (Math.random() * Math.random() * Math.random() * Math.random());
		var randomMass = Sim.globals.MIN_MASS + fourRandoms * Sim.globals.MAX_MASS;


		var fish = new Fish(randomMass, randomPoint.x, randomPoint.y);


		this.population.push(fish);
	}
};

sea.populateFood = function() {
	//	var initialFood = Sim.globals.POPULATION * Sim.globals.FOOD_RATIO;
	for (var i = 0; i < Sim.globals.initialFood; i++) {
		// initial values
		var randomPoint2 = this.randomPoint();

		var foodAmmount = Math.random() * 100 + 20;

		// create food
		var food = new Food(randomPoint2.x, randomPoint2.y, foodAmmount);

		this.food.push(food);

	}

};
sea.updateFood = function() {

	for (var i = 0; i < this.food.length; i++) {
		var food = this.food[i];

		if (food && !food.dead && food !== null) {


			food.doUpdate(sea);
			food.doRender();
			//this.food[i].draw();

		}
		else {
			this.food[i] = null;
			if (Math.random() < 0.001) {
				this.food[i] = new Food(Math.random() * this.width, Math.random() * this.height, Math.random() * 100 + 20);
			}
		}
	}


};

sea.updateFish = function() {
	function isNotDead(element) {
		//var isDead = element === null || element.dead;
		return element !== null;
	}

	this.population = this.population.filter(isNotDead);
	for (var i = 0; i < this.population.length; i++) {
		this.population[i].swim(this);
		this.population[i].doUpdate(this);
		this.population[i].doRender();
		if (this.population[i].dead) {
			this.population[i] = null;
		}
	}

};
sea.init = function() {
	this.populateFish();
	this.populateFood();
};
sea.update = function() {
	this.updateFood();
	this.updateFish();
};
