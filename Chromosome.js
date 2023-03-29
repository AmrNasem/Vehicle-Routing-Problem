class Chromosome {
  constructor(length = 0, createGenes = true, genes = [], mutationRate = 0) {
    this.genes = genes;
    this.length = length;
    this.mutationRate = mutationRate;
    this.fitness = 0;
    if (createGenes) this.createGenes();
  }

  crossover(chromosome) {
    const pos = Math.floor(Math.random() * this.length);
    let child1 = new Chromosome(this.length, false);
    let child2 = new Chromosome(this.length, false);

    for (let i = 0; i < this.length; i++) {
      if (i < pos) {
        child1.genes.push(this.genes[i]);
        child2.genes.push(chromosome.genes[i]);
      } else {
        child1.genes.push(chromosome.genes[i]);
        child2.genes.push(this.genes[i]);
      }
    }
    return { child1, child2 };
  }

  createGenes() {
    for (let i = 0; i < this.length; i++)
      this.genes.push(Math.floor(Math.random() * 10));
  }

  mutate() {
    for (let i = 0; i < this.length; i++) {
      if (Math.random() < this.mutationRate) {
        this.genes[i] = Math.floor((this.genes[i] + Math.random()) / 2);
      }
    }
    return this;
  }
}
