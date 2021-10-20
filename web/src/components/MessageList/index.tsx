import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { api } from '../../services/api'
import styles from './style.module.scss'
import logoImg from '../../assets/logo.svg'

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messagesQueue: Message[] = [] 

const socket = io('http://localhost:4000')

socket.on('new_message', (msg: Message) => {
  messagesQueue.push(msg)
})

export function MessageList() {
  const [messages, setMessage] = useState<Message[]>([])

  useEffect(() => {
    api.get<Message[]>('messages/last3').then((resp) => {
      setMessage(resp.data)
    })
    return () => {
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(messagesQueue.length > 0) {
        setMessage(prevState =>[
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ])

        messagesQueue.shift()
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="logo"/>

      <ul className={styles.messageList}>
         {messages.map(message => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message.text}</p>

            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}