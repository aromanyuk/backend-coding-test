module.exports = {
    '/health': {
        get: {
            tags: ["Other"], // operation's tag.
            description: "Health check", // operation's desc.
            operationId: "health", // unique operation id.
            parameters: [], // expected params.
            // expected responses
            responses: {
                // response code
                200: {
                    description: "Server is operating", // response desc.
                },
            },
        },
    },
};
