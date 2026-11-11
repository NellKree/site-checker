import { Brand } from '../../components/Icons.jsx'
import { Folio } from '../../components/Artwork.jsx'
import CheckForm from '../../components/CheckForm.jsx'
import { Metrics, Recommendations, ReportMeta, Scores } from '../../components/Report.jsx'
import { Offers } from '../../components/Offers.jsx'
import './style.css'

export default function Premium({ check, report, offers, switcher, reportRef }) {
  return <div className="design premium">
    <header className="premium-head wrap"><Brand /><span>Бюро независимой экспертизы</span>{switcher}</header>
    <main id="main" className="wrap">
      <section className="premium-hero">
        <div className="premium-intro"><span className="premium-label">СЕРВИС ДЛЯ ПРИЁМКИ САЙТОВ</span><h1>Независимая<br />проверка сайта</h1><p>Начните с бесплатного отчёта Google PageSpeed Insights. Посмотрите, какие показатели получил сайт и что требует внимания.</p><CheckForm check={check} /></div>
        <figure className="premium-graphic"><Folio /><figcaption><span>Срез / Экспертиза</span><span>01</span></figcaption></figure>
      </section>
      {report && <section className="report premium-report" ref={reportRef} tabIndex={-1} aria-label="Отчёт PageSpeed">
        <header><div><span className="premium-label">АВТОМАТИЧЕСКАЯ ДИАГНОСТИКА</span><h2>Отчёт PageSpeed</h2></div><ReportMeta report={report} /></header>
        <Scores scores={report.scores} /><div className="premium-report-grid"><Recommendations items={report.recommendations} /><Metrics {...report} /></div>
      </section>}
      <Offers {...offers} />
    </main>
    <footer className="wrap site-foot"><span>Срез / Независимая экспертиза</span><span>Источник данных — Google PageSpeed Insights</span></footer>
  </div>
}
