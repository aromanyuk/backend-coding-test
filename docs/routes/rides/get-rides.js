module.exports = {
    // method of operation
    get: {
        tags: ["Ride operations"], // operation's tag.
        description: "Get rides", // operation's desc.
        operationId: "getRides", // unique operation id.
        parameters: [{
            in: 'query',
            name: 'page',
            schema: {
                type: 'integer',
                default: 0
            },
            description: 'Number of page'
        },{
            in: 'query',
            name: 'page_size',
            schema: {
                type: 'integer',
                default: 5
            },
            description: 'Size of rides array'
        }], // expected params.
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