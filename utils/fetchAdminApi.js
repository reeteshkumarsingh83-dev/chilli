import axios from 'axios';
const baseUrl = 'http://localhost:8000'; // Change if needed

export const adminLogin = async (email, password) => {
  try {
    const res = await axios.post(`${baseUrl}/api/admin/auth/login`, { email, password });
    if (res.data.status === false) {
      return {
        status: false,
        message: res.data.message || "Login failed",
        data: null
      };
    }
    return {
      status: true,
      data: res.data.data
    };
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || "Login failed",
      data: null
    };
  }
};

// ========= CUSTOMERS =========
export const getAllCustomers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/all-customers`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
};

export const getCustomerDetail = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/customer-detail/${id}`);
    if (response.data?.status) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching customer detail:', error);
    return null;
  }
};

// Update customer by ID
export const updateCustomer = async (id, customerData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/admin/customer-update/${id}`, customerData);
    return response.data?.status === true;
  } catch (error) {
    console.error('Error updating customer:', error);
    return false;
  }
};

// Get admin profile

export const getAdminProfile = async (id) => {
  try {
    const token = localStorage.getItem("adminToken");
    const response = await axios.get(`${baseUrl}/api/admin/get-profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return { status: false, message: "Failed to fetch profile" };
  }
};

export const updateAdminProfile = async (id, profileData) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/admin/update-profile/${id}`,
      profileData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Admin Update Error:", error.response?.data);
    return {
      status: false,
      message: "Failed to update profile",
      errors: error.response?.data?.errors || {},
    };
  }
};

// Update admin password
export const updateAdminPassword = async (id, password, confirmPassword) => {
  try {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);

    const res = await axios.post(`${baseUrl}/api/admin/password-update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data?.status === true;
  } catch (error) {
    console.error('Error updating password:', error);
    return false;
  }
};


export const fetchOnboardingQuestions = async () => {
  const url = `${baseUrl}/api/admin/onboarding/questions`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok || !result.status) {
      throw result;
    }

    return result.data; // sirf questions ka array return kar rahe hain
  } catch (error) {
    throw error;
  }
};


export const createOnboardingQuestion = async (formData) => {
  const url = `${baseUrl}/api/admin/onboarding/questions`;

  try {
    // Prepare payload
    const payload = {
      question_text: formData.question_text,
      type: formData.type,
    };

    // Include options only for choice types
    if (["radio", "checkbox", "select"].includes(formData.type)) {
      payload.options = formData.options.map((opt) => ({ name: opt.name }));
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`, // uncomment if auth needed
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      if (!response.ok || !result.status) throw new Error(result.message || "API Error");
      return result.data;
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON, but got HTML: ${text.substring(0, 200)}...`);
    }
  } catch (error) {
    console.error("createOnboardingQuestion error:", error);
    throw error;
  }
};


export const fetchOnboardingQuestion = async (id) => {
  const url = `${baseUrl}/api/admin/onboarding/questions-edit/${id}`;

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      if (!response.ok || !result.status) throw new Error(result.message || "Failed to fetch question");
      return result.data;
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON but got HTML: ${text.substring(0, 200)}...`);
    }
  } catch (err) {
    console.error("fetchOnboardingQuestion error:", err);
    throw err;
  }
};


//  * Update an onboarding question by ID
export const updateOnboardingQuestion = async (id, formData) => {
  const url = `${baseUrl}/api/admin/onboarding/questions-update/${id}`;

  try {
    const isFormData = formData instanceof FormData;

    const response = await fetch(url, {
      method: "POST",
      headers: isFormData
        ? {
            Accept: "application/json", 
          }
        : {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
      body: isFormData ? formData : JSON.stringify(formData),
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      if (!response.ok || !result.status) throw new Error(result.message || "Failed to update question");
      return result;
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON but got HTML: ${text.substring(0, 200)}...`);
    }
  } catch (err) {
    console.error("updateOnboardingQuestion error:", err);
    throw err;
  }
};


export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/admin/all-products`);
    
    // API returns -> { status, message, data: [...] }
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


export const getProductView = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/product-view/${id}`);
    return await res.json();
  } catch (error) {
    console.log("Product view error", error);
    return null;
  }
};
