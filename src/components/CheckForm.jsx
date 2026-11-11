import { Icon } from './Icons.jsx'

export default function CheckForm({ check }) {
  const { url, setUrl, mode, setMode, strategy, setStrategy, busy, error, submit } = check

  return (
    <form className="check" noValidate onSubmit={submit} aria-busy={busy}>
      <label className="field-label" htmlFor="check-url">Адрес сайта</label>
      <div className="check-entry">
        <div className="check-input">
          <Icon name="globe" />
          <input id="check-url" type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false}
            placeholder="example.com" readOnly={busy} value={url} onChange={event => setUrl(event.target.value)}
            aria-invalid={error?.field || undefined} aria-describedby={error ? 'check-error' : undefined} />
        </div>
        <button className="action" type="submit" disabled={busy}>
          {busy ? 'Проверяем…' : 'Проверить сайт'}
          {busy ? <span className="spinner" aria-hidden="true" /> : <Icon name="arrow" />}
        </button>
      </div>
      <div className="check-options">
        <fieldset className="mode" disabled={busy}>
          <legend className="sr-only">Режим проверки</legend>
          <label><input type="radio" name="mode" value="demo" checked={mode === 'demo'} onChange={() => setMode('demo')} />Демо</label>
          <label><input type="radio" name="mode" value="live" checked={mode === 'live'} onChange={() => setMode('live')} />Реальная проверка</label>
        </fieldset>
        {mode === 'live' && <label className="device">
          <span className="sr-only">Устройство</span>
          <select disabled={busy} value={strategy} onChange={event => setStrategy(event.target.value)}>
            <option value="mobile">Мобильные</option>
            <option value="desktop">Компьютер</option>
          </select>
        </label>}
      </div>
      {error && <p className="check-error" id="check-error" role="alert">{error.message}</p>}
      <div className="check-status" role="status">{busy && (mode === 'demo' ? 'Открываем сохранённый отчёт…' : 'Google PageSpeed анализирует страницу. Это может занять до двух минут.')}</div>
    </form>
  )
}
