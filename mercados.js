// ═══════════════════════════════════════
// mercados.js — Página: Mercados
// JARVIS Dashboard · OpenClaw Ecosystem
// Depende de: data.js
// ═══════════════════════════════════════

// ── Lista de ativos com análise dos agentes ──
(function renderMarketDetails() {
 const el = document.getElementById('market-detail-list');
 if (!el) return;
 ASSETS.forEach(a => {
 el.innerHTML += `<div class="market-detail">
 <div class="md-top">
 <div class="md-asset">
 <div class="sym-badge" style="background:${a.color}18;color:${a.color};width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:.55rem">${a.sym}</div>
 <div>
 <div class="md-name">${a.name}</div>
 <div class="md-ticker" style="font-family:var(--mono);font-size:.62rem;color:var(--text-3)">${a.sym}</div>
 </div>
 </div>
 <div style="text-align:right">
 <div class="md-price">${a.price}</div>
 <div class="md-change ${a.up ? 'up' : 'down'}">${a.d} hoje · ${a.w} 7d</div>
 </div>
 </div>
 <div class="md-agent-tag">
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
 <circle cx="12" cy="8" r="4"/>
 <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
 </svg>
 Análise dos agentes
 </div>
 <div class="md-comment">${a.comment}</div>
 </div>`;
 });
})();

// ── Correlações entre ativos ──
(function renderCorrelations() {
 const el = document.getElementById('corr-list');
 if (!el) return;
 const CORRELATIONS = [
 { label:'BTC × Nasdaq', val:'+0.71', color:'#16b364' },
 { label:'BTC × DXY', val:'-0.58', color:'#e5484d' },
 { label:'ETH × BTC', val:'+0.89', color:'#16b364' },
 { label:'SOL × ETH', val:'+0.74', color:'#16b364' },
 { label:'GOLD × DXY', val:'-0.64', color:'#e5484d' },
 { label:'OIL × SPX', val:'+0.31', color:'#e78a00' },
 ];
 CORRELATIONS.forEach(c => {
 el.innerHTML += `<div class="corr-item">
 <span class="corr-label">${c.label}</span>
 <span class="corr-val" style="color:${c.color}">${c.val}</span>
 </div>`;
 });
})();

// ── Setores em foco ──
(function renderSectors() {
 const el = document.getElementById('sector-list');
 if (!el) return;
 const SECTORS = [
 { name:'Cripto Large Cap', bias:'Comprador', cls:'badge-green' },
 { name:'Tech (Nasdaq)', bias:'Neutro', cls:'badge-muted' },
 { name:'Commodities', bias:'Cauteloso', cls:'badge-amber' },
 { name:'Renda Fixa (EUA)', bias:'Vendedor', cls:'badge-red' },
 ];
 SECTORS.forEach(s => {
 el.innerHTML += `<div style="display:flex;align-items:center;justify-content:space-between">
 <span style="font-size:.72rem;color:var(--text-2)">${s.name}</span>
 <span class="badge ${s.cls}">${s.bias}</span>
 </div>`;
 });
})();
