import os
from pathlib import Path
from decouple import config

# BASE_DIR = Path(__file__).resolve().parent.parent.parent
BASE_DIR = Path(__file__).resolve().parent.parent

print("✅ BASE_DIR resolves to:", str(BASE_DIR))

STATIC_URL = '/assets/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend/dist/assets')]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_BASE_DIR = Path(__file__).resolve().parent

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(MEDIA_BASE_DIR, 'media')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'frontend/dist')],  
        'APP_DIRS': True,  
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',  
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

INSTALLED_APPS = [
    'corsheaders', 
    'django.contrib.admin',
    'django.contrib.auth',              
    'django.contrib.contenttypes',     
    'django.contrib.sessions',         
    'django.contrib.messages',        
    'django.contrib.staticfiles',      
    'project',
    'api',
    'rest_framework'                
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  
        # 'NAME': BASE_DIR.parent / 'spotify.sqlite',    
        'NAME': BASE_DIR / 'spotify_filtered.sqlite',        
    }
}


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'error.log'),
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'ERROR',
            'propagate': True,
        },
        'project': {  
            'handlers': ['console', 'file'],
            'level': 'ERROR',
            'propagate': False,
        },
    },
}


SESSION_ENGINE = "django.contrib.sessions.backends.db"  
SESSION_COOKIE_NAME = "sessionid"
SESSION_COOKIE_AGE = 1209600 
SESSION_EXPIRE_AT_BROWSER_CLOSE = False
SESSION_SAVE_EVERY_REQUEST = True


STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEBUG = True

CORS_ALLOW_ALL_ORIGINS = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']  

ROOT_URLCONF = 'project.urls'  

SECRET_KEY = config("SECRET_KEY")