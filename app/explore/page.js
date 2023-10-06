import AllExplore from 'components/AllExplore';
import User from 'models/userSchema';
import database from 'models/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

export async function getData(userId) {
    await database();
            let user = await User.findById(userId);
        let likedCharities = user.charities.liked.orgs.map(x => x.name);
        let topInterests = user.sortedInterests.slice(0, 3);
        let recommended = [];
        let apiKey = process.env.CHARITY_API_KEY;
        for (let i = 0; i < topInterests.length; i++) {
            let tags = Object.keys(topInterests[i][1].tags).slice(0, 3).join(',');
            let response = await fetch(`https://partners.every.org/v0.2/search/${topInterests[i][0]}?apiKey=${apiKey}&take=10&causes=${tags}`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(async data => {
                    data = await data.json();
               let filtered = data.nonprofits.slice(0, 25).filter(x => x.coverImageUrl !== undefined);
                return filtered.slice(0, 4);
            }).catch(err => console.log(err));
            let key = topInterests[i][0];
            recommended.push({ [key]: [...response] });
        };
    return { likedCharities, recommended, user: JSON.stringify(user), cart: {} };
}

export default async function page() {
            const session = await getServerSession(authOptions);

    const { likedCharities, recommended, user, cart } = await getData(session.userId);
    
    return (
        <AllExplore likedCharities={likedCharities} recommended={recommended} user={user} cart={cart} />
    )
}