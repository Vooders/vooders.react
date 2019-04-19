import { Gen } from 'verify-it'
import { Transform } from '../../../src/lib/rosters/JsonTransformer'

describe.only('Transform', () => {
  verify.it('transformRoot() should rename roster.$ to meta', Gen.object, (body) => {
    const orig = {
      roster: { $: body }
    }
    
    const expected = {
      roster: { meta: body }
    }
    Transform.create(orig).transformRoot().done().should.eql(expected)
  })

  verify.it('simplifyCosts() should simplify the array', Gen.object, Gen.object, (plBody, ptsBody) => {
    const orig = {
      roster: {
        costs: [{
          cost: [
            { $: plBody },
            { $: ptsBody }
          ]
        }]
      }
    }
    
    const expected = {
      roster: { costs: [plBody, ptsBody] }
    }
    Transform.create(orig).simplifyCosts().done().should.eql(expected)
  })

  verify.it('simplifyForces() should simplify the array', Gen.array(Gen.object, 3), (forces) => {
    const orig = {
      roster: {
        forces: [{ 
          force: forces 
        }]
      }
    }
    const expected = {
      roster: { forces: forces }
    }
    Transform.create(orig).simplifyForces().done().should.eql(expected)
  })

  verify.it('renameForceMeta() should rename $ to meta', Gen.object, (forceMeta) => {
    const orig = {
      roster: {
        forces: [{ 
          $: forceMeta 
        }]
      }
    }
    const expected = {
      roster: {
        forces: [{ meta: forceMeta }]
      }
    }
    Transform.create(orig).renameForceMeta().done().should.eql(expected)
  })

  // verify.it('simplifyForcesSelections() should simplify the array', Gen.array(Gen.object, 3), (forceSelections) => {
  //   const orig = {
  //     roster: {
  //       forces: [{ 
  //         selections: [{
  //           selection: forceSelections
  //         }]
  //       }]
  //     }
  //   }
  //   const expected = {
  //     roster: {
  //       forces: [{
  //         selections: forceSelections 
  //       }]
  //     }
  //   }
  //   Transform.create(orig).simplifyForcesSelections().done().should.eql(expected)
  // })

  verify.it('renameForceSelectionMeta() should rename $ to meta', Gen.object, (forceSelectionMeta) => {
    const orig = {
      roster: {
        forces: [{ 
          selections: [{ $: forceSelectionMeta }]
        }]
      }
    }
    const expected = {
      roster: {
        forces: [{ 
          selections: [{ meta: forceSelectionMeta }]
        }]
      }
    }
    Transform.create(orig).renameForceSelectionMeta().done().should.eql(expected)
  })
})