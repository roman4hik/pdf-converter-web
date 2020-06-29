import axios from 'axios';

const API_URL = 'http://localhost:8000'

export const convertHTMLEndpont = `${API_URL}/api/v1/convert/html`;

const handleError = error => JSON.parse(Buffer.from(error.data).toString('utf8'));

const convertDataToFormData = data => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });
    return formData;
};

export const postRequestForConverting = (data) => {
    const instance = axios.create({
        responseType: 'arraybuffer',
        timeout: 30000,
    });
    const formData = convertDataToFormData(data);
    return new Promise((resolve, reject) => {
        instance
            .post(convertHTMLEndpont, formData)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(handleError(error.response));
            });
    });
};