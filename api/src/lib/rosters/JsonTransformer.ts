export class JsonTransformer {
  static transform (data: any) {
    const rosData = data.roster
    const transformedJson = {
      meta: rosData.$,
      costs: this.transformCosts(rosData.costs[0].cost || []),
      detachments: this.transformDetachments(rosData.forces[0].force || []) 
    }
    // console.log(JSON.stringify(transformedJson, null, 2))
    return transformedJson
  }

  private static transformDetachments (forcesArray: any[]) {
    const forces = forcesArray.map((force: any) => {
      return {
        meta: force.$,
        units: this.transformUnits(force.selections[0].selection || [])
      }
    })
    // console.log(JSON.stringify(forces, null, 2))
    return forces
  }

  private static transformUnits (unitsArray: any[]) {
    const units = unitsArray.map((unit: any) => {
      return {
        meta: unit.$,
        rules: this.transformRules(unit.rules[0].rule || []),
        profiles: this.transformProfiles(unit.profiles[0].profile || []),
        selections: this.transformSelections(unit.selections[0].selection || []),
        costs: this.transformCosts(unit.costs[0].cost || []),
        categories: this.transformCategories(unit.categories[0].category || [])
      }
    })
    console.log(JSON.stringify(units, null, 2))
    return units
  }

  private static transformCategories (categoriesArray: any[]) {
    const categories = categoriesArray.map((category: any) =>{
      return {
        name: category.$.name
      }
    })
    return categories
  }

  private static transformSelections (selectionsArray: any[]): any[] {
    const selections = selectionsArray.map((selection) => {
      // console.log(JSON.stringify(unitWeapon.profiles[0].profile, null, 2))
      return {
        meta: selection.$,
        profiles: this.transformProfiles(selection.profiles[0].profile || []),
        selections: (selection.selections.length > 0) ? this.transformSelections(selection.selections[0].selection || []) : [],
        costs: this.transformCosts(selection.costs[0].cost || []),
        categories: this.transformCategories(selection.categories[0].category || [])
      }
    })
    // console.log(JSON.stringify(selections, null, 2))
    return selections
  }

  private static transformCosts (costsArray: any[]) {
    return costsArray.map((cost: any) => cost.$)
  }

  private static transformRules (rulesArray: any[]) {
    const rules = rulesArray.map((rule) => {
      return {
        name: rule.$.name,
        description: rule.description[0]
      }
    })
    return rules
  }

  private static transformProfiles (profilesArray: any[]) {
    const profiles = profilesArray.map((profile: any) => {
      return {
        meta: profile.$,
        characteristics: simplifyDollarArray(profile.characteristics, 'characteristic')
      }
    })
    // console.log(JSON.stringify(unitProfiles, null, 2))
    return profiles
  }
}

const simplifyDollarArray = (arr: any[], key: string) => {
  return arr[0][key].map((ele: any) => ele.$)
}
