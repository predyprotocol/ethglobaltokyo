import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export class GQLClient {
  client: ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      uri: "https://api.thegraph.com/subgraphs/name/predy-dev/predy-v320-arbitrum",
      cache: new InMemoryCache(),
    });
  }

  async query(query: string) {
    return await this.client.query({
      query: gql`
        ${query}
      `,
    });
  }

  async vaultEntities() { 
    return await this.query(vaultEntities)
  }
}

const vaultEntities = `
query vaultEntities {
        vaultEntities(
          first: 1000
          where: { isMainVault: false, isClosed: false }
          orderBy: margin
          orderDirection: desc
        ) {
          id
          contractAddress
          vaultId
          owner
          margin
          isMainVault
          isClosed
          openPositions {
            id
            tradeAmount
            sqrtTradeAmount
            entryValue
            sqrtEntryValue
            sqrtRebalanceEntryValueStable
            sqrtRebalanceEntryValueUnderlying
            feeAmount
            perpUpdatedAt
            squartUpdatedAt
          }
          history {
            id
            action
            product
            size
            entryValue
            payoff
          }
        }
      }
    `
