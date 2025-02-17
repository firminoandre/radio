import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UCheckbox from '@/components/UI/UCheckbox.vue'

describe('UCheckbox', () => {
  it('renders correctly and binds value', async () => {
    const wrapper = mount(UCheckbox, {
      props: { value: true },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.element.checked).toBe(false)

    await input.setValue(true)
    expect(input.element.checked).toBe(true)
  })

  it('updates model value when clicked', async () => {
    const wrapper = mount(UCheckbox, {
      props: { value: false },
    })

    const input = wrapper.find('input')
    await input.setValue(true)
    expect(input.element.checked).toBe(true)
  })
})
