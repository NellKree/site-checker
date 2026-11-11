export function Signal() {
  return <svg className="signal" viewBox="0 0 570 280" fill="none" aria-hidden="true">
    <g stroke="currentColor" opacity=".24">
      {[42, 91, 140, 189, 238].map(y => <path key={y} d={`M15 ${y}H555`} />)}
      {[60, 135, 210, 285, 360, 435, 510].map(x => <path key={x} d={`M${x} 22V258`} />)}
    </g>
    <path d="M15 189H107L135 159H183L210 189H257L285 91H316L360 140H410L435 105H476L510 65H555" stroke="currentColor" strokeWidth="3" />
    <g fill="currentColor"><circle cx="135" cy="159" r="5"/><circle cx="285" cy="91" r="6"/><circle cx="435" cy="105" r="5"/><circle cx="510" cy="65" r="6"/></g>
    <g stroke="currentColor" opacity=".6"><circle cx="285" cy="91" r="15"/><circle cx="510" cy="65" r="15"/></g>
  </svg>
}

export function Orbit() {
  return <svg className="orbit" viewBox="0 0 640 460" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.1" opacity=".8">
      {Array.from({ length: 21 }, (_, index) => <ellipse key={index} cx="320" cy="228" rx="270" ry={35 + index * 7.7} transform={`rotate(${-48 + index * 4.1} 320 228)`} />)}
    </g>
    <g stroke="currentColor" opacity=".7"><path d="M320 22v416M27 228h586" strokeDasharray="3 9"/><circle cx="320" cy="228" r="195" strokeDasharray="3 8"/></g>
    <g fill="currentColor"><circle cx="320" cy="228" r="8"/><circle cx="538" cy="110" r="5"/><circle cx="121" cy="335" r="5"/></g>
  </svg>
}

export function Cut() {
  return <svg className="cut" viewBox="0 0 460 400" fill="none" aria-hidden="true">
    <path d="M78 286 275 89l108 27-196 197L78 286Z" fill="currentColor"/>
    <path d="m100 328 197-197 48 12-197 197-48-12ZM186 345l197-197 17 4-197 197-17-4Z" fill="currentColor" opacity=".7"/>
    <path d="M40 120h385M40 200h385M40 280h385M110 35v330m120-330v330M350 35v330" stroke="currentColor" opacity=".24"/>
    <circle cx="275" cy="89" r="4" fill="currentColor"/>
  </svg>
}

export function Folio() {
  return <svg className="folio" viewBox="0 0 460 480" fill="none" aria-hidden="true">
    <defs><pattern id="folio-lines" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 0v9" stroke="currentColor" strokeWidth="1.6"/></pattern></defs>
    <path d="M230 35 405 135v207L230 445 55 342V135L230 35Z" stroke="currentColor"/>
    <path d="m230 75 140 81v166l-140 81-140-81V156l140-81Z" stroke="currentColor"/>
    <path d="M230 35v205l175 102M55 135l175 105 175-105M55 342l175-102v205" stroke="currentColor"/>
    <path d="M230 75v165l140 82V156L230 75Z" fill="url(#folio-lines)" opacity=".7"/>
    <path d="m90 322 140-82v163L90 322Z" fill="url(#folio-lines)" opacity=".7"/>
    <circle cx="230" cy="240" r="7" fill="currentColor"/>
    <path d="M34 240h392M230 15v450" stroke="currentColor" strokeDasharray="3 7"/>
  </svg>
}
