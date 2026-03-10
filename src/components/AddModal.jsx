import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const ADD_CAR = gql`
  mutation AddCar(
    $name: String!
    $type: String!
    $maxSpeed: String!
    $image: String!
    $score: String!
  ) {
    createCar(
      name: $name
      type: $type
      maxSpeed: $maxSpeed
      image: $image
      score: $score
    ) {
      id
      name
      type
      maxSpeed
      image
      score
    }
  }
`;

const AddModal = ({ setAddModal, GET_CARS }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    maxSpeed: "",
    image: "",
    score: "",
  });

  const [addCar, { loading }] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_CARS }],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCar({
        variables: {
          name: formData.name,
          type: formData.type,
          maxSpeed: formData.maxSpeed.toString(),
          image: formData.image || "https://via.placeholder.com/150",
          score: formData.score.toString(),
        },
      });
      setAddModal(false);
    } catch (err) {
      console.error("Add error:", err);
      alert("Xatolik yuz berdi. Konsolni tekshiring.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Car</h2>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="maxSpeed"
          placeholder="Max Speed"
          value={formData.maxSpeed}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          name="score"
          placeholder="Score"
          value={formData.score}
          onChange={handleChange}
          required
        />

        <div>
          <button type="button" onClick={() => setAddModal(false)}>
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

export default AddModal;
