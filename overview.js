// ═══════════════════════════════════════
// overview.js — Página: Overview (Home)
// JARVIS Dashboard · OpenClaw Ecosystem
// Depende de: data.js
// ═══════════════════════════════════════

// ── KPIs inline (estáticos — substituir por API futuramente) ──
// Os KPIs são renderizados diretamente no HTML.

// ── Barras dos agentes no painel de consenso ──
if (typeof renderAgentBars === 'function') {
    renderAgentBars('ov-agents');
}

// ── Tabela de ativos em destaque ──
if (typeof renderAssetTable === 'function') {
    renderAssetTable('ov-assets');
}

// ── Métricas Relevantes (intel list) ──
(function renderMetricas() {
 const el = document.getElementById('ov-intel');
 if (!el) return;
 const METRICAS = [
 { time:'14:00', type:'ALPHA', cls:'badge-green', text:'<strong>BTC</strong> RSI semanal saindo de sobrevenda. R/R favorável para longa.', conf:'92%', cc:'#16b364' },
 { time:'13:45', type:'MACRO', cls:'badge-amber', text:'<strong>Fed Minutes</strong> sinalizam "higher for longer" condicional.', conf:'87%', cc:'#e78a00' },
 { time:'13:20', type:'SINAL', cls:'badge-blue', text:'<strong>SOL</strong> volume on-chain abaixo da média 30d. Atenção para queda.', conf:'74%', cc:'#3b82f6' },
 { time:'12:55', type:'RISCO', cls:'badge-red', text:'<strong>CPI</strong> 3.2% acima do esperado. Probabilidade de corte recua.', conf:'95%', cc:'#e5484d' },
 { time:'12:30', type:'ALPHA', cls:'badge-green', text:'<strong>LINK</strong> integração SWIFT confirmada. Catalisador fundamental.', conf:'81%', cc:'#16b364' },
 { time:'12:00', type:'MACRO', cls:'badge-amber', text:'<strong>DXY</strong> testando resistência 104.5. Fraqueza favorece cripto.', conf:'78%', cc:'#e78a00' },
 ];
 METRICAS.forEach(i => {
 el.innerHTML += `<div class="intel-item">
 <span class="intel-time">${i.time}</span>
 <span class="intel-tag badge ${i.cls}">${i.type}</span>
 <span class="intel-text">${i.text}</span>
 <span class="intel-conf" style="color:${i.cc}">${i.conf}</span>
 </div>`;
 });
})();

// ── Mercado Preditivo Top 3 ──
if (typeof renderMarketCards === 'function') {
    renderMarketCards('ov-markets', 3);
}

// ── Sidebar de notícias (20%) ──
(function renderOverviewNews() {
 const el = document.getElementById('ov-news-list');
 if (!el) return;
 if (typeof NEWS !== 'undefined') {
 NEWS.forEach(n => {
 el.innerHTML += `<div class="ov-news-item">
 <div class="ov-news-item-meta">
 <span class="ov-news-source">${n.source}</span>
 <span style="color:var(--text-3);font-size:.55rem">·</span>
 <span class="ov-news-time">${n.time}</span>
 </div>
 <div class="ov-news-title">${n.title}</div>
 <div class="ov-news-excerpt">${n.excerpt}</div>
 <div class="ov-news-footer">
 <span class="ov-emotion-chip emotion-${n.emotion}">${typeof EMOTION_MAP !== 'undefined' ? EMOTION_MAP[n.emotion] : n.emotion}</span>
 <span class="ov-news-assets">${n.assets.join(' · ')}</span>
 </div>
 </div>`;
 });
 }
})();
