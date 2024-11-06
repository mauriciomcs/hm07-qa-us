// eslint-disable-next-line no-undef
const config = require('../config');

test('should create a kit, Check response status and body, and then delete the kit', async () => { 
    let kitId;
    let actualPostResponseStatus;
	let actualPostResponseBody;

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
		actualPostResponseStatus = createResponse.status;
        actualPostResponseBody = await createResponse.json();
		console.log(actualPostResponseBody)
        kitId = actualPostResponseBody.id; 

        // Step 2: Delete the kit after test completion
        await fetch(`${config.API_URL}/api/v1/kits/${kitId}`, {
            method: 'DELETE'
        });


    } catch (error) { 
        console.error(error);
    }

    expect(actualPostResponseStatus).toBe(201); 
	expect(actualPostResponseBody.name).toBe("Automation testing");

	
});
