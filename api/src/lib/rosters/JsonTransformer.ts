export class JsonTransformer {
  static transform (data: any) {
    const rosData = data.roster
    return {
      meta: rosData.$,
      costs: this.transformCosts(rosData.costs[0].cost || []),
      detachments: this.transformDetachments(rosData.forces[0].force || []) 
    }
  }

  private static transformDetachments (forcesArray: any[]) {
    return forcesArray.map((force: any) => {
      return {
        meta: force.$,
        units: this.transformUnits(force.selections[0].selection || [])
      }
    })
  }

  private static transformUnits (unitsArray: any[]) {
    return unitsArray.map((unit: any) => {
      return {
        meta: unit.$,
        rules: this.transformRules(unit.rules[0].rule || []),
        profiles: this.transformProfiles(unit.profiles[0].profile || []),
        selections: this.transformSelections(unit.selections[0].selection || []),
        costs: this.transformCosts(unit.costs[0].cost || []),
        categories: this.transformCategories(unit.categories[0].category || [])
      }
    })

  }

  private static transformCategories (categoriesArray: any[]) {
    return categoriesArray.map((category: any) =>{
      return {
        name: category.$.name,
        primary: category.$.primary
      }
    })
  }

  private static transformSelections (selectionsArray: any[]): any[] {
    return selectionsArray.map((selection) => {
      return {
        meta: selection.$,
        profiles: this.transformProfiles(selection.profiles[0].profile || []),
        selections: (selection.selections.length > 0) ? this.transformSelections(selection.selections[0].selection || []) : [],
        costs: this.transformCosts(selection.costs[0].cost || []),
        categories: this.transformCategories(selection.categories[0].category || [])
      }
    })
  }

  private static transformCosts (costsArray: any[]) {
    return costsArray.map((cost: any) => {
      return {
        name: cost.$.name,
        value: cost.$.value
      }
    })
  }

  private static transformCharacteristics (characteristicsArray: any[]) {
    return characteristicsArray.map((characteristic: any) => {
      return {
        name: characteristic.$.name,
        value: characteristic.$.value
      }
    })
  }

  private static transformRules (rulesArray: any[]) {
    return rulesArray.map((rule) => {
      return {
        name: rule.$.name,
        description: rule.description[0]
      }
    })
  }

  private static transformProfiles (profilesArray: any[]) {
    return profilesArray.map((profile: any) => {
      return {
        meta: profile.$,
        characteristics: this.transformCharacteristics(profile.characteristics[0].characteristic || [])
      }
    })
  }
}
