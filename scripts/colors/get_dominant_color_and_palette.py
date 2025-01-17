import os
import json
from colorthief import ColorThief
from pathlib import Path
from tqdm import tqdm


def collect_images(root_dir):
    image_extensions = (".png", ".jpg", ".jpeg", ".webp")
    image_paths = []
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.lower().endswith(image_extensions):
                image_paths.append(Path(dirpath) / filename)
    return image_paths

def main():
    root_dir = Path(__file__).parent.parent.parent
    public_dir = root_dir / "public"
    output_file = root_dir / "app" / "projects" / "colors-of-kerala" / "colorInfo.json"
    output_file.parent.mkdir(parents=True, exist_ok=True)

    images = collect_images(root_dir / "public" / "projects")
    data = []

    for img_path in tqdm(images):
        try:
            color_thief = ColorThief(img_path)
            dominant_color = color_thief.get_color(quality=1)
            palette = color_thief.get_palette(color_count=6)
            relative_path = '/' + str(img_path.relative_to(public_dir)).replace('\\', '/')
            data.append({
                "file_path": relative_path,
                "dominant_color": dominant_color,
                "palette": palette
            })
            print(f"Processed {img_path}")
        except Exception as e:
            print(f"Error processing {img_path}: {e}")

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    main()
