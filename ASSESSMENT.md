# API Engineering Test

So you want to join the engineering team at Delta? That's awesome!

We have created a small exercise in order to gain some insights into your development skills.

## Assignment

Users of our app can perform searches for all kinds of assets (crypto coins, stocks, funds, indices, ...). We would like to show the most trending assets based on these searches.

You are responsible for creating a microservice that keeps track of all asset searches performed by clients (you don't need to perform the actual search, that's handled by a different service) and which can return a real-time sorted list of the top most popular coins in the last 24 hours. This service should be accessible over HTTP.

A single user doing multiple searches for the same asset should **not** result in that asset being scored higher.

Next to that, we would also like to keep track of the last 100 assets searched by an user, in a FIFO manner. This is on an per-user basis.

We expect you to take into account that the amount of users and available assets to search are non-trivial and that we want the service to be fast, accurate and scalable.

### Example interface

To illustrate the requirements, below you can find a TypeScript interface of a minimal example:

```typescript
interface TrendingSearchesResponse {
  assetId: number[];
}

interface RecentSearchesResponse {
  assetIds: number[];
}

class Search {
  logSearch(userId: number, assetId: number): Promise<void>;
  getTrendingSearches(): Promise<RecentSearchesResponse>;
  getRecentSearches(userId: number): Promise<RecentSearchesResponse>;
}
```

### Technologies & tools

You are free to use all the libraries and tools that you want or feel you need to!

However, your application code should be written in JavaScript (TypeScript is preferred) and runnable on Node.JS (latest LTS).

For storage purposes, you can use MySQL and/or Redis (however you are not limited to just these, provided you can justify why you chose something else).

### Tips

- Think about your architecture upfront. Make a plan and document how you will be tackling the issue. If possible, provide multiple alternatives
  and explain why the one is preferred over the other.
- Start small and build up gradually. Try to document all your trains of thought, even if they seem insignificant or stupid.
- KISS, when possible. Simplicity trumps complexity.
- Be prepared to get questions later about the choices you've made.

## Timeframe

Spend as much time on this as you want, but don't go overboard. We believe this task should be done in less than 4h. Again, keep it as simple as possible while still fulfilling the requirements.

## Delivery

Send us a link to an accessible git repository so we can review your planning document, checkout your code, compile and test the project.

Please make sure your service runs in Docker containers and add a `docker-compose.yml` that we'll use to test your service.

Also provide example HTTP requests for logging a search, obtaining the list of the top 100 trending coins in the last 24h and obtaining the last 100 searched coins of an user.

## Questions?

Please contact us if something is not clear.