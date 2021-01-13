export const userDataValidationParams = {
    userEmail: {
        required: (value) => {
            return value === "";
        },
        minLength: (value) => {
            return value.length < 5;
        },
        maxLength: (value) => {
            return value.length > 20;
        }
    },
    userPassword: {
        required: (value) => {
            return value === "";
        },
        minLength: (value) => {
            return value.length < 5;
        },
        maxLength: (value) => {
            return value.length > 20;
        }
    },
    userName: {
        required: (value) => {
            return value === "";
        },
        minLength: (value) => {
            return value.length < 2;
        },
        maxLength: (value) => {
            return value.length > 20;
        }
    }
}