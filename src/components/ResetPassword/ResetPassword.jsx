import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { object, string } from "yup"
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext/User.context";

function ResetPassword() {
    let navigate = useNavigate();
    let { setToken } = useContext(UserContext);
    async function putNewPass(values) {
        try {
            let options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                method: "PUT",
                data: values
            }
            let { data } = await axios.request(options);
            console.log(data);
            if (data.token) {
                toast.success("password reset successful");
                setToken(data.token);
                localStorage.setItem("token", data.token);
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }
    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        validationSchema: object({
            email: string().email().required("Email is required"),
            newPassword: string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters long")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                )
        }),
        onSubmit: putNewPass
    })
    return <>
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-5">Reset account password</h2>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-12">
                <input type="text" id="email" placeholder="email" className="col-span-12 mb-4 p-1 border-2 rounded-md" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched && formik.errors.email && <p className="text-sm text-red-600">{formik.errors.email}</p>}
                <input type="password" id="newPassword" placeholder="password" className="col-span-12 mb-0 p-1 border-2 rounded-md" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched && formik.errors.newPassword && <p className="text-sm text-red-600 col-span-12 mb-3">{formik.errors.newPassword}</p>}
                <button className={"bg-white text-green-600 border-2 border-green-600 py-1 rounded-md hover:bg-green-600 hover:text-white col-span-2 mt-6 " + (formik.touched && formik.errors.newPassword && "mt-0")}
                    type="submit">

                    Reset Password
                </button>
            </form>
        </div>
    </>
}

export default ResetPassword
