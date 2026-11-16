import os
from playwright.sync_api import sync_playwright

poster_dir = r"c:\Users\vedan\Documents\antigravity\valiant-lavoisier\apps\nailzbynicci\public\images\posters"
os.makedirs(poster_dir, exist_ok=True)

videos = [
    "Video-14378.mp4",
    "Video-2046.mp4",
    "Video-26701.mp4",
    "Video-26925.mp4",
    "Video-30564.mp4",
    "Video-30962.mp4",
    "Video-43166.mp4",
    "Video-44921.mp4",
    "Video-56462.mp4",
    "Video-74836.mp4",
    "Video-75889.mp4",
    "Video-82701.mp4",
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    for vid in videos:
        file_path = f"http://localhost:3002/images/source/press-on/{vid}"
        html = f"""<!DOCTYPE html>
<html>
<body style="margin:0; background:#0E0D10;">
  <video id="v" src="{file_path}" muted playsinline style="width:400px; height:533px; object-fit:cover;"></video>
</body>
</html>"""
        page.set_content(html)
        page.evaluate("""() => {
            const v = document.getElementById('v');
            return new Promise((resolve) => {
                v.currentTime = 0.5;
                v.onseeked = () => resolve();
                v.onerror = () => resolve();
                setTimeout(resolve, 1500);
            });
        }""")
        out_name = vid.replace(".mp4", ".jpg")
        out_path = os.path.join(poster_dir, out_name)
        page.locator("#v").screenshot(path=out_path, type="jpeg", quality=85)
        print(f"Generated poster for {vid} -> {out_name}")
    browser.close()
print("Posters generation complete!")
