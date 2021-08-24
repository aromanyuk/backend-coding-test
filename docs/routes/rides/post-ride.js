module.exports = {
    // operation's method
    post: {
      tags: ["Ride operations"], // operation's tag
      description: "Create ride", // short desc
      operationId: "createRide", // unique operation id
      parameters: [], // expected params
      requestBody: {
        // expected request body
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RideInput", // ride input data model
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        200: {
          description: "Ride created successfully", // response desc
        },
        // response code
        500: {
          description: "Server error", // response desc
        },
      },
    },
  };