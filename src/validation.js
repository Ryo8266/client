import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('not-null', {
    ...required,
    validate: value => value !== null && value !== undefined && value !== '',
    message: 'The {_field_} field is required'
})