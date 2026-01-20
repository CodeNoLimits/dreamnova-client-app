import json
import os
import requests
import base64
import time

# Configuration
DEPLOYMENT_ID = "dpl_FcdadebAeBbN2NDuUN8K8jTwV9Ar"
TOKEN = "vca_6a6felNs8NYTqIVjtPPp5HYtFa3rkwPf173a0vrMx5fj61eV7324aLb5"
BASE_URL = f"https://api.vercel.com/v7/deployments/{DEPLOYMENT_ID}/files"
HEADERS = {"Authorization": f"Bearer {TOKEN}"}

# Load file list
with open("deployment_files.json", "r") as f:
    files_tree = json.load(f)

def process_node(node, current_path=""):
    if node["type"] == "directory":
        # Create directory if it doesn't exist
        dir_path = os.path.join(current_path, node["name"]) if current_path else node["name"]
        
        # We only want to process src, public, and root files. 
        # If we are at root, we filter. If we are inside src or public, we process everything.
        if current_path == "":
            if node["name"] not in ["src", "public"]:
                # Skip other directories at root for now unless they are critical?
                # Actually, let's just stick to src and public as planned.
                pass
        
        if not os.path.exists(dir_path) and (current_path != "" or node["name"] in ["src", "public"]):
             os.makedirs(dir_path, exist_ok=True)

        if "children" in node:
            for child in node["children"]:
                process_node(child, dir_path if current_path else node["name"])
                
    elif node["type"] == "file":
        file_path = os.path.join(current_path, node["name"]) if current_path else node["name"]
        
        # Filter root files
        if current_path == "":
            if node["name"] not in ["package.json", "next.config.ts", "tsconfig.json", "postcss.config.mjs", "middleware.ts", "next-env.d.ts", "eslint.config.mjs"]:
                return

        print(f"Downloading {file_path}...")
        
        try:
            response = requests.get(f"{BASE_URL}/{node['uid']}", headers=HEADERS)
            response.raise_for_status()
            
            content_json = response.json()
            if "data" in content_json:
                decoded_content = base64.b64decode(content_json["data"])
                
                # Ensure parent dir exists (for root files)
                os.makedirs(os.path.dirname(file_path) or ".", exist_ok=True)
                
                with open(file_path, "wb") as f:
                    f.write(decoded_content)
                print(f"Restored {file_path}")
            else:
                print(f"Warning: No data field for {file_path}")
                
        except Exception as e:
            print(f"Failed to download {file_path}: {e}")
            
        # Rate limiting precaution
        time.sleep(0.1)

# Start processing from root
# The structure is a list of nodes at the root
for node in files_tree:
    process_node(node)

print("Restoration complete.")
