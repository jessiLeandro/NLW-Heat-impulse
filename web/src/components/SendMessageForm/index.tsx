import { FormEvent, useContext, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import styles from "./style.module.scss";

export function SendMessage() {
  const { user, singOut } = useContext(AuthContext);

  const [message, setMessage] = useState('')

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault()
    
    if(!message.trim()) {
      return
    }

    await api.post('messages', { message })

    setMessage('')
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img onClick={singOut} src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          cols={30}
          rows={10}
          placeholder="Qual sua expectativap para o evento?"
          value={message}
          onChange={event => setMessage(event.target.value)}
        ></textarea>
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
