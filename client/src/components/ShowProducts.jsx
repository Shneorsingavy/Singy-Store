import Product from './Product';

const ShowProducts = ({ arrProducts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-100">
      {arrProducts.map((watch) => (
        <Product key={watch._id} watch={watch} />
      ))}
    </div>
  );
};

export default ShowProducts;
