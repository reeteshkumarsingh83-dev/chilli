import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { confirmDelete } from '../../../utils/confirmDelete';
import Pagination from '@mui/material/Pagination';
import { fetchOnboardingQuestions } from '../../../utils/fetchAdminApi';

const Onboarding = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const questionsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    const data = await fetchOnboardingQuestions();
    setQuestions(data);
    setLoading(false);
  };

  const handleEdit = (id) => navigate(`/admin/dashboard/onboarding/edit/${id}`);
  const handleDelete = (id) => confirmDelete(`/delete/OnboardingQuestion/${id}`, fetchQuestions);

  // Filter search
  const filteredQuestions = questions.filter(q =>
    q.question_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * questionsPerPage;
  const indexOfFirst = indexOfLast - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Onboarding Questions</h2>
            <p className="text-muted mb-0">List of onboarding form questions</p>
          </div>
          <Link to="/admin/dashboard/onboarding/create" className="btn bg-brand text-white">
            + Create One
          </Link>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-brand text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Questions List</h5>
            <input
              type="text"
              className="form-control w-50 filterData"
              placeholder="Search by question or type..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center p-5">
              <img
                src="https://i.gifer.com/ZZ5H.gif"
                alt="Loading..."
                style={{ width: '60px', height: '60px' }}
              />
            </div>
          ) : (
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Question</th>
                      <th>Type</th>
                      <th>Options</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentQuestions.length > 0 ? (
                      currentQuestions.map((q, index) => (
                        <tr key={q.id}>
                          <td>{indexOfFirst + index + 1}</td>
                          <td>{q.question_text}</td>
                          <td>{q.type}</td>
                          <td>
                            {q.options && q.options.length
                              ? q.options.map(o => o.name).join(', ')
                              : 'N/A'}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-success me-2"
                              onClick={() => handleEdit(q.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(q.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-3">
                          No questions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-3 border-top d-flex justify-content-between align-items-center">
                <span>
                  Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredQuestions.length)} of {filteredQuestions.length} entries
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

export default Onboarding;
