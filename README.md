# GAS money maneger

IT's an application for managing couples' money on LINE.

## Usage

Clone from Github.

```zsh
git clone https://github.com/genki-sano/gas-money-maneger <your-project-name>
cd <your-project-name>
yarn install
```

login with Google.

```zsh
yarn run clasp login
```

Create new GoogleAppsScript project. (Check [the referrence](https://github.com/google/clasp#create).)

```zsh
yarn run clasp create --type standalone --title "Your GAS Project Name" --rootDir ./dist
```

Once your development is done, push your codes to GAS project.

```zsh
yarn run deploy
```

Visit https://script.google.com/d/{your-script-id}/edit, and try to run your code.

Have a nice hack !

## License

This software is released under the MIT License, see [LICENSE](LICENSE)
