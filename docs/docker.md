# Docker

Run Docker commands from the project root. Docker builds the app with Node.js, then serves the generated static files with Nginx.

## What the Dockerfile does

- The `build` stage installs dependencies and runs `npm run build`.
- The final Nginx stage copies in `dist/` and serves it on container port `80`.
- `.dockerignore` keeps local dependencies, build output, and development files out of the build context.

## Build the image

Use the short Git commit hash as the image tag. In Bash or Git Bash:

```sh
docker build --no-cache -t sotechho/tictactoe:$(git rev-parse --short HEAD) .
```

`--no-cache` rebuilds every layer. For a faster build that reuses cached layers, omit it:

```sh
docker build -t sotechho/tictactoe:$(git rev-parse --short HEAD) .
```

In PowerShell, first save the commit hash:

```powershell
$tag = (git rev-parse --short HEAD).Trim()
docker build -t "sotechho/tictactoe:$tag" .
docker run --name tictactoe -p 9099:80 -d "sotechho/tictactoe:$tag"
```

## Run the container

Use the same tag that you used when building. This runs the container in the background and maps host port `9099` to Nginx's port `80`. Bash or Git Bash:

```sh
docker run --name tictactoe -p 9099:80 -d sotechho/tictactoe:$(git rev-parse --short HEAD)
```

Then open [http://localhost:9099](http://localhost:9099).

The fixed-tag example below:

```sh
docker run --name tictactoe -p 9099:80 -d sotechho/tictactoe:659ab80
```

To stop the container:

```sh
docker stop tictactoe
```
