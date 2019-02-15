import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette, size, font } from 'styled-theme'
import { EmailInput, TextInput, PasswordInput, FormError } from 'components'

const Label = styled.label`
  font-family: ${font('primary')};
  font-size: ${size('fontLabel')};
  color: ${palette('grayscale', 2)};
  line-height: 20px;
  padding: 0 10px;
`

const InputSetHolder = styled.div`
  margin: 0 0 5px;
  width: 100%;
`

const FormInputSet = (props) => {
  const { type, placeholder, label, value, onChange, error } = props
  let Input = TextInput
  switch (type) {
    case 'password':
      Input = PasswordInput
      break
    case 'email':
      Input = EmailInput
      break
    default:
      Input = TextInput
  }

  return (
    <InputSetHolder>
      {label && <Label>{label}</Label>}
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <FormError>{error}</FormError>}
    </InputSetHolder>
  )
}

FormInputSet.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
}

export default FormInputSet
