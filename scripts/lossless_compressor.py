import os
from PIL import Image

def compress_images_in_folder(folder_path: str):
    for root, _, files in os.walk(folder_path):
        for file_name in files:
            if file_name.lower().endswith(('.jpg', '.jpeg', '.png')):
                full_path = os.path.join(root, file_name)
                try:
                    with Image.open(full_path) as img:
                        img.save(full_path, optimize=True)
                        print(f"Compressed {full_path}")
                except Exception as e:
                    print(f"Failed to compress {full_path}: {e}")

if __name__ == "__main__":
    folder_to_compress = "./public"
    compress_images_in_folder(folder_to_compress)
