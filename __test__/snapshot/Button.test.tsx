import { Button } from '@/components/ui/button'
import renderer from 'react-test-renderer'

it('renderer language Switcher unchange', () => {
  const tree = renderer.create(<Button variant={'destructive'}>Button Snapshot</Button>).toJSON()
  expect(tree).toMatchSnapshot()
})
