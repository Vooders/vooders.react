export class JsonTransformer2 {
  static transform (data: any) {
    const rosData = data.roster
    return {
      meta: rosData.$,
      costs: simplifyDollarArray(rosData.costs, 'cost'),
      forces: rosData.forces[0].force
    }
  }
}

const simplifyDollarArray = (arr: any[], key: string) => {
  return arr[0][key].map((ele: any) => ele.$)
}

// const renameKey = (
//   oldKey: string, newKey: string, { [oldKey]: old, ...others }
// ) => {
//   return {
//     [newKey]: old,
//     ...others
//   }
// }
  
// const replaceValue = (
//   key: string, newValue: any, { [key]: old, ...others }
// ) => {
//   return {
//     [key]: newValue,
//     ...others
//   }
// }
