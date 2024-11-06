// eslint-disable-next-line no-undef
const config = require('../config');

test('Should check status code and response structure Warehouses', async () => { 
    let actualResponseStatus;
    let actualResponseBody
    try { 
        const response = await fetch(`${config.API_URL}/api/v1/warehouses`);
        actualResponseStatus = response.status 
        actualResponseBody = await response.json();

    } catch (error) { 
        console.error(error); 
    } 
    // Check if status code is 200
    expect(actualResponseStatus).toBe(200) 
    
    // Validate the structure and data types of each warehouse item
    actualResponseBody.forEach(warehouse => {
        expect(warehouse).toHaveProperty('name');
        expect(typeof warehouse.name).toBe('string'); // Check name is a string

        expect(warehouse).toHaveProperty('workingHours');
        expect(typeof warehouse.workingHours).toBe('object'); // Check workingHours is an object

        expect(warehouse.workingHours).toHaveProperty('start');
        expect(typeof warehouse.workingHours.start).toBe('number'); // Check start is a number

        expect(warehouse.workingHours).toHaveProperty('end');
        expect(typeof warehouse.workingHours.end).toBe('number'); // Check end is a number
    });

});

test('Should check status code and response structure Warehouses', async () => { 
    let actualResponseStatus;
    let actualResponseBody
    try { 
        const response = await fetch(`${config.API_URL}/api/v1/kits?cardId=2`);
        actualResponseStatus = response.status 
        actualResponseBody = await response.json();

    } catch (error) { 
        console.error(error); 
    } 
    // Check if status code is 200
    expect(actualResponseStatus).toBe(200) 
    

    // Iterate over each kit in the array to validate structure and data types
    actualResponseBody.forEach(kit => {
        expect(kit).toHaveProperty('id');
        expect(typeof kit.id).toBe('number'); 

        expect(kit).toHaveProperty('name');
        expect(typeof kit.name).toBe('string'); 

        expect(kit).toHaveProperty('productsCount');
        expect(typeof kit.productsCount).toBe('number'); 

        expect(kit).toHaveProperty('productsList');
        expect(Array.isArray(kit.productsList)).toBe(true);

        // Check structure and data types of each product in productsList
        kit.productsList.forEach(product => {
            expect(product).toHaveProperty('id');
            expect(typeof product.id).toBe('number'); 

            expect(product).toHaveProperty('name');
            expect(typeof product.name).toBe('string'); 

            expect(product).toHaveProperty('price');
            expect(typeof product.price).toBe('number'); 

            expect(product).toHaveProperty('weight');
            expect(typeof product.weight).toBe('number'); 

            expect(product).toHaveProperty('units');
            expect(typeof product.units).toBe('string'); 

            expect(product).toHaveProperty('quantity');
            expect(typeof product.quantity).toBe('number'); 
        });
    });

});
