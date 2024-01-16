import * as yup from 'yup';

const createAppSchema = yup.object({
    name: yup.string().required(),
    icon: yup.string().required(),
    url: yup.string().url().required()
});

const updateAppSchema = yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
    icon: yup.string().required(),
    url: yup.string().url().required()
});

export {createAppSchema, updateAppSchema};