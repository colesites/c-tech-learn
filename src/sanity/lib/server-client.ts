import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// This client has write access and should only be used on the server
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Must be false for write operations
  token: process.env.SANITY_API_TOKEN,
})
