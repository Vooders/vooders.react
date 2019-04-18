export class JsonTransformer {
  static transform (roster: any) {
    return Transform.create(roster)
      .transformRoot()
      .transformCosts()
  }
}

class Transform {
  static create (ros: any) {
    return new Transform(ros.roster)
  }

  private constructor (
    public roster: any = {}
  ) {}

  transformRoot () {
    const ros = this.renameKey('$', 'meta', this.roster)
    return new Transform(ros)
  }

  transformCosts () {
    const costs = this.roster.costs.map((cost: any) => {
      return cost.cost.map((c: any) => c.$)
    })
    this.roster.costs = costs[0]
    return new Transform(this.roster)
  }

  private renameKey = (
    oldKey: string, newKey: string, { [oldKey]: old, ...others }
  ) => {
    return {
      [newKey]: old,
      ...others
    };
  };
}
