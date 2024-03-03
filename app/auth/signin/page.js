import { getProviders } from "next-auth/react"
import DemoForm from 'components/DemoForm'
import SigninBtn from 'components/SigninBtn';
import logo from '../../../public/img/helpsLogoBig.png';
import Image from 'next/image';
import Link from 'next/link';

export default async function Signin(props) {
    const providers = await getProviders()
        .then(data => { return data })
        .catch(err => console.log(err));
    return (
        <div className="block mx-auto w-1/2 drop-shadow-2xl text-black rounded mt-28 py-24 space-y-10 block">
            <div className="font-extralight z-10  opacity-100 space-y-7">
                <Link href="/">
                    <Image
                className="h-20 drop-shadow-2xl w-auto mx-auto rounded hover:scale-105 transition-all duration-300 ease-in-out"
                src={logo}
                              alt="company logo"
                              width={200}
                    height={200}
                />
                </Link>

                <h1 className="text-center text-3xl">Welcome back</h1>
            </div>
            {
                Object.values(providers).map((provider,index) => {
                    if (provider.name !== "Credentials") {
                       return <SigninBtn providerId={provider.id} providerName={provider.name} key={provider.name}/>
                    }
                })
            }
            <DemoForm  />
    </div>
    )
};