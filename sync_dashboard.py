import json
import os
from datetime import datetime

def update_dashboard():
    workspace_path = "/data/.openclaw/workspace-jarvis"
    data_json_path = os.path.join(workspace_path, "data.json")
    website_data_path = os.path.join(workspace_path, "website/data.json")
    
    # 1. Carregar dados do relatório (data.json na raiz)
    if not os.path.exists(data_json_path):
        print(f"Erro: {data_json_path} não encontrado.")
        return

    with open(data_json_path, 'r') as f:
        report_data = json.load(f)

    # 2. Processar dados para o formato do Dashboard
    # Nota de Consenso (removendo '/10' se houver e normalizando para 0-100)
    consenso_raw = report_data.get("notaConsenso", "5.0").split('/')[0]
    try:
        score = str(int(float(consenso_raw) * 10))
    except:
        score = "50"

    # Verdict
    verdict = report_data.get("reportTitle", "Análise de Mercado")
    
    # Assets (BTC como principal)
    btc_price = report_data.get("btcPrice", "--")
    btc_chg = report_data.get("btcChange", "0%")
    is_up = "+" in btc_chg
    
    assets = [
        {
            "name": "Bitcoin",
            "sub": "BTC/USDT",
            "val": btc_price,
            "chg": btc_chg.replace("+", "").replace("-", ""),
            "up": is_up
        }
    ]

    # Predictions (Polymarket)
    poly = report_data.get("oraculoPolymarket", {})
    chance_up = poly.get("chanceOfUp", "50%").replace("%", "")
    
    predictions = [
        {
            "label": "Tendência de Alta (Polymarket)",
            "pct": int(chance_up),
            "color": "#16b364" if int(chance_up) > 50 else "#e24b4a"
        }
    ]

    # News
    news_summary = report_data.get("newsSummary", "Sem notícias relevantes.")
    news = [
        {
            "headline": news_summary[:100] + "..." if len(news_summary) > 100 else news_summary,
            "meta": "Alpha · Atualizado agora"
        }
    ]

    # Terminal (Histórico de logs)
    timestamp = report_data.get("timestamp", datetime.now().isoformat())
    time_str = datetime.now().strftime('%H:%M:%S')

    new_log = f"[{time_str}] {report_data.get('onChainSummary', 'Scan concluído.')}"
    
    # Carregar logs antigos para não perder histórico no terminal
    terminal = []
    if os.path.exists(website_data_path):
        with open(website_data_path, 'r') as f:
            old_data = json.load(f)
            terminal = old_data.get("terminal", [])
    
    # Adicionar novo log no topo e limitar a 10
    terminal.insert(0, new_log)
    terminal = terminal[:10]

    # 3. Montar novo objeto data.json para o website
    dashboard_json = {
        "score": score,
        "verdict": verdict,
        "assets": assets,
        "predictions": predictions,
        "news": news,
        "terminal": terminal
    }

    # 4. Salvar
    with open(website_data_path, 'w') as f:
        json.dump(dashboard_json, f, indent=4)
    
    print(f"Dashboard atualizado com sucesso em {website_data_path}")

if __name__ == "__main__":
    update_dashboard()
