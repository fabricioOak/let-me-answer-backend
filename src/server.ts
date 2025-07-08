import { fastify } from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { fastifyHelmet } from '@fastify/helmet'
import { env } from "./env.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*', //? Update later based on environment
})

app.register(fastifyHelmet, {
  global: true,
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return { ok: true }
})

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running on port', env.PORT)
})
