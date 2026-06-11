import os
from PIL import Image

def compress_to_webp(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                filepath = os.path.join(root, file)
                webp_path = os.path.splitext(filepath)[0] + '.webp'
                
                if not os.path.exists(webp_path):
                    print(f"Compressing {filepath}...")
                    try:
                        with Image.open(filepath) as img:
                            # Keep transparency if it exists, otherwise RGB
                            if img.mode not in ('RGB', 'RGBA'):
                                img = img.convert('RGBA')
                            
                            # Resize if extremely large to save more space
                            max_width = 1920
                            if img.width > max_width:
                                ratio = max_width / img.width
                                new_size = (max_width, int(img.height * ratio))
                                img = img.resize(new_size, Image.Resampling.LANCZOS)

                            img.save(webp_path, 'webp', quality=80, method=6)
                            print(f"Saved {webp_path}")
                    except Exception as e:
                        print(f"Failed to compress {filepath}: {e}")

compress_to_webp('assets')
