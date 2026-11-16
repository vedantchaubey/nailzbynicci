from playwright.sync_api import sync_playwright

def measure_fps(page):
    return page.evaluate("""() => {
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
                if (delta > 20) {
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
            
            let scrollY = 0;
            const interval = setInterval(() => {
                scrollY += 35;
                window.scrollTo(0, scrollY);
                if (scrollY > 3000) clearInterval(interval);
            }, 16);
        });
    }""")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3002/', wait_until='networkidle')
    page.wait_for_timeout(1000)
    
    # 1. Baseline
    base = measure_fps(page)
    print("1. Baseline:", base)
    
    # 2. Disable GrainOverlay (mix-blend-overlay)
    page.evaluate("document.querySelector('.bg-grain')?.parentElement?.remove()")
    after_grain = measure_fps(page)
    print("2. Without GrainOverlay:", after_grain)
    
    # 3. Disable scroll-behavior: smooth in HTML
    page.evaluate("document.documentElement.style.scrollBehavior = 'auto'")
    after_scroll_behavior = measure_fps(page)
    print("3. Without CSS smooth scroll:", after_scroll_behavior)
    
    # 4. Disable Lenis instance
    page.evaluate("window.__lenis?.destroy?.()")
    after_lenis = measure_fps(page)
    print("4. Without Lenis:", after_lenis)
    
    # 5. Disable CustomCursor
    page.evaluate("document.querySelectorAll('.will-change-transform').forEach(el => el.remove())")
    after_cursor = measure_fps(page)
    print("5. Without CustomCursor:", after_cursor)
    
    # 6. Disable Auras
    page.evaluate("document.querySelectorAll('[class*=\"aura-\"]').forEach(el => el.remove())")
    after_auras = measure_fps(page)
    print("6. Without Auras:", after_auras)

    browser.close()
