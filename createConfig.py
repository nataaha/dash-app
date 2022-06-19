import os
import json

def main():
    with open('/usr/share/nginx/html/AppConfig.json', 'w') as f:
        configData = {
            'url':os.getenv('ALKUIP_URL','../../../'),
            'api':os.getenv('ALKUIP_API','localhost'),
            'dataStore':os.getenv('ALKUIP_DATASTORE','localhost'),
            'standalone':os.getenv('ALKUIP_STANDALONE',true),
            'defaultPage':os.getenv('ALKUIP_DATASTORE','dashboard'),
            'loginFooter':os.getenv('ALKUIP_LOGIN_FOOTER',''),
            'loginTitle':os.getenv('ALKUIP_LOGIN_TITLE','Login to ALKIP Platform'),
            'bannerImage':os.getenv('ALKUIP_BANNER_IMAGE',''),
            'logo':os.getenv('ALKUIP_LOGO','')
        }
        json.dump(configData, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
