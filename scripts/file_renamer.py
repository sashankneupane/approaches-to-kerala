import os

def rename_images(folder_path):
    # Get a list of all files in the folder
    files = sorted([f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
    
    for index, file in enumerate(files, start=1):
        # Create new name with padded numbering
        new_name = f"luca{index:02}.jpg"
        
        # Build full file paths
        old_path = os.path.join(folder_path, file)
        new_path = os.path.join(folder_path, new_name)
        
        # Rename the file
        os.rename(old_path, new_path)
        print(f"Renamed: {file} -> {new_name}")

folder_path = "./public/projects/sounds-and-sights-of-everyday-kerala"
rename_images(folder_path)
