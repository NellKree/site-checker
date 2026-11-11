import Minimal from './Minimal/index.jsx'
import Laboratory from './Laboratory/index.jsx'
import Desktop from './Desktop/index.jsx'
import Editorial from './Editorial/index.jsx'
import Experimental from './Experimental/index.jsx'
import Premium from './Premium/index.jsx'

export const designs = [
  { id: 'minimal', name: 'Minimal', type: 'Product First', description: 'Чистая типографика и одна задача в центре внимания.', Component: Minimal },
  { id: 'laboratory', name: 'Laboratory', type: 'Digital Lab', description: 'Измерения в формате лабораторного протокола.', Component: Laboratory },
  { id: 'desktop', name: 'Desktop', type: 'Desktop OS', description: 'Проверка в окне, услуги на рабочем столе.', Component: Desktop },
  { id: 'editorial', name: 'Editorial', type: 'Swiss Design', description: 'Крупный набор и строгая редакционная сетка.', Component: Editorial },
  { id: 'experimental', name: 'Experimental', type: 'Creative Tech', description: 'Сайт проходит через графическое поле сканирования.', Component: Experimental },
  { id: 'premium', name: 'Premium', type: 'Independent Audit', description: 'Спокойная подача в духе бюро экспертизы.', Component: Premium },
]
