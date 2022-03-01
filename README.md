# Json server for [corsiuniversitari.info](https://www.corsiuniversitari.info/) 
## Why did I publish this server on GitHub?
Because the data in db.json aren't an industrial secret are all public data from the Italian government  while my project has a particular implementation of cache and compression algorithm that I want to share.
## Why I didn't use the [json server](https://github.com/typicode/json-server)?
Because the JSON server is based on express and is more difficult to manage than creating an ad hoc solution, with Fastify I can have twice the speed of express.js and I'm able to implement my idea.
## How I had improved by 70 times the performance of my server?
First of all, I want to remark that I'm referring to the Fastify solution when I speak about the performance, also I would remember that the Fastify server is out of the box twice as fast compared to the express solution.
### Caching the compressed response
The first and more important change I have made from the out-of-the-box solution is to cache the compressed response, the problem with compressing data every time is that is the more computationally intense task of this server.
#### A few compatibility problems
The issue with compressing pre-built responses is that not all browsers are compatible with compressed responses, but as you can see [here](https://caniuse.com/?search=gzip) the issue concern only the 5% of the clients. Not only, but these clients are also the same clients that don't support Vite, Vue.js 3 etc. which are used in the front-end.
### Saving the cached data in the heap
I have tried two different solutions for caching data, caching directly in the heap that is usually done in low-level languages or using popular solutions like Redis. I have excluded external solutions like varnish because of the production server implementation that I have realized and because at this point isn't necessary.

I choose the heap because is faster than Redis due to the bottleneck given from the passing of data between Javascript virtual machine and Redis. In my case is the best solution due to the small amount of data that I store in the heap, but in case is possible to implement a solution like that one used in the cpu process scheduler.
## Final thoughts
In my case this is the best solution I can provide is simple and it works very well, just to do a comparison I had tested a rust back-end server and it provided 1 ms of latency on my computer this Node.js solution is able to provide 1,2 ms of latency.