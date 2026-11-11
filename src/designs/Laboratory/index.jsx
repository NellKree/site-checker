import { Brand } from '../../components/Icons.jsx'
import { Signal } from '../../components/Artwork.jsx'
import CheckForm from '../../components/CheckForm.jsx'
import { Metrics, Recommendations, ReportMeta, Scores } from '../../components/Report.jsx'
import { Offers } from '../../components/Offers.jsx'
import './style.css'

export default function Laboratory({ check, report, offers, switcher, reportRef }) {
  return <div className="design laboratory">
    <header className="lab-head wrap"><Brand /><span className="lab-head-label">Лаборатория веб-измерений</span>{switcher}</header>
    <main id="main" className="wrap">
      <section className="lab-stage">
        <div className="lab-intro"><span className="lab-mono">ПРОТОКОЛ / 01</span><h1>Измерьте<br />свой сайт.</h1><p>Четыре измерения PageSpeed в одном протоколе. Бесплатно, по адресу страницы.</p></div>
        <figure className="lab-graphic"><figcaption><span>Рис. 01 / Схема замера</span><span>+ / −</span></figcaption><Signal /><div>ЗАГРУЗКА <span>ВРЕМЯ →</span></div></figure>
        <div className="lab-form"><div><span className="lab-mono">ВХОДНЫЕ ДАННЫЕ</span><h2>Объект проверки</h2></div><CheckForm check={check} /></div>
      </section>
      {report && <section className="report lab-report" ref={reportRef} tabIndex={-1} aria-label="Отчёт PageSpeed">
        <header><span className="lab-mono">ВЫХОДНЫЕ ДАННЫЕ / 01</span><h2>Протокол проверки</h2><ReportMeta report={report} /></header>
        <div className="lab-report-body"><Scores scores={report.scores} /><Metrics {...report} /><Recommendations items={report.recommendations} /></div>
      </section>}
      <Offers {...offers} />
    </main>
    <footer className="wrap site-foot"><span>КОНЕЦ ПРОТОКОЛА</span><span>ИСТОЧНИК / GOOGLE PAGESPEED INSIGHTS</span></footer>
  </div>
}
