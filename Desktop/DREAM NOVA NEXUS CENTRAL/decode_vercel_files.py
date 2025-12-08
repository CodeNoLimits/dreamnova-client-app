import json
import base64
import os

files = [
    'src/app/Canvas.tsx',
    'src/app/globals.css',
    'postcss.config.mjs',
    'package.json'
]

for file_path in files:
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r') as f:
                content = f.read()
                # Check if it looks like the JSON response
                if content.startswith('{"data":'):
                    data = json.loads(content)
                    decoded = base64.b64decode(data['data']).decode('utf-8')
                    
                    # Write back
                    with open(file_path, 'w') as out:
                        out.write(decoded)
                    print(f"Decoded {file_path}")
                else:
                    print(f"Skipping {file_path} (not JSON wrapper)")
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
