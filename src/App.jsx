import React, { useEffect, useMemo, useState } from "react";

const PADRON_KEY = "cdt_cobrador_padron_v1";
const COBRANZAS_KEY = "cdt_cobrador_cobranzas_v1";
const CONFIG_KEY = "cdt_cobrador_config_v1";
const ARQUEOS_KEY = "cdt_cobrador_arqueos_v1";

const CUENTAS_NO_CAJA = ["Banco Santa Fe", "Mutual Regional", "Mercado Pago"];
const DENOMINACIONES = [20000, 10000, 2000, 1000, 500, 200, 100, 50, 20, 10];

const CSS = `
*{box-sizing:border-box}html,body,#root{margin:0;min-height:100%;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif}body{overscroll-behavior:none}body{background:#111827}.shell{min-height:100vh;background:linear-gradient(180deg,#020617 0,#111827 280px,#f3f4f6 280px,#f3f4f6 100%);color:#111827}.shell.dark{background:linear-gradient(180deg,#020617 0,#0f172a 285px,#111827 285px,#111827 100%);color:#f9fafb}.top{position:sticky;top:0;z-index:20;background:#020617;color:white;padding:18px 16px 14px;border-bottom:4px solid #b91c1c;box-shadow:0 12px 35px rgba(0,0,0,.35)}.brand{display:flex;justify-content:space-between;gap:12px;align-items:center}.kicker{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;font-weight:800}.title{font-size:28px;font-weight:950;letter-spacing:-.5px;line-height:1.05}.status{text-align:right;font-size:12px;color:#d1d5db}.pill{display:inline-block;margin-top:4px;background:#b91c1c;color:white;border-radius:999px;padding:4px 10px;font-weight:900}.tabs{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:16px}.tab{border:0;border-radius:15px;padding:12px 8px;background:#1f2937;color:#e5e7eb;font-weight:950}.tab.active{background:#dc2626;color:white;box-shadow:0 8px 20px rgba(220,38,38,.35)}.content{max-width:1080px;margin:0 auto;padding:16px}.stack{display:grid;gap:16px}.card{background:rgba(255,255,255,.98);border:1px solid rgba(15,23,42,.08);border-radius:24px;padding:17px;box-shadow:0 14px 38px rgba(15,23,42,.12)}.dark .card{background:#1f2937;border-color:#374151;box-shadow:0 14px 38px rgba(0,0,0,.25);color:#f9fafb}.card.danger{background:#fef2f2;border-color:#fecaca}.dark .card.danger{background:#3f1515;border-color:#7f1d1d}.card-title{margin:0 0 10px;font-size:22px;font-weight:950}.muted{color:#6b7280;font-size:14px}.dark .muted{color:#9ca3af}.field{display:grid;gap:6px}.label{font-size:13px;font-weight:900;color:#374151}.dark .label{color:#d1d5db}.input,.select,textarea{width:100%;border:1px solid #d1d5db;background:white;color:#111827;border-radius:17px;padding:14px;font-size:16px;outline:none}.dark .input,.dark .select,.dark textarea{background:#111827;color:#f9fafb;border-color:#4b5563}.input:focus,.select:focus,textarea:focus{border-color:#dc2626;box-shadow:0 0 0 4px rgba(220,38,38,.12)}.btn{border:0;border-radius:17px;padding:13px 16px;min-height:48px;font-weight:950;color:white;background:#111827;box-shadow:0 8px 20px rgba(17,24,39,.22)}.btn:disabled{opacity:.45;filter:grayscale(1);box-shadow:none}.btn.red{background:#dc2626}.btn.green{background:#047857}.btn.blue{background:#2563eb}.btn.gray{background:#4b5563}.btn-row{display:flex;flex-wrap:wrap;gap:10px}.grid{display:grid;gap:13px}.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}.metric{background:white;border:1px solid #e5e7eb;border-radius:20px;padding:16px;box-shadow:0 8px 22px rgba(15,23,42,.08)}.dark .metric{background:#1f2937;border-color:#374151}.metric-label{font-size:13px;color:#6b7280;font-weight:800}.dark .metric-label{color:#9ca3af}.metric-value{font-size:29px;font-weight:950;color:#047857;margin-top:3px}.search-list{margin-top:12px;max-height:230px;overflow:auto;border:1px solid #e5e7eb;border-radius:20px;background:white}.dark .search-list{background:#111827;border-color:#374151}.list-btn{display:block;width:100%;border:0;border-bottom:1px solid #e5e7eb;background:white;padding:11px 14px;text-align:left;color:#111827}.dark .list-btn{background:#111827;color:#f9fafb;border-color:#374151}.list-btn.selected{background:#ecfdf5;font-weight:900}.dark .list-btn.selected{background:#064e3b}.list-main{font-size:16px;font-weight:900}.list-sub{margin-top:4px;color:#6b7280;font-size:12px}.dark .list-sub{color:#9ca3af}.empty{border-radius:18px;background:#f9fafb;padding:18px;text-align:center;color:#6b7280}.dark .empty{background:#111827;color:#9ca3af}.ok{background:#ecfdf5;color:#047857;font-weight:950}.cuota{display:flex;align-items:center;gap:12px;background:white;border:1px solid #e5e7eb;border-radius:20px;padding:14px;margin-bottom:9px;cursor:pointer}.dark .cuota{background:#111827;border-color:#374151}.cuota.checked{background:#ecfdf5;border-color:#16a34a}.dark .cuota.checked{background:#064e3b}.cuota input{width:24px;height:24px;accent-color:#16a34a}.cuota-body{flex:1;min-width:0}.cuota-periodo{font-weight:950}.cuota-concepto{font-size:13px;color:#6b7280;margin-top:2px}.dark .cuota-concepto{color:#9ca3af}.cuota-importe{font-weight:950;color:#047857;white-space:nowrap}.total-box{display:flex;justify-content:space-between;align-items:center;gap:10px;background:linear-gradient(135deg,#ecfdf5,#fff);border:1px solid #bbf7d0;border-radius:22px;padding:16px}.dark .total-box{background:linear-gradient(135deg,#064e3b,#111827);border-color:#047857}.total-label{font-size:13px;color:#065f46;font-weight:900}.dark .total-label{color:#86efac}.total-value{font-size:31px;font-weight:950;color:#047857}.socio-destacado{margin-top:12px;border-radius:22px;padding:18px;background:linear-gradient(135deg,#111827,#1f2937);color:white;border:1px solid #374151}.dark .socio-destacado{background:linear-gradient(135deg,#7f1d1d,#111827);border-color:#b91c1c}.socio-label{font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:#9ca3af;font-weight:900}.socio-nombre{margin-top:4px;font-size:26px;line-height:1.05;font-weight:950}.socio-meta{margin-top:8px;font-size:13px;color:#d1d5db}.socio-deuda{margin-top:12px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,.18);padding-top:12px}.socio-deuda span{font-size:13px;color:#d1d5db}.socio-deuda b{font-size:28px;color:#86efac}.table-wrap{overflow:auto;border:1px solid #e5e7eb;border-radius:20px;background:white}.dark .table-wrap{background:#111827;border-color:#374151}table{width:100%;border-collapse:collapse;font-size:14px}th{background:#f3f4f6;color:#374151;text-align:left;padding:12px;font-size:12px;text-transform:uppercase;letter-spacing:.04em}.dark th{background:#0f172a;color:#d1d5db}td{padding:12px;border-top:1px solid #e5e7eb}.dark td{border-color:#374151}.notice{border-radius:18px;padding:14px;background:#fffbeb;color:#92400e;font-size:13px;font-weight:800}.dark .notice{background:#422006;color:#facc15}.logo{height:84px;border-radius:16px;border:1px solid #e5e7eb;background:white;padding:8px;object-fit:contain}.file-label{display:block;border:2px dashed #d1d5db;border-radius:18px;padding:18px;text-align:center;background:#f9fafb;color:#374151;font-weight:900}.dark .file-label{background:#111827;color:#d1d5db;border-color:#4b5563}.file-label input{display:none}.arqueo-row{display:grid;grid-template-columns:1fr 100px 120px;gap:8px;align-items:center;border-bottom:1px solid #e5e7eb;padding:8px 0}.dark .arqueo-row{border-color:#374151}@media(min-width:768px){.two{grid-template-columns:1fr 1fr}.three{grid-template-columns:repeat(3,1fr)}.four{grid-template-columns:repeat(4,1fr)}}@media(max-width:540px){.content{padding:12px}.card{padding:14px;border-radius:20px}.title{font-size:24px}.tabs{gap:6px}.tab{font-size:11px;padding:11px 4px}.total-value{font-size:26px}.brand{align-items:flex-start}.status{font-size:11px}}
input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}.money-input{text-align:right;font-weight:900;font-variant-numeric:tabular-nums}
/* Corrección scroll celular */
html,body,#root{
  height:auto!important;
  min-height:100%!important;
  overflow-x:hidden!important;
  overflow-y:auto!important;
  touch-action:pan-y!important;
}
body{
  overscroll-behavior-y:auto!important;
  -webkit-overflow-scrolling:touch;
}
.shell{
  min-height:100dvh!important;
  height:auto!important;
  overflow-y:visible!important;
  touch-action:pan-y!important;
  padding-bottom:90px;
}
.content{
  padding-bottom:120px;
}
@media(max-width:540px){
  .search-list{
    max-height:45vh;
    -webkit-overflow-scrolling:touch;
  }
}

`;

