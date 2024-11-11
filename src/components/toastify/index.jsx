
import { toast, Slide } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

/* Success toast message */
const Success = (message) => {
    return toast.success(message, {
        autoClose: 3000,
        transition: Slide,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
};

/* Info toast message */
const Info = (message) => {
    return toast.info(message, {
        autoClose: 3000,
        transition: Slide,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
};

/* Warning toast message */
const Warning = (message) => {
    return toast.error(message, {
        autoClose: 3000,
        transition: Slide,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
};

/* Error toast message */
const Error = (message) => {
    return toast.error(message, {
        autoClose: 3000,
        transition: Slide,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
};

export const Toastify = {
    Success,
    Info,
    Warning,
    Error
}