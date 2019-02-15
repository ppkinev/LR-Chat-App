import React from 'react'
import { storiesOf } from '@storybook/react'
import ButtonWide from '.'

storiesOf('ButtonWide', module)
  .add('generic', () => (<ButtonWide>Generic Button</ButtonWide>))
  .add('main', () => (<ButtonWide main>Main Button</ButtonWide>))
