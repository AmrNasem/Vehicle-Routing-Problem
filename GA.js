class GA {
  constructor(
    crossoverRate = 0.8,
    mutationRate = 0.05,
    populationSize = 100,
    generationSize = 2000
  ) {
    this.initialValues();
    this.mutationRate = mutationRate;
    this.crossoverRate = crossoverRate;
    this.populationSize = populationSize;
    this.generationSize = generationSize;
    this.chromosomeSize = locations.length;
    this.totalFitness;
    this.currentGeneration = [];
    this.nextGeneration = [];
  }

  initialValues() {
    this.elitism = false;
  }

  go() {
    this.createPopulation();
    this.rankPopulation();
    for (let i = 0; i < this.generationSize; i++) {
      this.createNextGeneration();
      this.rankPopulation();
    }
  }

  createPopulation() {
    for (let i = 0; i < this.populationSize; i++) {
      const c = new Chromosome(this.chromosomeSize);
      this.currentGeneration.push(c);
    }
  }
  rankPopulation() {}
  createNextGeneration() {}
}
