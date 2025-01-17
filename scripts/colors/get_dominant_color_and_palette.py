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

def load_existing_data(output_file):
    if output_file.exists():
        with open(output_file, "r", encoding="utf-8") as f:
            return {item["file_path"]: item for item in json.load(f)}
    return {}

def main():
    root_dir = Path(__file__).parent.parent.parent
    public_dir = root_dir / "public"
    output_file = public_dir / "colors-of-kerala" / "colorInfo.json"
    output_file.parent.mkdir(parents=True, exist_ok=True)

    existing_data = load_existing_data(output_file)
    images = collect_images(root_dir / "public" / "projects")
    data = []

    for img_path in tqdm(images):
        relative_path = '/' + str(img_path.relative_to(public_dir)).replace('\\', '/')
        
        if relative_path in existing_data:
            data.append(existing_data[relative_path])
            print(f"Skipped {img_path} (already processed)")
            continue

        try:
            color_thief = ColorThief(img_path)
            dominant_color = color_thief.get_color(quality=1)
            palette = color_thief.get_palette(color_count=6)
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
