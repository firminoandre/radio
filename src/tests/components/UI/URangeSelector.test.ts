import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import URangeSelector from '@/components/UI/URangeSelector.vue'

describe('URangeSelector', () => {
  it('renders correctly with given props', () => {
    const wrapper = mount(URangeSelector, {
      props: {
        min: '0',
        max: '100',
        step: '5',
      },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('range')
    expect(input.attributes('min')).toBe('0')
    expect(input.attributes('max')).toBe('100')
    expect(input.attributes('step')).toBe('5')
  })

  it('updates modelValue on input event', async () => {
    const wrapper = mount(URangeSelector, {
      props: {
        min: '0',
        max: '100',
        step: '5',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('50')
    expect(input.element.value).toBe('50')
  })

  it('emits input event when value changes', async () => {
    const emitSpy = vi.fn()
    const wrapper = mount(URangeSelector, {
      props: {
        min: '0',
        max: '100',
        step: '5',
      },
      attrs: {
        onInput: emitSpy,
      },
    })

    const input = wrapper.find('input')
    await input.setValue('75')
    expect(emitSpy).toHaveBeenCalled()
  })
})
