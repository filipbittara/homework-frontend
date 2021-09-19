import { shallowMount } from '@vue/test-utils'
import Message from '@/components/Message.vue'

describe('Message.vue', () => {
  it('renders SVG', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Message, {
      propsData: {
        username: 'Filip',
        date: '9/19/2021, 11:07:33 PM',
        svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="560" height="360"><defs/><g><path fill="none" stroke="red" paint-order="fill stroke markers" d=" M 235 173 L 235 173" stroke-miterlimit="10" stroke-dasharray=""/><path fill="none" stroke="red" paint-order="fill stroke markers" d=" M 251 169 L 252 169" stroke-miterlimit="10" stroke-dasharray=""/><path fill="none" stroke="red" paint-order="fill stroke markers" d=" M 252 169 L 253 169" stroke-miterlimit="10" stroke-dasharray=""/><path fill="none" stroke="red" paint-order="fill stroke markers" d=" M 253 169 L 253 169" stroke-miterlimit="10" stroke-dasharray=""/></g></svg>'
      }
    })
    expect(wrapper.text()).toContain('Filip');
    expect(wrapper.find('svg').exists()).toBe(true);
  })
})