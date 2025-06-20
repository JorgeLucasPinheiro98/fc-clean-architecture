import CreateProductUseCase from "./create.product.usecase";

const input = {
    id: '123',
    name: 'productMock',
    price: 1
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe('Unit test create product use case', () => {
    it('should create a product', async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: 'productMock',
            price: 1,
        });
    });

    it('should thrown an error when product name is missing', async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository)

        input.name = '';

        await expect(productCreateUseCase.execute(input)).rejects.toThrow('Name is required');
    });

    it('should thrown an error when product price is missing', async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository)

        input.name = '123';
        input.price = -1;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow('price must be greater than or equal to 1');
    });
})