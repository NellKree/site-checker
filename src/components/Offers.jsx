import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons.jsx'

export function Offers({ onSoon, onAudit }) {
  return <section className="offers" aria-label="Дополнительные услуги">
    <article>
      <Icon name="file" size={24} />
      <div><h2>Полный отчёт <span>3 990 ₽</span></h2><p>Расширенная проверка сайта на соответствие техническому заданию.</p></div>
      <button className="secondary" type="button" onClick={onSoon}>Получить полный отчёт <Icon name="diagonal" size={15} /></button>
    </article>
    <article>
      <Icon name="person" size={24} />
      <div><h2>Экспертный аудит</h2><p>Независимая проверка сайта специалистом с рекомендациями по приёмке.</p></div>
      <button className="secondary" type="button" onClick={onAudit}>Заказать аудит <Icon name="diagonal" size={15} /></button>
    </article>
  </section>
}

export function OfferModal({ kind, url, close }) {
  const dialog = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const element = dialog.current
    element.showModal()
    return () => element.close()
  }, [])

  return <dialog ref={dialog} className="modal" onClose={close} aria-labelledby="offer-title">
    <button type="button" className="modal-close" aria-label="Закрыть" onClick={() => dialog.current.close()}><Icon name="cross" /></button>
    {kind === 'soon' ? <>
      <h2 id="offer-title">Скоро появится</h2>
      <p>Здесь будет расширенная проверка сайта по техническому заданию.</p>
    </> : <>
      <h2 id="offer-title">Экспертный аудит</h2>
      <p>Демонстрационная форма. Заявки пока не отправляются.</p>
      <form onSubmit={event => { event.preventDefault(); setSubmitted(true) }}>
        <label>Имя<input name="name" autoComplete="name" required /></label>
        <label>Email или телефон<input name="contact" required /></label>
        <label>Ссылка на сайт<input name="url" inputMode="url" autoComplete="url" defaultValue={url} required /></label>
        <label>Комментарий<textarea name="comment" rows="3" /></label>
        <button className="action" type="submit">Попробовать форму <Icon name="arrow" /></button>
        {submitted && <p role="status">Демо завершено. Данные остались в этой форме.</p>}
      </form>
    </>}
  </dialog>
}
