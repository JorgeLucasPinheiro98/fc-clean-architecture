import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";


describe('Test find product use case', () => {
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
      })

      it('Should find a product', async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);
        const product = new Product('123','productMock', 1)

        await productRepository.create(product);

        const input = {
            id: '123'
        };

        const output = {
            id: '123',
            name: 'productMock',
            price: 1
        }

        const result = await usecase.execute(input)

        expect(result).toEqual(output)

      });
});