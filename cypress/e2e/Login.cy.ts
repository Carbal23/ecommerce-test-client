/// <reference types="cypress" />

describe("<Login/> Pruebas login", () => {
  beforeEach(() => {
    cy.visit('/login')
  })
  it("<Login/> verificar pantalla de login", () => {
    cy.get("[data-cy=login-titulo]")
      .invoke("text")
      .should("equal", "Iniciar Sesión");

    //revisar formulario
    cy.get("[data-cy=login-form]").should("exist");
    cy.get("[data-cy=login-email]").should("exist");
    cy.get("[data-cy=login-password]").should("exist");
    cy.get("[data-cy=login-submit]")
      .should("exist")
      .and("include.text", "Iniciar Sesión")
      .and("have.class", "bg-red-500")
      .and("have.class", "text-white")
      .and("have.class", "cursor-pointer")
      .and("have.class", "uppercase");
  });

  it("<Login/> Validaciones, alertas en formulario", () => {
    cy.get("[data-cy=login-submit]").should("exist").click();

    cy.get("[data-cy=error-email]").should("contain", "Email es requerido");
    cy.get("[data-cy=error-password]").should(
      "contain",
      "Password es requerido"
    );

    cy.get("[data-cy=login-email]").should("exist").type("correo@correo.com");
    cy.get("[data-cy=login-password]").should("exist").type("123456");

    cy.intercept("POST", `${Cypress.env('backendUrl')}/api/auth`, (req) => {
      req.reply({
        statusCode: 400,
        body: {
          success: false,
          status: 404,
          message: "Usuario no existe",
          code: "INTERNAL_SERVER_ERROR",
          details: [],
        },
      });
    }).as("loginError");

    cy.get("[data-cy=login-submit]").click();

    cy.wait("@loginError");

    cy.get("[data-cy=alerta]")
      .should("exist")
      .and("include.text", "Usuario no existe")
      .and("have.class", "bg-red-500");

    cy.wait(5000);

    cy.get("[data-cy=login-email]")
      .should("exist")
      .clear()
      .type("bella@correo.com");
    cy.get("[data-cy=login-password]").should("exist").clear().type("1234");

    cy.intercept("POST", `${Cypress.env('backendUrl')}/api/auth`, (req) => {
      req.reply({
        statusCode: 400,
        body: {
          "success": false,
          "status": 401,
          "message": "Contraseña incorrecta",
          "code": "INTERNAL_SERVER_ERROR",
          "details": []
      },
      });
    }).as("loginError");

    cy.get("[data-cy=login-submit]").click();

    cy.wait("@loginError");

    cy.get("[data-cy=alerta]")
      .should("exist")
      .and("include.text", "Contraseña incorrecta")
      .and("have.class", "bg-red-500");
  });

  it("<Login/> Login exitoso", () => {

    cy.get("[data-cy=login-email]").should("exist").clear().type("correo@correo.com");
    cy.get("[data-cy=login-password]").should("exist").clear().type("123456");

    cy.intercept("POST", `${Cypress.env('backendUrl')}/api/auth`, (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODEzYzdiYWU0NDBmOGFjNzMzMzUyMTkiLCJuYW1lIjoiTWF1cmljaW8gQ2FyYmFsIiwiZW1haWwiOiJjb3JyZW9AY29ycmVvLmNvbSIsImlhdCI6MTc0NjQyMjk3MSwiZXhwIjoxNzQ2NDUxNzcxfQ.FsJ8tVJHw0BKFtZVHrJhBpQqt-v8ELNhgxKEEC1IjRs",
          user: {
            _id: "6813c7bae440f8ac73335219",
            email: "correo@correo.com",
            name: "Mauricio Carbal",
          },
        },
      });
    }).as("login");

    cy.get("[data-cy=login-submit]").click();

    cy.wait("@login");

    cy.get('[data-cy="user-auth"]').should('exist')

    cy.get('[data-cy="user-auth"]')
      .contains(/^Bienvenido\s+\w+/)
      .should('be.visible')

    cy.get('[data-cy="user-auth"]')
      .find('button')
      .should('contain', 'Cerrar Sesión')
      .and('be.visible');

    cy.wait(3000);

    cy.get("[data-cy=cerrar-sesion]").should("exist");
    cy.get("[data-cy=cerrar-sesion]").click();
  });
});
