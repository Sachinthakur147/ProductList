import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../redux/productSlice";
import Swal from "sweetalert2";

const ProductModal = ({ isOpen, onClose, editProduct }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    isRecommended: false,
    isBestseller: false,
    status: "Available",
  });

  useEffect(() => {
    if (editProduct) setFormData(editProduct);
    else {
      setFormData({
        name: "",
        description: "",
        price: "",
        isRecommended: false,
        isBestseller: false,
        status: "Available",
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    if (editProduct) {
      dispatch(updateProduct({ id: editProduct._id, product: formData }));
      Swal.fire("Updated!", "Product updated successfully.", "success");
    } else {
      dispatch(addProduct(formData));
      Swal.fire("Added!", "Product added successfully.", "success");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow w-96">
        <h2 className="text-lg font-bold">
          {editProduct ? "Edit Product" : "Add Product"}
        </h2>
        <div className="mt-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded mt-2"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded mt-2"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded mt-2"
          />
          <div className="mt-2 flex justify-between">
            <label>
              <input
                type="checkbox"
                name="isRecommended"
                checked={formData.isRecommended}
                onChange={handleChange}
              />
              Recommended
            </label>
            <label>
              <input
                type="checkbox"
                name="isBestseller"
                checked={formData.isBestseller}
                onChange={handleChange}
              />
              Bestseller
            </label>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded shadow hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500"
            >
              {editProduct ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
