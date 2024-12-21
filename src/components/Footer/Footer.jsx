import amazon from "../../assets/images/amazon-pay.png"
import mastercard from "../../assets/images/mastercard.webp"
import americanExpress from "../../assets/images/American-Express-Color.png"
import paypal from "../../assets/images/paypal.png"
import appleStore from "../../assets/images/get-apple-store.png"
import googlePlay from "../../assets/images/get-google-play.png"


function Footer() {
    return <>
        <footer className="p-8 bg-slate-100 space-y-4">
            <header>
                <h2 className="text-xl font-semibold text-slate-800">Get the FreshCart App</h2>
                <p className="text-slate-400">we will send you a link, open it on your phone to download the app</p>
            </header>
            <div className="flex gap-2">
                <input type="email" placeholder="Email Address" name="email" 
                className="px-2 py-1 rounded-md outline-none border-2 grow border-slate-400 border-opacity-50 focus:border-[var(--main-color)]"/>
                <button className="px-3 py-1 rounded-md bg-[var(--main-color)] hover:bg-green-600 transition-all text-white uppercase text-sm font-semibold">Share App Link</button>
            </div>
            <div className="flex flex-col sm:flex-col md:justify-between md:items-center lg:flex-row py-4 border-y-2 border-slate-300 border-opacity-50">
                <div className="flex flex-col sm:flex-col lg:flex-row gap-3 items-center">
                    <h3>Payment Partners</h3>
                    <img className="w-24" src={amazon} alt="" />
                    <img className="w-24" src={americanExpress} alt="" />
                    <img className="w-20" src={mastercard} alt="" />
                    <img className="w-24" src={paypal} alt="" />
                </div>
                <div className="flex flex-col sm:flex-col lg:flex-row gap-3 items-center ">
                    <h3>Get Deliveries with FreshCart</h3>
                    <img className="w-24" src={appleStore} alt="" />
                    <img className="w-[110px]" src={googlePlay} alt="" />
                </div>
            </div>

        </footer>
    </>
}

export default Footer
