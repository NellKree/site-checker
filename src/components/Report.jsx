const dateFormat = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long', timeStyle: 'short' })

export function ReportMeta({ report }) {
  const date = Date.parse(report.date)
  return (
    <div className="report-meta">
      {report.demo && <strong className="demo-tag">Демонстрационные данные</strong>}
      <p className="report-url">{report.url}</p>
      {report.requestedUrl !== report.url && <p>Исходный адрес: {report.requestedUrl}</p>}
      <p>{Number.isFinite(date) && <time dateTime={report.date}>{dateFormat.format(date)} · </time>}{report.device}{report.version && ` · Lighthouse ${report.version}`}</p>
      {report.demo && <p>Это сохранённый пример отчёта для {new URL(report.url).hostname}.</p>}
    </div>
  )
}

export function Scores({ scores }) {
  return (
    <dl className="scores">
      {scores.map(({ id, label, description, value }) => (
        <div className="score" key={id} data-band={value === null ? 'none' : value >= 90 ? 'good' : value >= 50 ? 'fair' : 'poor'}>
          <dt>{label}<small>{description}</small></dt>
          <dd>
            <svg className="score-ring" aria-hidden="true" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" pathLength="100" />
              <circle cx="32" cy="32" r="28" pathLength="100" strokeDasharray={`${value ?? 0} 100`} />
            </svg>
            <span>{value ?? '—'}{value !== null && <span className="sr-only"> из 100</span>}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function Metrics({ metrics, fieldData }) {
  return <div className="metrics-panel">
    <h3>Метрики производительности</h3>
    {metrics.length ? <dl className="metrics">{metrics.map(({ id, label, description, value }) =>
      <div key={id}><dt>{label}<small>{description}</small></dt><dd>{value}</dd></div>
    )}</dl> : <p>Метрики отсутствуют в ответе PageSpeed.</p>}
    {fieldData.length > 0 && <details className="field-data">
      <summary>Данные реальных пользователей · 75-й процентиль</summary>
      <dl className="metrics">{fieldData.map(({ id, label, value }) =>
        <div key={id}><dt>{label}</dt><dd>{value}</dd></div>
      )}</dl>
    </details>}
  </div>
}

function AuditDescription({ text }) {
  return (text ?? '').split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/)
    return link ? <a key={index} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a> : part.replaceAll('`', '')
  })
}

export function Recommendations({ items }) {
  return <div className="recommendations">
    <h3>Рекомендации PageSpeed</h3>
    {items.length ? items.map(({ id, title, description, displayValue }) =>
      <details key={id}>
        <summary>{title}</summary>
        {displayValue && <p><strong>{displayValue}</strong></p>}
        {description && <p><AuditDescription text={description} /></p>}
      </details>
    ) : <p>В отчёте PageSpeed нет рекомендаций по выбранным категориям.</p>}
  </div>
}
