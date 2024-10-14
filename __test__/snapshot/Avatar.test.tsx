import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import renderer from 'react-test-renderer'

it('renderer language Switcher unchange', () => {
  const tree = renderer
    .create(
      <Avatar>
        <AvatarImage src={''} />
        <AvatarFallback>IM</AvatarFallback>
      </Avatar>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
