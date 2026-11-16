from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3002/', wait_until='networkidle')
    page.wait_for_timeout(500)
    
    # Track requestAnimationFrame performance during real mouse wheel scrolling
    page.evaluate("""() => {
        window.__frameTimes = [];
        let last = performance.now();
        function loop(now) {
            window.__frameTimes.push(now - last);
            last = now;
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }""")
    
    # Real mouse wheel events like a user scrolling down the whole page
    for _ in range(30):
        page.mouse.wheel(0, 150)
        page.wait_for_timeout(35)
        
    stats = page.evaluate("""() => {
        const times = window.__frameTimes.slice(10); // ignore first 10 warmup
        const longFrames = times.filter(t => t > 20).length;
        const avgDelta = times.reduce((a, b) => a + b, 0) / times.length;
        return {
            totalFrames: times.length,
            longFrames: longFrames,
            avgFps: Math.round(1000 / avgDelta),
            avgFrameDurationMs: Number(avgDelta.toFixed(2))
        };
    }""")
    
    print("Real User Wheel Scroll Performance:")
    print(stats)
    browser.close()
