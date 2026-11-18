const request = require('supertest');
const app = require('./src/server');

describe('Pruebas de API Backend', () => {
    test('GET /api/profile debería responder con status 200', async () => {
        const res = await request(app).get('/api/profile');
        expect(res.statusCode).toEqual(200);
    });

    test('Debería retornar un JSON', async () => {
        const res = await request(app).get('/api/profile');
        expect(res.type).toEqual('application/json');
    });

    test('Debería tener un nombre', async () => {
        const res = await request(app).get('/api/profile');
        expect(res.body.name).toBeDefined();
    });
});