import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// 👉 YOUR HELPER API FILE IMPORT  
import { fetchOnboardingQuestion, updateOnboardingQuestion } from "../../../utils/fetchAdminApi";

const EditOnboardingQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question_text: '',
    type: 'radio',
    options: [{ name: '' }]
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // ✅ Load Data from Helper API
  useEffect(() => {
    fetchOnboardingQuestion(id)
      .then((data) => {
        setFormData({
          question_text: data.question_text,
          type: data.type,
          options: data.options?.length ? data.options : [{ name: '' }],
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load question.");
        setLoading(false);
      });
  }, [id]);

  // Input handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, key, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index][key] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, { name: '' }] });
  };

  const removeOption = (index) => {
    const updatedOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: updatedOptions });
  };

  // ✅ Submit using helper API (JSON only)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      question_text: formData.question_text,
      type: formData.type,
      options: formData.options,
    };

    try {
      const res = await updateOnboardingQuestion(id, payload);

      if (res.status) {
        toast.success("Question updated successfully!");
        navigate(-1);
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error) {
      toast.error("Failed to update question.");
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Edit Onboarding Question</h2>
            <p className="text-muted">Modify the onboarding form question</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Question Text */}
              <div className="mb-3">
                <label className="form-label">Question Text</label>
                <input
                  type="text"
                  name="question_text"
                  className="form-control"
                  value={formData.question_text}
                  onChange={handleInputChange}
                  required
                />
                {errors.question_text && <div className="text-danger">{errors.question_text[0]}</div>}
              </div>

              {/* Type */}
              <div className="mb-3">
                <label className="form-label">Question Type</label>
                <select
                  name="type"
                  className="form-select"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="radio">Radio</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="select">Select</option>
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                </select>
                {errors.type && <div className="text-danger">{errors.type[0]}</div>}
              </div>

             {/* Options Section */}
              {['radio', 'checkbox', 'select'].includes(formData.type) && (
                <div className="mb-3">
                  <label className="form-label">Options</label>

                  {formData.options.map((opt, idx) => (
                    <div className="mb-3" key={idx}>
                      <div className="d-flex gap-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Option name"
                          value={opt.name}
                          onChange={(e) => handleOptionChange(idx, 'name', e.target.value)}
                          required
                        />

                        {formData.options.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeOption(idx)}
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={addOption}
                  >
                    + Add Option
                  </button>
                </div>
              )}


              <button type="submit" className="btn btn-success mt-3">
                Update Question
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOnboardingQuestion;
