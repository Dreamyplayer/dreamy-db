---
description: 'A Powerful database for storing, accessing, and managing multiple databases.'
---

# Introduction

* Promise Based API
* Object-oriented
* Persistent storage
* Configurable
* Performant



* [**Adapters**](https://github.com/Dreamyplayer/dreamy-db#usage): By default, data is cached in memory. Optionally, install and utilize a "storage adapter".
* [**Namespaces**](https://github.com/Dreamyplayer/dreamy-db#namespaces): Namespaces isolate elements within the database to enable useful functionalities.
* [**Custom Serializers**](https://github.com/Dreamyplayer/dreamy-db#custom-serializers): Utilizes its own data serialization methods to ensure consistency across various storage backends.
* [**Third-Party Adapters**](https://github.com/Dreamyplayer/dreamy-db#third-party-adapters): You can optionally utilize third-party storage adapters or build your own.
* [**Embeddable**](https://github.com/Dreamyplayer/dreamy-db#embeddable): Designed to be easily embeddable inside modules.
* **Data Types**: Handles all the JSON types including [`Buffer`](https://nodejs.org/api/buffer.html).
* **Error Handling**: Connection errors are transmitted through, from the adapter to the main instance; consequently, connection errors do not exit or kill the process.

![Welcome to Dreamy Database &#x1F389;](.gitbook/assets/undraw_welcome_cats_thqn-3-.svg)

