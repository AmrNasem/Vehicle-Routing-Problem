class Chromosome {
  constructor(pool = [], depot, mutationRate = 0, genes = []) {
    this.pool = pool;
    this.depot = depot;
    this.genes = genes;
    this.length = genes.length || pool.length;
    this.mutationRate = mutationRate;
    this.fitness = 0;
    if (!genes.length) this.createGenes();
  }

  createGenes() {
    this.genes.push(this.depot);
    for (let i = 0; i < this.length; i++) {
      const randomLocation = Math.floor(Math.random() * this.length);
      const existing = this.genes.find(
        (gene) => gene.id === this.pool[randomLocation].id
      );

      // Remove duplicated genes
      if (existing) {
        i--;
        continue;
      }
      this.genes.push(this.pool[randomLocation]);
    }
    this.genes.push(this.depot);
    this.length = this.genes.length;
  }

  calcFitness() {
    for (let i = 1; i < this.length; i++) {
      const distance = Math.sqrt(
        (this.genes[i - 1].x - this.genes[i].x) ** 2 +
          (this.genes[i - 1].y - this.genes[i].y) ** 2
      );
      this.fitness += distance;
    }
    this.fitness = 1 / this.fitness;
    return this.fitness;
  }

  crossover(chromosome) {
    let pos = Math.floor(Math.random() * this.length - 1);
    if (pos === 0) pos++;
    let offSpr2Genes = [],
      offSpr1Genes = this.genes
        .slice(1, pos)
        .concat(chromosome.genes.slice(pos, chromosome.length - 1))
        .concat(this.genes.slice(pos, this.length - 1))
        .concat(chromosome.genes.slice(1, pos));

    for (let i = 0; i + 1 < offSpr1Genes.length; i++) {
      for (let j = i + 1; j < offSpr1Genes.length; j++) {
        if (offSpr1Genes[i].id === offSpr1Genes[j].id) {
          offSpr2Genes = offSpr2Genes.concat(offSpr1Genes.splice(j, 1));
        }
      }
      if (offSpr2Genes.length >= offSpr1Genes.length) break;
    }

    let offspring1 = new Chromosome(undefined, this.depot, this.mutationRate, [
      this.depot,
      ...offSpr1Genes,
      this.depot,
    ]);
    let offspring2 = new Chromosome(undefined, this.depot, this.mutationRate, [
      this.depot,
      ...offSpr2Genes,
      this.depot,
    ]);

    return { offspring1, offspring2 };
  }

  mutate() {
    for (let i = 1; i < this.length - 1; i++) {
      if (Math.random() < this.mutationRate) {
        let random = Math.floor(Math.random() * (this.length - 1));
        if (random === 0) random++;
        [this.genes[random], this.genes[i]] = [
          this.genes[i],
          this.genes[random],
        ];
      }
    }
    return this;
  }
}
