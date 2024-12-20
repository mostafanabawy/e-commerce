import { useFormik } from "formik"
import { object, ref, string } from "yup"
import signup from "../../assets/images/undraw_welcome_cats_thqn.svg"
import axios from 'axios';


function Signup() {
    let validate = object({
        name: string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters"),
        email: string()
            .email("Invalid email address")
            .required("Email is required"),
        password: string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        rePassword: string()
            .required("Confirm Password is required")
            .oneOf([ref("password")], "Passwords don't match"),
        phone: string()
            .required("Phone is required")
            .matches(/^(02)?01[0125][0-9]{8}$/, "we accept egyptian phone numbers only")
    })
    async function submitReq(values) {
        let options = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
            method: "POST",
            data: values
        }
        console.log(values);
        let {data} = await axios.request(options)
        console.log(data);
    }
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        validationSchema: validate,
        onSubmit: submitReq
    })
    return <>
        <div className={`flex shadow-2xl sm:gap-3 md:gap-0 flex-wrap items-center justify-center w-2/3 mx-auto h-[27rem] m-5`}>
            <div className="bg-[var(--main-color)] md:w-1/2 h-full pt-14">

                <img src={signup} className="w-full mx-auto" alt="" />
                <h2 className="font-semibold text-center text-white text-3xl mt-3">Signup</h2>
                <h3 className="text-sm text-center text-white font-bold mt-1">Sign up to continue</h3>
            </div>
            <form className="flex flex-col mx-auto md:w-1/2 gap-1 h-full px-3 pt-3 sm:shadow-md md:shadow-none" onSubmit={formik.handleSubmit}>
                <div className="relative">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" id="name" placeholder="name" className="border-b border-slate-400 p-1 " />
                    <p className={`text-red-500 my-1 text-xs ${formik.touched.name && formik.errors.name ? "visibility-visible" : "invisible"} min-h-[1rem]`}>
                        {formik.errors.name}
                    </p>
                </div>
                <div className="relative">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id="email" placeholder="email" className="border-b border-slate-400 p-1 " />
                    <p className={`text-red-500 mt-1 text-xs ${formik.touched.email && formik.errors.email ? "visibility-visible" : "invisible"} min-h-[1rem]`}>
                        {formik.errors.email}
                    </p>
                </div>
                <div className="relative">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id="password" placeholder="password" className="border-b border-slate-400 p-1 " />
                    <p className={`text-red-500 my-1 text-xs ${formik.touched.password && formik.errors.password ? "visibility-visible" : "invisible"} min-h-[1rem]`}>
                        {formik.errors.password}
                    </p>
                </div>
                <div className="relative">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" id="rePassword" placeholder="rePassword" className="border-b border-slate-400 p-1 " />
                    <p className={`text-red-500 my-1 text-xs ${formik.touched.rePassword && formik.errors.rePassword ? "visibility-visible" : "invisible"} min-h-[1rem]`}>
                        {formik.errors.rePassword}
                    </p>
                </div>
                <div className="relative">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" placeholder="phone" className="border-b border-slate-400 p-1 " />
                    <p className={`text-red-500 my-1 text-xs ${formik.touched.phone && formik.errors.phone ? "visibility-visible" : "invisible"} min-h-[1rem]`}>
                        {formik.errors.phone}
                    </p>
                </div>
                <button type="submit" className="bg-[var(--main-color)] text-white rounded-xl w-full my-2">Sign up</button>
                <div className="flex gap-3 text-sm">
                    <div className="border rounded-full border-black w-1/2 text-center py-1">
                        <i className="fa-brands fa-google google-icon"></i> <span>Sign Up with google</span>
                    </div>
                    <div className="border rounded-full border-black w-1/2 text-center py-1">
                        <i className="fa-brands fa-facebook text-blue-700"></i> <span>Sign Up with facebook</span>
                    </div>

                </div>
            </form>

        </div>

    </>
}

export default Signup
