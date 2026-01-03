const mongoose = require("mongoose");

async function dropIndex() {
    // Found URI in .env: mongodb+srv://codemiedu:getintoticketapp@ticketapp.psxpgms.mongodb.net/development
    const uri = "mongodb+srv://codemiedu:getintoticketapp@ticketapp.psxpgms.mongodb.net/development";
    console.log("Connecting to DB...");

    try {
        await mongoose.connect(uri);
        console.log("Connected to DB");

        const db = mongoose.connection.db;
        const profiles = db.collection('profiles');

        // List indexes first
        const indexes = await profiles.indexes();
        console.log("Current Indexes:", indexes.map((i: any) => i.name));

        // Drop the specific index
        if (indexes.some((i: any) => i.name === 'firstName_1')) {
            await profiles.dropIndex('firstName_1');
            console.log("Successfully dropped index: firstName_1");
        } else {
            console.log("Index firstName_1 not found by name. Checking keys...");
            // Check for any unique index on firstName
            const badIndex = indexes.find((i: any) => i.key && i.key.firstName);
            if (badIndex) {
                await profiles.dropIndex(badIndex.name);
                console.log(`Dropped index by key: ${badIndex.name}`);
            } else {
                console.log("No conflicting indexes found.");
            }
        }

    } catch (error) {
        console.error("Error executing script:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected");
        process.exit(0);
    }
}

dropIndex();
