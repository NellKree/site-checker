export const categories = [
  ['performance', 'Performance', 'Производительность'],
  ['accessibility', 'Accessibility', 'Доступность'],
  ['best-practices', 'Best Practices', 'Лучшие практики'],
  ['seo', 'SEO', 'Поисковая оптимизация'],
]

const metrics = [
  ['first-contentful-paint', 'FCP', 'Первое появление контента'],
  ['largest-contentful-paint', 'LCP', 'Появление крупнейшего элемента'],
  ['total-blocking-time', 'TBT', 'Время блокировки потока'],
  ['cumulative-layout-shift', 'CLS', 'Смещение макета'],
  ['speed-index', 'SI', 'Скорость появления содержимого'],
]

export function mapReport(payload, { url, demo }) {
  const result = payload?.lighthouseResult
  if (result?.runtimeError) {
    throw new Error('Lighthouse не смог завершить проверку. Убедитесь, что страница открывается без входа, и повторите попытку.')
  }
  if (!result?.categories || !result?.audits) {
    throw new Error('PageSpeed вернул неполный отчёт. Повторите проверку позже.')
  }

  const scores = categories.map(([id, label, description]) => {
    const score = result.categories[id]?.score
    return { id, label, description, value: Number.isFinite(score) ? Math.round(score * 100) : null }
  })
  const auditIds = new Set(categories.flatMap(([id]) =>
    result.categories[id]?.auditRefs?.map(audit => audit.id) ?? []
  ))
  const recommendations = [...auditIds]
    .map(id => ({ id, ...result.audits[id] }))
    .filter(audit => audit.title && audit.score != null && audit.score < 0.9 &&
      !['informative', 'manual', 'notApplicable', 'error'].includes(audit.scoreDisplayMode) &&
      !metrics.some(([id]) => id === audit.id))

  return {
    url: result.finalDisplayedUrl || result.finalUrl || result.requestedUrl || payload.id || url,
    requestedUrl: result.requestedUrl || url,
    date: result.fetchTime || payload.analysisUTCTimestamp,
    version: result.lighthouseVersion,
    device: result.configSettings?.formFactor === 'desktop' ? 'Компьютер' : 'Мобильные',
    demo,
    scores,
    metrics: metrics.flatMap(([id, label, description]) => {
      const value = result.audits[id]?.displayValue
      return value ? [{ id, label, description, value }] : []
    }),
    recommendations,
    fieldData: Object.entries(payload.loadingExperience?.metrics ?? {})
      .filter(([, metric]) => Number.isFinite(metric.percentile) && metric.percentile >= 0)
      .flatMap(([id, metric]) => {
        const labels = {
          FIRST_CONTENTFUL_PAINT_MS: 'FCP',
          LARGEST_CONTENTFUL_PAINT_MS: 'LCP',
          INTERACTION_TO_NEXT_PAINT: 'INP',
          EXPERIMENTAL_TIME_TO_FIRST_BYTE: 'TTFB',
          CUMULATIVE_LAYOUT_SHIFT_SCORE: 'CLS',
          FIRST_INPUT_DELAY_MS: 'FID',
        }
        if (!labels[id]) return []
        const value = id === 'CUMULATIVE_LAYOUT_SHIFT_SCORE' ? String(metric.percentile / 100) : `${metric.percentile} мс`
        return [{ id, label: labels[id], value }]
      }),
  }
}
