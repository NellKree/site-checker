import { Brand, Icon } from '../../components/Icons.jsx'
import CheckForm from '../../components/CheckForm.jsx'
import { Metrics, Recommendations, ReportMeta, Scores } from '../../components/Report.jsx'
import { Offers } from '../../components/Offers.jsx'
import './style.css'

function WindowBar({ icon, children, title }) {
  return <div className="desk-bar"><Icon name={icon} size={16} /><span>{children}</span><small>{title}</small></div>
}

export default function Desktop({ check, report, offers, switcher, reportRef }) {
  return <div className="design desktop">
    <header className="desk-top"><div className="wrap"><Brand /><span>Рабочая область</span>{switcher}</div></header>
    <main id="main" className="wrap desk-space">
      <div className="desk-hero">
        <div className="desk-window">
          <WindowBar icon="scan" title="Приложение 01">Проверка сайта</WindowBar>
          <section className="desk-content"><span className="desk-app-icon"><Icon name="scan" size={29} /></span><h1>Рабочий стол<br />проверки.</h1><p>Откройте бесплатный отчёт Google PageSpeed по ссылке на сайт.</p><CheckForm check={check} /></section>
        </div>
        <aside className="desk-dock" aria-label="Приложения">
          <button type="button" onClick={() => document.getElementById('check-url').focus()}><Icon name="scan" size={27} />Проверка сайта</button>
          <button onClick={offers.onSoon}><Icon name="file" size={27} />Полный отчёт</button>
          <button onClick={offers.onAudit}><Icon name="person" size={27} />Экспертный аудит</button>
        </aside>
      </div>
      {report && <section className="report desk-window" ref={reportRef} tabIndex={-1} aria-label="Отчёт PageSpeed">
        <WindowBar icon="file" title="Отчёт">PageSpeed Insights</WindowBar>
        <div className="desk-report">
          <header><h2>Результаты проверки</h2><ReportMeta report={report} /></header>
          <div className="desk-report-grid"><Scores scores={report.scores} /><Metrics {...report} /></div>
          <Recommendations items={report.recommendations} />
        </div>
      </section>}
      <Offers {...offers} />
    </main>
    <footer className="wrap site-foot"><span>Срез / Рабочий стол</span><span>Google PageSpeed Insights</span></footer>
  </div>
}
