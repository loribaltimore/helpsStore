import { getProviders } from "next-auth/react"
import SigninBtn from 'components/SigninBtn';

export default async function Signin(props) {
    const providers = await getProviders();
    return (
        <div className="w-1/2 mx-auto py-24 space-y-10">
            <div className="font-extralight ">
                <h1 className="text-[5rem]">Welcome back,</h1>
                <h2 className="text-[2rem] italic text-indigo-600">Let&apos;s Get Busy</h2>
            </div>
            {
                Object.values(providers).map((provider, index) => (
                 <SigninBtn providerId={provider.id} providerName={provider.name} key={provider.name} />
            ))
      }
    </div>
    )
};