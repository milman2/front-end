# .env

## React
REACT_APP_
- .env
- .env.local
- .env.development
- .env.development.local
- .env.test
- .env.test.local
- .env.production
- .env.production.local

* .env.{environment}.local > .env.{environment} > .env.local > .env

## Next.js
NEXT_PUBLIC_
- .env
- .env.local
- .env.development
- .env.production
- .env.test
* .env.{environment}.local > .env.local > .env.{environment} > .env

## python-dotenv
* .env.local -> .env.development -> .env
```py
from dotenv import load_dotenv
import os

load_dotenv()
load_dotenv(".env.productoin", override=True)
load_dotenv(".env.local", override=True)
database_url = os.getenv("DATABASE_URL")
```