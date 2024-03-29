import os
import json

def main():
    with open('/usr/share/nginx/html/AppConfig.json', 'w') as f:
        configData = {
            'url':os.getenv('ALKUIP_URL','https://localhost'),
            'api':os.getenv('ALKUIP_API','https://localhost'),
            'dataStore':os.getenv('ALKUIP_DATASTORE','localhost'),
            'standalone':os.getenv('ALKUIP_STANDALONE',True),
            'defaultPage':os.getenv('ALKUIP_DEFAULT_PAGE','dashboard'),
            'loginFooter':os.getenv('ALKUIP_LOGIN_FOOTER',''),
            'loginTitle':os.getenv('ALKUIP_LOGIN_TITLE','Login to ALKIP Platform'),
            'bannerImage':os.getenv('ALKUIP_BANNER_IMAGE',''),
            'logo':os.getenv('ALKUIP_LOGO',''),
            'landingPage':os.getenv('ALKUIP_LANDING_PAGE','THREE_COLUMNS'),
            'strategy': os.getenv('ALKUIP_STRATEGY','dhis2'),
            'usernameField':os.getenv('ALKUIP_USERNAME_FIELD','username'),
            'usernameFieldLabel':os.getenv('ALKUIP_USERNAME_FIELD','email address'),
            'credit': os.getenv('ALKUIP_CREDIT',True),
            'footer': os.getenv('ALKUIP_FOOTER',True),
            'signup': os.getenv('ALKUIP_SIGNUP',True),
            'signout': os.getenv('ALKUIP_SIGNOUT',True),
            'notifications': os.getenv('ALKUIP_NOTIFICATIONS',True),
            'creditName':os.getenv('ALKUIP_CREDIT_NAME','Nataaha Hotels'),
            'creditUrl':os.getenv('ALKUIP_CREDIT_URL',''),
            'apps':json.loads(os.getenv('ALKUIP_APPS','[]')),
            'feedback':json.loads(os.getenv('ALKUIP_FEEDBACK','{}')),
            'auth':json.loads(os.getenv('ALKUIP_AUTH','{}')),
        }
        json.dump(configData, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    main()
