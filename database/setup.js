import * as dotenv from 'dotenv'
import { MeiliSearch } from 'meilisearch'
import { watchTasks } from './utils.js'
import data from './data.json' assert { type: 'json' }

// Load environment
dotenv.config()

const credentials = {
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_ADMIN_API_KEY
}

const INDEX_NAME = 'landmarks'

/* eslint-disable no-console */

const setup = async () => {
  console.log('🚀 Seeding your Meilisearch instance')

  if (!credentials.host) {
    console.error('Missing `MEILISEARCH_HOST` environment variable')
    process.exit(1)
  }
  if (!credentials.apiKey) {
    console.error('Missing `MEILISEARCH_ADMIN_API_KEY` environment variable')
    process.exit(1)
  }

  const client = new MeiliSearch(credentials)
  console.log(`Using Meilisearch host: ${credentials.host}\nSearch API key: ${credentials.apiKey}`)

  console.log(`Adding filterable attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateFilterableAttributes([
    "boolean_custom_field",
    "float_custom_field",
    "integer_custom_field",
    "selection_multi_custom_field",
    "selection_single_custom_field",
    "string_custom_field"
  ])

  // console.log(`Adding ranking rules to \`${INDEX_NAME}\``)
  // await client.index(INDEX_NAME).updateRankingRules([
  //   'sort',
  //   'words',
  //   'typo',
  //   'proximity',
  //   'attribute',
  //   'exactness'
  // ])

  console.log(`Adding sortable attributes to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).updateSortableAttributes([
    'integer_custom_field',
  ])

  console.log(`Adding documents to \`${INDEX_NAME}\``)
  await client.index(INDEX_NAME).addDocuments(data)

  await watchTasks(client, INDEX_NAME)
}

setup()
