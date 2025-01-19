import os

def lowercase_fileextensions(folder_path: str):
    for root, _, files in os.walk(folder_path):
        for file_name in files:
            if '.' in file_name:
                file_name_lower = file_name.lower()
                if file_name != file_name_lower:
                    full_path = os.path.join(root, file_name)
                    full_path_lower = os.path.join(root, file_name_lower)
                    os.rename(full_path, full_path_lower)
                    print(f"Renamed {full_path} to {full_path_lower}")

def change_extensions(folder_path: str, old_ext: str, new_ext: str):
    for root, _, files in os.walk(folder_path):
        for file_name in files:
            if file_name.lower().endswith(old_ext):
                full_path = os.path.join(root, file_name)
                new_full_path = full_path[:-len(old_ext)] + new_ext
                os.rename(full_path, new_full_path)
                print(f"Renamed {full_path} to {new_full_path}")

if __name__ == "__main__":
    # lowercase_fileextensions("./")
    change_extensions("./", ".jpeg", ".jpg")