function load(key, fallback) { try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : fallback; } catch { return fallback; } }
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function money(value) { return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(Number(value || 0)); }
function parseMoneyInput(value) { const limpio = String(value || "").replace(/[^0-9]/g, ""); return limpio ? String(Number(limpio)) : ""; }
function formatMoneyInput(value) { const limpio = parseMoneyInput(value); return limpio ? `$ ${new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(Number(limpio))}` : ""; }
function fechaAR(value) { if (!value) return ""; const raw = String(value); if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) { const [y, m, d] = raw.split("-"); return `${d}/${m}/${y}`; } return raw; }
function norm(value) { return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim(); }
function downloadJson(data, filename) { const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url); }
function fechaArchivo() { return new Date().toISOString().slice(0, 19).replaceAll(":", "-"); }
function numeroRecibo(cobranzas) { const max = cobranzas.reduce((acc, c) => Math.max(acc, Number(String(c.numeroRecibo || "").replace(/[^0-9]/g, "")) || 0), 0); return "RCS-" + String(max + 1).padStart(6, "0"); }
function cuentasPorMedio(medio) { return medio === "Efectivo" ? ["Caja"] : CUENTAS_NO_CAJA; }

function Button({ children, onClick, type = "button", variant = "black", disabled = false }) { return <button type={type} disabled={disabled} onClick={onClick} className={`btn ${variant}`}>{children}</button>; }
function Card({ children, className = "" }) { return <div className={`card ${className}`}>{children}</div>; }
function Field({ label, children }) { return <label className="field"><span className="label">{label}</span>{children}</label>; }
function Input({ className = "", onChange, type, ...props }) {
  return <input
    {...props}
    type={type}
    onChange={(e) => {
      if (onChange) onChange(e);
      // En algunos navegadores Android el selector de fecha queda con foco y luego no vuelve a abrir.
      if (type === "date") {
        const el = e.currentTarget;
        setTimeout(() => el && el.blur && el.blur(), 0);
      }
    }}
    className={`input ${className}`.trim()}
  />;
}
function Select({ className = "", onChange, ...props }) {
  return <select
    {...props}
    onChange={(e) => {
      if (onChange) onChange(e);
      // Evita que el select quede trabado/focalizado después de elegir una opción.
      const el = e.currentTarget;
      setTimeout(() => el && el.blur && el.blur(), 0);
    }}
    className={`select ${className}`.trim()}
  />;
}


function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}
function periodoMesLabel(periodo) {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const [y, m] = String(periodo || "").split("-");
  const idx = Number(m) - 1;
  return y && idx >= 0 && idx < 12 ? `${meses[idx]} ${y}` : String(periodo || "");
}
function ultimoDiaMesDesdeFecha(fecha) {
  const [y, m] = String(fecha || new Date().toISOString().slice(0, 10)).split("-").map(Number);
  return new Date(y, m, 0).getDate();
}
function mesCierreDesdeFecha(fecha) {
  return String(fecha || new Date().toISOString().slice(0, 10)).slice(0, 7);
}
function moneyTicket(value) {
  return "$ " + new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(Number(value || 0));
}

