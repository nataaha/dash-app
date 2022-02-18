import os
import json

def main():
    with open('/usr/share/nginx/html/AppConfig.json', 'w') as f:
        configData = {
            'url':os.getenv('ALKUIP_URL','..'),
            'api':os.getenv('ALKUIP_API','localhost'),
            'dataStore':os.getenv('ALKUIP_DATASTORE','localhost')
        }
        json.dump(configData, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
