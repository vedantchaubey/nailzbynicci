import json
import time
from playwright.sync_api import sync_playwright

def profile_page(url, is_mobile=False):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        viewport = {"width": 390, "height": 844} if is_mobile else {"width": 1440, "height": 900}
        user_agent = (
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 "
            "(KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1"
            if is_mobile else None
        )
        context = browser.new_context(
            viewport=viewport,
            user_agent=user_agent,
            device_scale_factor=2 if is_mobile else 1,
            is_mobile=is_mobile,
            has_touch=is_mobile
        )
        page = context.new_page()
        client = context.new_cdp_session(page)
        client.send("Performance.enable")
        
        start_time = time.time()
        page.goto(url, wait_until="networkidle", timeout=30000)
        load_time = time.time() - start_time
        
        # Collect Web Vitals from browser
        vitals = page.evaluate("""() => {
            return new Promise((resolve) => {
                let fcp = 0;
                let lcp = 0;
                let cls = 0;
                
                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (entry.name === 'first-contentful-paint') {
                            fcp = entry.startTime;
                        }
                    }
                }).observe({ type: 'paint', buffered: true });

                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    if (entries.length > 0) {
                        lcp = entries[entries.length - 1].startTime;
                    }
                }).observe({ type: 'largest-contentful-paint', buffered: true });

                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            cls += entry.value;
                        }
                    }
                }).observe({ type: 'layout-shift', buffered: true });

                setTimeout(() => {
                    const nav = performance.getEntriesByType('navigation')[0] || {};
                    resolve({
                        fcp: Math.round(fcp),
                        lcp: Math.round(lcp),
                        cls: Number(cls.toFixed(4)),
                        domInteractive: Math.round(nav.domInteractive || 0),
                        domComplete: Math.round(nav.domComplete || 0),
                        duration: Math.round(nav.duration || 0)
                    });
                }, 1000);
            });
        }""")
        
        cdp_metrics_raw = client.send("Performance.getMetrics")
        cdp_metrics = {m["name"]: m["value"] for m in cdp_metrics_raw["metrics"]}
        
        browser.close()
        return {
            "url": url,
            "mode": "mobile" if is_mobile else "desktop",
            "load_time_sec": round(load_time, 2),
            "vitals": vitals,
            "cdp": {
                "LayoutCount": cdp_metrics.get("LayoutCount"),
                "RecalcStyleCount": cdp_metrics.get("RecalcStyleCount"),
                "LayoutDuration_sec": round(cdp_metrics.get("LayoutDuration", 0), 3),
                "RecalcStyleDuration_sec": round(cdp_metrics.get("RecalcStyleDuration", 0), 3),
                "ScriptDuration_sec": round(cdp_metrics.get("ScriptDuration", 0), 3),
                "TaskDuration_sec": round(cdp_metrics.get("TaskDuration", 0), 3),
                "JSHeapUsedMB": round(cdp_metrics.get("JSHeapUsedSize", 0) / (1024 * 1024), 2),
            }
        }

if __name__ == "__main__":
    targets = [
        ("http://localhost:3002/", False),
        ("http://localhost:3002/", True),
        ("http://localhost:3002/gallery", False),
        ("http://localhost:3002/gallery", True),
        ("http://localhost:3002/prices", False),
        ("http://localhost:3002/prices", True),
        ("http://localhost:3002/press-ons", False),
        ("http://localhost:3002/press-ons", True),
    ]
    results = []
    for url, is_mobile in targets:
        print(f"Profiling {url} ({'mobile' if is_mobile else 'desktop'})...")
        res = profile_page(url, is_mobile)
        results.append(res)
        print(json.dumps(res, indent=2))
        
    out_file = r"c:\Users\vedan\Documents\antigravity\valiant-lavoisier\PERFORMANCE_OPTIMIZED.json"
    with open(out_file, "w") as f:
        json.dump(results, f, indent=2)
    print("Post-optimization profiling saved to PERFORMANCE_OPTIMIZED.json")