function abrirTicket({ config, socio, cuotas, cobranza }) {
  const total = cuotas.reduce((a, b) => a + Number(b.importe || 0), 0);
  const detalle = cuotas.map((c) => `<div class="item">
      <div class="item-left">
        <b>${escapeHtml(c.periodo || "")}</b>
        <span>${escapeHtml(c.concepto || periodoMesLabel(c.periodo) || "Cuota social")}</span>
      </div>
      <strong>${moneyTicket(c.importe)}</strong>
    </div>`).join("");
  const logo = config.logo ? `<div class="logo"><img src="${config.logo}" /></div>` : "";
  const club = escapeHtml(config.club || "Club Deportivo Tacural");
  const cobrador = escapeHtml(config.cobrador || "-");

  const copia = (titulo) => `<section class="ticket">
    ${logo}
    <div class="club">${club}</div>
    <div class="sub">RECIBO DE CUOTAS SOCIETARIAS - ${titulo}</div>
    <div class="nro">${escapeHtml(cobranza.numeroRecibo)}</div>

    <div class="line"></div>
    <div class="datos"><span>Fecha</span><b>${fechaAR(cobranza.fecha)}</b></div>
    <div class="datos"><span>Cobrador</span><b>${cobrador}</b></div>
    <div class="line"></div>

    <div class="socio">${escapeHtml(socio.numero || "")} - ${escapeHtml(socio.nombre || "")}</div>
    <div class="mini">DNI: ${escapeHtml(socio.dni || "-")}</div>
    <div class="line"></div>

    <div class="titulo">CUOTAS COBRADAS</div>
    ${detalle}

    <div class="line"></div>
    <div class="total"><span>TOTAL</span><b>${moneyTicket(total)}</b></div>
    <div class="datos"><span>Medio</span><b>${escapeHtml(cobranza.medio)}</b></div>
    <div class="datos"><span>Cuenta</span><b>${escapeHtml(cobranza.cuentaFinanciera)}</b></div>
    <div class="line"></div>
    <div class="pie">Comprobante no fiscal<br/>Gracias por colaborar con el club</div>
  </section>`;

  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(cobranza.numeroRecibo)}</title><style>
    @page{size:58mm auto;margin:0}
    html,body{width:58mm;margin:0;padding:0;background:#fff;color:#000}
    body{font-family:Arial,'Helvetica Neue',sans-serif;font-size:11px;font-weight:500;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .print-btn{margin:6px;padding:7px 9px;font-size:13px}
    .ticket{width:58mm;padding:2.2mm 2.6mm 3.2mm;box-sizing:border-box;page-break-after:always;break-after:page;background:#fff;color:#000}
    .logo{text-align:center;margin:0 0 1.2mm}.logo img{max-width:21mm;max-height:18mm;object-fit:contain;display:inline-block}
    .club{text-align:center;font-size:13.5px;font-weight:900;text-transform:uppercase;line-height:1.03;letter-spacing:.2px;margin:0 auto 1.7mm;max-width:48mm}
    .sub{text-align:center;font-size:8.4px;font-weight:900;margin-top:.4mm;text-transform:uppercase;white-space:nowrap}
    .nro{text-align:center;font-size:13.2px;font-weight:900;margin-top:1.2mm;letter-spacing:.2px}
    .line{border-top:1px dashed #111;margin:2.2mm 0}
    .datos{display:flex;justify-content:space-between;gap:2mm;margin:.8mm 0;line-height:1.12}
    .datos span{color:#111}.datos b{text-align:right;font-weight:900;max-width:35mm;word-break:break-word}
    .socio{font-size:13.2px;font-weight:900;line-height:1.12;margin-bottom:1mm;text-transform:uppercase}
    .mini{font-size:9.5px;margin-top:.7mm;line-height:1.1}
    .titulo{font-size:11.2px;font-weight:900;margin-bottom:1.5mm;text-transform:uppercase}
    .item{display:flex;justify-content:space-between;gap:2mm;margin:1.8mm 0;align-items:flex-start;page-break-inside:avoid;break-inside:avoid}
    .item-left{min-width:0;max-width:35mm}.item b{display:block;font-size:11.5px;line-height:1.05}.item span{display:block;font-size:8.8px;color:#222;line-height:1.12;margin-top:.4mm}.item strong{font-size:10.8px;white-space:nowrap;font-weight:900;text-align:right}
    .total{display:flex;justify-content:space-between;align-items:center;font-size:16px;font-weight:900;border:1.5px solid #111;padding:1.8mm 2mm;margin:2.1mm 0 2mm;line-height:1.1}
    .total span{font-weight:900}.total b{font-size:17px;font-weight:900;white-space:nowrap}
    .pie{text-align:center;font-size:8.6px;line-height:1.22;margin-top:1mm}
    @media print{.print-btn{display:none}.ticket:last-child{page-break-after:auto;break-after:auto}}
  </style></head><body><button class="print-btn" onclick="window.print()">Imprimir</button>${copia("ORIGINAL")}${config.imprimirDuplicado ? copia("DUPLICADO") : ""}<script>setTimeout(()=>window.print(),500)</script></body></html>`;
  const w = window.open("", "_blank");
  if (!w) return alert("Permití ventanas emergentes para imprimir el ticket.");
  w.document.open(); w.document.write(html); w.document.close();
}

function abrirPDFCierre({ config, arqueo, comisionPorcentaje, comisionImporte, netoARendir }) {
  const s = arqueo.sistema || {};
  const c = arqueo.contado || {};
  const noEf = c.noEfectivo || {};
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Cierre mensual cobrador</title><style>
    @page{size:A4;margin:14mm}body{font-family:Arial,sans-serif;color:#111;margin:0}.head{border-bottom:4px solid #dc2626;padding-bottom:10px;margin-bottom:18px}.kicker{font-size:12px;font-weight:800;letter-spacing:1px;color:#555;text-transform:uppercase}.title{font-size:26px;font-weight:900;margin-top:4px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0}.box{border:1px solid #ddd;border-radius:10px;padding:10px}.label{font-size:11px;color:#666;text-transform:uppercase;font-weight:800}.value{font-size:18px;font-weight:900;margin-top:4px}table{width:100%;border-collapse:collapse;margin-top:12px}td,th{border-bottom:1px solid #ddd;padding:9px;text-align:left}th{background:#f3f4f6;text-transform:uppercase;font-size:11px}td:last-child,th:last-child{text-align:right}.total{font-weight:900;background:#f9fafb}.commission{border:2px solid #047857;border-radius:12px;padding:12px;margin-top:16px}.obs{min-height:60px;border:1px solid #ddd;border-radius:10px;padding:10px;white-space:pre-wrap}.sign{display:grid;grid-template-columns:1fr 1fr;gap:50px;margin-top:48px}.line{border-top:1px solid #111;text-align:center;padding-top:8px;font-size:12px}.btn{margin:10px;padding:10px}@media print{.btn{display:none}}
  </style></head><body><button class="btn" onclick="window.print()">Imprimir / Guardar PDF</button><div class="head"><div class="kicker">${escapeHtml(config.club || "Club Deportivo Tacural")}</div><div class="title">Rendición mensual de cobrador</div></div><div class="grid"><div class="box"><div class="label">Cobrador</div><div class="value">${escapeHtml(arqueo.cobrador || "")}</div></div><div class="box"><div class="label">Mes cerrado</div><div class="value">${escapeHtml(arqueo.mesCierre || "")}</div></div><div class="box"><div class="label">Período</div><div class="value">${fechaAR(arqueo.desde)} al ${fechaAR(arqueo.hasta)}</div></div><div class="box"><div class="label">Cobros realizados</div><div class="value">${Number(s.cantidadCobros || 0)}</div></div></div><table><thead><tr><th>Concepto</th><th>Según sistema</th><th>Declarado</th></tr></thead><tbody><tr><td>Efectivo</td><td>${money(s.efectivo)}</td><td>${money(c.efectivo)}</td></tr><tr><td>Transferencia</td><td>${money(s.transferencia)}</td><td>${money(noEf.Transferencia)}</td></tr><tr><td>Mercado Pago</td><td>${money(s.mercadoPago)}</td><td>${money(noEf["Mercado Pago"])}</td></tr><tr><td>Débito</td><td>${money(s.debito)}</td><td>${money(noEf.Débito)}</td></tr><tr class="total"><td>Total</td><td>${money(s.total)}</td><td>${money(c.total)}</td></tr><tr class="total"><td>Diferencia</td><td colspan="2">${money(arqueo.diferencia)}</td></tr></tbody></table><div class="commission"><table><tbody><tr><td><b>Comisión cobrador</b></td><td>${Number(comisionPorcentaje || 0).toLocaleString("es-AR")}%</td></tr><tr><td><b>Importe comisión</b></td><td>${money(comisionImporte)}</td></tr><tr><td><b>Neto a rendir en efectivo</b></td><td>${money(netoARendir)}</td></tr></tbody></table></div><h3>Observaciones</h3><div class="obs">${escapeHtml(arqueo.observaciones || "")}</div><div class="sign"><div class="line">Firma cobrador</div><div class="line">Firma tesorería</div></div><script>setTimeout(()=>window.print(),700)</script></body></html>`;
  const w = window.open("", "_blank");
  if (!w) return alert("Permití ventanas emergentes para generar la rendición.");
  w.document.open(); w.document.write(html); w.document.close();
}

export default function App() {
  const today = new Date().toISOString().slice(0, 10);
  const [padron, setPadron] = useState(() => load(PADRON_KEY, { socios: [], cuotas: [] }));
  const [cobranzas, setCobranzas] = useState(() => load(COBRANZAS_KEY, []));
  const [arqueos, setArqueos] = useState(() => load(ARQUEOS_KEY, []));
  const [config, setConfig] = useState(() => load(CONFIG_KEY, { club: "Club Deportivo Tacural", cobrador: "", medioDefault: "Efectivo", cuentaDefault: "Caja", imprimirDuplicado: true, logo: "", tema: "oscuro", claveAdmin: "CDT2026", comisionPorcentaje: 10 }));
  const [adminOk, setAdminOk] = useState(false);
  const [tab, setTab] = useState("cobrar");
  const [busqueda, setBusqueda] = useState("");
  const [socioId, setSocioId] = useState("");
  const [seleccion, setSeleccion] = useState([]);
  const [medio, setMedio] = useState(config.medioDefault || "Efectivo");
  const [cuenta, setCuenta] = useState(cuentasPorMedio(config.medioDefault || "Efectivo")[0]);
  const [fechaCobro, setFechaCobro] = useState(today);
  const [arqueoDesde, setArqueoDesde] = useState(today);
  const [arqueoHasta, setArqueoHasta] = useState(today);
  const [billetes, setBilletes] = useState(() => Object.fromEntries(DENOMINACIONES.map((d) => [d, ""])));
  const [noEfectivoDeclarado, setNoEfectivoDeclarado] = useState({ Transferencia: "", "Mercado Pago": "", Débito: "" });
  const [obsArqueo, setObsArqueo] = useState("");
  const [formResetKey, setFormResetKey] = useState(0);

  useEffect(() => save(PADRON_KEY, padron), [padron]);
  useEffect(() => save(COBRANZAS_KEY, cobranzas), [cobranzas]);
  useEffect(() => save(ARQUEOS_KEY, arqueos), [arqueos]);
  useEffect(() => save(CONFIG_KEY, config), [config]);
  useEffect(() => { const disponibles = cuentasPorMedio(medio); if (!disponibles.includes(cuenta)) setCuenta(disponibles[0]); }, [medio]);

  const cuotasPagadas = useMemo(() => { const set = new Set(); cobranzas.forEach((c) => (c.cuotaIds || []).forEach((id) => set.add(String(id)))); return set; }, [cobranzas]);
  const sociosFiltrados = useMemo(() => { const q = norm(busqueda); return (padron.socios || []).filter((s) => !q || norm(`${s.numero || ""} ${s.nombre || ""} ${s.dni || ""} ${s.telefono || ""}`).includes(q)).sort((a, b) => String(a.nombre || "").localeCompare(String(b.nombre || ""))).slice(0, 60); }, [padron.socios, busqueda]);
  const socio = (padron.socios || []).find((s) => String(s.id) === String(socioId));
  const cuotasPendientes = useMemo(() => socio ? (padron.cuotas || []).filter((c) => String(c.socioId) === String(socio.id) && !cuotasPagadas.has(String(c.id))).sort((a,b)=>String(a.periodo||"").localeCompare(String(b.periodo||""))) : [], [socio, padron.cuotas, cuotasPagadas]);
  const cuotasACobrar = cuotasPendientes.filter((c) => seleccion.includes(String(c.id)));
  const total = cuotasACobrar.reduce((a, b) => a + Number(b.importe || 0), 0);
  const totalCobrado = cobranzas.reduce((a, b) => a + Number(b.importe || 0), 0);

  const cobranzasPeriodo = cobranzas.filter((c) => String(c.fecha || "") >= arqueoDesde && String(c.fecha || "") <= arqueoHasta);
  const totalSistemaPeriodo = cobranzasPeriodo.reduce((a,b)=>a+Number(b.importe||0),0);
  const efectivoSistema = cobranzasPeriodo.filter((c)=>c.medio==="Efectivo").reduce((a,b)=>a+Number(b.importe||0),0);
  const transferSistema = cobranzasPeriodo.filter((c)=>c.medio==="Transferencia").reduce((a,b)=>a+Number(b.importe||0),0);
  const mpSistema = cobranzasPeriodo.filter((c)=>c.medio==="Mercado Pago").reduce((a,b)=>a+Number(b.importe||0),0);
  const debitoSistema = cobranzasPeriodo.filter((c)=>c.medio==="Débito").reduce((a,b)=>a+Number(b.importe||0),0);
  const efectivoContado = DENOMINACIONES.reduce((a,d)=>a + d * Number(billetes[d] || 0), 0);
  const noEfectivoContado = Object.values(noEfectivoDeclarado).reduce((a,b)=>a+Number(b||0),0);
  const totalDeclarado = efectivoContado + noEfectivoContado;
  const diferenciaArqueo = totalDeclarado - totalSistemaPeriodo;
  const comisionPorcentaje = Number(config.comisionPorcentaje || 0);
  const comisionImporte = Math.round(totalSistemaPeriodo * comisionPorcentaje / 100);
  const netoARendir = efectivoSistema - comisionImporte;

  function importarPadron(event) {
    const file = event.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { try { const data = JSON.parse(String(e.target.result || "{}")); if (!Array.isArray(data.socios) || !Array.isArray(data.cuotas)) return alert("El archivo debe contener socios y cuotas."); if (!confirm(`Importar padrón?\nSocios: ${data.socios.length}\nCuotas: ${data.cuotas.length}`)) return; setPadron({ version: data.version || "PADRON", fechaImportacion: new Date().toISOString(), socios: data.socios, cuotas: data.cuotas }); setSocioId(""); setSeleccion([]); alert("Padrón importado correctamente."); } catch { alert("No se pudo leer el JSON del padrón."); } };
    reader.readAsText(file); event.target.value = "";
  }
  function toggleCuota(id) { const sid = String(id); setSeleccion((prev) => prev.includes(sid) ? prev.filter((x) => x !== sid) : [...prev, sid]); }
  function cobrar() {
    if (!socio) return alert("Seleccioná un socio.");
    if (!cuotasACobrar.length) return alert("Seleccioná al menos una cuota.");

    const medioActual = medio;
    const cuentaFinal = medioActual === "Efectivo" ? "Caja" : cuenta;
    const cob = {
      idOperacion: "RCS-OP-" + Date.now(),
      origen: "CELULAR_COBRADOR_CDT",
      fecha: fechaCobro,
      numeroRecibo: numeroRecibo(cobranzas),
      socioId: socio.id,
      socioNumero: socio.numero || "",
      socioNombre: socio.nombre || "",
      dni: socio.dni || "",
      cuotaIds: cuotasACobrar.map((c) => c.id),
      periodos: cuotasACobrar.map((c) => c.periodo),
      importe: total,
      medio: medioActual,
      cuentaFinanciera: cuentaFinal,
      actividad: "Institucional",
      timestamp: new Date().toISOString()
    };

    setCobranzas((prev) => [cob, ...prev]);
    abrirTicket({ config, socio, cuotas: cuotasACobrar, cobranza: cob });

    // Deja la pantalla lista para el próximo socio y evita que el selector quede trabado/focalizado
    // después de cerrar la impresión o el PDF en algunos navegadores Android.
    setSeleccion([]);
    setSocioId("");
    setBusqueda("");
    const medioDefault = config.medioDefault || "Efectivo";
    setMedio(medioDefault);
    setCuenta(cuentasPorMedio(medioDefault)[0]);
    setFormResetKey((v) => v + 1);
    setTimeout(() => {
      if (document.activeElement && typeof document.activeElement.blur === "function") {
        document.activeElement.blur();
      }
    }, 0);
  }
  function cerrarMensual() {
    const mesCierre = mesCierreDesdeFecha(arqueoDesde);
    const [yy, mm] = mesCierre.split("-");
    const desdeMes = `${mesCierre}-01`;
    const hastaMes = `${mesCierre}-${String(ultimoDiaMesDesdeFecha(desdeMes)).padStart(2, "0")}`;
    if (arqueoDesde !== desdeMes || arqueoHasta !== hastaMes) {
      if (!confirm(`El cierre mensual debe ser del ${fechaAR(desdeMes)} al ${fechaAR(hastaMes)}.
¿Ajustar el período automáticamente y continuar?`)) return;
      setArqueoDesde(desdeMes);
      setArqueoHasta(hastaMes);
    }
    const cobranzasMes = cobranzas.filter((c) => String(c.fecha || "") >= desdeMes && String(c.fecha || "") <= hastaMes);
    const sistema = {
      efectivo: cobranzasMes.filter((c)=>c.medio==="Efectivo").reduce((a,b)=>a+Number(b.importe||0),0),
      transferencia: cobranzasMes.filter((c)=>c.medio==="Transferencia").reduce((a,b)=>a+Number(b.importe||0),0),
      mercadoPago: cobranzasMes.filter((c)=>c.medio==="Mercado Pago").reduce((a,b)=>a+Number(b.importe||0),0),
      debito: cobranzasMes.filter((c)=>c.medio==="Débito").reduce((a,b)=>a+Number(b.importe||0),0),
      total: cobranzasMes.reduce((a,b)=>a+Number(b.importe||0),0),
      cantidadCobros: cobranzasMes.length,
    };
    const totalDecl = efectivoContado + noEfectivoContado;
    const dif = totalDecl - sistema.total;
    const comPorc = Number(config.comisionPorcentaje || 0);
    const comImp = Math.round(sistema.total * comPorc / 100);
    const neto = sistema.efectivo - comImp;
    const existente = arqueos.find((a) => a.tipo === "CIERRE_MENSUAL" && a.mesCierre === mesCierre && String(a.cobrador || "") === String(config.cobrador || ""));
    if (existente && !confirm(`Ya existe un cierre mensual de ${mesCierre} para este cobrador.
¿Reemplazarlo?`)) return;
    const arqueo = { id: existente?.id || "CIERRE-" + Date.now(), tipo: "CIERRE_MENSUAL", fecha: new Date().toISOString(), mesCierre, desde: desdeMes, hasta: hastaMes, cobrador: config.cobrador || "", sistema, contado: { billetes, efectivo: efectivoContado, noEfectivo: noEfectivoDeclarado, totalNoEfectivo: noEfectivoContado, total: totalDecl }, diferencia: dif, comision: { porcentaje: comPorc, importe: comImp, netoARendir: neto }, observaciones: obsArqueo };
    setArqueos([arqueo, ...arqueos.filter((a) => a.id !== arqueo.id)]);
    abrirPDFCierre({ config, arqueo, comisionPorcentaje: comPorc, comisionImporte: comImp, netoARendir: neto });
    alert("Cierre mensual guardado. Comisión: " + money(comImp) + " | Neto a rendir en efectivo: " + money(neto));
  }
  function exportarCobranzas() { if (!cobranzas.length) return alert("No hay cobranzas para exportar."); downloadJson({ version: "CDT_COBRANZAS_MOVILES_V2", origen: "CELULAR_COBRADOR_CDT", fechaExportacion: new Date().toISOString(), cobrador: config.cobrador || "", cobranzas, arqueos }, "CDT_cobranzas_moviles_" + fechaArchivo() + ".json"); }
  function borrarCobranzas() { if (!cobranzas.length) return alert("No hay cobranzas para borrar."); if (!confirm("Borrar cobranzas y arqueos del celular? Hacelo sólo después de importar el backup en CDT Gestión.")) return; if (prompt("Para confirmar escribí BORRAR") !== "BORRAR") return alert("Cancelado."); setCobranzas([]); setArqueos([]); setSeleccion([]); }
  function cargarLogo(event) { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = (e) => setConfig({ ...config, logo: String(e.target.result || "") }); reader.readAsDataURL(file); event.target.value = ""; }
  function limpiarTodo() {
    const ok = confirm("ATENCIÓN\n\nEsta acción eliminará todos los datos generados durante las pruebas.\n\nSe borrarán:\n• Padrón importado\n• Cobranzas\n• Arqueos y cierres mensuales\n• Recibos de prueba\n• Numeración de recibos\n\nSe conservarán:\n• Nombre del club\n• Logo\n• Clave administrador\n• Cuentas financieras\n• Comisión del cobrador\n• Configuración de impresión\n\n¿Deseás continuar?");
    if (!ok) return;
    const frase = prompt('Para confirmar escribí exactamente:\n\nBORRAR DATOS DE PRUEBA');
    if (frase !== "BORRAR DATOS DE PRUEBA") return alert("Reinicio cancelado.");
    setPadron({ socios: [], cuotas: [], fechaImportacion: null });
    setCobranzas([]);
    setArqueos([]);
    setSocioId("");
    setSeleccion([]);
    setQuery("");
    setBilletes({});
    setNoEfectivoDeclarado({ Transferencia: "", "Mercado Pago": "", Débito: "" });
    setObsArqueo("");
    alert("Reinicio inicial de producción realizado. La app quedó limpia para importar el padrón definitivo. El próximo recibo será RCS-000001.");
  }
  function cambiarMedioCobro(value) { setMedio(value); setCuenta(cuentasPorMedio(value)[0]); }

  const dark = config.tema === "oscuro";

  function pedirAccesoAdmin() {
    const claveSistema = config.claveAdmin || "CDT2026";
    const clave = prompt("Ingresar clave de administrador");
    if (clave === claveSistema) {
      setAdminOk(true);
      alert("Modo administrador habilitado.");
    } else {
      alert("Clave incorrecta.");
    }
  }

  return <div className={`shell ${dark ? "dark" : ""}`}><style>{CSS}</style><header className="top"><div className="brand"><div><div className="kicker">Club Deportivo Tacural</div><div className="title">Cobrador CDT</div></div><div className="status"><div>{config.cobrador || "Sin cobrador"}</div><span className="pill">{cobranzas.length} cobro/s · {money(totalCobrado)}</span></div></div><nav className="tabs">{[["cobrar","Cobrar"],["arqueo","Arqueo"],["backup","Backup"],...(adminOk ? [["padron","Padrón"],["config","Config"]] : [])].map(([k,l])=><button key={k} onClick={()=>setTab(k)} className={`tab ${tab===k?"active":""}`}>{l}</button>)}</nav></header><main className="content stack">
    {tab === "cobrar" && <><Card><Field label="Buscar socio"><Input value={busqueda} onChange={(e)=>setBusqueda(e.target.value)} placeholder="Nombre, DNI o N° socio" autoFocus /></Field><div className="search-list">{sociosFiltrados.length===0 ? <div className="empty">Sin socios. Importá un padrón.</div> : sociosFiltrados.map((s)=><button key={s.id} onClick={()=>{setSocioId(String(s.id));setSeleccion([])}} className={`list-btn ${String(socioId)===String(s.id)?"selected":""}`}><div className="list-main">{s.numero} - {s.nombre}</div><div className="list-sub">DNI {s.dni || "-"} | Tel. {s.telefono || "-"}</div></button>)}</div></Card><Card>{socio ? <div className="socio-destacado"><div className="socio-label">Socio seleccionado</div><div className="socio-nombre">{socio.numero || ""} - {socio.nombre || ""}</div><div className="socio-meta">DNI {socio.dni || "-"} | Tel. {socio.telefono || "-"}</div><div className="socio-deuda"><span>Total a cobrar</span><b>{money(total)}</b></div></div> : <div className="total-box"><div><div className="total-label">Total a cobrar</div><div className="muted">Seleccioná un socio</div></div><div className="total-value">{money(total)}</div></div>}<h2 className="card-title" style={{marginTop:14}}>Cuotas pendientes</h2>{!socio ? <div className="empty">Seleccioná un socio para ver cuotas.</div> : cuotasPendientes.length===0 ? <div className="empty ok">Sin deuda pendiente.</div> : <div><div className="btn-row" style={{marginBottom:10}}><Button variant="gray" onClick={()=>setSeleccion(cuotasPendientes.map(c=>String(c.id)))}>Todas</Button><Button variant="gray" onClick={()=>setSeleccion([])}>Limpiar</Button></div>{cuotasPendientes.map((c)=><label key={c.id} className={`cuota ${seleccion.includes(String(c.id))?"checked":""}`}><input type="checkbox" checked={seleccion.includes(String(c.id))} onChange={()=>toggleCuota(c.id)} /><div className="cuota-body"><div className="cuota-periodo">{c.periodo}</div><div className="cuota-concepto">{c.concepto || "Cuota social"}</div></div><div className="cuota-importe">{money(c.importe)}</div></label>)}</div>}</Card><Card key={`cobrar-form-${formResetKey}`}><h2 className="card-title" style={{color:'#047857'}}>Cobrar</h2><div className="grid four"><Field label="Fecha"><Input type="date" value={fechaCobro} onChange={(e)=>setFechaCobro(e.target.value)} /></Field><Field label="Medio"><Select value={medio} onChange={(e)=>cambiarMedioCobro(e.target.value)}><option>Efectivo</option><option>Transferencia</option><option>Mercado Pago</option><option>Débito</option></Select></Field><Field label="Cuenta financiera"><Select value={cuenta} onChange={(e)=>setCuenta(e.target.value)}>{cuentasPorMedio(medio).map((c)=><option key={c}>{c}</option>)}</Select></Field><div style={{display:'flex',alignItems:'end'}}><Button variant="green" disabled={!total} onClick={cobrar}>Cobrar e imprimir</Button></div></div><div className="notice" style={{marginTop:12}}>Regla activa: efectivo sólo se registra en Caja. Transferencia, Mercado Pago y Débito sólo permiten cuentas financieras bancarias o digitales.</div></Card></>}
    {tab === "arqueo" && <><Card><h2 className="card-title">Arqueo / cierre del cobrador</h2><div className="grid two"><Field label="Desde"><Input type="date" value={arqueoDesde} onChange={(e)=>setArqueoDesde(e.target.value)} /></Field><Field label="Hasta"><Input type="date" value={arqueoHasta} onChange={(e)=>setArqueoHasta(e.target.value)} /></Field></div></Card><div className="metrics"><div className="metric"><div className="metric-label">Cobros período</div><div className="metric-value">{cobranzasPeriodo.length}</div></div><div className="metric"><div className="metric-label">Total sistema</div><div className="metric-value">{money(totalSistemaPeriodo)}</div></div><div className="metric"><div className="metric-label">Total declarado</div><div className="metric-value">{money(totalDeclarado)}</div></div><div className="metric"><div className="metric-label">Diferencia</div><div className="metric-value" style={{color:diferenciaArqueo===0?'#047857':'#dc2626'}}>{money(diferenciaArqueo)}</div></div></div><Card><h2 className="card-title">Totales según sistema</h2><div className="table-wrap"><table><tbody><tr><td>Efectivo</td><td><b>{money(efectivoSistema)}</b></td></tr><tr><td>Transferencia</td><td><b>{money(transferSistema)}</b></td></tr><tr><td>Mercado Pago</td><td><b>{money(mpSistema)}</b></td></tr><tr><td>Débito</td><td><b>{money(debitoSistema)}</b></td></tr><tr><td><b>Total</b></td><td><b>{money(totalSistemaPeriodo)}</b></td></tr></tbody></table></div></Card><Card><h2 className="card-title">Conteo de efectivo</h2>{DENOMINACIONES.map((d)=><div key={d} className="arqueo-row"><div><b>{money(d)}</b></div><Input type="number" value={billetes[d]} onChange={(e)=>setBilletes({...billetes,[d]:e.target.value})} placeholder="Cant." /><div><b>{money(d*Number(billetes[d]||0))}</b></div></div>)}<div className="total-box" style={{marginTop:12}}><div><div className="total-label">Efectivo contado</div></div><div className="total-value">{money(efectivoContado)}</div></div></Card><Card><h2 className="card-title">Declaración no efectivo</h2><div className="grid three"><Field label="Transferencia"><Input type="text" inputMode="numeric" className="money-input" placeholder="$ 0" value={formatMoneyInput(noEfectivoDeclarado.Transferencia)} onChange={(e)=>setNoEfectivoDeclarado({...noEfectivoDeclarado,Transferencia:parseMoneyInput(e.target.value)})} /></Field><Field label="Mercado Pago"><Input type="text" inputMode="numeric" className="money-input" placeholder="$ 0" value={formatMoneyInput(noEfectivoDeclarado['Mercado Pago'])} onChange={(e)=>setNoEfectivoDeclarado({...noEfectivoDeclarado,'Mercado Pago':parseMoneyInput(e.target.value)})} /></Field><Field label="Débito"><Input type="text" inputMode="numeric" className="money-input" placeholder="$ 0" value={formatMoneyInput(noEfectivoDeclarado.Débito)} onChange={(e)=>setNoEfectivoDeclarado({...noEfectivoDeclarado,Débito:parseMoneyInput(e.target.value)})} /></Field></div><div className="notice" style={{marginTop:12}}>Esto sirve para que el cobrador declare lo que informa como transferido/cobrado digitalmente.</div></Card><Card><h2 className="card-title">Comisión del cobrador</h2><div className="metrics"><div className="metric"><div className="metric-label">Porcentaje</div><div className="metric-value">{comisionPorcentaje}%</div></div><div className="metric"><div className="metric-label">Importe comisión</div><div className="metric-value">{money(comisionImporte)}</div></div><div className="metric"><div className="metric-label">Neto a rendir en efectivo</div><div className="metric-value">{money(netoARendir)}</div></div></div><div className="notice" style={{marginTop:12}}>El cierre mensual toma el mes correspondiente a la fecha Desde y guarda un solo cierre por mes y por cobrador.</div></Card><Card><Field label="Observaciones"><textarea rows="3" value={obsArqueo} onChange={(e)=>setObsArqueo(e.target.value)} placeholder="Ej: diferencia por vuelto, transferencia pendiente de verificar, etc." /></Field><div className="btn-row" style={{marginTop:12}}><Button variant="red" onClick={cerrarMensual}>Cierre mensual + PDF</Button></div></Card></>}
    {tab === "backup" && <><Card><div className="btn-row"><Button variant="gray" onClick={pedirAccesoAdmin}>{adminOk ? "Administrador habilitado" : "Modo administrador"}</Button></div><div className="notice" style={{marginTop:12}}>El modo administrador permite acceder a configuración avanzada, padrón y reinicio inicial de producción.</div></Card><div className="metrics"><div className="metric"><div className="metric-label">Cobranzas</div><div className="metric-value">{cobranzas.length}</div></div><div className="metric"><div className="metric-label">Total cobrado</div><div className="metric-value">{money(totalCobrado)}</div></div><div className="metric"><div className="metric-label">Arqueos</div><div className="metric-value">{arqueos.length}</div></div></div><Card><h2 className="card-title">Backup para CDT Gestión</h2><div className="btn-row"><Button variant="blue" onClick={exportarCobranzas}>Exportar cobranzas + arqueos JSON</Button><Button variant="red" onClick={borrarCobranzas}>Borrar cobranzas del celular</Button></div><p className="muted">Importá este JSON en CDT Gestión → Socios / Cuotas → Importar cobranzas móviles.</p></Card><Card><h2 className="card-title">Últimas cobranzas</h2><div className="table-wrap"><table><thead><tr><th>Recibo</th><th>Fecha</th><th>Socio</th><th>Total</th><th>Medio</th><th>Cuenta</th></tr></thead><tbody>{cobranzas.length===0 ? <tr><td colSpan="6" className="empty">Sin cobranzas.</td></tr> : cobranzas.map((c)=><tr key={c.idOperacion}><td><b>{c.numeroRecibo}</b></td><td>{fechaAR(c.fecha)}</td><td>{c.socioNombre}</td><td><b>{money(c.importe)}</b></td><td>{c.medio}</td><td>{c.cuentaFinanciera}</td></tr>)}</tbody></table></div></Card></>}
    {tab === "padron" && <><Card><h2 className="card-title">Importar padrón desde CDT Gestión</h2><label className="file-label">Seleccionar padrón JSON<Input type="file" accept="application/json" onChange={importarPadron} /></label><p className="muted">Usá el archivo generado en CDT Gestión → Socios / Cuotas → Exportar padrón cobrador.</p></Card><div className="metrics"><div className="metric"><div className="metric-label">Socios</div><div className="metric-value">{(padron.socios||[]).length}</div></div><div className="metric"><div className="metric-label">Cuotas pendientes origen</div><div className="metric-value">{(padron.cuotas||[]).length}</div></div><div className="metric"><div className="metric-label">Fecha importación</div><div style={{fontWeight:900,marginTop:8}}>{padron.fechaImportacion ? new Date(padron.fechaImportacion).toLocaleString('es-AR') : '-'}</div></div></div></>}
    {tab === "config" && <><Card><h2 className="card-title">Configuración</h2><div className="grid two"><Field label="Club"><Input value={config.club} onChange={(e)=>setConfig({...config,club:e.target.value})} /></Field><Field label="Cobrador"><Input value={config.cobrador} onChange={(e)=>setConfig({...config,cobrador:e.target.value})} /></Field><Field label="Clave administrador"><Input type="password" value={config.claveAdmin || ''} onChange={(e)=>setConfig({...config,claveAdmin:e.target.value})} /></Field><Field label="Tema"><Select value={config.tema || 'oscuro'} onChange={(e)=>setConfig({...config,tema:e.target.value})}><option value="oscuro">Oscuro CDT</option><option value="claro">Claro</option></Select></Field><Field label="Medio por defecto"><Select value={config.medioDefault} onChange={(e)=>setConfig({...config,medioDefault:e.target.value,cuentaDefault:cuentasPorMedio(e.target.value)[0]})}><option>Efectivo</option><option>Transferencia</option><option>Mercado Pago</option><option>Débito</option></Select></Field><Field label="Cuenta por defecto"><Select value={cuentasPorMedio(config.medioDefault).includes(config.cuentaDefault)?config.cuentaDefault:cuentasPorMedio(config.medioDefault)[0]} onChange={(e)=>setConfig({...config,cuentaDefault:e.target.value})}>{cuentasPorMedio(config.medioDefault).map((c)=><option key={c}>{c}</option>)}</Select></Field><Field label="Comisión cobrador (%)"><Input type="number" min="0" step="0.01" value={config.comisionPorcentaje ?? 0} onChange={(e)=>setConfig({...config,comisionPorcentaje:e.target.value})} /></Field><Field label="Logo"><Input type="file" accept="image/*" onChange={cargarLogo} /></Field><Field label="Duplicado ticket"><Select value={config.imprimirDuplicado ? "Sí" : "No"} onChange={(e)=>setConfig({...config,imprimirDuplicado:e.target.value==="Sí"})}><option>Sí</option><option>No</option></Select></Field></div>{config.logo && <div style={{marginTop:14}} className="btn-row"><img src={config.logo} className="logo" alt="Logo" /><Button variant="red" onClick={()=>setConfig({...config,logo:""})}>Quitar logo</Button></div>}</Card><Card className="danger"><h2 className="card-title" style={{color:'#b91c1c'}}>Herramientas de producción</h2><p className="muted">Usalo una sola vez antes de comenzar la cobranza real. Borra datos de prueba y conserva la configuración general.</p><Button variant="red" onClick={limpiarTodo}>🗑 Reinicio inicial de producción</Button></Card></>}
  </main></div>;
}
