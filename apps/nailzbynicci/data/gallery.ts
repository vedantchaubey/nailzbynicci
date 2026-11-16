export interface GalleryItem {
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

export const galleryItems: GalleryItem[] = [
  {
    "id": "nicci-001",
    "title": "Spinal Vertebrae & Chrome Spikes",
    "category": "dark-chrome",
    "categoryLabel": {
      "de": "Dark & Chrome",
      "en": "Dark & Chrome"
    },
    "tier": "Insane",
    "length": "Long Stiletto",
    "price": "105 \u2013 115 \u20ac",
    "description": {
      "de": "Handmodellierte 3D-Wirbels\u00e4ulen-Struktur mit fl\u00fcssigem Chrom-Finish und Piercing-Details auf tiefem Obsidian.",
      "en": "Hand-sculpted 3D spinal vertebrae with molten liquid chrome finish and pierced hardware on obsidian black."
    },
    "image": {
      "src": "/images/gallery/nicci-001.webp",
      "srcSet": "/images/gallery/nicci-001-400.webp 400w, /images/gallery/nicci-001-800.webp 800w, /images/gallery/nicci-001-1600.webp 1600w",
      "width": 1440,
      "height": 1728,
      "aspectRatio": 1.2,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBBcl1ADZAIH6Csd7sySrncflC8Hk4NMa4ktGMXG3dncfr/ACqeFbQddhz/AHmzmlsPcsbW/uSUVZ2W3pF+VFFw5TNvbaMTN168c9KrWsYVWdSQ2etFFMRtc/32/OiiigD/2Q=="
    },
    "featured": true
  },
  {
    "id": "nicci-002",
    "title": "Cyber Dagger & Cross Inlay",
    "category": "dark-chrome",
    "categoryLabel": {
      "de": "Dark & Chrome",
      "en": "Dark & Chrome"
    },
    "tier": "Crazy",
    "length": "Stiletto",
    "price": "85 \u2013 100 \u20ac",
    "description": {
      "de": "Extrudierte Silber-Dornen, Kreuz-Inlays und Cyber-Sigilism Linework auf transluzentem Rauch-Gel.",
      "en": "Extruded silver thorns, cross inlays, and cyber-sigilism linework over translucent smoke gel."
    },
    "image": {
      "src": "/images/gallery/nicci-002.webp",
      "srcSet": "/images/gallery/nicci-002-400.webp 400w, /images/gallery/nicci-002-800.webp 800w, /images/gallery/nicci-002-1600.webp 1600w",
      "width": 1440,
      "height": 1168,
      "aspectRatio": 0.811,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDP3EAfI+36g1TuSskTMOSDxjqPr606Wf5QCgyeM1FHOqthlOOh29vcf4VKNGyEA4GBRUrKq4HtRSJP/9k="
    },
    "featured": true
  },
  {
    "id": "nicci-003",
    "title": "Blood Velvet Flame Aura",
    "category": "dark-chrome",
    "categoryLabel": {
      "de": "Dark & Chrome",
      "en": "Dark & Chrome"
    },
    "tier": "Medium",
    "length": "Long Almond",
    "price": "65 \u2013 80 \u20ac",
    "description": {
      "de": "Verlaufender Vampir-Aura Kern in tiefem Ochsenblut mit hochgl\u00e4nzendem Glas-Topcoat.",
      "en": "Diffused oxblood vampy aura gradient sealed beneath high-gloss mirror glass topcoat."
    },
    "image": {
      "src": "/images/gallery/nicci-003.webp",
      "srcSet": "/images/gallery/nicci-003-400.webp 400w, /images/gallery/nicci-003-800.webp 800w, /images/gallery/nicci-003-1600.webp 1600w",
      "width": 1440,
      "height": 1528,
      "aspectRatio": 1.061,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDmbdysQx1rTspX6s6qvuKdPCjwBliZcDr8oFV7S6WI7CzgHuD0/Covc1NKSBJnMhyS3dSMUVSbVLbP+sc/8AFFKzC8TPlvJZAyfKq+irjNQbiAaKKpDIaKKKoxP//Z"
    },
    "featured": false
  },
  {
    "id": "nicci-004",
    "title": "Nocturnal Emerald Serpent",
    "category": "dark-chrome",
    "categoryLabel": {
      "de": "Dark & Chrome",
      "en": "Dark & Chrome"
    },
    "tier": "Crazy",
    "length": "Long Almond",
    "price": "85 \u2013 100 \u20ac",
    "description": {
      "de": "Tiefes Waldgr\u00fcn mit chromierten Reptil-Schuppen und organischen 3D-Wassertropfen.",
      "en": "Deep nocturnal pine emerald with chrome reptile scales and organic 3D dew droplets."
    },
    "image": {
      "src": "/images/gallery/nicci-004.webp",
      "srcSet": "/images/gallery/nicci-004-400.webp 400w, /images/gallery/nicci-004-800.webp 800w, /images/gallery/nicci-004-1600.webp 1600w",
      "width": 1608,
      "height": 2144,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCs9siq7s5DNwM8ZPoTUJLq3G7A53D9f1qEKSPmZsDpzU6RRyDjOc9jn+f+cVJViJGIRfxpkUzRsdoGCSpB6EdaKKRR/9k="
    },
    "featured": false
  },
  {
    "id": "nicci-005",
    "title": "Liquid Platinum Cyber-Armor",
    "category": "dark-chrome",
    "categoryLabel": {
      "de": "Dark & Chrome",
      "en": "Dark & Chrome"
    },
    "tier": "Insane",
    "length": "Extreme Stiletto",
    "price": "105 \u2013 115 \u20ac",
    "description": {
      "de": "Volles 10-Finger 3D-Metall-Armor mit fl\u00fcssigen Chrom-Reliefs und Ketten-Charms.",
      "en": "Full 10-finger sculpted molten metal armor with fluid chrome reliefs and hanging charms."
    },
    "image": {
      "src": "/images/gallery/nicci-005.webp",
      "srcSet": "/images/gallery/nicci-005-400.webp 400w, /images/gallery/nicci-005-800.webp 800w, /images/gallery/nicci-005-1600.webp 1600w",
      "width": 1440,
      "height": 1526,
      "aspectRatio": 1.06,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDlYMqpPvV+08yU43AD61ZniBgX922VHUFT+YqG1dQpQlTk8K65H/1qi9zW1i19nA4JfP0FFATbxtkXHZX4FFIdkZP22aVNrsCOn3RSxMRIOfeiiqF0IZ7mYzyHzWHzHoaKKKoyP//Z"
    },
    "featured": false
  },
  {
    "id": "nicci-006",
    "title": "Obsidian Spiderweb & Dark Sigils",
    "category": "dark-chrome",
    "categoryLabel": {
      "de": "Dark & Chrome",
      "en": "Dark & Chrome"
    },
    "tier": "Crazy",
    "length": "Long Coffin",
    "price": "85 \u2013 100 \u20ac",
    "description": {
      "de": "Handgemalte gotische Spinnenweben und filigrane Siegel auf tiefschwarzer Gel-X Basis.",
      "en": "Hand-painted gothic spiderwebs and delicate sigils over pitch obsidian Gel-X architecture."
    },
    "image": {
      "src": "/images/gallery/nicci-006.webp",
      "srcSet": "/images/gallery/nicci-006-400.webp 400w, /images/gallery/nicci-006-800.webp 800w, /images/gallery/nicci-006-1600.webp 1600w",
      "width": 1440,
      "height": 1181,
      "aspectRatio": 0.82,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCngzQEIFZh2qp8yHBzwemeBTVcrhlJB9jWnZzPICHUYx1C1hudJRCO3IjJH0orXxRRYLn/2Q=="
    },
    "featured": false
  },
  {
    "id": "nicci-007",
    "title": "Silver Thorn Micro-Sculpt",
    "category": "dark-chrome",
    "categoryLabel": {
      "de": "Dark & Chrome",
      "en": "Dark & Chrome"
    },
    "tier": "Medium",
    "length": "Medium Almond",
    "price": "65 \u2013 80 \u20ac",
    "description": {
      "de": "Zarte 3D-Silberdornen entlang der Seitenw\u00e4nde auf milchigem Sheer-Gel.",
      "en": "Delicate 3D silver thorns along the sidewalls on a milky sheer-gel base."
    },
    "image": {
      "src": "/images/gallery/nicci-007.webp",
      "srcSet": "/images/gallery/nicci-007-400.webp 400w, /images/gallery/nicci-007-800.webp 800w, /images/gallery/nicci-007-1600.webp 1600w",
      "width": 1980,
      "height": 2640,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDOvHLMBvCgnjmr0d/jTmtkjVw2CHPVec1kXWWl+6eOvFSwo0eFBJzzSKsSqoKZ9Sa2NYtoILGCSGJEckAkDrxRRQJn/9k="
    },
    "featured": false
  },
  {
    "id": "nicci-008",
    "title": "Gothic Crucifix & Dark Halo",
    "category": "dark-chrome",
    "categoryLabel": {
      "de": "Dark & Chrome",
      "en": "Dark & Chrome"
    },
    "tier": "Crazy",
    "length": "Stiletto",
    "price": "85 \u2013 100 \u20ac",
    "description": {
      "de": "Dunkles Halo-Aura Design mit 3D-Kruzifix und feinen Chrom-Highlights.",
      "en": "Dark halo aura design accented by 3D crucifixes and fine chrome rim highlights."
    },
    "image": {
      "src": "/images/gallery/nicci-008.webp",
      "srcSet": "/images/gallery/nicci-008-400.webp 400w, /images/gallery/nicci-008-800.webp 800w, /images/gallery/nicci-008-1600.webp 1600w",
      "width": 1440,
      "height": 1920,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDDmu51jZwkgiVtuScc81a0maQXC+bGVSVSQTUt1Pb3VrJFEyguBhmB2gf5/matW6xzDyw27A/zj/Pes7+Rryruc/On2WRliZgB6mtDQCz3DOzFm2nqfeiitEZM/9k="
    },
    "featured": false
  },
  {
    "id": "nicci-009",
    "title": "Smoked Quartz & Liquid Spikes",
    "category": "dark-chrome",
    "categoryLabel": {
      "de": "Dark & Chrome",
      "en": "Dark & Chrome"
    },
    "tier": "Medium",
    "length": "Medium Stiletto",
    "price": "65 \u2013 80 \u20ac",
    "description": {
      "de": "Transluzentes Rauch-Gel mit gezielten Chrom-Spikes auf vier Akzentn\u00e4geln.",
      "en": "Translucent smoky gel with targeted liquid chrome spikes on four accent nails."
    },
    "image": {
      "src": "/images/gallery/nicci-009.webp",
      "srcSet": "/images/gallery/nicci-009-400.webp 400w, /images/gallery/nicci-009-800.webp 800w, /images/gallery/nicci-009-1600.webp 1600w",
      "width": 1440,
      "height": 1446,
      "aspectRatio": 1.004,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCh5jbtpzgMMVLcXQS2mijuZInkwOBnIzWdHcNO21BnK5PHQd8+1TeQVZj13d/Skrml0Jb2d3coXj1BwM4IJPB/OinQyG3DLzy2eBRRqKyHWZ8kSFFXMkLKeO3FRxjcx3c47miimIcVxwCQPaiiigD/2Q=="
    },
    "featured": false
  },
  {
    "id": "nicci-010",
    "title": "Noir French with Hardware Ring",
    "category": "dark-chrome",
    "categoryLabel": {
      "de": "Dark & Chrome",
      "en": "Dark & Chrome"
    },
    "tier": "Basic",
    "length": "Medium Square",
    "price": "50 \u2013 60 \u20ac",
    "description": {
      "de": "Pr\u00e4zise tiefschwarze French-L\u00e4cheln mit minimalistischem Ring-Piercing am Zeigefinger.",
      "en": "Crisp jet-black French smile line accented with a minimalist pierced silver hardware hoop."
    },
    "image": {
      "src": "/images/gallery/nicci-010.webp",
      "srcSet": "/images/gallery/nicci-010-400.webp 400w, /images/gallery/nicci-010-800.webp 800w, /images/gallery/nicci-010-1600.webp 1600w",
      "width": 1857,
      "height": 2476,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDNt4IP3xXMqBc5xyD6c1QbKuy5xg4wTV+3xEHT1GOozVKWMuZJVHyK2DzQOwi3k7RMC/uPaiW7lkjMJ2hM5wBRRQI//9k="
    },
    "featured": false
  },
  {
    "id": "nicci-011",
    "title": "3D Sleeping Panda & Sakura Blush",
    "category": "kawaii",
    "categoryLabel": {
      "de": "Soft Kawaii",
      "en": "Soft Kawaii"
    },
    "tier": "Insane",
    "length": "Long Almond",
    "price": "105 \u2013 115 \u20ac",
    "description": {
      "de": "Handgeformter 3D-Panda, Kirschbl\u00fcten-Reliefs und zartes Rosa-Aura auf Apr\u00e9s Gel-X.",
      "en": "Hand-sculpted 3D resting panda, sakura blossom petals, and blush aura on Apr\u00e9s Gel-X."
    },
    "image": {
      "src": "/images/gallery/nicci-011.webp",
      "srcSet": "/images/gallery/nicci-011-400.webp 400w, /images/gallery/nicci-011-800.webp 800w, /images/gallery/nicci-011-1600.webp 1600w",
      "width": 1440,
      "height": 1800,
      "aspectRatio": 1.25,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwADfZIGKL5jBQVHqfSoILmNsncyLksxY5A/H3qWaKUtmNtu4jJPQe9OKeYoUrt28qQOOf6+9cmjRu3YvSfc2ZJUHIBPSq10ii2kOPuqSPyoopPcUvhZ/9k="
    },
    "featured": true
  },
  {
    "id": "nicci-012",
    "title": "Coquette Pearl & Ribbon Bows",
    "category": "kawaii",
    "categoryLabel": {
      "de": "Soft Kawaii",
      "en": "Soft Kawaii"
    },
    "tier": "Crazy",
    "length": "Medium Almond",
    "price": "85 \u2013 100 \u20ac",
    "description": {
      "de": "Miniatur-Schleifen in 3D-Gel, echte S\u00fc\u00dfwasserperlen und zartrosa French-Spitzen.",
      "en": "3D miniature ribbon bows, genuine freshwater pearls, and delicate blushing French tips."
    },
    "image": {
      "src": "/images/gallery/nicci-012.webp",
      "srcSet": "/images/gallery/nicci-012-400.webp 400w, /images/gallery/nicci-012-800.webp 800w, /images/gallery/nicci-012-1600.webp 1600w",
      "width": 1200,
      "height": 1597,
      "aspectRatio": 1.331,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCzdXccLoEh2xOo2MOAKa8cd2Ruzs74PWsmwvXuVFpcSoEKkxuy8qR05+ma1reGWKJvNIKg8MpqU+htUjbU5mNQXX/dH8q0IOF287c5K54J9aKKlnoQSe5//9k="
    },
    "featured": true
  },
  {
    "id": "nicci-013",
    "title": "Cherry Glaze & Jelly Dewdrops",
    "category": "kawaii",
    "categoryLabel": {
      "de": "Soft Kawaii",
      "en": "Soft Kawaii"
    },
    "tier": "Medium",
    "length": "Medium Almond",
    "price": "65 \u2013 80 \u20ac",
    "description": {
      "de": "Transparente 3D-Kirschen auf Pfirsich-Syrup Gel mit organischen Tautropfen.",
      "en": "Translucent 3D cherries over peach syrup gel accented by crystal clear dew droplets."
    },
    "image": {
      "src": "/images/gallery/nicci-013.webp",
      "srcSet": "/images/gallery/nicci-013-400.webp 400w, /images/gallery/nicci-013-800.webp 800w, /images/gallery/nicci-013-1600.webp 1600w",
      "width": 1440,
      "height": 1800,
      "aspectRatio": 1.25,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCxbWtopSYxIkqKFZ8/ebp+NTTWNnJO00oBlwU/SqhjwgSGMlV5VA3589z7/lVtYgIw0akkYYA9fcflR5hbWxT0t22S5OTu6nr0rSjmZVcjHHSiinLYmPxH/9k="
    },
    "featured": true
  },
  {
    "id": "nicci-014",
    "title": "Pastel Teddy Bear Sanctuary",
    "category": "kawaii",
    "categoryLabel": {
      "de": "Soft Kawaii",
      "en": "Soft Kawaii"
    },
    "tier": "Insane",
    "length": "Long Stiletto",
    "price": "105 \u2013 115 \u20ac",
    "description": {
      "de": "Aufw\u00e4ndig modellierte 3D-Gummib\u00e4rchen mit pastellfarbenen Zucker-Auren und Glitzer.",
      "en": "Intricately sculpted 3D gummy bears with pastel sugar aura blooms and subtle sparkle."
    },
    "image": {
      "src": "/images/gallery/nicci-014.webp",
      "srcSet": "/images/gallery/nicci-014-400.webp 400w, /images/gallery/nicci-014-800.webp 800w, /images/gallery/nicci-014-1600.webp 1600w",
      "width": 1440,
      "height": 1459,
      "aspectRatio": 1.013,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDCnsmghR5VCFcEgjOfyqxLBdamVYiNI0/i5Bb8K25YlbcJE4IwcjrVaKdkLiUEp1DLwMfhWfMzbkSM6TRUL/KWAA7d6K11beoZEZ1PQgZ/rRRdjtEJ4lN6p5+70zVK5j3G5j3MoyxGDjHFFFOJnIsCJUUKpbAHrRRRQM//2Q=="
    },
    "featured": false
  },
  {
    "id": "nicci-015",
    "title": "Strawberry Milk Cloud",
    "category": "kawaii",
    "categoryLabel": {
      "de": "Soft Kawaii",
      "en": "Soft Kawaii"
    },
    "tier": "Medium",
    "length": "Short Almond",
    "price": "65 \u2013 80 \u20ac",
    "description": {
      "de": "Milchiges Erdbeer-Gel mit handgemalten Mikro-Erdbeeren und wei\u00dfem Schimmer.",
      "en": "Milky strawberry syrup gel featuring micro hand-painted berries and soft white shimmer."
    },
    "image": {
      "src": "/images/gallery/nicci-015.webp",
      "srcSet": "/images/gallery/nicci-015-400.webp 400w, /images/gallery/nicci-015-800.webp 800w, /images/gallery/nicci-015-1600.webp 1600w",
      "width": 1440,
      "height": 1177,
      "aspectRatio": 0.817,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDOY4xg4PqP0pbwt56bnLErkkdBVr7IXIAPB61M2nrIVO7kAZOa5zqvcoJ5jL8qkj6UVtRxJGu1Rge1FFguf//Z"
    },
    "featured": false
  },
  {
    "id": "nicci-016",
    "title": "Blushing Angel Wings & Hearts",
    "category": "kawaii",
    "categoryLabel": {
      "de": "Soft Kawaii",
      "en": "Soft Kawaii"
    },
    "tier": "Crazy",
    "length": "Long Almond",
    "price": "85 \u2013 100 \u20ac",
    "description": {
      "de": "Zarte Engelsfl\u00fcgel-Charms, rosa Aura-Verl\u00e4ufe und silberne Herz-Akzente \ud83e\ude76.",
      "en": "Delicate angel wing charms, blushing pink aura gradients, and silver heart accents \ud83e\ude76."
    },
    "image": {
      "src": "/images/gallery/nicci-016.webp",
      "srcSet": "/images/gallery/nicci-016-400.webp 400w, /images/gallery/nicci-016-800.webp 800w, /images/gallery/nicci-016-1600.webp 1600w",
      "width": 1440,
      "height": 1920,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCO/unjKMxDg8LuXjNOguDFMHnboMbOT2xnHX8apYSa62KSMZwTyAcZ/pSiQiBH87Y0qhs9+f51D10NI6INPPzwE88jr7hqgmObG2bgEKBn25ooqepT2P/Z"
    },
    "featured": false
  },
  {
    "id": "nicci-017",
    "title": "Kawaii Bunny Dream",
    "category": "kawaii",
    "categoryLabel": {
      "de": "Soft Kawaii",
      "en": "Soft Kawaii"
    },
    "tier": "Insane",
    "length": "Long Coffin",
    "price": "105 \u2013 115 \u20ac",
    "description": {
      "de": "3D-Hasen-Skulpturen, Karotten-Miniaturen und sanfter Pastell-Mix.",
      "en": "3D bunny sculptures, miniature charms, and a dreamy multi-pastel palette."
    },
    "image": {
      "src": "/images/gallery/nicci-017.webp",
      "srcSet": "/images/gallery/nicci-017-400.webp 400w, /images/gallery/nicci-017-800.webp 800w, /images/gallery/nicci-017-1600.webp 1600w",
      "width": 1440,
      "height": 1551,
      "aspectRatio": 1.077,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwClNdJE3z5zn0qeC6SVlQBskcNkY+mKo3pVljm25Zk2kEZDEf8A1qii8wyQm3jIUAZAGT7/AJjmlZDN4NgDiioFkKLtIyRRWdmOxWs2DW0wdVYIwZc9jQL2ZpTGrCNc/wAAxRRV9AJ8Z5JJPrRRRWQz/9k="
    },
    "featured": false
  },
  {
    "id": "nicci-018",
    "title": "Peach Aura with Crystal Bows",
    "category": "kawaii",
    "categoryLabel": {
      "de": "Soft Kawaii",
      "en": "Soft Kawaii"
    },
    "tier": "Medium",
    "length": "Medium Oval",
    "price": "65 \u2013 80 \u20ac",
    "description": {
      "de": "Sanfte Pfirsich-Aura mit handgesetzten Kristall-Schleifen auf nat\u00fcrlicher Basis.",
      "en": "Soft peach aura with hand-placed crystal ribbons over a natural nude base."
    },
    "image": {
      "src": "/images/gallery/nicci-018.webp",
      "srcSet": "/images/gallery/nicci-018-400.webp 400w, /images/gallery/nicci-018-800.webp 800w, /images/gallery/nicci-018-1600.webp 1600w",
      "width": 1440,
      "height": 1181,
      "aspectRatio": 0.82,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDOtpzE42nK56HofxrSu7wxxgRqSWHUHpWdDbyNxjBPGfWtQ2CyRBGO0juOlc51aGWjSSqHaaXJ9FPFFXv7Gx0lH/fNFKzA/9k="
    },
    "featured": false
  },
  {
    "id": "nicci-019",
    "title": "Lilac Fairy Dust",
    "category": "kawaii",
    "categoryLabel": {
      "de": "Soft Kawaii",
      "en": "Soft Kawaii"
    },
    "tier": "Basic",
    "length": "Short Almond",
    "price": "50 \u2013 60 \u20ac",
    "description": {
      "de": "Zartes Flieder-Sheer mit feinstem Irisierendem Feenstaub und Glanzfinish.",
      "en": "Subtle sheer lilac with ultra-fine iridescent fairy shimmer and mirror topcoat."
    },
    "image": {
      "src": "/images/gallery/nicci-019.webp",
      "srcSet": "/images/gallery/nicci-019-400.webp 400w, /images/gallery/nicci-019-800.webp 800w, /images/gallery/nicci-019-1600.webp 1600w",
      "width": 1440,
      "height": 1574,
      "aspectRatio": 1.093,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCmn2mUlUMghZvnCjA9iadJZpborPIy/PtckY5596Z9p3Mq7l2spDEADHFWoJVmTOzd5ig8jgOP8RWd2aqKaMqOFmjRvPxkA96KuHUAp2+SvHHAFFHMw9mRSKFGQO+6m6fZxNMWbc3ySHBPGQKKKS2CPQqDgcE0UUVRR//Z"
    },
    "featured": false
  },
  {
    "id": "nicci-020",
    "title": "Sakura Petal Micro-French",
    "category": "kawaii",
    "categoryLabel": {
      "de": "Soft Kawaii",
      "en": "Soft Kawaii"
    },
    "tier": "Basic",
    "length": "Short Square",
    "price": "50 \u2013 60 \u20ac",
    "description": {
      "de": "Ultra-pr\u00e4zise rosane Mikro-French Kanten mit einzelner Kirschbl\u00fcte am Ringfinger.",
      "en": "Sub-millimeter pink micro-French edges with a single sakura blossom on the accent finger."
    },
    "image": {
      "src": "/images/gallery/nicci-020.webp",
      "srcSet": "/images/gallery/nicci-020-400.webp 400w, /images/gallery/nicci-020-800.webp 800w, /images/gallery/nicci-020-1600.webp 1600w",
      "width": 1170,
      "height": 1560,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCpFprRIFeYMpJI9hUM+luZVdZBtAwMirZuEjvvJkLAnBHv7VaaeKb/AFbBgvUhc1jzSNrKxzEUpDu+MnYRyTWnpUjbhH/CwyRRRWsupMdz/9k="
    },
    "featured": false
  },
  {
    "id": "nicci-021",
    "title": "Glazed Chrome Opal Stiletto",
    "category": "glam-luxe",
    "categoryLabel": {
      "de": "High Glam & Clean Luxe",
      "en": "High Glam & Clean Luxe"
    },
    "tier": "Medium",
    "length": "Long Stiletto",
    "price": "65 \u2013 80 \u20ac",
    "description": {
      "de": "Hochgl\u00e4nzendes Perlen-Chrom \u00fcber milchiger Basis mit spiegelndem Finish.",
      "en": "High-luster pearl chrome burnished over milky nude base with mirror reflection."
    },
    "image": {
      "src": "/images/gallery/nicci-021.webp",
      "srcSet": "/images/gallery/nicci-021-400.webp 400w, /images/gallery/nicci-021-800.webp 800w, /images/gallery/nicci-021-1600.webp 1600w",
      "width": 1440,
      "height": 1910,
      "aspectRatio": 1.326,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCq72cbFZtqsScf06U8KIYg0a7gepUbSao3mmmIeaXDZIHAxz7e1aMCBYtvmgjj73OKwexstCC7crqUVt96NFDAHnJx1NTM2AcADLGiikwP/9k="
    },
    "featured": true
  },
  {
    "id": "nicci-022",
    "title": "Architectural Micro-French Double Arc",
    "category": "glam-luxe",
    "categoryLabel": {
      "de": "High Glam & Clean Luxe",
      "en": "High Glam & Clean Luxe"
    },
    "tier": "Basic",
    "length": "Long Almond",
    "price": "50 \u2013 60 \u20ac",
    "description": {
      "de": "Doppelte L\u00e4cheln-Linien in tiefem Schwarz und Silber-Chrome mit perfekter C-Kurve.",
      "en": "Double smile lines in jet black and silver chrome with a razor-crisp apex C-curve."
    },
    "image": {
      "src": "/images/gallery/nicci-022.webp",
      "srcSet": "/images/gallery/nicci-022-400.webp 400w, /images/gallery/nicci-022-800.webp 800w, /images/gallery/nicci-022-1600.webp 1600w",
      "width": 1170,
      "height": 1563,
      "aspectRatio": 1.336,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDMFmZ4oGmBDIvA/wAaSZd0SiZcHOMfSrOBCxeR+eoRTkmnzyKiKx6HpntSHsMliU7OOrAGoNQAJT0HAFFFLoM//9k="
    },
    "featured": true
  },
  {
    "id": "nicci-023",
    "title": "Molten Liquid Silver Swirls",
    "category": "glam-luxe",
    "categoryLabel": {
      "de": "High Glam & Clean Luxe",
      "en": "High Glam & Clean Luxe"
    },
    "tier": "Medium",
    "length": "Medium Almond",
    "price": "65 \u2013 80 \u20ac",
    "description": {
      "de": "Organische 3D-Fl\u00fcssigmetall-Linien \u00fcber hautfarbenem Nude-Gel.",
      "en": "Organic 3D liquid metal swirls burnished over skin-matching nude gel."
    },
    "image": {
      "src": "/images/gallery/nicci-023.webp",
      "srcSet": "/images/gallery/nicci-023-400.webp 400w, /images/gallery/nicci-023-800.webp 800w, /images/gallery/nicci-023-1600.webp 1600w",
      "width": 1440,
      "height": 1920,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCcSjbjBznH61h64RIkLDqGZSPxq7HcK8sq+aBtc4yeo4rKmZpMg9N5YfjWaVjVyTC3+8fyqaY5A4HFFFMg/9k="
    },
    "featured": true
  },
  {
    "id": "nicci-024",
    "title": "Haute Pearl Encapsulation",
    "category": "glam-luxe",
    "categoryLabel": {
      "de": "High Glam & Clean Luxe",
      "en": "High Glam & Clean Luxe"
    },
    "tier": "Crazy",
    "length": "Long Stiletto",
    "price": "85 \u2013 100 \u20ac",
    "description": {
      "de": "Eingebettete S\u00fc\u00dfwasserperlen und Blattgold in glasklarem Apr\u00e9s Gel-X.",
      "en": "Encapsulated freshwater micro-pearls and silver foil in crystal-clear Apr\u00e9s Gel-X."
    },
    "image": {
      "src": "/images/gallery/nicci-024.webp",
      "srcSet": "/images/gallery/nicci-024-400.webp 400w, /images/gallery/nicci-024-800.webp 800w, /images/gallery/nicci-024-1600.webp 1600w",
      "width": 3024,
      "height": 4032,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDMtIzLM1xMrEufkGOlWnuACELAAdhk/oKhmj33KxgrtXHrkfpVryIyeWYdujf0qDaKK+rqFg89SQ6nt3qhBqErHDKh98H/ABooprYlbn//2Q=="
    },
    "featured": false
  },
  {
    "id": "nicci-025",
    "title": "Nude Minimalist Chrome Tips",
    "category": "glam-luxe",
    "categoryLabel": {
      "de": "High Glam & Clean Luxe",
      "en": "High Glam & Clean Luxe"
    },
    "tier": "Basic",
    "length": "Short Square",
    "price": "50 \u2013 60 \u20ac",
    "description": {
      "de": "Dezenter Nude-Ton mit spiegelnden fl\u00fcssigen Chrom-Spitzen f\u00fcr den Alltag.",
      "en": "Understated nude tone with mirror liquid chrome tips for elevated everyday luxury."
    },
    "image": {
      "src": "/images/gallery/nicci-025.webp",
      "srcSet": "/images/gallery/nicci-025-400.webp 400w, /images/gallery/nicci-025-800.webp 800w, /images/gallery/nicci-025-1600.webp 1600w",
      "width": 1440,
      "height": 1910,
      "aspectRatio": 1.326,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCq72cbFZtqsScf06U8KIYg0a7gepUbSao3mmmIeaXDZIHAxz7e1aMCBYtvmgjj73OKwexstCC7crqUVt96NFDAHnJx1NTM2AcADLGiikwP/9k="
    },
    "featured": false
  },
  {
    "id": "nicci-026",
    "title": "Champagne Aura & Glass Cuticle",
    "category": "glam-luxe",
    "categoryLabel": {
      "de": "High Glam & Clean Luxe",
      "en": "High Glam & Clean Luxe"
    },
    "tier": "Medium",
    "length": "Medium Almond",
    "price": "65 \u2013 80 \u20ac",
    "description": {
      "de": "Champagner-Farbverlauf mit sauberer russischer Nagelhaut-Vorbereitung.",
      "en": "Champagne tone fade with immaculate dry e-file cuticle clearing."
    },
    "image": {
      "src": "/images/gallery/nicci-026.webp",
      "srcSet": "/images/gallery/nicci-026-400.webp 400w, /images/gallery/nicci-026-800.webp 800w, /images/gallery/nicci-026-1600.webp 1600w",
      "width": 1170,
      "height": 1563,
      "aspectRatio": 1.336,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDMFmZ4oGmBDIvA/wAaSZd0SiZcHOMfSrOBCxeR+eoRTkmnzyKiKx6HpntSHsMliU7OOrAGoNQAJT0HAFFFLoM//9k="
    },
    "featured": false
  },
  {
    "id": "nicci-027",
    "title": "Y2K Cyber Chrome Stiletto",
    "category": "glam-luxe",
    "categoryLabel": {
      "de": "High Glam & Clean Luxe",
      "en": "High Glam & Clean Luxe"
    },
    "tier": "Crazy",
    "length": "Long Stiletto",
    "price": "85 \u2013 100 \u20ac",
    "description": {
      "de": "Futuristische Cyber-Tribal Linien in Spiegelchrom \u00fcber mattem Anthrazit.",
      "en": "Futuristic cyber-tribal linework in mirror chrome over velvet charcoal."
    },
    "image": {
      "src": "/images/gallery/nicci-027.webp",
      "srcSet": "/images/gallery/nicci-027-400.webp 400w, /images/gallery/nicci-027-800.webp 800w, /images/gallery/nicci-027-1600.webp 1600w",
      "width": 1440,
      "height": 1920,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCcSjbjBznH61h64RIkLDqGZSPxq7HcK8sq+aBtc4yeo4rKmZpMg9N5YfjWaVjVyTC3+8fyqaY5A4HFFFMg/9k="
    },
    "featured": false
  },
  {
    "id": "nicci-028",
    "title": "Velvet Cat-Eye Opal",
    "category": "glam-luxe",
    "categoryLabel": {
      "de": "High Glam & Clean Luxe",
      "en": "High Glam & Clean Luxe"
    },
    "tier": "Basic",
    "length": "Medium Almond",
    "price": "50 \u2013 60 \u20ac",
    "description": {
      "de": "Magnetisches Katzenaugen-Gel mit tiefem dreidimensionalem Lichtreflex.",
      "en": "Magnetic velvet cat-eye gel with deep three-dimensional optical light shift."
    },
    "image": {
      "src": "/images/gallery/nicci-028.webp",
      "srcSet": "/images/gallery/nicci-028-400.webp 400w, /images/gallery/nicci-028-800.webp 800w, /images/gallery/nicci-028-1600.webp 1600w",
      "width": 3024,
      "height": 4032,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDMtIzLM1xMrEufkGOlWnuACELAAdhk/oKhmj33KxgrtXHrkfpVryIyeWYdujf0qDaKK+rqFg89SQ6nt3qhBqErHDKh98H/ABooprYlbn//2Q=="
    },
    "featured": false
  },
  {
    "id": "nicci-029",
    "title": "Noir Cherry Glass Aura",
    "category": "press-on",
    "categoryLabel": {
      "de": "Press-Ons",
      "en": "Press-Ons"
    },
    "tier": "Medium",
    "length": "Long Stiletto",
    "price": "65 – 80 €",
    "description": {
      "de": "Dunkelroter Vampir-Aura Farbverlauf mit hochglänzender, kratzfester Schutzversiegelung auf wiederverwendbaren Aprés Gel-X Spitzen.",
      "en": "Deep oxblood vampire aura gradient sealed beneath high-gloss scratch-resistant topcoat on reusable Aprés Gel-X tips."
    },
    "image": {
      "src": "/images/gallery/nicci-029.webp",
      "srcSet": "/images/gallery/nicci-029-400.webp 400w, /images/gallery/nicci-029-800.webp 800w, /images/gallery/nicci-029-1600.webp 1600w",
      "width": 400,
      "height": 533,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDmbdysQx1rTspX6s6qvuKdPCjwBliZcDr8oFV7S6WI7CzgHuD0/Covc1NKSBJnMhyS3dSMUVSbVLbP+sc/8AFFKzC8TPlvJZAyfKq+irjNQbiAaKKpDIaKKKoxP//Z"
    },
    "featured": true
  },
  {
    "id": "nicci-030",
    "title": "Kawaii 3D Blossom & Ribbon Bow",
    "category": "press-on",
    "categoryLabel": {
      "de": "Press-Ons",
      "en": "Press-Ons"
    },
    "tier": "Crazy",
    "length": "Medium Almond",
    "price": "85 – 100 €",
    "description": {
      "de": "Handmodellierte 3D-Schleifen und zarter Kirschblüten-Schimmer in maßgefertigter Sammlerbox.",
      "en": "Hand-sculpted 3D ribbon bows and sakura blossom blush in bespoke collector box packaging."
    },
    "image": {
      "src": "/images/gallery/nicci-030.webp",
      "srcSet": "/images/gallery/nicci-030-400.webp 400w, /images/gallery/nicci-030-800.webp 800w, /images/gallery/nicci-030-1600.webp 1600w",
      "width": 400,
      "height": 533,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDmbdysQx1rTspX6s6qvuKdPCjwBliZcDr8oFV7S6WI7CzgHuD0/Covc1NKSBJnMhyS3dSMUVSbVLbP+sc/8AFFKzC8TPlvJZAyfKq+irjNQbiAaKKpDIaKKKoxP//Z"
    },
    "featured": true
  },
  {
    "id": "nicci-031",
    "title": "Cyber Gothic Cross & Toxic Inlay",
    "category": "press-on",
    "categoryLabel": {
      "de": "Press-Ons",
      "en": "Press-Ons"
    },
    "tier": "Insane",
    "length": "Long Ballerina",
    "price": "105 – 115 €",
    "description": {
      "de": "Neongrünes Cyberpunk-Lettering ('TOXIC', 'MOTEL') und handmodelliertes schwarzes Gothic-Kreuz.",
      "en": "Neon green cyberpunk lettering ('TOXIC', 'MOTEL') and hand-sculpted black gothic crucifix in custom case."
    },
    "image": {
      "src": "/images/gallery/nicci-031.webp",
      "srcSet": "/images/gallery/nicci-031-400.webp 400w, /images/gallery/nicci-031-800.webp 800w, /images/gallery/nicci-031-1600.webp 1600w",
      "width": 400,
      "height": 533,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDmbdysQx1rTspX6s6qvuKdPCjwBliZcDr8oFV7S6WI7CzgHuD0/Covc1NKSBJnMhyS3dSMUVSbVLbP+sc/8AFFKzC8TPlvJZAyfKq+irjNQbiAaKKpDIaKKKoxP//Z"
    },
    "featured": true
  },
  {
    "id": "nicci-032",
    "title": "3D Flora & Glazed Pearl Chrome",
    "category": "press-on",
    "categoryLabel": {
      "de": "Press-Ons",
      "en": "Press-Ons"
    },
    "tier": "Crazy",
    "length": "Medium Almond",
    "price": "85 – 100 €",
    "description": {
      "de": "Handgeformte 3D-Blütenblätter, Perlen-Einschlüsse und irisierender Perlenchrom-Schimmer.",
      "en": "Hand-sculpted 3D floral petals, pearl encapsulations, and glazed chrome sheen."
    },
    "image": {
      "src": "/images/gallery/nicci-032.webp",
      "srcSet": "/images/gallery/nicci-032-400.webp 400w, /images/gallery/nicci-032-800.webp 800w, /images/gallery/nicci-032-1600.webp 1600w",
      "width": 400,
      "height": 533,
      "aspectRatio": 1.333,
      "blurDataURL": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDmbdysQx1rTspX6s6qvuKdPCjwBliZcDr8oFV7S6WI7CzgHuD0/Covc1NKSBJnMhyS3dSMUVSbVLbP+sc/8AFFKzC8TPlvJZAyfKq+irjNQbiAaKKpDIaKKKoxP//Z"
    },
    "featured": true
  }
]
