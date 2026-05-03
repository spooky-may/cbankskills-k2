import { describe, it, expect } from 'vitest'
import { verticals } from '../content/verticals'

describe('verticals metadata', () => {
  it('exports 7 verticals', () => {
    expect(verticals).toHaveLength(7)
  })

  it('each vertical has required string fields', () => {
    for (const v of verticals) {
      expect(typeof v.slug).toBe('string')
      expect(v.slug.length).toBeGreaterThan(0)
      expect(typeof v.title).toBe('string')
      expect(typeof v.installCommand).toBe('string')
      expect(v.installCommand).toContain('claude')
    }
  })

  it('each vertical has at least one skill', () => {
    for (const v of verticals) {
      expect(Array.isArray(v.skills)).toBe(true)
      expect(v.skills.length).toBeGreaterThan(0)
    }
  })

  it('all slugs are unique', () => {
    const slugs = verticals.map(v => v.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('audience field is a valid value', () => {
    const valid = ['decision-maker', 'developer', 'both']
    for (const v of verticals) {
      expect(valid).toContain(v.audience)
    }
  })
})
