# Jason's Chat App

This is a Typescript [Create React App](https://github.com/facebook/create-react-app) using Firebase for the backend of which the first commit's code in this repo was created in about a day's time. It is deployed to Vercel [here](https://jasons-chat-app.vercel.app/login).

It is a multi-user text-based chat app. You can register an account and then select and chat with the other users who have registered. The app has public and private pages and you must be logged in to access the chat page.

The app was written using `eslint` standards, `prettier` for formatting the code, and conventional commits.

## Run the project locally

The project dependencies are managed by `yarn`.

1. Clone the project.
2. Install dependencies by simply running `yarn`.
3. Create a new Web Google Firebase project: [https://console.firebase.google.com/](https://console.firebase.google.com/).
4. Create and enable both the `Firestore Database` and `Realtime Database`.
5. Under the Firebase project's settings, and scroll down to find the `firebaseConfig` sample JS code with all the API key/config data. Looks like this:

```
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx",
  databaseURL: "xxx"
};
```

5. Create a `.env` environment variable file in the top level directory of the cloned project on your computer and copy/paste all the config data into it assigned to variables named as the following:

```
REACT_APP_FIREBASE_API_KEY=xxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxx
REACT_APP_FIREBASE_PROJECT_ID=xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxx
REACT_APP_FIREBASE_APP_ID=xxx
REACT_APP_FIREBASE_DATABASE_URL=xxx
```

Then `src/firebaseConfig.ts` should be able to read them when you run the project.

7. Run `yarn start` to launch the project locally in your web browser. If you get a Firebase error, check the `Rules` tab of both the `Firestore Database` and `Realtime Database` to make sure the project has the read/write permissions setup correctly.

## Contributing/setup for local development

1. Go through the steps above for running the project locally.
2. Enable `husky` pre-commit hooks: `npx husky install`

We use the pre-commit hooks to run `eslint` and require conventional commit formats. You can test that `husky` is working by trying to commit code using a message format unacceptable to conventional commits.

## Running the test cases

Run `yarn test` and then press `a` to run all test cases.
