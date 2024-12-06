import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../redux/productSlice";
import Swal from "sweetalert2";
import ProductModal from "./ProductModal";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              error.message || "Failed to delete product.",
              "error"
            );
          });
      }
    });
  };

  const handleProductSave = (productData, isEdit) => {
    if (isEdit) {
      dispatch(updateProduct({ id: productData._id, product: productData }))
        .unwrap()
        .then(() => {
          Swal.fire("Updated!", "Product updated successfully.", "success");
        })
        .catch((error) => {
          Swal.fire("Error!", error.message || "Update failed.", "error");
        });
    } else {
      dispatch(addProduct(productData))
        .unwrap()
        .then(() => {
          Swal.fire("Added!", "Product added successfully.", "success");
        })
        .catch((error) => {
          Swal.fire("Error!", error.message || "Addition failed.", "error");
        });
    }
    setModalOpen(false);
    setEditProduct(null);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500"
        >
          Add Product
        </button>
      </div>

      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "failed" && (
        <p className="text-center text-red-600">Error: {error}</p>
      )}

      {status === "succeeded" && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr key={product._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${product.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => {
                            setEditProduct(product);
                            setModalOpen(true);
                          }}
                          className="text-white bg-yellow-500 px-3 py-1 rounded shadow hover:bg-yellow-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-white bg-red-500 px-3 py-1 rounded shadow hover:bg-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          &lt; Prev
        </button>
        <span>
          Page {currentPage} of {Math.ceil(products.length / itemsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next &gt;
        </button>
      </div>

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditProduct(null);
          }}
          editProduct={editProduct}
          onSave={handleProductSave}
        />
      )}
    </div>
  );
};

export default ProductList;
