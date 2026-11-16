import os
import json
from playwright.sync_api import sync_playwright

output_dir = r"c:\Users\vedan\Documents\antigravity\valiant-lavoisier\apps\nailzbynicci\public\screenshots"
os.makedirs(output_dir, exist_ok=True)

viewports = [
    {"name": "360px-android", "width": 360, "height": 740, "is_mobile": True},
    {"name": "390px-ios", "width": 390, "height": 844, "is_mobile": True},
    {"name": "768px-tablet", "width": 768, "height": 1024, "is_mobile": True},
    {"name": "1024px-laptop", "width": 1024, "height": 768, "is_mobile": False},
    {"name": "1440px-desktop", "width": 1440, "height": 900, "is_mobile": False},
    {"name": "1920px-fhd", "width": 1920, "height": 1080, "is_mobile": False},
]

routes = [
    {"name": "home", "url": "http://localhost:3002/"},
    {"name": "gallery", "url": "http://localhost:3002/gallery"},
    {"name": "prices", "url": "http://localhost:3002/prices"},
    {"name": "how-to-book", "url": "http://localhost:3002/how-to-book"},
    {"name": "press-ons", "url": "http://localhost:3002/press-ons"},
    {"name": "about", "url": "http://localhost:3002/about"},
]

results = {
    "viewports_tested": len(viewports),
    "routes_tested": len(routes),
    "overflow_issues": [],
    "tap_target_issues": [],
    "screenshots_captured": []
}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    for vp in viewports:
        context = browser.new_context(
            viewport={"width": vp["width"], "height": vp["height"]},
            is_mobile=vp["is_mobile"],
            has_touch=vp["is_mobile"],
            device_scale_factor=2 if vp["is_mobile"] else 1
        )
        page = context.new_page()
        
        for rt in routes:
            page.goto(rt["url"], wait_until="networkidle", timeout=30000)
            page.wait_for_timeout(400)
            
            # Check horizontal overflow
            overflow = page.evaluate("""() => {
                const doc = document.documentElement;
                return {
                    scrollWidth: doc.scrollWidth,
                    clientWidth: doc.clientWidth,
                    hasOverflow: doc.scrollWidth > doc.clientWidth
                };
            }""")
            
            if overflow["hasOverflow"]:
                results["overflow_issues"].append({
                    "route": rt["name"],
                    "viewport": vp["name"],
                    "scrollWidth": overflow["scrollWidth"],
                    "clientWidth": overflow["clientWidth"]
                })
            
            # Capture screenshots for 390px (mobile) and 1440px (desktop) on key pages
            if vp["width"] in (390, 1440) and rt["name"] in ("home", "gallery", "prices", "how-to-book", "press-ons"):
                fname = f"{rt['name']}-{vp['name']}.png"
                out_path = os.path.join(output_dir, fname)
                page.screenshot(path=out_path, full_page=False)
                results["screenshots_captured"].append(fname)
                print(f"Captured {fname}")
                
        context.close()
    browser.close()

out_json = r"c:\Users\vedan\Documents\antigravity\valiant-lavoisier\CROSS_PLATFORM_REPORT.json"
with open(out_json, "w") as f:
    json.dump(results, f, indent=2)

print("\nCross-Platform Verification Results:")
print(f"Total Viewports Tested: {len(viewports)} (360px, 390px, 768px, 1024px, 1440px, 1920px)")
print(f"Overflow Issues Detected: {len(results['overflow_issues'])}")
print(f"Screenshots Saved: {len(results['screenshots_captured'])}")
