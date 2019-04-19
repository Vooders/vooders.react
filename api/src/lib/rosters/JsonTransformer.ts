export class JsonTransformer {
  static transform (roster: any) {
    return Transform.create(roster)
      .transformRoot()
      .simplifyCosts()
      .simplifyForces()
      .renameForceMeta()
      .simplifyForcesSelections()
      .renameForceSelectionMeta()
      .done()
  }
}

export class Transform {
  static create (ros: any) {
    return new Transform(ros.roster)
  }

  done () {
    return { roster: this.rosterData }
  }

  private constructor (
    public rosterData: any = {}
  ) {}

  transformRoot () {
    const newRos = this.renameKey('$', 'meta', this.rosterData)
    return new Transform(newRos)
  }

  simplifyCosts () {
    const costs = this.rosterData.costs.map((cost: any) => {
      return cost.cost.map((c: any) => c.$)
    })
    const newRos = this.replaceValue('costs', costs[0], this.rosterData)
    return new Transform(newRos)
  }

  simplifyForces () {
    const forces = this.rosterData.forces[0].force.map((force: any) => force)
    const newRos = this.replaceValue('forces', forces, this.rosterData)
    return new Transform(newRos)
  }

  renameForceMeta () {
    const forces = this.rosterData.forces.map((force: any) => {
      return this.renameKey('$', 'meta', force)
    })
    const newRos = this.replaceValue('forces', forces, this.rosterData)
    return new Transform(newRos)
  }

  simplifyForcesSelections () {
    const forces = this.rosterData.forces.map((force: any) => {
      const selections = force.selections[0].selection.map((selection: any) => selection)
      return this.replaceValue('selections', selections, force)
    })
    const newRos = this.replaceValue('forces', forces, this.rosterData)
    return new Transform(newRos)
  }

  renameForceSelectionMeta () {
    const forces = this.rosterData.forces.map((force: any) => {
      const selections = force.selections.map((selection: any) => {
        return this.renameKey('$', 'meta', selection)
      })
      return this.replaceValue('selections', selections, force)
    })
    const newRos = this.replaceValue('forces', forces, this.rosterData)
    return new Transform(newRos)
  }

  private renameKey = (
    oldKey: string, newKey: string, { [oldKey]: old, ...others }
  ) => {
    return {
      [newKey]: old,
      ...others
    }
  }

  private replaceValue = (
    key: string, newValue: any, { [key]: old, ...others }
  ) => {
    return {
      [key]: newValue,
      ...others
    }
  }
}
