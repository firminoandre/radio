import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UInput from '@/components/UI/UInput.vue'

describe('UInput', () => {
  it('renders correctly with placeholder', () => {
    const wrapper = mount(UInput, {
      props: {
        modelValue: '',
        placeholder: 'Enter text',
      },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Enter text')
  })

  it('updates modelValue on input', async () => {
    const wrapper = mount(UInput, {
      props: {
        modelValue: '',
        placeholder: 'Type here',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('Hello World')
    expect(input.element.value).toBe('Hello World')
  })
})
