"use client"
export default function PartWays({ activeUserId, connection, setActiveConnections }) {
    const partWays = async () => {
        const res = await fetch(`/api/user/connections`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ activeUserId, activeConnectionId: connection._id, connectionId: connection[connection["activelyConnectedWith"]].id, isDelete: true}),
        }).then( data => {return data}).catch(err => console.log(err));
        const data = await res.json();
        const formattedConnections = JSON.parse(data.allConnections);
        console.log(formattedConnections);
        setActiveConnections(formattedConnections);
    };

    return (
        <button
              type="button"
              className="relative inline-flex items-center rounded px-3 py-2 text-sm  text-gray-900 shadow-sm ring-1 ring-inset ring-black hover:bg-red-500"
              onClick={async () => await partWays()}
            >
            <span>Remove</span>
          </button>
    )
};