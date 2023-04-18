class GA {
  constructor(
    pool,
    depot,
    crossoverRate = 0,
    mutationRate = 0,
    populationSize = 1,
    generationSize = 0,
    elitism = true
  ) {
    this.mutationRate = mutationRate;
    this.crossoverRate = crossoverRate;
    this.populationSize = populationSize;
    this.generationSize = generationSize;
    this.pool = pool;
    this.depot = depot;
    this.elitism = elitism;
    this.currentGeneration = [];
    this.nextGeneration = [];
  }

  go() {
    this.createPopulation();
    this.rankPopulation();
    for (let i = 0; i < this.generationSize; i++) {
      console.log(`${(i / this.generationSize) * 100}%`);
      this.createNextGeneration();
      this.rankPopulation();
    }
    return this.currentGeneration;
  }

  createPopulation() {
    for (let i = 0; i < this.populationSize; i++) {
      const c = new Chromosome(this.pool, this.depot, this.mutationRate);
      this.currentGeneration.push(c);
    }
  }
  rankPopulation() {
    this.totalFitness = 0;
    this.currentGeneration.forEach(
      (chromosome) => (this.totalFitness += chromosome.calcFitness())
    );
    this.currentGeneration.sort((a, b) => a.fitness - b.fitness);
  }

  createNextGeneration() {
    this.nextGeneration = [];
    if (this.elitism) {
      this.nextGeneration.push(this.currentGeneration[this.populationSize - 1]);
    }
    for (let i = 0; i < this.populationSize - 1; i += 2) {
      let child1, child2;
      const parent1 = this.rouletteSelection();
      const parent2 = this.rouletteSelection();
      if (Math.random() < this.crossoverRate) {
        const { offspring1, offspring2 } = parent1.crossover(parent2);
        child1 = offspring1;
        child2 = offspring2;
      } else {
        child1 = parent1;
        child2 = parent2;
      }
      child1.mutate();
      child2.mutate();

      this.nextGeneration.push(child1);
      this.nextGeneration.push(child2);
    }
    this.currentGeneration = [...this.nextGeneration];
  }

  rouletteSelection() {
    const randomFitness = Math.random() * this.totalFitness;
    let increasingFitness = 0;
    for (let i = 0; i < this.populationSize; i++) {
      increasingFitness += this.currentGeneration[i].fitness;
      if (increasingFitness >= randomFitness) {
        return this.currentGeneration[i];
      }
    }
    return this.currentGeneration[this.populationSize - 1];
  }
}
