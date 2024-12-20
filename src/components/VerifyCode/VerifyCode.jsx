import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { object, string } from "yup"
import toast from './../../../node_modules/react-hot-toast/src/index';

function VerifyCode() {
    let navigate = useNavigate()
    async function verifyReq(values) {
        let id1 = toast.loading("verifying...")
        try {
            let options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                method: "POST",
                data: values
            }
            let { data } = await axios.request(options);
            console.log(data);
            if (data.status === "Success") {
                toast.success("Code verified successfully");
                navigate("/reset-password")
            } else {
                toast.error("Incorrect code")
            }
        } catch (error) {
            console.log(error);
        }finally{
            toast.dismiss(id1);
        }
    }
    let formik = useFormik({
        initialValues: {
            resetCode: ""
        },
        validationSchema: object({
            resetCode: string()
                .required("Verification code is required")
        }),
        onSubmit: verifyReq
    })
    return <>
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-5">please enter your verification code</h2>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-12">
                <input type="text" id="resetCode" placeholder="Code" className="col-span-11 p-1 border-2 rounded-md" onChange={formik.handleChange} />
                <button className="bg-white text-green-600 border-2 border-green-600 p-1 rounded-md hover:bg-green-600 hover:text-white col-span-1"
                    type="submit">

                    verify
                </button>
            </form>
        </div>
    </>
}

export default VerifyCode
