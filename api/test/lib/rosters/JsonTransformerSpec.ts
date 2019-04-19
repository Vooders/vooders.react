import { Gen } from 'verify-it'
import { RosterTransformer, ForcesTransformer, ForceSelectionTransformer } from '../../../src/lib/rosters/JsonTransformer'

describe.only('JsonTransformer', () => {
  describe('Transform', () => {
    verify.it('transformRoot() should rename roster.$ to meta', Gen.object, (body) => {
      const orig = {
        roster: { $: body }
      }
      
      const expected = {
        roster: { meta: body }
      }
      RosterTransformer.create(orig).transformRoot().done().should.eql(expected)
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
      RosterTransformer.create(orig).simplifyCosts().done().should.eql(expected)
    })
  })

  describe('TransformForces', () => {
    verify.it('simplify() should simplify the array', Gen.array(Gen.object, 3), (forces) => {
      const orig = [{ force: forces }]

      ForcesTransformer.create(orig).simplify().done().should.eql(forces)
    })

    verify.it('renameForceMeta() should rename $ to meta', Gen.object, (forceMeta) => {
      const orig = [{ $: forceMeta }]
      const expected = [{ meta: forceMeta }]

      ForcesTransformer.create(orig).renameMeta().done().should.eql(expected)
    })
  })

  describe('ForceSelectionTransformer', () => {
    verify.it('simplify() should simplify the array', Gen.array(Gen.object, 3), (forceSelections) => {
      const orig = [{
          selection: forceSelections
        }]

      ForceSelectionTransformer.create(orig).simplify().done().should.eql(forceSelections)
    })

    verify.it('renameForceSelectionMeta() should rename $ to meta', Gen.object, (forceSelectionMeta) => {
      const orig = [{ $: forceSelectionMeta }]
      const expected = [{ meta: forceSelectionMeta }]

      ForceSelectionTransformer.create(orig).renameMeta().done().should.eql(expected)
    })
  })
})