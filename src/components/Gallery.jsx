import { Brand, Icon, Mark } from './Icons.jsx'
import { Cut, Folio, Orbit, Signal } from './Artwork.jsx'
import './gallery.css'

function PreviewBar() {
  return <div className="mini-input"><span>example.com</span><b>Проверить сайт ↗</b></div>
}

const previews = {
  minimal: <div className="mini-minimal"><small>● Независимая проверка сайтов</small><strong>Проверьте сайт<br />перед приёмкой.</strong><span>Отчёт Google PageSpeed Insights</span><PreviewBar /></div>,
  laboratory: <div className="mini-lab"><div><small>ПРОТОКОЛ / 01</small><strong>Измерьте<br />свой сайт.</strong></div><Signal /><PreviewBar /></div>,
  desktop: <div className="mini-desktop"><div className="mini-window"><small>⊞ &nbsp; Проверка сайта</small><div><Icon name="scan" /><strong>Рабочий стол<br />проверки.</strong><PreviewBar /></div></div><div className="mini-dock"><Icon name="scan" /><Icon name="file" /><Icon name="person" /></div></div>,
  editorial: <div className="mini-ed"><div><small>01 / БЕСПЛАТНАЯ ПРОВЕРКА</small><strong>Сайт<br />на срезе.</strong></div><Cut /><PreviewBar /></div>,
  experimental: <div className="mini-exp"><Orbit /><strong>Сайт под<br />сканером.</strong><PreviewBar /></div>,
  premium: <div className="mini-premium"><div><small>БЮРО ЭКСПЕРТИЗЫ</small><strong>Независимая<br />проверка сайта</strong><PreviewBar /></div><Folio /></div>,
}

export default function Gallery({ designs }) {
  return <div className="gallery">
    <header className="gallery-top wrap">
      <Brand /><span className="gallery-top-label">Лаборатория интерфейсов</span><span className="gallery-version">ПРОТОТИП 01</span>
    </header>
    <main id="main" className="wrap">
      <section className="gallery-intro">
        <div><div className="gallery-kicker"><i /> СЕРИЯ ИССЛЕДОВАНИЙ / 01</div><h1>Сайт на срезе<span>.</span></h1></div>
        <p>Шесть концепций сервиса независимой проверки сайтов. Откройте любую, чтобы пройти проверку и сравнить отчёты.</p>
      </section>
      <section aria-labelledby="gallery-title">
        <div className="gallery-section"><h2 id="gallery-title">Визуальные концепции</h2><span>01–06 / КАТАЛОГ</span></div>
        <div className="gallery-grid">{designs.map(({ id, name, type, description }, index) =>
          <a className="gallery-card" href={`#/${id}`} key={id} aria-label={`Открыть ${name} — ${description}`}>
            <div className={`preview preview-${id}`} aria-hidden="true">
              <div className="preview-bar"><span><Mark size={13} /> Срез</span><span>{type}</span></div>
              {previews[id]}
            </div>
            <div className="gallery-card-body">
              <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{name}</h3><p>{description}</p></div>
              <span className="card-arrow"><Icon name="diagonal" size={19} /></span>
            </div>
          </a>
        )}</div>
      </section>
    </main>
    <footer className="gallery-foot wrap"><span><Mark size={15} /> Срез / Дизайн-лаборатория</span><span>Источник данных · Google PageSpeed Insights</span></footer>
  </div>
}
