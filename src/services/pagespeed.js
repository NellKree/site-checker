import { categories, mapReport } from '../data/reportMapping.js'

export function normalizeUrl(value) {
  const input = value.trim()
  try {
    if (!input || /\s/.test(input) || input.includes('\\')) throw new Error()
    const hasScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(input)
    const url = new URL(hasScheme ? input : `https://${input}`)
    if (!['http:', 'https:'].includes(url.protocol) ||
        url.username || url.password || !url.hostname.includes('.') ||
        url.hostname.replace(/\.$/, '').split('.').some(label => !/^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(label))) {
      throw new Error()
    }
    url.hash = ''
    return url.href
  } catch {
    throw new Error('Введите корректный адрес сайта, например example.com.')
  }
}

export async function runPageSpeed(url, strategy) {
  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')
  endpoint.search = new URLSearchParams({ url, strategy, locale: 'ru' })
  for (const [category] of categories) endpoint.searchParams.append('category', category)

  let response
  try {
    response = await fetch(endpoint, { signal: AbortSignal.timeout(100_000) })
  } catch (error) {
    throw new Error(error.name === 'TimeoutError'
      ? 'PageSpeed не ответил вовремя. Повторите проверку позже.'
      : 'Не удалось подключиться к PageSpeed. Проверьте подключение или откройте демо.')
  }

  if (response.status === 429 || response.status === 403) {
    throw new Error('Google PageSpeed ограничил запросы без ключа. Повторите проверку позже или откройте демо.')
  }
  if (response.status === 400 || response.status === 404) {
    throw new Error('PageSpeed не смог открыть этот адрес. Проверьте ссылку и доступность страницы.')
  }
  if (!response.ok) {
    throw new Error('Google PageSpeed временно недоступен. Повторите проверку позже.')
  }
  const payload = await response.json().catch(() => null)
  return mapReport(payload, { url, demo: false })
}
