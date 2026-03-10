import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $title: String
    $price: String
    $category: String
    $description: String
    $images: String
  ) {
    updateProduct(
      id: $id
      title: $title
      price: $price
      category: $category
      description: $description
      images: $images
    ) {
      id
      title
      price
      category
      description
      images
    }
  }
`;

const EditModal = ({ setModal, editId, GET_CARS }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    images: "",
  });

  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_CARS }],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        variables: {
          id: editId,
          title: formData.title || undefined,
          price: formData.price || undefined, // строка
          category: formData.category || undefined,
          description: formData.description || undefined,
          images: formData.images || undefined,
        },
      });
      alert("✅ Updated!");
      setModal(false);
    } catch (err) {
      console.error(err);
      alert("❌ Error!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit Product</h2>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="images"
          placeholder="Image URL"
          value={formData.images}
          onChange={handleChange}
        />

        <div>
          <button type="button" onClick={() => setModal(false)}>
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
