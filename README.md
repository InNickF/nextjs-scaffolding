# NextJS Scaffolding

![Build status](https://img.shields.io/badge/build-passing-brightgreen)
![LICENSE](https://img.shields.io/badge/license-MIT-brightgreen) ![Platform](https://img.shields.io/badge/node--lts-%3E%3D%2016.13.2-brightgreen)

#### _**An approximation to write clean/declarative ReactJS code and NextJS applications.**_

This is a Next.js project bootstrapped with `yarn create next-app` and organized according to [Hexagonal Software Architecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>).

<details>
  <summary>Table of content</summary>

- [Getting Started](#getting-started)
- [Setup](#setup)
- [Tech](#tech)
- [Folder structuring and docs](#folder-structuring-and-docs)
- [Gitflow](#gitflow)
- [Continuous Integration](#continuous-integration)
- [Production build](#production-build)
- [Authors](#authors)

</details>

---

## Getting Started

You will be able to run this projects by two ways, is important to know Docker and Nodejs ecosystems (minimum Nodejs ecosystem), ReactJS/NextJS framework to build your front-end application and GIT for code versioning.

First step is clone this scaffolding and we give you two options to do this:

1. RECOMMENDED: Click on `Use this template` button in github and setup your new project using as base this scaffolding, or...

2. Run `git clone <REPOSITORY_URL> && cd <PROJECT_FOLDER>` and change git project origin to you new cloud repository to start developing.

Once you have the project ready to start the next step is setup it.

---

## Setup

We recommend docker setup to run the project, this approach has several advantage, first one is reduce error by dependencies or manually setting in every computer that this scaffolding will run and second one you will never be to worry about developer or production configuration.

Well, now you know this, let us to introduce you the requirements for this approach:

#### **Requirements**

- Docker
- Docker compose
- Git
- NodeJS >=16.13.2 (LTS)
- yarn (recommended) or npm.

To run this project you have to execute the follow command in your terminal:

```bash
docker-compose up

# If you need to rebuild the docker image and compose process add --build flag to this command.
```

And that's all, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

_NOTE: Hot reloading is included in this configuration._

### Manually Setup

As all NodeJS project you will able to run this project manually, first step is run `cd ./app` to be inside of the project folder then you can execute in your terminal:

```bash
yarn install
# and
yarn dev
```

#### **Requirements**

- Git
- NodeJS >=16.13.2 (LTS)
- yarn (recommended) or npm.

---

## Tech

As we said, this scaffolding uses an Hexagonal Architecture and the follow tech list will sort by every architecture category:

### Presentation

- NextJS
- ReactJS
- Vanilla CSS
- Some UI library (Missing definition) [Missing installation and setup]
- Some UI animation library (Missing definition) [Missing installation and setup]

### Application

- ReactJS (Hooks)

### Domain

- Typescript (Recommended) or...
- Vanilla JavaScript

### Infrastructure

- Axios (Fetcher) [Missing installation and setup]
- React Query (Data fetched management) [Missing installation and setup]
- Context API (Recommended)
- Redux & Redux Thunk (Only if you need) [Missing installation and setup]

---

## Folder structuring and docs

It is important to know that each folder in this architecture has a clear objective but none is essential, you can delete or add by your necessities.

Here is the general folder information:

```
.
├── compose/: Docker compose files (Only develop environment).
|   └── nextjs/: Necessary docker files to run develop environment with docker-compose.
|       ├── env.example: Environment variables to run with docker compose.
│       ├── Dockerfile: Development app image.
|       └── entrypoint.sh: Bash commands to run before CMD command in Docker image.
|
|
├── app/: Folder with app's code.
│   ├── public/: Static files to be serve by web server.
│   ├── src/: Application source code.
|   |   ├── __tests__/: Jest global test folder.
|   |   ├── commons/: Common code that is reusable cross the entire app.
|   |   |   ├── assets/: Static files to be imported inside components.
|   |   |   ├── components/: Common and base components to reuse across entire app.
|   |   |   ├── domain/: business logic (Pure JavaScript/TypeScript)
|   |   |   ├── hooks/: reusable ReactJS Hooks.
|   |   |   ├── layouts/: Application UI layouts.
|   |   |   ├── styles/: CSS folder
|   |   |   ├── typing/: TypeScript interfaces and types.
|   |   |   └── utils/: Helpers or utilities.
|   |   |
|   |   |
|   |   ├── modules/: Contains isolated app modules.
|   |   ├── pages/: Nextjs file routing system
|   |   ├── services/: Global HTTP data fetching and management system.
|   |   └── store/: Global state management system (Redux).
|   |        └── modules/: Global app modules.
|   |
|   |
│   ├── .dockerignore:
│   ├── .eslintrc.json: ESlint configuration (Linter).
│   ├── .prettierignore: Excludes files to be formatted.
│   ├── Dockerfile: Production app image.
│   ├── next-env.d.ts: NextJs types.
│   ├── next.config.js: NextJS Configuration.
│   ├── package.json: Dependencies file.
│   └── tsconfig.json: Typescript configuration.
│
│
├── docker-compose.yaml: Docker compose file for run develop environment.
├── .dockerignore: This file allows to exclude files in Docker build time.
├── .gitignore: This file allows to exclude files for version management.
└── .github/: Github actions folder.

```

**NOTE: Each important folder has its own README file.**

---

## Gitflow

We recommend use [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) as versioning workflow, also we integrate commitizen to help you to create commits.

### Commitizen

Commitizen is a CLI tool designed for teams. Its main purpose is to define a standard way of committing rules and communicating it.

We already installed commitizen in this project, to create a commit follow the next commands:

```bash
cd ./app
# and run
yarn commit
```

_NOTE: If you don't have `yarn` you can use `npm run commit` instead, also don't forget add the edited files to your git staging with `git add` command._

---

## Continuous Integration

There are some libraries to help us to create CI pipelines.

- Jest: Testing library.
- ESlint: Code Linter.

And the more important step in our CI it's the build process, we use [github actions](https://docs.github.com/es/actions) to run this CI pipeline.

---

## Production build

There are two ways to create a production build for this app.

1. Docker image: There is a production docker image inside `./app` folder (`./app/Dockerfile`) to build it and run it with any container orchestration software (Like K8s) and our recommendation is create a CD pipelines to do this.

2. Go to `./app` folder and follow the official NextJS [deploy documentation](https://nextjs.org/docs/deployment) for manually deploy.

---

## Authors

- Nick Fuenmayor ([@NickFuenmayor\_](https://twitter.com/NickFuenmayor_)) – [Github](https://github.com/InNickF)
