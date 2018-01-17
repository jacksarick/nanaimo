# Nanaimo

[Play now!](https://jacksarick.github.io/nanaimo/)

Because it's [nim](https://en.wikipedia.org/wiki/Nim) + [omino](https://en.wikipedia.org/wiki/Polyomino) = nimomino, which is utterly unpronounceable but sounds kinda like [Nanaimo](https://en.wikipedia.org/wiki/Nanaimo).

As the game is based off nim, I beleive it inherits some of the same properties. For example, I think that as long as the board-size is multiple of the maximum move + 1 (e.g. a tetromino on a 5x5 grid, used in the demo) then the first player always wins. This is simply a back-of-the-napkin hypothesis and I would love for someone to prove me wrong.

This was written in one night, fueled by pure insanity. Everything about it works, and nothing more than that.

##Use
To simply run it on a local machine, run `npm start` to spin up a dev server.
To publish to github pages, run `npm run deploy` and hope it works.