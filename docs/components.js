module.exports = {
    components: {
        schemas: {
            // rideID model
            rideID: {
                type: "integer", // data type
                description: "An id of a ride", // desc
                example: 1, // example of an id
            },
            // Ride model
            Ride: {
                type: "object", // data type
                properties: {
                    rideID: {
                        type: "number", // data-type
                        description: "An id of a ride", // desc
                        example: 1, // example of an id
                    },
                    startLat: {
                        type: "number", // data-type
                        description: "Latitude of starting point", // desc
                        example: 41.874,
                    },
                    startLong: {
                        type: "number", // data-type
                        description: "Longitude of starting point", // desc
                        example: -102.9923,
                    },
                    endLat: {
                        type: "number", // data-type
                        description: "Latitude of destination", // desc
                        example: 41.874,
                    },
                    endLong: {
                        type: "number", // data-type
                        description: "Longitude of destination", // desc
                        example: -102.9923,
                    },
                    riderName: {
                        type: "string", // data-type
                        description: "Name of a rider", // desc
                        example: "Morty",
                    },
                    driverName: {
                        type: "string", // data-type
                        description: "Name of a driver", // desc
                        example: "Rick",
                    },
                    driverVehicle: {
                        type: "string", // data-type
                        description: "Car description", // desc
                        example: "DeLorean DMC-12",
                    },
                    created: {
                        type: "date-time", // data type
                        description: "Ride creation date", // desc
                        example: "2021-08-23T10:23:29Z",
                    },
                },
            },
            // Ride input model
            RideInput: {
                type: "object", // data type
                properties: {
                    start_lat: {
                        type: "number", // data-type
                        description: "Latitude of starting point", // desc
                        example: 41.874,
                    },
                    start_long: {
                        type: "number", // data-type
                        description: "Longitude of starting point", // desc
                        example: -102.9923,
                    },
                    end_lat: {
                        type: "number", // data-type
                        description: "Latitude of destination", // desc
                        example: 41.874,
                    },
                    end_long: {
                        type: "number", // data-type
                        description: "Longitude of destination", // desc
                        example: -102.9923,
                    },
                    rider_name: {
                        type: "string", // data-type
                        description: "Name of a rider", // desc
                        example: "Morty",
                    },
                    driver_name: {
                        type: "string", // data-type
                        description: "Name of a driver", // desc
                        example: "Rick",
                    },
                    driver_vehicle: {
                        type: "string", // data-type
                        description: "Car description", // desc
                        example: "DeLorean DMC-12",
                    },
                },
            },
            // error model
            Error: {
                type: "object", //data type
                properties: {
                    error_code: {
                        type: "string", // data type
                        description: "Error internal code", // desc
                        example: "RIDES_NOT_FOUND_ERROR", // example of an error internal code
                    },
                    message: {
                        type: "string", // data type
                        description: "Error message", // desc
                        example: "Could not find any rides", // example of an error message
                    },
                },
            },
        },
    },
};