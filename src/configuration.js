export default {
  queryBody: `{
    program(nid:"kommissarien-och-havet") {
      name
      image
      episodePanels {
        name
        videoList {
          videoAssets {
            id
            episode
            description
            duration
            daysLeftInService
            expire_date_time
            expireDateTime
            image
            program {
              name
            }
            season
            title
          }
        }
      }
    }
  }`,
  graphQlUrl: 'https://tv4-graphql-prod.herokuapp.com/graphql',
  assetApiUrl:
    'https://prima.tv4play.se/api/web/asset/${assetId}/play.json?protocol=hls3',
};
