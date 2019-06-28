# eternal-api v1

Eternal Jewelry Store API

# Debugging

# VS Code

For debugging, add the below configuration to launch.json:

```json
{
	"type": "node",
	"request": "launch",
	"name": "Launch API",
	"program": "${workspaceFolder}/src/index.js",
	"cwd": "${workspaceFolder}",
	"runtimeExecutable": "node",
	"runtimeArgs": ["-r", "esm"],
	"env": {
		"PORT": "3001",
		"DB_HOST": "127.0.0.1",
		"DB_PORT": "27017",
		"DB_NAME": "eternalDb",
		"NODE_ENV": "development"
	},
	"sourceMaps": true
}
```
