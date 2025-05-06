import './commands'

Cypress.on('uncaught:exception', (err) => {
  const expectedErrors = [
    'Usuario no existe',
    'Contraseña incorrecta',
    "El usuario ya existe",
    "Error en los datos del formulario"
  ];

  
  if (expectedErrors.some(expected => err.message.includes(expected))) {
    return false; 
  }

});
