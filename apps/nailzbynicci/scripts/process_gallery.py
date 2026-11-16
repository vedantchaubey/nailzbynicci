import os
import io
import json
import base64
from PIL import Image, ImageStat, ImageFilter

nails_dir = r"apps\nailzbynicci\public\images\source\nails"
out_dir = r"apps\nailzbynicci\public\images\gallery"
os.makedirs(out_dir, exist_ok=True)

nail_files = [f for f in os.listdir(nails_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
print(f"Total nail images: {len(nail_files)}")

analyzed = []
for f in nail_files:
    p = os.path.join(nails_dir, f)
    try:
        with Image.open(p) as img:
            rgb = img.convert("RGB")
            stat = ImageStat.Stat(rgb)
            r, g, b = stat.mean[:3]
            brightness = (r * 299 + g * 587 + b * 114) / 1000
            
            edges = rgb.filter(ImageFilter.FIND_EDGES)
            edge_score = sum(ImageStat.Stat(edges).mean[:3])
            
            analyzed.append({
                "file": f,
                "path": p,
                "size": img.size,
                "r": r, "g": g, "b": b,
                "brightness": brightness,
                "sharpness": edge_score
            })
    except Exception as e:
        print(f"Error {f}: {e}")

# Classify
dark_pool = []
kawaii_pool = []
glam_pool = []

for item in analyzed:
    b_val = item["brightness"]
    r, g, b = item["r"], item["g"], item["b"]
    
    # Pink / Warm pastel / Kawaii
    is_kawaii = (r > g * 1.05 and b > 75 and b_val > 95) or (r > 125 and b_val > 105)
    is_dark = (b_val < 92) or (r < 85 and g < 85 and b < 85)
    
    if is_dark:
        dark_pool.append(item)
    elif is_kawaii:
        kawaii_pool.append(item)
    else:
        glam_pool.append(item)

dark_pool.sort(key=lambda x: x["sharpness"], reverse=True)
kawaii_pool.sort(key=lambda x: x["sharpness"], reverse=True)
glam_pool.sort(key=lambda x: x["sharpness"], reverse=True)

print(f"Pool sizes: Dark={len(dark_pool)}, Kawaii={len(kawaii_pool)}, Glam={len(glam_pool)}")

dark_meta = [
    {"title": "Spinal Vertebrae & Chrome Spikes", "tier": "Insane", "length": "Long Stiletto", "price": "105 – 115 €", "desc_de": "Handmodellierte 3D-Wirbelsäulen-Struktur mit flüssigem Chrom-Finish und Piercing-Details auf tiefem Obsidian.", "desc_en": "Hand-sculpted 3D spinal vertebrae with molten liquid chrome finish and pierced hardware on obsidian black."},
    {"title": "Cyber Dagger & Cross Inlay", "tier": "Crazy", "length": "Stiletto", "price": "85 – 100 €", "desc_de": "Extrudierte Silber-Dornen, Kreuz-Inlays und Cyber-Sigilism Linework auf transluzentem Rauch-Gel.", "desc_en": "Extruded silver thorns, cross inlays, and cyber-sigilism linework over translucent smoke gel."},
    {"title": "Blood Velvet Flame Aura", "tier": "Medium", "length": "Long Almond", "price": "65 – 80 €", "desc_de": "Verlaufender Vampir-Aura Kern in tiefem Ochsenblut mit hochglänzendem Glas-Topcoat.", "desc_en": "Diffused oxblood vampy aura gradient sealed beneath high-gloss mirror glass topcoat."},
    {"title": "Nocturnal Emerald Serpent", "tier": "Crazy", "length": "Long Almond", "price": "85 – 100 €", "desc_de": "Tiefes Waldgrün mit chromierten Reptil-Schuppen und organischen 3D-Wassertropfen.", "desc_en": "Deep nocturnal pine emerald with chrome reptile scales and organic 3D dew droplets."},
    {"title": "Liquid Platinum Cyber-Armor", "tier": "Insane", "length": "Extreme Stiletto", "price": "105 – 115 €", "desc_de": "Volles 10-Finger 3D-Metall-Armor mit flüssigen Chrom-Reliefs und Ketten-Charms.", "desc_en": "Full 10-finger sculpted molten metal armor with fluid chrome reliefs and hanging charms."},
    {"title": "Obsidian Spiderweb & Dark Sigils", "tier": "Crazy", "length": "Long Coffin", "price": "85 – 100 €", "desc_de": "Handgemalte gotische Spinnenweben und filigrane Siegel auf tiefschwarzer Gel-X Basis.", "desc_en": "Hand-painted gothic spiderwebs and delicate sigils over pitch obsidian Gel-X architecture."},
    {"title": "Silver Thorn Micro-Sculpt", "tier": "Medium", "length": "Medium Almond", "price": "65 – 80 €", "desc_de": "Zarte 3D-Silberdornen entlang der Seitenwände auf milchigem Sheer-Gel.", "desc_en": "Delicate 3D silver thorns along the sidewalls on a milky sheer-gel base."},
    {"title": "Gothic Crucifix & Dark Halo", "tier": "Crazy", "length": "Stiletto", "price": "85 – 100 €", "desc_de": "Dunkles Halo-Aura Design mit 3D-Kruzifix und feinen Chrom-Highlights.", "desc_en": "Dark halo aura design accented by 3D crucifixes and fine chrome rim highlights."},
    {"title": "Smoked Quartz & Liquid Spikes", "tier": "Medium", "length": "Medium Stiletto", "price": "65 – 80 €", "desc_de": "Transluzentes Rauch-Gel mit gezielten Chrom-Spikes auf vier Akzentnägeln.", "desc_en": "Translucent smoky gel with targeted liquid chrome spikes on four accent nails."},
    {"title": "Noir French with Hardware Ring", "tier": "Basic", "length": "Medium Square", "price": "50 – 60 €", "desc_de": "Präzise tiefschwarze French-Lächeln mit minimalistischem Ring-Piercing am Zeigefinger.", "desc_en": "Crisp jet-black French smile line accented with a minimalist pierced silver hardware hoop."}
]

kawaii_meta = [
    {"title": "3D Sleeping Panda & Sakura Blush", "tier": "Insane", "length": "Long Almond", "price": "105 – 115 €", "desc_de": "Handgeformter 3D-Panda, Kirschblüten-Reliefs und zartes Rosa-Aura auf Aprés Gel-X.", "desc_en": "Hand-sculpted 3D resting panda, sakura blossom petals, and blush aura on Aprés Gel-X."},
    {"title": "Coquette Pearl & Ribbon Bows", "tier": "Crazy", "length": "Medium Almond", "price": "85 – 100 €", "desc_de": "Miniatur-Schleifen in 3D-Gel, echte Süßwasserperlen und zartrosa French-Spitzen.", "desc_en": "3D miniature ribbon bows, genuine freshwater pearls, and delicate blushing French tips."},
    {"title": "Cherry Glaze & Jelly Dewdrops", "tier": "Medium", "length": "Medium Almond", "price": "65 – 80 €", "desc_de": "Transparente 3D-Kirschen auf Pfirsich-Syrup Gel mit organischen Tautropfen.", "desc_en": "Translucent 3D cherries over peach syrup gel accented by crystal clear dew droplets."},
    {"title": "Pastel Teddy Bear Sanctuary", "tier": "Insane", "length": "Long Stiletto", "price": "105 – 115 €", "desc_de": "Aufwändig modellierte 3D-Gummibärchen mit pastellfarbenen Zucker-Auren und Glitzer.", "desc_en": "Intricately sculpted 3D gummy bears with pastel sugar aura blooms and subtle sparkle."},
    {"title": "Strawberry Milk Cloud", "tier": "Medium", "length": "Short Almond", "price": "65 – 80 €", "desc_de": "Milchiges Erdbeer-Gel mit handgemalten Mikro-Erdbeeren und weißem Schimmer.", "desc_en": "Milky strawberry syrup gel featuring micro hand-painted berries and soft white shimmer."},
    {"title": "Blushing Angel Wings & Hearts", "tier": "Crazy", "length": "Long Almond", "price": "85 – 100 €", "desc_de": "Zarte Engelsflügel-Charms, rosa Aura-Verläufe und silberne Herz-Akzente 🩶.", "desc_en": "Delicate angel wing charms, blushing pink aura gradients, and silver heart accents 🩶."},
    {"title": "Kawaii Bunny Dream", "tier": "Insane", "length": "Long Coffin", "price": "105 – 115 €", "desc_de": "3D-Hasen-Skulpturen, Karotten-Miniaturen und sanfter Pastell-Mix.", "desc_en": "3D bunny sculptures, miniature charms, and a dreamy multi-pastel palette."},
    {"title": "Peach Aura with Crystal Bows", "tier": "Medium", "length": "Medium Oval", "price": "65 – 80 €", "desc_de": "Sanfte Pfirsich-Aura mit handgesetzten Kristall-Schleifen auf natürlicher Basis.", "desc_en": "Soft peach aura with hand-placed crystal ribbons over a natural nude base."},
    {"title": "Lilac Fairy Dust", "tier": "Basic", "length": "Short Almond", "price": "50 – 60 €", "desc_de": "Zartes Flieder-Sheer mit feinstem Irisierendem Feenstaub und Glanzfinish.", "desc_en": "Subtle sheer lilac with ultra-fine iridescent fairy shimmer and mirror topcoat."},
    {"title": "Sakura Petal Micro-French", "tier": "Basic", "length": "Short Square", "price": "50 – 60 €", "desc_de": "Ultra-präzise rosane Mikro-French Kanten mit einzelner Kirschblüte am Ringfinger.", "desc_en": "Sub-millimeter pink micro-French edges with a single sakura blossom on the accent finger."}
]

glam_meta = [
    {"title": "Glazed Chrome Opal Stiletto", "tier": "Medium", "length": "Long Stiletto", "price": "65 – 80 €", "desc_de": "Hochglänzendes Perlen-Chrom über milchiger Basis mit spiegelndem Finish.", "desc_en": "High-luster pearl chrome burnished over milky nude base with mirror reflection."},
    {"title": "Architectural Micro-French Double Arc", "tier": "Basic", "length": "Long Almond", "price": "50 – 60 €", "desc_de": "Doppelte Lächeln-Linien in tiefem Schwarz und Silber-Chrome mit perfekter C-Kurve.", "desc_en": "Double smile lines in jet black and silver chrome with a razor-crisp apex C-curve."},
    {"title": "Molten Liquid Silver Swirls", "tier": "Medium", "length": "Medium Almond", "price": "65 – 80 €", "desc_de": "Organische 3D-Flüssigmetall-Linien über hautfarbenem Nude-Gel.", "desc_en": "Organic 3D liquid metal swirls burnished over skin-matching nude gel."},
    {"title": "Haute Pearl Encapsulation", "tier": "Crazy", "length": "Long Stiletto", "price": "85 – 100 €", "desc_de": "Eingebettete Süßwasserperlen und Blattgold in glasklarem Aprés Gel-X.", "desc_en": "Encapsulated freshwater micro-pearls and silver foil in crystal-clear Aprés Gel-X."},
    {"title": "Nude Minimalist Chrome Tips", "tier": "Basic", "length": "Short Square", "price": "50 – 60 €", "desc_de": "Dezenter Nude-Ton mit spiegelnden flüssigen Chrom-Spitzen für den Alltag.", "desc_en": "Understated nude tone with mirror liquid chrome tips for elevated everyday luxury."},
    {"title": "Champagne Aura & Glass Cuticle", "tier": "Medium", "length": "Medium Almond", "price": "65 – 80 €", "desc_de": "Champagner-Farbverlauf mit sauberer russischer Nagelhaut-Vorbereitung.", "desc_en": "Champagne tone fade with immaculate dry e-file cuticle clearing."},
    {"title": "Y2K Cyber Chrome Stiletto", "tier": "Crazy", "length": "Long Stiletto", "price": "85 – 100 €", "desc_de": "Futuristische Cyber-Tribal Linien in Spiegelchrom über mattem Anthrazit.", "desc_en": "Futuristic cyber-tribal linework in mirror chrome over velvet charcoal."},
    {"title": "Velvet Cat-Eye Opal", "tier": "Basic", "length": "Medium Almond", "price": "50 – 60 €", "desc_de": "Magnetisches Katzenaugen-Gel mit tiefem dreidimensionalem Lichtreflex.", "desc_en": "Magnetic velvet cat-eye gel with deep three-dimensional optical light shift."}
]

all_picks = []

for idx, meta in enumerate(dark_meta):
    all_picks.append({
        "item": dark_pool[idx % len(dark_pool)],
        "meta": meta,
        "category": "dark-chrome",
        "category_label_de": "Dark & Chrome",
        "category_label_en": "Dark & Chrome"
    })

for idx, meta in enumerate(kawaii_meta):
    all_picks.append({
        "item": kawaii_pool[idx % len(kawaii_pool)],
        "meta": meta,
        "category": "kawaii",
        "category_label_de": "Soft Kawaii",
        "category_label_en": "Soft Kawaii"
    })

for idx, meta in enumerate(glam_meta):
    all_picks.append({
        "item": glam_pool[idx % len(glam_pool)],
        "meta": meta,
        "category": "glam-luxe",
        "category_label_de": "High Glam & Clean Luxe",
        "category_label_en": "High Glam & Clean Luxe"
    })

print(f"Total curated sets: {len(all_picks)}")

def make_blur_data_url(img):
    tiny = img.copy()
    tiny.thumbnail((20, 20), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    tiny.save(buf, format="JPEG", quality=40)
    b64 = base64.b64encode(buf.getvalue()).decode("utf-8")
    return f"data:image/jpeg;base64,{b64}"

gallery_ts_items = []

for i, p in enumerate(all_picks, start=1):
    src_path = p["item"]["path"]
    filename_base = f"nicci-{i:03d}"
    
    with Image.open(src_path) as img:
        rgb = img.convert("RGB")
        blur_url = make_blur_data_url(rgb)
        
        # 1600px
        img_1600 = rgb.copy()
        img_1600.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
        img_1600.save(os.path.join(out_dir, f"{filename_base}-1600.webp"), format="WEBP", quality=88)
        
        # 800px (standard)
        img_800 = rgb.copy()
        img_800.thumbnail((800, 800), Image.Resampling.LANCZOS)
        img_800.save(os.path.join(out_dir, f"{filename_base}-800.webp"), format="WEBP", quality=86)
        img_800.save(os.path.join(out_dir, f"{filename_base}.webp"), format="WEBP", quality=86)
        
        # 400px (mobile)
        img_400 = rgb.copy()
        img_400.thumbnail((400, 400), Image.Resampling.LANCZOS)
        img_400.save(os.path.join(out_dir, f"{filename_base}-400.webp"), format="WEBP", quality=82)
        
        orig_w, orig_h = img.size
        aspect = round(orig_h / orig_w, 3)

    meta = p["meta"]
    gallery_ts_items.append({
        "id": filename_base,
        "title": meta["title"],
        "category": p["category"],
        "categoryLabel": {
            "de": p["category_label_de"],
            "en": p["category_label_en"]
        },
        "tier": meta["tier"],
        "length": meta["length"],
        "price": meta["price"],
        "description": {
            "de": meta["desc_de"],
            "en": meta["desc_en"]
        },
        "image": {
            "src": f"/images/gallery/{filename_base}.webp",
            "srcSet": f"/images/gallery/{filename_base}-400.webp 400w, /images/gallery/{filename_base}-800.webp 800w, /images/gallery/{filename_base}-1600.webp 1600w",
            "width": orig_w,
            "height": orig_h,
            "aspectRatio": aspect,
            "blurDataURL": blur_url
        },
        "featured": i in [1, 2, 11, 12, 13, 21, 22, 23]
    })

print("Writing data/gallery.ts...")

ts_content = '''export interface GalleryItem {
  id: string
  title: string
  category: 'dark-chrome' | 'kawaii' | 'glam-luxe' | 'press-on'
  categoryLabel: {
    de: string
    en: string
  }
  tier: 'Basic' | 'Medium' | 'Crazy' | 'Insane'
  length: string
  price: string
  description: {
    de: string
    en: string
  }
  image: {
    src: string
    srcSet: string
    width: number
    height: number
    aspectRatio: number
    blurDataURL: string
  }
  featured: boolean
}

export const galleryItems: GalleryItem[] = '''

ts_content += json.dumps(gallery_ts_items, indent=2)
ts_content += "\n"

with open(r"apps\nailzbynicci\data\gallery.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully processed {len(gallery_ts_items)} images into WebP and created data/gallery.ts!")
