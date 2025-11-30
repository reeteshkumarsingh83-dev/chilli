import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductView } from "../../../utils/fetchAdminApi";
import { confirmDelete } from '../../../utils/confirmDelete';

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  // 🔥 Fetch single product by ID
  const fetchProduct = async () => {
    setLoading(true);

    try {
      const response = await getProductView(id); // <-- API call
      if (response?.status) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error("Error loading product", error);
    }

    setLoading(false);
  };
 
  const handleDelete = (id) => confirmDelete(`/delete/product/${id}`, fetchProduct);
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <img
          src="https://i.gifer.com/ZZ5H.gif"
          alt="Loading..."
          style={{ width: "70px" }}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger">Product not found</h3>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-3 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Product Details</h3>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <div className="row">
          {/* LEFT SIDE : PRODUCT IMAGE */}
          <div className="col-md-5">
            <div className="border rounded p-2 text-center">
              <img
                src={
                    product.images && product.images.length > 0
                    ? product.images[0].image_url
                    : "/no-image.png"
                }
                alt="product"
                style={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    borderRadius: "10px",
                }}
                />

            </div>
          </div>

          {/* RIGHT SIDE DETAILS */}
          <div className="col-md-7">
            <h3 className="fw-bold">{product.product_name}</h3>

            <h4 className="text-primary fw-bold mt-3">$ {product.price}</h4>

            <p className="mt-3">
              <strong>Description:</strong> <br />
              {product.description ? product.description : "No description"}
            </p>

            <p className="mt-2">
              <strong>Location:</strong> {product.location}
            </p>

            <p className="mt-2">
              <strong>Created At:</strong>{" "}
              {new Date(product.created_at).toLocaleString()}
            </p>

            <div className="mt-4 d-flex gap-2">
              {/* <button className="btn btn-success px-4">Edit</button> */}
              <button className="btn btn-danger px-4" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
