import { userDataValidationParams } from '../../utils/userDataValidationParams.js';


class FormsValidator {
    

    validateEmailInput(emailInputValue) {
        const result = {};
        Object.keys(userDataValidationParams.userEmail)
            .forEach((errorKey) => {
                const errorResult = userDataValidationParams.userEmail[errorKey](emailInputValue);
                result[errorKey] = errorResult;
            });
        return result;
    }

    validatePasswordInput(passwordInputValue) {
        const result = {};
        Object.keys(userDataValidationParams.userPassword)
            .forEach((errorKey) => {
                const errorResult = userDataValidationParams.userPassword[errorKey](passwordInputValue);
                result[errorKey] = errorResult;
            });
        return result;
    }

    validateNameInput(nameInputValue) {
        const result = {};
        Object.keys(userDataValidationParams.userName)
            .forEach((errorKey) => {
                const errorResult = userDataValidationParams.userName[errorKey](nameInputValue);
                result[errorKey] = errorResult;
            });
        return result;
    }
}

export const formsValidator = new FormsValidator();