import { ref } from 'vue';
import apiClient from '../apiClient'; // Import your API client instance
import { toast } from 'vue3-toastify';

export default function useUpdateUserPassword() {
  // Define reactive variables
  const oldPassword = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');
  const message = ref('');
  const error = ref(false);

  // Update password logic
  const updatePassword = async () => {
    try {
      const response = await apiClient.put(
        '/update-password',
        {
          old_password: oldPassword.value,
          password: newPassword.value,
          password_confirmation: confirmPassword.value,
        }
      );

      // Handle success
      message.value = response.data.message;

      toast.success(message);
      error.value = false;
    } catch (err) {
      // Handle error
      message.value = err.response.data.message;
      toast.error(message);

      error.value = true;
    }
  };

  // Return variables and methods for use in components
  return {
    oldPassword,
    newPassword,
    confirmPassword,
    message,
    error,
    updatePassword,
  };
}
