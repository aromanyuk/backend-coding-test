module.exports = {
    // method of operation
    get: {
        tags: ["Ride operations"], // operation's tag.
        description: "Get rides", // operation's desc.
        operationId: "getRides", // unique operation id.
        parameters: [], // expected params.
        // expected responses
        responses: {
            // response code
            200: {
                description: "Rides were obtained", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: "#/components/schemas/Ride", // Ride model
                            }
                        },
                    },
                },
            },
        },
    },
};