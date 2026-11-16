import json
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    client = page.context.new_cdp_session(page)
    client.send('Performance.enable')
    
    page.goto('http://localhost:3002/', wait_until='networkidle')
    page.wait_for_timeout(1000)
    
    # Measure FPS and scroll jank during actual continuous scrolling
    scroll_stats = page.evaluate("""() => {
        return new Promise((resolve) => {
            let frames = 0;
            let longFrames = 0;
            let lastTime = performance.now();
            let totalJank = 0;
            const startTime = performance.now();
            lastTime = startTime;
            
            function countFrame(now) {
                frames++;
                const delta = now - lastTime;
                if (delta > 20) { // Frame dropped (below 50fps)
                    longFrames++;
                    totalJank += (delta - 16.67);
                }
                lastTime = now;
                if (frames < 120) {
                    requestAnimationFrame(countFrame);
                } else {
                    resolve({
                        frames,
                        longFrames,
                        totalJank: Math.round(totalJank),
                        avgFps: Math.round((frames / (now - startTime)) * 1000)
                    });
                }
            }
            
            requestAnimationFrame(countFrame);
            
            // Perform rapid continuous wheel/touch scrolling
            let scrollY = 0;
            const interval = setInterval(() => {
                scrollY += 35;
                window.scrollTo(0, scrollY);
                if (scrollY > 3000) clearInterval(interval);
            }, 16);
        });
    }""")
    
    cdp_metrics_raw = client.send('Performance.getMetrics')
    cdp_metrics = {m['name']: m['value'] for m in cdp_metrics_raw['metrics']}
    
    print('Scroll Performance Results:')
    print(json.dumps(scroll_stats, indent=2))
    print(f"LayoutDuration: {cdp_metrics.get('LayoutDuration')}s")
    print(f"RecalcStyleDuration: {cdp_metrics.get('RecalcStyleDuration')}s")
    print(f"TaskDuration: {cdp_metrics.get('TaskDuration')}s")
    print(f"JSHeapUsedMB: {round(cdp_metrics.get('JSHeapUsedSize', 0) / (1024*1024), 2)}")
    browser.close()
