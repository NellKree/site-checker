import { Brand } from '../../components/Icons.jsx'
import { Orbit } from '../../components/Artwork.jsx'
import CheckForm from '../../components/CheckForm.jsx'
import { Metrics, Recommendations, ReportMeta, Scores } from '../../components/Report.jsx'
import { Offers } from '../../components/Offers.jsx'
import './style.css'

export default function Experimental({ check, report, offers, switcher, reportRef }) {
  return <div className="design experimental">
    <header className="exp-head wrap"><Brand />{switcher}</header>
    <main id="main" className="wrap">
      <section className="exp-stage">
        <figure className="exp-graphic"><Orbit /><figcaption>СХЕМА / ПОЛЕ СКАНИРОВАНИЯ</figcaption></figure>
        <div className="exp-intro"><h1>Сайт под<br />сканером.</h1><p>Бесплатный срез Google PageSpeed Insights. От загрузки страницы до поисковой оптимизации.</p></div>
        <div className="exp-console"><span>ВХОД / URL</span><CheckForm check={check} /></div>
      </section>
      {report && <section className="report exp-report" ref={reportRef} tabIndex={-1} aria-label="Отчёт PageSpeed">
        <header><h2>Сигнал получен.</h2><ReportMeta report={report} /></header>
        <Scores scores={report.scores} /><Recommendations items={report.recommendations} /><Metrics {...report} />
      </section>}
      <Offers {...offers} />
    </main>
    <footer className="wrap site-foot"><span>Срез / Creative Tech</span><span>Google PageSpeed Insights</span></footer>
  </div>
}
