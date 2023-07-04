"use client"
import ChatWindow from 'components/ChatWindow';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function All(props) {
  const [allMessages, setAllMessages] = useState([]);
  const [connectionName, setConnectionName] = useState('');
  const pathname = usePathname();
  const connectionId = pathname.split('/')[2];
  useEffect(() => {
    const asyncWrapper = async () => {
        await fetch(`/api/user/connections?connectionId=${connectionId}`, {
        method: 'GET'
      })
          .then(async data => {
            const { allMessages, connectionName } = await data.json();
            setAllMessages(allMessages);
            setConnectionName(connectionName);
          }).catch(err => console.log(err));
    };
          asyncWrapper();
  }, [connectionId])
    return (
      <ChatWindow
        history={allMessages}
        connectionName={connectionName}
      />
  )
};