import { getProviders } from "next-auth/react"
import SigninBtn from 'components/SigninBtn';

export default async function Signin(props) {
    const providers = await getProviders();
    return (
        <div className="block mx-auto w-3/4 bg-white border border-black text-black rounded mt-36 py-24 space-y-10 block">
            <div className="font-extralight">
                <h1 className="text-[5rem] text-center">Welcome back</h1>
            </div>
            {
                Object.values(providers).map((provider, index) => (
                 <SigninBtn providerId={provider.id} providerName={provider.name} key={provider.name} />
            ))
      }
    </div>
        
    )
};