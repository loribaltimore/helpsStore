import { useContext } from 'react';
import { MainContext } from '../../components/MainContext';

function MembershipTier(props) {
    let { currentUser } = useContext(MainContext);


    return (
        <div style={{width: '0', height: '0', borderLeft: '50px solid transparent', borderRight: '50px solid transparent', borderBottom: '50px solid green', borderTop: '60px solid transparent', margin: '2rem'}}>
        </div>
    )
};

export default MembershipTier;