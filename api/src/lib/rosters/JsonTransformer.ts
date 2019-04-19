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

const simplifyArray = (arr: any[], key: string) => {
  return arr[0][key].map((selection: any) => selection)
}

const deepSimplify = (arr: any[], plural: string, singular: string ) => {
  return arr.map((element: any) => {
    const simplified = simplifyArray(element[plural], singular)
    return replaceValue(plural, simplified, element)
  })
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
    const newRos = renameKey('$', 'meta', this.rosterData)
    return new Transform(newRos)
  }

  simplifyCosts () {
    const costs = this.rosterData.costs.map((cost: any) => {
      return cost.cost.map((c: any) => c.$)
    })
    const newRos = replaceValue('costs', costs[0], this.rosterData)
    return new Transform(newRos)
  }

  simplifyForces () {
    const forces = simplifyArray(this.rosterData.forces, 'force')
    const newRos = replaceValue('forces', forces, this.rosterData)
    return new Transform(newRos)
  }

  renameForceMeta () {
    const forces = this.rosterData.forces.map((force: any) => {
      return renameKey('$', 'meta', force)
    })
    const newRos = replaceValue('forces', forces, this.rosterData)
    return new Transform(newRos)
  }

  simplifyForcesSelections () {
    const forces = deepSimplify(this.rosterData.forces, 'selections', 'selection')
    const newRos = replaceValue('forces', forces, this.rosterData)
    return new Transform(newRos)
  }

  renameForceSelectionMeta () {
    const forces = this.rosterData.forces.map((force: any) => {
      const selections = force.selections.map((selection: any) => {
        return renameKey('$', 'meta', selection)
      })
      return replaceValue('selections', selections, force)
    })
    const newRos = replaceValue('forces', forces, this.rosterData)
    return new Transform(newRos)
  }
}
