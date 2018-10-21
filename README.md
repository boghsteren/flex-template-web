# Goodwings Experiences Web App
This is a the web app for the Goodwings Experiences marketplace.

It is based on the Sharetribe Flex template app for web and all the standard documentation is below. 

There are lots of cosmetic changes and copy changes throughout, but the key functional differences from the standard template app are:

- This app uses a custom, unit-based transaction process (setup by Sharetribe). 
- It separates users into two groups, buyers and providers by storing and reading publicData for the user.
- The options to create and manage listings are removed for buyers and the option to book listings is removed for providers.
- There are two separate sign up pages for the two types of users, both hidden in non-friendly URLs to protect the market place from unwanted sign ups.
- The create listings page collects a good deal of additional information stored in publicData, including group sizes, free text availability, contact information and other things 
- Listings can be setup with a variety of different models (flat price per hour, seating price per hour, flat price per day, seating price per day) which are all converted to units client side before being submitted to the API, with the component parts and the booking scheme stored in publicData for the transaction.
- The booking breakdown takes the component parts and booking scheme into account and reconverts the units back to the relevant metrics.
- There are three facets available to filter by (group size, social development goal and experience type), which have been implemented in the template and indexed by Sharetribe

The customisation was done by jakob@simply-digital.dk.

# Sharetribe Flex Template for Web

[![CircleCI](https://circleci.com/gh/sharetribe/flex-template-web.svg?style=svg&circle-token=198451e83e5cecb0d662949260dbc3273ac44a67)](https://circleci.com/gh/sharetribe/flex-template-web)

This is a template web application for a Sharetribe Flex marketplace ready to be extended and
customized. It is based on an application bootstrapped with
[create-react-app](https://github.com/facebookincubator/create-react-app) with some additions,
namely server side rendering and a custom CSS setup.

## Quick start

If you just want to get the app running quickly to test it out, first install
[Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/), and follow along:

```sh
git clone git@github.com:sharetribe/flex-template-web.git      # clone this repository
cd flex-template-web/                                          # change to the cloned directory
cp .env-template .env                                          # copy the env template file to add your local config
emacs .env                                                     # in your favorite editor, add the mandatory env vars to the config
yarn install                                                   # install dependencies
yarn run dev                                                   # start the dev server, this will open a browser in localhost:3000
```

See the [Environment configuration variables](docs/env.md) documentation for more information of the
required configuration variables.

**Note:** If you want to build your own Flex marketplace on top of the template, you should fork the
repository instead of cloning it. See the [Customization guide](./docs/customization-guide.md).

## Getting started with your own customization

If you want to build your own Flex marketplace by customizing the template application, see the
[Customization guide](docs/customization-guide.md) documentation.

## Documentation

Full documentation can be found in the [docs directory](docs/).

## License

This project is licensed under the terms of the Apache-2.0 license.

See [LICENSE](LICENSE)
