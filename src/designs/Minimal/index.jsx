import { Brand } from '../../components/Icons.jsx'
import CheckForm from '../../components/CheckForm.jsx'
import { Metrics, Recommendations, ReportMeta, Scores } from '../../components/Report.jsx'
import { Offers } from '../../components/Offers.jsx'
import './style.css'

export default function Minimal({ check, report, offers, switcher, reportRef }) {
  return <div className="design minimal">
    <header className="minimal-head wrap"><Brand />{switcher}</header>
    <main id="main" className="wrap">
      <section className="minimal-hero">
        <div className="minimal-label"><span /> Независимая проверка сайтов</div>
        <h1>Проверьте сайт<br />перед приёмкой.</h1>
        <p>Вставьте ссылку и получите бесплатный отчёт Google PageSpeed Insights по четырём категориям.</p>
        <CheckForm check={check} />
      </section>
      <div className="minimal-strip"><span>Что проверяет PageSpeed</span><span>Performance</span><span>Accessibility</span><span>Best Practices</span><span>SEO</span></div>
      {report && <section className="report" ref={reportRef} tabIndex={-1} aria-label="Отчёт PageSpeed">
        <h2>Отчёт проверки</h2><ReportMeta report={report} /><Scores scores={report.scores} />
        <div className="minimal-report-grid"><Metrics {...report} /><Recommendations items={report.recommendations} /></div>
      </section>}
      <Offers {...offers} />
    </main>
    <footer className="wrap site-foot"><span>Срез / Бесплатная диагностика</span><span>Данные Google PageSpeed Insights</span></footer>
  </div>
}
