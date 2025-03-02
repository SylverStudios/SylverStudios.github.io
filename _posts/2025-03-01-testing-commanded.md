---
layout: post
title:  "Elixir Testing Guide: Commanded and Event Sourcing"
date:   2025-03-02 10:39:11 -0500
categories: blog
tags: [elixir, phoenix, event-sourcing, commanded, testing]
author: Aaron
author_twitter: shamshirz
image: /assets/commanded-logo.png
---
Wrapping my head around testing Event Sourced systems [![commanded logo]({{ "/assets/commanded-logo.png" | relative_url }}){:class="excerpt-image" style="border-radius: 8px; width: 80px; height: auto;"}](https://github.com/commanded/commanded) {%- if page.tags -%}{% for tag in page.tags %}<a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">#{{ tag }}</a> {% endfor %}{%- endif -%}
<!-- Ends the excerpt text, it includes the image -->


This post is self documentation as I work through my thoughts on testing an Event Sourced System using `commanded`. Transitioning from a history of traditional CRUD to Event Sourcing is wild and involves a big change in thinking…_I think_.

## Testing
Why do I need this? Because I started writing tests like normal, only to start seeing tons of connection and PID related errors. After much discovery and the  [Elixir Slack #commanded](https://elixir-lang.slack.com/archives/CCAB0AYTU) channel's input, I've started to grok it. I kind of like how structured it is 🙊

General Config
```elixir
# config/text.exs
# Sandbox Repo
config :app_name, AppName.Repo,
  pool: Ecto.Adapters.SQL.Sandbox,
  …

# In memory Event Store
config :app_name, AppName.EventStore,
  serializer: Commanded.Serialization.JsonSerializer,
  adapter: Commanded.EventStore.Adapters.InMemory

# Oban in manual mode - jobs only execute with direct invocation
# I've really liked the `Oban.Testing.with_testing_mode(:inline, fn -> … end)` for individual tests
config :app_name, Oban, testing: :manual
```

### Pure Unit Tests - Aggregates & Business Logic
```elixir
use ExUnit.Case, async: true
```
These are all pure functions and should encompass commands, events, and aggregates. Construct commands, construct state, execute the command, assert on the result.

* No Side Effects
* Do Not Assert on the State of the Aggregate
  * Only input and output, leave the aggregate state opaque
* This should encompass as much business logic as possible
* Functional Phoenix Components could fit here too

### Unit Tests - EventHandlers
```elixir
use AppName.DataCase, async: true
```
These are functions with side effects, in Phoenix DDD we would call these context functions. We are testing 1 function that usually performs a DB operation, not the flow of data through the system. 

#### Essential Business Element
Test independent parts of the system that have side effects. Test `Oban.Testing.perform_job/2`, but not how it links to parts of the system. Test `EventHandler`s, often it's `Event` in, assert `:ok`, and `assert_enqueued/1`. We often have a handler setup that only queues the Oban Job for durable execution. This keeps things very isolated at the cost of an additional step in the flow.

#### Essential Technical Element
These tests can take advantage of `Ecto.Adapters.SQL.Sandbox` because each test can checkout a single connection pool to the DB for that process alone. You can test the internal functions of a Genserver, but testing from an external caller that is going to spin up a new process is asking for trouble. The result is lots of Ownership errors, or PIDs already being shut down before the call returns, making tests very noisey.

* Single Process Side Effects (DB)
  * [Oban](https://github.com/oban-bg/oban) Job performs
  * [Oban](https://github.com/oban-bg/oban) Job Enqueued
  * Handler responds to the correct events
  * Projectors getting called directly
  * API calls to 3rd parties
* Test Contexts Independently
* This can even include controller functions and Phoenix Liveviews as long as it doesn't include Command Dispatch

### Integration Tests - Command Dispatch
```elixir
use AppName.ConnCase

# conn_case.ex
  …
  setup tags do
    reset_commanded(tags)
    Cove.DataCase.setup_sandbox(tags)
    {:ok, conn: Phoenix.ConnTest.build_conn()}
  end

  # Drops active events and handlers and restarts the app - and in memory event store
  def reset_commanded(tags) do
    if not tags[:async] do
      {:ok, _} = Application.ensure_all_started(:app_name)
      on_exit(fn -> Application.stop(:app_name) end)
    end
  end
```
Because Event Sourcing with `commanded` is an eventually consistent and multi-process affair, we quickly jump to any other type of test being a full, synchronous integration test. These tests require shared DB access because event handlers need to be able to run in the same DB transaction (eg. Reading data that was written by a separate process). Additionally, these require your `commanded` app to be running and at the end of the test we need to shut it down or else suffer noisy error logs as handlers are still running after the test process has exited. Read: These tests are significantly slower. For that reason, we should use these for strictly testing the connections between our processes.

* Mutli-process, soup-to-nuts, integration testing
* LiveView UI -> Command Dispatch -> Projection Update -> LiveView Update
* Ideal Test
  * LiveView Page, `render_click` on a submit button
  * Await a pubsub message from the projection
  * Assert the view changed