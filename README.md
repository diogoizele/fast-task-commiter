# Fast Task Commiter

## Overview

This is a simple tool to commit your task to a git repository.

The fast task commiter is a script made in nodejs to automate and facilitate the commit process in a project organized with task branches. For example, if you are working in a project with a task branch called `feature/1234` and you want to commit your changes, you can use the fast task commiter to commit your changes with the following command:

```bash
$ <your-alias> feat: new content to my project
```

And the fast task commiter will commit your changes with the following message:

```bash
feat(#1234): new content to my project
```

## Installation

Add the following line to your `.bashrc` or `.zshrc` file:

```bash
alias <your-alias>="node <path-to-fast-task-commiter>/index.js"
```

## Usage

```bash
$ <your-alias> <type>: <message>
```

### Types

The types are the same as the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Message

The message is the commit message.

## License

MIT
