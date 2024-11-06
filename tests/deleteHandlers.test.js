// eslint-disable-next-line no-undef
const config = require('../config');

test('should create a kit, and then delete the kit and validate DEL response status and body', async () => { 
    let kitId;
    let actualDeleteResponseStatus;
	let actualDeleteResponseBody;

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

        // Step 2: Delete the kit after test completion
        const deleteResponse = await fetch(`${config.API_URL}/api/v1/kits/${kitId}`, {
            method: 'DELETE'
        });

        actualDeleteResponseStatus = deleteResponse.status;
		actualDeleteResponseBody = await deleteResponse.json();


    } catch (error) { 
        console.error(error);
    }
	
    expect(actualDeleteResponseStatus).toBe(200); 
	expect(actualDeleteResponseBody).toMatchObject({ ok: true }); 


});
