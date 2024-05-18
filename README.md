# NOC (Network Operation Center)


<p >
   NOC is a scalable solution designed to monitor the status of servers in real-time. 
   This system helps administrators receive alerts for any issues via email, 
   and visualize data to ensure the smooth operation of IT infrastructure.
   It is built using TypeScript and Clean Architecture
</p>

## Tech Stack
<div align="start">
  <img align="center" alt="Node" height="70" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" />
  <img align="center" alt="typescript" height="90" width="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
  <img align="center" alt="jest" height="90" width="70"  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" />
  <img align="center" alt="mongodb" height="90" width="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg" />
  <img align="center" alt="mongoose" height="90" width="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg">
  <img align="center" alt="postgres" height="90" width="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
  <img align="center" alt="prisma" height="90" width="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" />
</div>

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)

## Requirements

Make sure you have the following programs installed before you begin:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (Node.js package manager)

## Installation

1. Clone this repository to your local machine using `git`:

    ```bash
    git clone https://github.com/seba-pitra/noc.git
    ```

2. Install the project dependencies:

    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root of the project using the environment variables found at `.env.template`.
Make sure to replace the example values with your actual configuration.

## Usage

To start the server, run the following command:

```bash
npm run dev
```

## Contributing
Solo puedes colaborar con invitacion del administrador del repositorio. Si eres parte del equipo de desarrollo, hay pasos que debes seguir para 
un manejo correcto de Gitflow:
1. Fork the project.
2. Create a new branch `git checkout -b feature/new-feature`.
3. Make your changes and commit them `git commit -m 'feat: your commit description'`
4. Push to the branch  `git push origin feature/new-feature`
5. Create a new Pull Request.

>[!CAUTION]
> Your pull request WILL NOT BE ACCEPTED if you do not follow the branch and commit conventions established in this gist: https://gist.github.com/ivandevp/41bfb0c77b38d042456dc8fbb4aba885


