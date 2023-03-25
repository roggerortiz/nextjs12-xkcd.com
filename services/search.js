import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('WJON584QC2', 'a93759fc33c00ae26afe75f81c350871');
const index = client.initIndex('prod_comics');

export const search = async ({ query }) => {
  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10
  })

  return { results: hits }
}
