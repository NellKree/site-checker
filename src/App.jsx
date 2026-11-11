import { useEffect, useRef, useState } from 'react'
import { designs } from './designs/index.js'
import { normalizeUrl, runPageSpeed } from './services/pagespeed.js'
import { mapReport } from './data/reportMapping.js'
import demo from './data/demo-report.json'
import Gallery from './components/Gallery.jsx'
import { Icon } from './components/Icons.jsx'
import { OfferModal } from './components/Offers.jsx'

function currentDesign() {
  return designs.find(design => window.location.hash === `#/${design.id}`)
}

function DesignSwitcher({ selected }) {
  return <nav className="design-switch" aria-label="Концепции">
    <a href="#/" aria-label="Все концепции" title="Все концепции"><Icon name="grid" size={16} /></a>
    <label>
      <span className="sr-only">Переключить концепцию</span>
      <select value={selected} onChange={event => { window.location.hash = `#/${event.target.value}` }}>
        {designs.map(({ id, name }, index) => <option key={id} value={id}>{String(index + 1).padStart(2, '0')} / {name}</option>)}
      </select>
      <Icon name="chevron" size={13} />
    </label>
  </nav>
}

export default function App() {
  const [design, setDesign] = useState(currentDesign)
  const [url, setUrl] = useState('')
  const [mode, setMode] = useState('demo')
  const [strategy, setStrategy] = useState('mobile')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [report, setReport] = useState(null)
  const [modal, setModal] = useState(null)
  const reportRef = useRef(null)

  useEffect(() => {
    function changeDesign() {
      setDesign(currentDesign())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', changeDesign)
    return () => window.removeEventListener('hashchange', changeDesign)
  }, [])

  useEffect(() => {
    document.title = design ? `Срез — ${design.name}` : 'Срез — дизайн-лаборатория'
  }, [design])

  useEffect(() => {
    if (!report) return
    reportRef.current?.focus({ preventScroll: true })
    reportRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    })
  }, [report])

  async function submit(event) {
    event.preventDefault()
    if (busy) return

    let normalized
    try {
      normalized = normalizeUrl(url)
    } catch (failure) {
      setError({ message: failure.message, field: true })
      return
    }

    setError(null)
    setReport(null)
    setBusy(true)
    try {
      if (mode === 'demo') {
        await new Promise(resolve => setTimeout(resolve, 320))
        setReport(mapReport(demo, { url: demo.id, demo: true }))
      } else {
        setReport(await runPageSpeed(normalized, strategy))
      }
    } catch (failure) {
      setError({ message: failure.message })
    } finally {
      setBusy(false)
    }
  }

  const check = {
    url, mode, strategy, busy, error, submit,
    setUrl: value => { setUrl(value); setError(null) },
    setMode: value => { setMode(value); setError(null) },
    setStrategy: value => { setStrategy(value); setError(null) },
  }
  const offers = { onSoon: () => setModal('soon'), onAudit: () => setModal('audit') }
  const Design = design?.Component

  return <>
    {Design ? <Design check={check} report={report} reportRef={reportRef} offers={offers}
      switcher={<DesignSwitcher selected={design.id} />} /> : <Gallery designs={designs} />}
    {modal && <OfferModal key={modal} kind={modal} url={url} close={() => setModal(null)} />}
  </>
}
