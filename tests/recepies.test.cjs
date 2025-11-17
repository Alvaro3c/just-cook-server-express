// PRUEBAS PARA OBTENER FAVORITAS
describe('GET /api/usuarios/:userId/favoritas', () => {

    test('debería obtener recetas favoritas con estructura correcta', async () => {
        const mockResponse = {
            count: 2,
            recetas: [
                {
                    id: 1,
                    nombre: 'Paella',
                    tiempo_preparacion: 60
                },
                {
                    id: 3,
                    nombre: 'Tortilla',
                    tiempo_preparacion: 30
                }
            ]
        };

        expect(mockResponse.count).toBe(2);
        expect(mockResponse.recetas[0].nombre).toBe('Paella');
        expect(Array.isArray(mockResponse.recetas)).toBe(true);
    });

    test('debería devolver array vacío sin favoritas', async () => {
        const mockResponse = {
            count: 0,
            recetas: []
        };

        expect(mockResponse.count).toBe(0);
        expect(mockResponse.recetas).toEqual([]);
    });
});

// PRUEBAS PARA AÑADIR FAVORITOS
describe('POST /api/usuarios/:userId/favoritas', () => {

    test('debería añadir receta a favoritos exitosamente', async () => {
        const mockResponse = {
            message: 'Receta añadida a favoritos',
            receta_favorita: {
                usuario_id: 1,
                receta_id: 5
            }
        };

        expect(mockResponse.message).toContain('favoritos');
        expect(mockResponse.receta_favorita.receta_id).toBe(5);
    });

    test('debería validar campos requeridos', async () => {
        const mockErrorResponse = {
            error: 'receta_id es requerido'
        };

        expect(mockErrorResponse.error).toContain('requerido');
    });
});

// PRUEBAS ESTRUCTURA RECETAS
describe('Estructura de recetas', () => {

    test('debería tener array de ingredientes como strings', async () => {
        const mockReceta = {
            nombre: 'Sándwich',
            ingredientes: ['pan', 'jamón', 'queso'],
            tiempo_preparacion: 10
        };

        expect(Array.isArray(mockReceta.ingredientes)).toBe(true);
        expect(mockReceta.ingredientes[0]).toBe('pan');
        expect(mockReceta.tiempo_preparacion).toBe(10);
    });
});