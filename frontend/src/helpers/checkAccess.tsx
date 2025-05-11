import {AccessKeys} from "@/consts/AccessKeys";

export const CheckAccess = (localStorageKey: AccessKeys) => {

    switch (localStorageKey){
        case AccessKeys.ACCESS_ALLOWED: {
            return true;
        }

        default:
        case AccessKeys.ACCESS_DENIED: {
            return false;
        }
    }
};
