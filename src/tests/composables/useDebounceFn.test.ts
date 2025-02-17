import { describe, it, vi, expect } from 'vitest'
import { useDebouncedFn } from '@/composables/useDebounceFn'

describe('useDebouncedFn', () => {
  it('delays function execution', async () => {
    vi.useFakeTimers()
    const mockFn = vi.fn()
    const debouncedFn = useDebouncedFn(mockFn, 300)

    debouncedFn()
    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    expect(mockFn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  it('resets timer if called before delay', async () => {
    vi.useFakeTimers()
    const mockFn = vi.fn()
    const debouncedFn = useDebouncedFn(mockFn, 300)

    debouncedFn()
    vi.advanceTimersByTime(150)
    debouncedFn() // Reinicia o timer
    vi.advanceTimersByTime(150)
    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(150)
    expect(mockFn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })
})
