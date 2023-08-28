import { getProviders } from "next-auth/react"
import SigninBtn from 'components/SigninBtn';

export default async function Signin(props) {
    const providers = await getProviders();
    return (
        <div className="w-1/2 border-2 h-1/2 mx-auto ">
            {
                Object.values(providers).map((provider, index) => (
                 <SigninBtn providerId={provider.id} providerName={provider.name} key={provider.name} />
            ))
      }
    </div>
    )
};