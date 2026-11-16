import os
import time
from playwright.sync_api import sync_playwright

output_dir = r"apps\nailzbynicci\public\screenshots"
os.makedirs(output_dir, exist_ok=True)

pages = [
    {"name": "home", "url": "http://localhost:3002/"},
    {"name": "gallery", "url": "http://localhost:3002/gallery"},
    {"name": "prices", "url": "http://localhost:3002/prices"},
    {"name": "how-to-book", "url": "http://localhost:3002/how-to-book"},
    {"name": "press-ons", "url": "http://localhost:3002/press-ons"},
    {"name": "about", "url": "http://localhost:3002/about"},
]

viewports = [
    {"name": "mobile", "width": 375, "height": 812},
    {"name": "desktop", "width": 1440, "height": 900},
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    for vp in viewports:
        context = browser.new_context(
            viewport={"width": vp["width"], "height": vp["height"]},
            device_scale_factor=2 if vp["name"] == "mobile" else 1
        )
        page = context.new_page()
        
        for pg in pages:
            print(f"Capturing {pg['name']} at {vp['name']} ({vp['width']}px)...")
            page.goto(pg["url"], wait_until="networkidle", timeout=30000)
            time.sleep(1) # Allow animations to settle
            
            # Viewport screenshot (Hero / Above the fold)
            viewport_path = os.path.join(output_dir, f"{pg['name']}-{vp['name']}-viewport.png")
            page.screenshot(path=viewport_path)
            
            # Full page screenshot
            full_path = os.path.join(output_dir, f"{pg['name']}-{vp['name']}-full.png")
            page.screenshot(path=full_path, full_page=True)
            print(f"Saved {viewport_path} and {full_path}")
            
        context.close()
        
    browser.close()

print("All screenshots successfully captured!")
