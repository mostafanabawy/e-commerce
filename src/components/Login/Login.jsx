import { useFormik } from "formik"
import { object, string } from "yup"
import login from "../../assets/images/undraw_confirmation_re_b6q5.svg"
import axios from "axios"
import { useContext } from "react"
import { UserContext } from './../../Context/UserContext/User.context';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useNavigate } from "react-router-dom"

function Login() {
    let { setToken } = useContext(UserContext);
    let navigate = useNavigate();
    let validate = object({
        email: string()
            .email("Invalid email address")
            .required("Email is required"),
        password: string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            )
    })
    async function submitReq(values) {
        let options = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
            method: "POST",
            data: values
        }
        let { data } = await axios.request(options);
        console.log(data);
        if (data.message === "success") {
            setToken(data.token);
            localStorage.setItem("token", data.token);
        }
    }
    async function resetPassword() {
        let id1 = toast.loading("sending code to your email...")
        try {
            let options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                method: "POST",
                data: {
                    email: formik.values.email
                }
            }
            let { data } = await axios.request(options);
            if (data.statusMsg === "success") {
                toast.success("Verification code sent to your email");
                navigate("/verify-code");
            }else{
                toast.error("failed to send the verification code to your email");
            }
        } catch (error) {
            console.log(error);
        }finally{
            toast.dismiss(id1)
        }
    }
    let formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validate,
        onSubmit: submitReq

    })
    return <>
        <div className={`flex shadow-2xl items-center justify-center w-2/3 mx-auto h-96 m-5`}>
            <div className="bg-[var(--main-color)] w-1/2 h-full pt-14">

                <h2 className="text-lg font-semibold text-center text-white">Login</h2>
                <h3 className="text-sm text-center text-white">Login to continue</h3>
                <img src={login} className="w-1/2 mx-auto mt-8" alt="" />
            </div>
            <form className="flex flex-col mx-auto w-1/2 my-5 gap-3 h-full px-3 pt-3" onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id="email" placeholder="email" className="border-b border-slate-400 p-1 " />
                <p className={`text-red-500 mt-1 text-xs ${formik.touched.email && formik.errors.email ? "visibility-visible" : "invisible"} min-h-[1rem]`}>
                    {formik.errors.email}
                </p>
                <label htmlFor="password">Password:</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id="password" placeholder="password" className="border-b border-slate-400 p-1 " />
                <div className="flex justify-between">
                    <p className={`text-red-500 mt-1 text-xs ${formik.touched.password && formik.errors.password ? "visibility-visible" : "invisible"} min-h-[1rem]`}>
                        {formik.errors.password}
                    </p>
                    <span title="write your email before pressing the link"
                    className="cursor-pointer underline ms-auto text-sm" onClick={() => { resetPassword() }}>
                        forgot password?
                    </span>
                </div>

                <button type="submit" className="bg-[var(--main-color)] text-white rounded-xl w-full">Login</button>
                <div className="flex gap-3 text-sm">
                    <div className="border rounded-full border-black w-1/2 p-1 text-center">
                        <i className="fa-brands fa-google google-icon"></i> <span>Login with google</span>
                    </div>
                    <div className="border rounded-full border-black p-1 w-1/2 text-center">
                        <i className="fa-brands fa-facebook text-blue-700"></i> <span>Login with facebook</span>
                    </div>

                </div>
            </form>

        </div>

    </>
}

export default Login
