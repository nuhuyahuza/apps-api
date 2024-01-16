import * as yup from 'yup'

const createUserSchema = yup.object({
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string().min(6),
})

const updateUserSchema = yup.object({
  id: yup.number().required(),
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string().min(6)
})

export { createUserSchema, updateUserSchema }
