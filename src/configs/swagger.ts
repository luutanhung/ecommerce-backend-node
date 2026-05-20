import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Ecommerce Backend Node",
      version: "1.0.0",
    },
  },

  apis: ["./src/**/*.route.ts", "./src/**/*.controller.ts"],
});
