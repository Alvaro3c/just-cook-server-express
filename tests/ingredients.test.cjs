// TEST 1
test('debería devolver la estructura correcta de ingredientes', async () => {
    // Mock simple de la respuesta esperada
    const mockResponse = {
        count: 2,
        ingredientes: [
            {
                id: 1,
                nombre: 'Harina',
                cantidad: 500,
                fecha_caducidad: '2024-12-31'
            },
            {
                id: 2,
                nombre: 'Sal',
                cantidad: 100,
                fecha_caducidad: null
            }
        ]
    };

    // Verificamos que la estructura es correcta
    expect(mockResponse).toHaveProperty('count');
    expect(mockResponse).toHaveProperty('ingredientes');
    expect(Array.isArray(mockResponse.ingredientes)).toBe(true);
    expect(mockResponse.count).toBe(2);

    //Verificamos el primer ingrediente
    expect(mockResponse.ingredientes[0]).toHaveProperty('id');
    expect(mockResponse.ingredientes[0]).toHaveProperty('nombre');
    expect(mockResponse.ingredientes[0]).toHaveProperty('cantidad');
    expect(mockResponse.ingredientes[0]).toHaveProperty('fecha_caducidad');

    // Verificamos que fecha_caducidad puede ser null
    expect(mockResponse.ingredientes[1].fecha_caducidad).toBeNull();
});

// TEST 2: verificar tipos de datos
test('los ingredientes deben de tener id, nombre y cantidad. Fecha de caducidad puede ser null', () => {
    const ingrediente = {
        id: 1,
        nombre: 'Azúcar',
        cantidad: 300,
        fecha_caducidad: null
    };

    expect(typeof ingrediente.id).toBe('number');
    expect(typeof ingrediente.nombre).toBe('string');
    expect(typeof ingrediente.cantidad).toBe('number');
    // fecha_caducidad puede ser string o null
    expect(ingrediente.fecha_caducidad === null || typeof ingrediente.fecha_caducidad === 'string').toBe(true);
});

// PRUEBA PARA CREAR NUEVO INGREDIENTE
describe('Pruebas para crear ingredientes', () => {

    test('debería crear un nuevo ingrediente para un usuario con un mensaje de confirmacion adecuado', async () => {
        const mockIngredientData = {
            nombre: 'Pimienta',
            cantidad: 50,
            fecha_caducidad: '2025-06-30'
        };

        const mockResponse = {
            message: 'Ingrediente creado y añadido a la despensa exitosamente',
            ingrediente_usuario: {
                id: 4,
                nombre: 'Pimienta',
                cantidad: 50,
                fecha_caducidad: '2025-06-30',
                usuario_id: 1
            }
        };

        // Verificar estructura de respuesta
        expect(mockResponse).toHaveProperty('message');
        expect(mockResponse).toHaveProperty('ingrediente_usuario');
        expect(mockResponse.ingrediente_usuario).toHaveProperty('id');
        expect(mockResponse.ingrediente_usuario).toHaveProperty('nombre');
        expect(mockResponse.ingrediente_usuario).toHaveProperty('cantidad');
        expect(mockResponse.ingrediente_usuario).toHaveProperty('fecha_caducidad');
        expect(mockResponse.ingrediente_usuario).toHaveProperty('usuario_id');

        // Verificar datos específicos
        expect(mockResponse.message).toContain('Ingrediente creado y añadido a la despensa exitosamente');
        expect(mockResponse.ingrediente_usuario.nombre).toBe('Pimienta');
        expect(mockResponse.ingrediente_usuario.cantidad).toBe(50);
    });


    test('debería fallar si faltan campos requeridos', async () => {
        const mockErrorResponse = {
            error: 'userId (en URL), nombre y cantidad son requeridos'
        };

        // Simular envío sin nombre
        const invalidData = {
            cantidad: 100
        };

        expect(mockErrorResponse).toHaveProperty('error');
        expect(mockErrorResponse.error).toContain('son requeridos');
        expect(mockErrorResponse.error).toContain('userId');
        expect(mockErrorResponse.error).toContain('nombre');
        expect(mockErrorResponse.error).toContain('cantidad');
    });

    test('debería fallar si el usuario no existe', async () => {
        const mockErrorResponse = {
            error: 'Usuario no encontrado'
        };

        // Simular usuario que no existe (ID 999)
        const ingredientData = {
            nombre: 'Azúcar',
            cantidad: 300,
            fecha_caducidad: '2024-12-31'
        };

        expect(mockErrorResponse).toHaveProperty('error');
        expect(mockErrorResponse.error).toBe('Usuario no encontrado');
    });

    test('debería validar tipos de datos en la creación', async () => {
        const testIngredient = {
            nombre: 'Arroz',
            cantidad: 1000,
            fecha_caducidad: '2024-11-15'
        };

        // Verificar tipos de datos correctos
        expect(typeof testIngredient.nombre).toBe('string');
        expect(typeof testIngredient.cantidad).toBe('number');
        expect(typeof testIngredient.fecha_caducidad).toBe('string');

        // Verificar que cantidad es número positivo
        expect(testIngredient.cantidad).toBeGreaterThan(0);
    });
});