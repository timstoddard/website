import { getShells } from './Element'
import elements from './elements'

describe('Elements', () => {
  describe('Hydrogen', () => {
    it('no charge', () => {
      expect(getShells(elements[0])).toEqual(['1s1'])
    })

    it('+1 charge', () => {
      expect(getShells(elements[0], 1)).toEqual(['1s0'])
    })

    it('-1 charge', () => {
      expect(getShells(elements[0], -1)).toEqual(['1s2'])
    })
  })

  describe('Noble gases', () => {
    it('Helium', () => {
      expect(getShells(elements[1])).toEqual(['1s2'])
    })

    it('Neon', () => {
      expect(getShells(elements[9])).toEqual(['1s2', '2s2', '2p6'])
    })

    it('Argon', () => {
      expect(getShells(elements[17])).toEqual([
        '1s2',
        '2s2',
        '2p6',
        '3s2',
        '3p6',
      ])
    })

    it('Krypton', () => {
      expect(getShells(elements[35])).toEqual([
        '1s2',
        '2s2',
        '2p6',
        '3s2',
        '3p6',
        '4s2',
        '3d10',
        '4p6',
      ])
    })

    it('Xenon', () => {
      expect(getShells(elements[53])).toEqual([
        '1s2',
        '2s2',
        '2p6',
        '3s2',
        '3p6',
        '4s2',
        '3d10',
        '4p6',
        '5s2',
        '4d10',
        '5p6',
      ])
    })

    it('Radon', () => {
      expect(getShells(elements[85])).toEqual([
        '1s2',
        '2s2',
        '2p6',
        '3s2',
        '3p6',
        '4s2',
        '3d10',
        '4p6',
        '5s2',
        '4d10',
        '5p6',
        '6s2',
        '4f14',
        '5d10',
        '6p6',
      ])
    })
  })

  it('Iron, no charge', () => {
    expect(getShells(elements[25])).toEqual([
      '1s2',
      '2s2',
      '2p6',
      '3s2',
      '3p6',
      '4s2',
      '3d6',
    ])
  })

  it('Chromium, no charge', () => {
    expect(getShells(elements[23])).toEqual([
      '1s2',
      '2s2',
      '2p6',
      '3s2',
      '3p6',
      '4s1',
      '3d5',
    ])
  })

  describe('Manganese', () => {
    it('no charge', () => {
      expect(getShells(elements[24])).toEqual([
        '1s2',
        '2s2',
        '2p6',
        '3s2',
        '3p6',
        '4s2',
        '3d5',
      ])
    })

    it('2+ charge', () => {
      expect(getShells(elements[24], 2)).toEqual([
        '1s2',
        '2s2',
        '2p6',
        '3s2',
        '3p6',
        '3d5',
      ])
    })

    it('3+ charge', () => {
      expect(getShells(elements[24], 3)).toEqual([
        '1s2',
        '2s2',
        '2p6',
        '3s2',
        '3p6',
        '3d4',
      ])
    })
  })

  it('Copper, no charge', () => {
    expect(getShells(elements[28])).toEqual([
      '1s2',
      '2s2',
      '2p6',
      '3s2',
      '3p6',
      '4s1',
      '3d10',
    ])
  })

  describe('Vanadium', () => {
    it('no charge', () => {
      expect(getShells(elements[22])).toEqual([
        '1s2',
        '2s2',
        '2p6',
        '3s2',
        '3p6',
        '4s2',
        '3d3',
      ])
    })

    it('-1 charge', () => {
      expect(getShells(elements[22], -1)).toEqual([
        '1s2',
        '2s2',
        '2p6',
        '3s2',
        '3p6',
        '4s1',
        '3d5',
      ])
    })
  })
})
