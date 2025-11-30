import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { confirmDelete } from '../../../utils/confirmDelete';
import { getAllProducts } from '../../../utils/fetchAdminApi';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const productData = await getAllProducts();
    setProducts(productData);
    setLoading(false);
  };
 
  const handleView = (id) => navigate(`/admin/dashboard/product/view/${id}`);
  const handleEdit = (id) => navigate(`/admin/dashboard/product/edit/${id}`);
  const handleDelete = (id) => confirmDelete(`/delete/product/${id}`, fetchProducts);

  const filteredProducts = products.filter((item) =>
    item.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Product Listing</h2>
            <p className="text-muted mb-0">Overview of all products</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-brand text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Filter Products</h5>

            <input
              type="text"
              className="form-control w-50 filterData"
              placeholder="Search by name, category, location..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center p-5">
              <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." style={{ width: '60px' }} />
            </div>
          ) : (
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Subcategory</th>
                      <th>Price</th>
                      <th>Location</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentProducts.length > 0 ? (
                      currentProducts.map((item, index) => (
                        <tr key={item.id}>
                          <td>{indexOfFirst + index + 1}</td>

                          {/* Product image */}
                          <td>
                            {item.images?.length > 0 ? (
                              <img
                                src={`${item.images[0].image_url}`}
                                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }}
                                alt="product"
                              />
                            ) : (
                              <img
                                src="/no-image.png"
                                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }}
                                alt="default"
                              />
                            )}
                          </td>

                          <td>{item.product_name}</td>
                          <td>{item.category?.name}</td>
                          <td>{item.subcategory?.name}</td>
                          <td>${item.price}</td>
                          <td>{item.location}</td>

                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleView(item.id)}>View</button>
                            {/* <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleEdit(item.id)}>Edit</button> */}
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-3">
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-3 border-top d-flex justify-content-between align-items-center">
                <span>
                  Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredProducts.length)} of{' '}
                  {filteredProducts.length} entries
                </span>

                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
