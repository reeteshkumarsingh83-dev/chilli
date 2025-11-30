import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOnboardingQuestion } from "../../../utils/fetchAdminApi";

const CreateOnboardingQuestion = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question_text: '',
    type: 'radio',
    options: [{ name: '' }]
  });

  const [errors, setErrors] = useState({});

  // Input Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Option Change
  const handleOptionChange = (index, value) => {
    const updated = [...formData.options];
    updated[index].name = value;
    setFormData({ ...formData, options: updated });
  };

  // Add Option
  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, { name: '' }],
    });
  };

  // Remove Option
  const removeOption = (index) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_, i) => i !== index),
    });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createOnboardingQuestion(formData);
      toast.success("Question created successfully!");

      // Reset form
      setFormData({
        question_text: "",
        type: "radio",
        options: [{ name: "" }],
      });

      navigate(-1);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  // Show options only for these types
  const showOptions = ["radio", "checkbox", "select"].includes(formData.type);

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Create Onboarding Question</h2>
            <p className="text-muted">List of onboarding form questions</p>
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
              </div>

              {/* Type */}
              <div className="mb-3">
                <label className="form-label">Question Type</label>
                <select
                  name="type"
                  className="form-select"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="radio">Radio</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="select">Select</option>
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                </select>
              </div>

              {/* Options */}
              {showOptions && (
                <div className="mb-3">
                  <label className="form-label">Options</label>

                  {formData.options.map((opt, idx) => (
                    <div className="d-flex mb-2 gap-2 align-items-center" key={idx}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Option name"
                        value={opt.name}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        required
                      />

                      {formData.options.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeOption(idx)}
                        >
                          &times;
                        </button>
                      )}
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
                Submit
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOnboardingQuestion;
