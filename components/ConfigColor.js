function ConfigColor({ color, front, back, setFront, setBack }) {
    console.log(color)
    let handleClick = (clickedColor) => {
            if (!front || !back) {
                if (!front) {
                    setFront(clickedColor);
                } else {
                    setBack(clickedColor);
                }
            } else {
                if (clickedColor === front) {
                    setFront(undefined);
                } else {
                    setBack(undefined);
                }
            }
    
    };

    return (
        <div></div>

    );
};

export default ConfigColor;
