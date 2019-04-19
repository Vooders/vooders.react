export class JsonTransformer {
  static transform (roster: any) {
    return RosterTransformer.create(roster)
      .transformRoot()
      .simplifyCosts()
      .transformForces()
      .done()
  }
}

const renameKey = (
  oldKey: string, newKey: string, { [oldKey]: old, ...others }
) => {
  return {
    [newKey]: old,
    ...others
  }
}

const replaceValue = (
  key: string, newValue: any, { [key]: old, ...others }
) => {
  return {
    [key]: newValue,
    ...others
  }
}

export class RosterTransformer {
  static create (ros: any) {
    return new RosterTransformer(ros.roster)
  }

  done () {
    return { roster: this.rosterData }
  }

  private constructor (
    private readonly rosterData: any = {}
  ) {}

  transformRoot () {
    const newRos = renameKey('$', 'meta', this.rosterData)
    return new RosterTransformer(newRos)
  }

  simplifyCosts () {
    const costs = this.rosterData.costs.map((cost: any) => {
      return cost.cost.map((c: any) => c.$)
    })
    const newRos = replaceValue('costs', costs[0], this.rosterData)
    return new RosterTransformer(newRos)
  }

  transformForces () {
    const forces = ForcesTransformer.create(this.rosterData.forces)
      .simplify()
      .renameMeta()
      .transformSelections()
      .done()
    const newRos = replaceValue('forces', forces, this.rosterData)
    return new RosterTransformer(newRos)
  }
}

export class ForcesTransformer {
  private constructor (
    private readonly forcesData: any = []
  ) {}

  static create (input: any) {
    return new ForcesTransformer(input)
  }

  done () {
    return this.forcesData
  }

  simplify () {
    const forces = this.forcesData[0].force.map((force: any) => force)
    return new ForcesTransformer(forces)
  }

  renameMeta () {
    const forces = this.forcesData.map((force: any) => {
      return renameKey('$', 'meta', force)
    })
    return new ForcesTransformer(forces)
  }

  transformSelections () {
    console.log(JSON.stringify(this.forcesData, null, 2))
    const forces = this.forcesData.map((force: any) => {
      return ForceSelectionTransformer.create(force.selections)
        .simplify()
        .renameMeta()
        .done()
      })
    const newRos = replaceValue('selections', forces, this.forcesData)
    return new ForcesTransformer(newRos)
  }
}

export class ForceSelectionTransformer {
  private constructor (
    private readonly forcesSelectionsData: any = []
  ) {}

  static create (input: any) {
    return new ForceSelectionTransformer(input)
  }

  done () {
    return this.forcesSelectionsData
  }

  simplify () {
    const selections = this.forcesSelectionsData[0].selection.map((selection: any) => selection)
    return new ForceSelectionTransformer(selections)
  }

  renameMeta () {
    const selections = this.forcesSelectionsData.map((selection: any) => {
      return renameKey('$', 'meta', selection)
    })
    return new ForceSelectionTransformer(selections)
  }
}
