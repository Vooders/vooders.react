import immer from 'immer'

export class JsonTransformer {
  static transform (data: any) {
    const rosData = data.roster
    return {
      meta: this.pruneMeta(rosData.$),
      costs: this.transformCosts(rosData.costs[0].cost || []),
      detachments: this.transformDetachments(rosData.forces[0].force || []) 
    }
  }

  private static transformDetachments (forcesArray: any[]) {
    return forcesArray.map((force: any) => {
      return {
        meta: this.pruneMeta(force.$),
        units: this.transformSelections(force.selections[0].selection || [])
      }
    })
  }

  private static transformSelections (selectionsArray: any[]): any[] {
    return selectionsArray.map((sel) => {
      const selection = this.addMissingKeys(sel)
      return {
        meta: this.pruneMeta(selection.$),
        rules: this.transformRules(selection.rules[0].rule || []),
        profiles: this.transformProfiles(selection.profiles[0].profile || []),
        selections: (selection.selections.length > 0) ? 
          this.sortUnitSelections(this.transformSelections(selection.selections[0].selection || [])) : [],
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

  private static transformRules (rulesArray: any[]) {
    return rulesArray.map((rule) => {
      return {
        name: rule.$.name,
        description: rule.description[0]
      }
    })
  }

  private static transformProfiles (profilesArray: any[]) {
    const reduced = profilesArray.map((profile: any) => {
      return {
        meta: this.pruneMeta(profile.$),
        characteristics: this.transformCharacteristics(profile.characteristics[0].characteristic || [])
      }
    })
    return this.sortProfiles(reduced)
  }

  private static transformCharacteristics (characteristicsArray: any[]) {
    return characteristicsArray.map((characteristic: any) => {
      const value = characteristic.$.value || characteristic._
      return {
        name: characteristic.$.name,
        value
      }
    })
  }

  private static transformCategories (characteristicsArray: any[]) {
    const base: any = {
      primary: [],
      faction: [],
      others: []
    }

    return immer(base, (draft: any) => {
      characteristicsArray.forEach((characteristic: any) => {
        if (characteristic.$.primary === 'true') {
          draft.primary.push(characteristic.$.name)
        } else if (characteristic.$.name.includes('Faction:')) {
          draft.faction.push(characteristic.$.name.split(':')[1].trim())
        } else {
          draft.others.push(characteristic.$.name)
        }
      })
      draft.faction.reverse()
    })
  }

  private static sortProfiles (profileArray: any[]) {
    const base: any = {}
    const sorted = immer(base, (draft: any) => {
      profileArray.forEach((profile: any) => {
        const key = profile.meta.profileTypeName || profile.meta.typeName
        if (!draft[key]) {
          draft[key] = []
        }
        draft[key].push(profile)
      })
    })
    return sorted
  }

  private static sortUnitSelections (selectionsArray: any[]) {
    const base: any = {}
    const sorted = immer(base, (draft: any) => {
      selectionsArray.forEach((selections: any) => {
        Object.keys(selections.profiles).forEach((key) => {
          if (!draft[key]) {
            draft[key] = []
          }
          selections.profiles[key].forEach((selection: any) => {
            draft[key].push(selection)
          })
        })
      })
    })
    return sorted
  }

  private static pruneMeta (meta: any) {
    const keysToRemove = ['id', 'profileTypeId', 'gameSystemId', 'xmlns', 'entryId', 'catalogueId']
    return Object.keys(meta).reduce((output: any, key: string) => {
      if(!keysToRemove.includes(key)){
        return {...output, [key]: meta[key]}
      }
      return output
    }, {})
  }

  private static addMissingKeys (selection: any) {
    const keysToAdd = ['$', 'rules', 'profiles', 'selections', 'costs', 'categories']
    const keysPresent = Object.keys(selection)
    return keysToAdd.reduce((output: any, key) => {
      if(keysPresent.includes(key)) {
        return {...output, [key]: selection[key]}
      }
      return {...output, [key]: [{}]}
    }, {})
  }
}
