
export const usePhoneNumberValidation = () => {
    const validatePhoneNumber = (value: string): string | null => {
        if (!value || value.trim() === '') {
            return 'Please Enter Your Phone Number';
        }
        if (!/^\d{10}$/.test(value)) {
            return 'Enter a valid 10-digit phone number';
        }
        return null;
    };

    return { validatePhoneNumber };
};



export const useFormValidation = (validate: boolean) => {
    const validateForm = (formData: { [key: string]: string }) => {
        if (!validate) return { isValid: true, errors: {} }; // Skip validation if `validate` is false

        let errors: { [key: string]: string } = {};

        // Validate Full Name
        if (!formData.fullName || formData.fullName.trim() === '') {
            errors.fullName = 'Full Name is required';
        }

        // Validate Phone Number
        if (!formData.phone || formData.phone.trim() === '') {
            errors.phone = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Enter a valid 10-digit phone number';
        }

        // Validate Email
        if (!formData.email || formData.email.trim() === '') {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Enter a valid email address';
        }

        return {
            isValid: Object.keys(errors).length === 0, // ✅ No errors means form is valid
            errors, // Return error messages
        };
    };

    return { validateForm };
};

export default useFormValidation;

