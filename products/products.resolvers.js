const productService = require("./products.service");

module.exports = {
    Query: {
        products: () => {
            return productService.getAllProducts();
        },
        product: (_parent, args) => {
            return productService.getProduct(args.id);
        },
        productsByUser : async (_parent, {id}) => 
            {
                const newProduct = await productService.getProductsByUser(id);
                return newProduct;
            }
    },
    Mutation: {
        createProduct: (_parent, { data }) => {
            return productService.createProduct(data)
        },
        updateProduct: (_parent, { id, data }) => {
            return productService.updateProduct(id, data);
        }
    }
}