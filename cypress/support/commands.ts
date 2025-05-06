/// <reference types="cypress" />


// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    /**
     * Comando personalizado para iniciar sesión.
     * @example cy.login()
     */
    login(): Chainable<void>;
  }
}

Cypress.Commands.add("login", () => {
  cy.visit("/login");
  cy.get("[data-cy=login-email]").type("correo@correo.com");
  cy.get("[data-cy=login-password]").type("123456");
  cy.intercept("POST", `${Cypress.env("backendUrl")}/api/auth`, (req) => {
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
});
