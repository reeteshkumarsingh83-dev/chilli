import Swal from "sweetalert2";
import axios from "axios";

// Create axios instance with base URL
const baseUrl = "http://localhost:8000/api/admin";
const api = axios.create({
  baseURL: baseUrl,
});

export const confirmDelete = async (endpoint, callback) => {
  console.log(baseUrl); // ✅ fixed variable name

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await api.delete(endpoint); // ✅ works
      await Swal.fire("Deleted!", "Record has been deleted.", "success");
      if (callback) callback(); // refetch after delete
    } catch (error) {
      console.error(error);
      Swal.fire("Failed!", "There was a problem deleting.", "error");
    }
  }
};
