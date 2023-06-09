
export default function Carousel({ photos }) {

    return (
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                <img src={photos || "./guy.jpg"} alt="Interior of light green canvas bag with padded laptop sleeve and internal organization pouch." className="object-fill object-center"/>
         </div>
    )
}