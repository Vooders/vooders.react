export class JsonTransformer {
  static transform (data: any) {
    const rosData = data.roster
    const transformedJson = {
      meta: rosData.$,
      costs: simplifyDollarArray(rosData.costs, 'cost'),
      detachments: this.transformDetachments(rosData.forces[0].force || []) 
    }
    console.log(JSON.stringify(transformedJson, null, 2))
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
        rules: this.transformUintRules(unit.rules[0].rule || []),
        profiles: this.transformUnitProfiles(unit.profiles[0].profile || []),
        weapons: this.transformWeapons(unit.selections[0].selection || []),
        costs: simplifyDollarArray(unit.costs, 'cost'),
        keywords: this.transformUnitKeywords(unit.categories[0].category || [])
      }
    })
    // console.log(JSON.stringify(units, null, 2))
    return units
  }

  private static transformUintRules (unitRulesArray: any[]) {
    const unitRules = unitRulesArray.map((unitRule) => {
      return {
        name: unitRule.$.name,
        description: unitRule.description[0]
      }
    })
    return unitRules
  }

  private static transformUnitProfiles (unitProfilesArray: any[]) {
    const unitProfiles = unitProfilesArray.map((unitProfile: any) => {
      return {
        meta: unitProfile.$,
        characteristics: simplifyDollarArray(unitProfile.characteristics, 'characteristic')
      }
    })
    // console.log(JSON.stringify(unitProfiles, null, 2))
    return unitProfiles
  }

  private static transformUnitKeywords (unitKeywordsArray: any[]) {
    const unitKeywords = unitKeywordsArray.map((keyword: any) =>{
      return {
        name: keyword.$.name
      }
    })
    return unitKeywords
  }

  private static transformWeapons (unitWeaponsArray: any[]) {
    const unitWeapons = unitWeaponsArray.map((unitWeapon) => {
      // console.log(JSON.stringify(unitWeapon.profiles[0].profile, null, 2))
      return {
        meta: unitWeapon.$,
        profiles: this.transformWeaponProfiles(unitWeapon.profiles[0].profile || []),
        selections: unitWeapon.selections[0].selection || [],
        costs: simplifyDollarArray(unitWeapon.costs, 'cost'),
        categories: unitWeapon.categories[0].category || []
      }
    })
    // console.log(JSON.stringify(unitWeapons, null, 2))
    return unitWeapons
  }

  private static transformWeaponProfiles (weaponProfilesArray: any) {
    const weaponProfiles = weaponProfilesArray.map((weaponProfile: any) => {
      return {
        meta: weaponProfile.$,
        characteristics: simplifyDollarArray(weaponProfile.characteristics, 'characteristic')
      }
    })
    // console.log(JSON.stringify(weaponProfiles, null, 2))
    return weaponProfiles
  }
}

const simplifyDollarArray = (arr: any[], key: string) => {
  return arr[0][key].map((ele: any) => ele.$)
}
