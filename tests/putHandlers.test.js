// eslint-disable-next-line no-undef
const config = require('../config');

test('should create a kit, update the order with PUT check response status and body, and then delete the kit', async () => { 
    let kitId;
    let actualPutResponseStatus;
	let actualPutResponseBody;

    try {
        // Step 1: Create a kit
        const createResponse = await fetch(`${config.API_URL}/api/v1/kits`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                cardId: 1, 
                name: "Automation testing" 
            })
        });
        
        const createdKit = await createResponse.json();
        kitId = createdKit.id; 
        
        // Step 2: Perform PUT to update the kit's order
        const putResponse = await fetch(`${config.API_URL}/api/v1/kits/${kitId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productsList: [
                    { id: 1, quantity: 4 },
                    { id: 5, quantity: 2 },
                    { id: 3, quantity: 1 },
                    { id: 4, quantity: 1 }
                ]
            })
        });

        actualPutResponseStatus = putResponse.status;
		actualPutResponseBody = await putResponse.json();

        // Step 3: Delete the kit after test completion
        await fetch(`${config.API_URL}/api/v1/kits/${kitId}`, {
            method: 'DELETE'
        });


    } catch (error) { 
        console.error(error);
    }

    expect(actualPutResponseStatus).toBe(200); 
	expect(actualPutResponseBody).toMatchObject({ ok: true });

	
});
