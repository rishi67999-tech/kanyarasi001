import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function apiDevServerPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/generate-lesson') && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const parsedBody = body ? JSON.parse(body) : {}
              const apiReq = { method: req.method, body: parsedBody }
              const apiRes = {
                status: (code: number) => ({
                  json: (payload: unknown) => {
                    res.statusCode = code
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(payload))
                  },
                }),
              }
              const handlerModule = await server.ssrLoadModule('./api/generate-lesson.ts')
              await handlerModule.default(apiReq, apiRes)
            } catch (err: any) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message || 'API Server Error' }))
            }
          })
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Securely load environment variables from .env and .env.local into server process.env
  const env = loadEnv(mode, process.cwd(), '')
  for (const [key, val] of Object.entries(env)) {
    if (!process.env[key]) {
      process.env[key] = val
    }
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      apiDevServerPlugin(),
    ],
    server: {
      port: 5173,
      host: true,
    },
  }
})
