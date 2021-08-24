module.exports = {
    // operation's method
    get: {
        tags: ["Ride operations"], // operation's tag.
        description: "Get a ride by id", // operation's desc.
        operationId: "getRide", // unique operation id
        parameters: [
            // expected params.
            {
                name: "id", // name of the param
                in: "path", // location of the param
                schema: {
                    $ref: "#/components/schemas/rideID", // data model of the param
                },
                required: true, // Mandatory param
                description: "A single ride id", // param desc.
            },
        ],
        // expected responses
        responses: {
            // response code
            200: {
                description: "Ride is obtained", // response desc.
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
            // response code
            404: {
                description: "Ride is not found", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error", // error data model
                        },
                    },
                },
            },
        },
    },
};