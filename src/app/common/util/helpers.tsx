export const formValidation = (fields: any) => {
    let formErrors: any = {}

    if (!fields?.lastName) {
        formErrors.lastName = 'Last Name is required';
    }
    if (!fields?.phoneNumber) {
        formErrors.phoneNumber = 'Phone number is required';
    }
    return formErrors
}
