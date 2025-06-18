import Product from "../../../domain/product/entity/product";


const product = new Product('123', "ProductMockUpdate", 1);

const input = {
    id: product.id,
    name: product.name,
    price: product.price
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe('Unit test for product use case', () => {
    it('should update a product', async() => {
        const productRepository = MockRepository();
        const usecase = new updateProductUseCase(productRepository);

        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })
})
