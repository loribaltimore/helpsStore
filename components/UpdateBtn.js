function UpdateBtn(props) {
    let { setRenderDelete, setIsUpdating, isUpdating } = props;
    return (
        <div>
            {
                isUpdating === false ?
                    <button
                        className="font-extralight text-black bg-gray-200 px-4 py-2 shadow-xl rounded  hover:scale-105 active:scale-100"
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
