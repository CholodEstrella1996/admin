const errorMessages = {
  form: {
    generic: `El campo no tiene un valor válido`,

    email: `El correo electrónico es inválido`,
    password: `La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número`,

    required: `Este campo es requerido`,

    min: (min: string) => `Debe tener un valor mayor o igual a ${min}`,
    max: (max: string) => `Debe tener un valor menor o igual a ${max}`,

    minLength: (length: string) => `Debe tener al menos ${length} caracteres`,
    maxLength: (length: string) => `Debe tener como máximo ${length} caracteres`,

    pattern: 'El formato del campo es inválido',

    valueAsNumber: 'El valor del campo es inválido, debe ser un número',
    valueAsDate: 'El valor del campo es inválido, debe ser una fecha',
    value: 'El valor del campo es inválido',

    disabled: 'El campo está deshabilitado',
    deps: 'El campo tiene dependencias',
  },
  api: {
    generic: `Error desconocido`,
    notFound: `No se encontró el recurso`,
    serverError: `Error del servidor`,
  },
}

export default errorMessages
