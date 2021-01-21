This is a thesis about V-stay project.

## Getting Started

# Requirements

Make sure following command available on your system:

+ docker
+ docker-compose
+ node
+ npm
+ git

```bash
cp src/app.config.prod.js src/app.config.js
npm install
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
