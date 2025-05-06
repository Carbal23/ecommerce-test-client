/// <reference types="cypress" />

describe("<Registro/> Pruebas registro", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

    it("<Registro/> verificar pantalla de registro", () => {
      cy.get("[data-cy=registro-titulo]")
        .invoke("text")
        .should("equal", "Crear Cuenta");

      cy.get("[data-cy=registro-form]").should("exist");
      cy.get("[data-cy=registro-nombre]").should("exist");
      cy.get("[data-cy=registro-email]").should("exist");
      cy.get("[data-cy=registro-password]").should("exist");
      cy.get("[data-cy=registro-submit]")
        .should("exist")
        .and("include.text", "Crear Cuenta")
        .and("have.class", "bg-red-500")
        .and("have.class", "text-white")
        .and("have.class", "cursor-pointer")
        .and("have.class", "uppercase");
    });

    it("<Registro/> Validaciones de formulario vacio y correo existente", () => {
      cy.get("[data-cy=registro-submit]").click();

      cy.get("[data-cy=error-name]").should("contain", "Nombre es requerido");
      cy.get("[data-cy=error-email]").should("contain", "Email es requerido");
      cy.get("[data-cy=error-password]").should(
        "contain",
        "Contraseña es requerida"
      );

      cy.get("[data-cy=registro-nombre]").type("Mauricio");
      cy.get("[data-cy=registro-email]").type("correo@correo.com");
      cy.get("[data-cy=registro-password]").type("12345");
      cy.get("[data-cy=registro-submit]").click();

      cy.get("[data-cy=error-password]").should(
        "contain",
        "Contraseña debe tener almenos 6 caracteres"
      );

      cy.get("[data-cy=registro-password]").clear().type("123456");

      cy.intercept("POST", `${Cypress.env("backendUrl")}/api/users`, (req) => {
        req.reply({
          statusCode: 400,
          body: {
            success: false,
            status: 409,
            message: "El usuario ya existe",
            code: "INTERNAL_SERVER_ERROR",
            details: [],
          },
        });
      }).as("registroError");

      cy.get("[data-cy=registro-submit]").click();
      cy.wait("@registroError");

      cy.get("[data-cy=alerta]")
        .should("exist")
        .and("include.text", "El usuario ya existe")
        .and("have.class", "bg-red-500");
    });

  it("<Registro/> Registro exitoso", () => {
    cy.get("[data-cy=registro-nombre]").type("Nuevo Usuario");
    cy.get("[data-cy=registro-email]").type("nuevo@correo.com");
    cy.get("[data-cy=registro-password]").type("123456");

    cy.intercept("POST", `${Cypress.env("backendUrl")}/api/users`, (req) => {
      req.reply({
        statusCode: 200,
        body: { success: true, message: "Usuario creado correctamente" },
      });
    }).as("registroExitoso");

    cy.get("[data-cy=registro-submit]").click();
    cy.wait("@registroExitoso");

    cy.get("[data-cy=alerta]")
      .should("exist")
      .and("include.text", "Usuario creado correctamente")
      .and("have.class", "bg-green-500");
  });
});
