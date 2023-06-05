"use client"
export default function PartWays({ activeUserId, connection, setActiveConnections }) {
    console.log('PART WAYS');
    const partWays = async () => {
        const res = await fetch(`/api/user/connections`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ activeUserId, connection, isDelete: true}),
        }).then( data => {return data}).catch(err => console.log(err));
        const data = await res.json();
        const formattedConnections = JSON.parse(data.allConnections);
        setActiveConnections(formattedConnections);
    };

    return (
        <button
              type="button"
              className="relative inline-flex items-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500"
              onClick={async () => await partWays()}
            >
            <span>Part Ways</span>
          </button>
    )
};