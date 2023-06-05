
export default function ChatBubble({ message, index }) {
    const styles = {
        true: 'bg-indigo-400',
        false: 'bg-blue-400'
    }

    return (
        <div className={`w-1/2  ${index % 2 ? 'ml-auto' : null}`}>
            <div className={`rounded-lg  p-5 ${styles[index % 2 === 0]}`}>
                {message.text}
            </div>
            <p className={`text-xs ${message.read ? 'text-green-400' : 'text-red-400'} text-right`}>
                        {message.read ? 'Read' : 'Delivered'}
                </p>
        </div>
        
    )
}