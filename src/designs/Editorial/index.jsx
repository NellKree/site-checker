import { Brand } from '../../components/Icons.jsx'
import { Cut } from '../../components/Artwork.jsx'
import CheckForm from '../../components/CheckForm.jsx'
import { Metrics, Recommendations, ReportMeta, Scores } from '../../components/Report.jsx'
import { Offers } from '../../components/Offers.jsx'
import './style.css'

export default function Editorial({ check, report, offers, switcher, reportRef }) {
  return <div className="design editorial">
    <header className="editorial-head wrap"><Brand /><span>Бюро проверки сайтов</span>{switcher}</header>
    <main id="main" className="wrap">
      <section className="ed-hero">
        <div className="ed-title"><div className="ed-index">01 / БЕСПЛАТНАЯ ПРОВЕРКА</div><h1>Сайт<br />на срезе.</h1></div>
        <figure className="ed-graphic"><Cut /><figcaption>РИС. 01 / СРЕЗ СТРАНИЦЫ</figcaption></figure>
        <p className="ed-intro">Взгляд на сайт перед приёмкой. Четыре оценки Google PageSpeed Insights по одной ссылке.</p>
        <CheckForm check={check} />
      </section>
      {report && <section className="report ed-report" ref={reportRef} tabIndex={-1} aria-label="Отчёт PageSpeed">
        <header><span className="ed-index">02 / РЕЗУЛЬТАТЫ</span><h2>На срезе</h2></header>
        <ReportMeta report={report} /><Scores scores={report.scores} /><Metrics {...report} /><Recommendations items={report.recommendations} />
      </section>}
      <Offers {...offers} />
    </main>
    <footer className="wrap site-foot"><span>Срез / Бюро проверки сайтов</span><span>Google PageSpeed Insights</span></footer>
  </div>
}
