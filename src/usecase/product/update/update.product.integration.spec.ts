import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import Product from "../../../domain/product/entity/product";
import updateProductUseCase from "./update.product.usecase";


describe("Test Update a product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const product = new Product('a','productMock',1)

    const productRepository = new ProductRepository();
    const createproduct = new CreateProductUseCase(productRepository)
    const updateCustumer = new updateProductUseCase(productRepository);

    await productRepository.create(product)
    
    const input = {
      id: 'a',
      name: 'ProductMock',
      price: 2
    };

    const output = await updateCustumer.execute(input)

    expect(output).toEqual(input);
  });
});
