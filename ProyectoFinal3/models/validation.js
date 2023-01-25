import parsePhoneNumber from 'libphonenumber-js'



export function validateEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

export function validatePhoneNumber(inPhoneNumber) {
    const phoneNumber = parsePhoneNumber(inPhoneNumber);
    const isValid = (phoneNumber !== undefined && phoneNumber.isValid())
    return isValid;
};