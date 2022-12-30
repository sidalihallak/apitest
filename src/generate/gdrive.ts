const fs = require('fs').promises;
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const stream = require("stream");
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = path.join(process.cwd(), 'dist/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'dist/credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
export async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
export async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
export async function listFiles(authClient) {
    const drive = google.drive({version: 'v2', auth: authClient});
    const res = await drive.files.list();
    return res.data;
}

export async function createfile(authClient, fileName, mimeType, fileBuffer) {
    const drive = google.drive({version: 'v2', auth: authClient});
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);
    const res = await drive.files.insert({
        requestBody: {
            parents: [{id: "1qdAKf_1i66VJlwMcvsWsT3SpM1x6g40c"}],
        },
        fields: 'id',
        media: {
            body: bufferStream,
        },
    });
    return res.data;
}
export async function deleteFile(authClient, fileId) {
    const drive = google.drive({version: 'v2', auth: authClient});

    const res = await drive.files.delete({
        fileId: fileId
    })
    return res;
}
