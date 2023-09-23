function UpdateBtn(props) {
    let { setRenderDelete, setIsUpdating, isUpdating } = props;
    return (
        <div>
            {
                isUpdating === false ?
                    <button
                        className="bg-white text-black border border-black ring ring-inset ring-blue-500 px-4 py-2 rounded ml-12"
                        style={{ position: 'relative', left: '15%', marginTop: '1%' }}
                        onClick={() => { setIsUpdating(true); setRenderDelete(false) }}
                    >
                        Update
                    </button>
                    : ''
            }
        </div>
    )
};

export default UpdateBtn;
