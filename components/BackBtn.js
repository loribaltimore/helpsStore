import { useRouter } from 'next/router';

function BackBtn(props) {
    const router = useRouter();

    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.back()}>Back</button>
        </div>
    )
};

export default BackBtn;
