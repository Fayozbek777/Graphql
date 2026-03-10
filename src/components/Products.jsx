import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import EditModal from "./EditModal";

const GET_PRODUCTS = gql`
  query {
    allProducts {
      id
      title
      price
      category
      description
      images
    }
  }
`;

const DELETE_PRODUCTS = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const Products = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCTS, {
    refetchQueries: [GET_PRODUCTS],
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("are shure deleted it")) {
      deleteProduct({ variables: { id } });
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    setIsEditOpen(true);
  };

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error fetching data</h1>;

  return (
    <div>
      <h1>Product List</h1>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.allProducts.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>
                <img
                  src={item.images}
                  alt={item.title}
                  width="64"
                  height="64"
                />
              </td>
              <td>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditOpen && editId && (
        <EditModal
          setModal={setIsEditOpen}
          editId={editId}
          GET_CARS={GET_PRODUCTS}
        />
      )}
    </div>
  );
};

export default Products;
