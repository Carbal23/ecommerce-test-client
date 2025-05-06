/// <reference types="cypress" />

describe("<NuevoProducto/> Pruebas para creacion de nuevo producto", () => {
  it("<NuevoProducto/> verificar que no se visualize formulario si usuario no esta autenticado", () => {
    cy.visit("/newProduct");

    cy.get("[data-cy=unAuthorized]").should("exist");

    cy.get('[data-cy="unAuthorized"] h1').should(
      "contain.text",
      "Acceso Denegado"
    );

    cy.get('[data-cy="unAuthorized"] p').should(
      "contain.text",
      "Debes estar autenticado para acceder a esta sección."
    );

    cy.get('[data-cy="unAuthorized"] a')
      .should("contain.text", "Volver al Inicio")
      .should("have.attr", "href", "/");

    cy.get('[data-cy="unAuthorized"] a').click();
    cy.get("[data-cy=newProduct-button]").should("not.exist");
  });

  it("<NuevoProducto/> Login y navegacion a newProduct ", () => {
    cy.get("[data-cy=newProduct-button]").should("not.exist");
    cy.login();

    cy.get("[data-cy=newProduct-button]").should("exist").click();
    cy.url().should("include", "/newProduct");
  });

  it("<NuevoProducto/> Verificar formulario de nuevoProducto", () => {
    cy.login();

    cy.get("[data-cy=newProduct-button]").should("exist").click();

    cy.get("[data-cy=nuevoProducto-titulo-form]")
      .invoke("text")
      .should("equal", "Crear Nuevo Producto");
    cy.get("[data-cy=nuevoProducto-form]").should("be.visible");
    cy.get("[data-cy=nuevoProducto-titulo]").should("be.visible");
    cy.get("[data-cy=nuevoProducto-descripcion]").should("be.visible");
    cy.get("[data-cy=nuevoProducto-precio]").should("be.visible");
    cy.get("[data-cy=nuevoProducto-stock]").should("be.visible");
    cy.get("[data-cy=nuevoProducto-marca]").should("be.visible");
    cy.get("[data-cy=nuevoProducto-categoria]").should("be.visible");
    cy.get("[data-cy=nuevoProducto-dropzone]").should("exist");
    cy.get("[data-cy=nuevoProducto-submit]").should(
      "contain",
      "Crear Producto"
    );
    cy.get("[data-cy=nuevoProducto-cancelar]").should("contain", "Cancelar");
  });

  it("<NuevoProducto/> Validaciones de formulario", () => {
    cy.login();

    cy.get("[data-cy=newProduct-button]").click();

    //visualizacion de errores de validacion de formulario

    cy.get("[data-cy=nuevoProducto-submit]").click();

    cy.get("[data-cy=error-title]").should("contain", "Titulo es requerido");
    cy.get("[data-cy=error-description]").should(
      "contain",
      "Descripcion es requerido"
    );
    cy.get("[data-cy=error-price]").should("contain", "Precio es requerido");
    cy.get("[data-cy=error-brand]").should("contain", "Marca es requerida");
    cy.get("[data-cy=error-category]").should(
      "contain",
      "Categoria es requerida"
    );

    // validacion de stock es un entero

    cy.get("[data-cy=nuevoProducto-stock]").clear().type("1.2");
    cy.get("[data-cy=nuevoProducto-submit]").click();
    cy.get("[data-cy=error-stock]").should(
      "contain",
      "El stock debe ser un número entero"
    );

    // validacion de componente dropzone
    cy.get("[data-cy=nuevoProducto-dropzone]").within(() => {
      cy.contains(
        "Arrastra & suelta algunas imagenes aqui, o haz clic para seleccionar archivos"
      ).should("exist");
      cy.contains("Formatos: JPEG, JPG, PNG, WEBP (Max 5MB por imagen)").should(
        "exist"
      );
      cy.get("button").contains("Seleccionar archivos").should("be.visible");
    });

    //validacion de tipo de archivo en dropzone
    cy.get("[data-cy=nuevoProducto-dropzone] input[type='file']").selectFile(
      "cypress/fixtures/test-file.pdf",
      { force: true }
    );
    cy.get("[data-cy=alerta]")
      .should("exist")
      .and(
        "include.text",
        "Algunos archivos fueron rechazados. Solo se permiten imagenes (jpeg, jpg, png, webp) de hasta 5MB."
      )
      .and("have.class", "bg-red-500");

    //validacion de alerta por onsubmit sin imagenes
    cy.get("[data-cy=nuevoProducto-titulo]").type("Producto de prueba");
    cy.get("[data-cy=nuevoProducto-descripcion]").type("Descripcion de prueba");
    cy.get("[data-cy=nuevoProducto-precio]").type("100");
    cy.get("[data-cy=nuevoProducto-stock]").clear().type("10");
    cy.get("[data-cy=nuevoProducto-marca]").type("Marca de prueba");
    cy.get("[data-cy=nuevoProducto-categoria]").select("electronics");

    cy.intercept("POST", `${Cypress.env("backendUrl")}/api/product`, (req) => {
      req.reply({
        statusCode: 400,
        body: {
          success: false,
          status: 400,
          message: "Error en los datos del formulario",
          code: "INTERNAL_SERVER_ERROR",
          details: [
            {
              field: "images",
              error: "Images debe ser un array con al menos una imagen",
            },
          ],
        },
      });
    }).as("nuevoProductoError");

    cy.get("[data-cy=nuevoProducto-submit]").click();
    cy.wait("@nuevoProductoError");

    cy.get("[data-cy=alerta]")
      .should("exist")
      .and("include.text", "Error en los datos del formulario")
      .and("have.class", "bg-red-500");
  });

  it("<NuevoProducto/> Crear producto y visualizar detalle", () => {
    cy.login();

    cy.get("[data-cy=newProduct-button]").click();

    cy.get("[data-cy=nuevoProducto-titulo]").type("Producto de prueba");
    cy.get("[data-cy=nuevoProducto-descripcion]").type("Descripcion de prueba");
    cy.get("[data-cy=nuevoProducto-precio]").type("100");
    cy.get("[data-cy=nuevoProducto-stock]").type("10");
    cy.get("[data-cy=nuevoProducto-marca]").type("Marca de prueba");
    cy.get("[data-cy=nuevoProducto-categoria]").select("electronics");
    cy.get("[data-cy=nuevoProducto-dropzone] input[type='file']").selectFile(
      [
        "cypress/fixtures/test-image.jpeg",
        "cypress/fixtures/test-image-2.webp",
      ],
      { force: true }
    );

    cy.intercept("POST", `${Cypress.env("backendUrl")}/api/images`, (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          images: ["test-image.jpg", "test-image-2.webp"],
        },
      });
    }).as("cargueImagenesExitoso");

    cy.intercept("POST", `${Cypress.env("backendUrl")}/api/product`, (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          product: {
            rating: {
              count: 5,
              average: 4.8,
            },
            _id: "6813c9cf0ce5f301cb1666c5",
            title: "Producto de prueba",
            description: "Un producto increíble",
            price: 15000,
            brand: "Mi Marca",
            stock: 12,
            category: "Café",
            images: [
              {
                url: "/uploads/images/ypW589bpf.jpg",
                alt: "ypW589bpf.jpg",
                _id: "6813c9cf0ce5f301cb1666c6",
              },
              {
                url: "/uploads/images/NmoPEdN-u0.png",
                alt: "NmoPEdN-u0.png",
                _id: "6813c9cf0ce5f301cb1666c7",
              },
            ],
            createdAt: "2025-05-01T19:21:51.296Z",
          },
        },
      });
    }).as("nuevoProductoExitoso");

    cy.intercept(
      "GET",
      `${Cypress.env("backendUrl")}/api/product/6813c9cf0ce5f301cb1666c5`,
      (req) => {
        req.reply({
          statusCode: 200,
          body: {
            success: true,
            product: {
              rating: {
                count: 5,
                average: 4.8,
              },
              _id: "6813c9cf0ce5f301cb1666c5",
              title: "Producto de prueba",
              description: "Un producto increíble",
              price: 15000,
              brand: "Mi Marca",
              stock: 12,
              category: "Café",
              images: [
                {
                  url: "/uploads/images/ypW589bpf.jpg",
                  alt: "ypW589bpf.jpg",
                  _id: "6813c9cf0ce5f301cb1666c6",
                },
                {
                  url: "/uploads/images/NmoPEdN-u0.png",
                  alt: "NmoPEdN-u0.png",
                  _id: "6813c9cf0ce5f301cb1666c7",
                },
              ],
              createdAt: "2025-05-01T19:21:51.296Z",
            },
          },
        });
      }
    ).as("obtenerDetallesProducto");

    cy.get("[data-cy=nuevoProducto-submit]").click();

    cy.wait("@cargueImagenesExitoso");
    cy.wait("@nuevoProductoExitoso");

    cy.url().should("include", "/productDetail/6813c9cf0ce5f301cb1666c5");

    cy.wait("@obtenerDetallesProducto");

    cy.get("[data-cy=detalleProducto-titulo]")
      .should("be.visible")
      .should("contain", "Producto de prueba");
    cy.get("[data-cy=detalleProducto-descripcion]")
      .should("be.visible")
      .should("contain", "Un producto increíble");
    cy.get("[data-cy=detalleProducto-carousel]").should("be.visible");
    cy.get("[data-cy=detalleProducto-info]").should("be.visible");
    cy.get("[data-cy=detalleProducto-rating]").should("be.visible");
    cy.get("[data-cy=detalleProducto-addCar]").should("be.visible");
    cy.get("[data-cy=detalleProducto-authBuy]").should("not.exist");
  });
});
