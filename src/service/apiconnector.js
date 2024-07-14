// src/service/operations/apiConnector.js
import axios from 'axios';

export async function apiConnector(method, url, data) {
    try {
        const response = await axios({
            method,
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error(`API Connector Error: ${error}`);
        throw error;
    }
}
