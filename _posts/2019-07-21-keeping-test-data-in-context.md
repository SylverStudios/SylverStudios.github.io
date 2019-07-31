---
layout: post
title: "Keeping Test Data in Context"
date: 2019-07-21 21:02:00 -0500
category: blog
author: RJ
author_twitter: SylverStudios
---

The problem with `ex_machina` and similar test data creation patterns, and why you should only ever manipulate data (whether in test or production) via contexts.

<!--more-->

## Background on contexts

Phoenix 1.3 introduced "contexts", which its docs describe as "dedicated modules that expose and group related functionality."[^1] They are usually used to define a formal interface for the data layer of an Elixir application, and for grouping different data models, which are usually Ecto schemas, by business domain.

## Passing by coincidence

Most approaches to creating test data in Elixir use built-by-hand changesets that are inserted directly into the database with functions like `Repo.insert!`. The most popular test data creation library in Elixir, `ex_machina`,[^2] employs this approach, as do many lighter-weight fixtures patterns.[^3]

The issue with this approach is that it often leads to your code being tested against data that doesn't necessarily look like the data it will be running against in any other environment. Because the means by which your test data is manipulated is different than the means by which your production data is manipulated, it is easy for the two to diverge, and you may have tests which are passing after a change to your contexts that would now always fail against production data.

## Keeping everything in context

The solution to this problem is to ensure that your test data is created and modified in the same way that production data in your application is. In applications that use contexts, this means that your test data should only be created and modified through those contexts' APIs. Remember,

> A test is a consumer of your API like any other code you write. One of the ideas behind TDD is that tests are code and no different from code.
>
> — [Mocks and explicit contracts](http://blog.plataformatec.com.br/2015/10/mocks-and-explicit-contracts/), José Valim

### But what about factories and fixtures?

You can still use factory or fixture patterns to create your test data. Just make sure that the only place in your code (including your test code—remember that tests are code and no different from code!) where you invoke `Repo` functions[^4] is in your contexts. So instead of writing a fixture that looks like this:

```elixir
def user_fixture() do
  %User{}
  |> User.changeset(%{email: "john.doe@email.com", name: "John Doe"})
  |> Repo.insert!
end
```

Write one that looks like this:

```elixir
def user_fixture() do
  %{email: "john.doe@email.com", name: "John Doe"}
  |> Accounts.create_user!()
end
```

However, many libraries (like `ex_machina`) may make it too hard to respect these context boundaries. In those cases, you're probably better off ditching them and going with a simpler solution, like the example above.

_Originally published [here](https://scripted.rjdellecese.com/2019/07/21/keeping-test-data-in-context)_

[^1]: [Phoenix documentation on contexts](https://hexdocs.pm/phoenix/contexts.html#thinking-about-design)
[^2]: [`ex_machina` on GitHub](https://github.com/thoughtbot/ex_machina)
[^3]: See, for example, DockYard's [`ecto_fixtures` library](https://github.com/DockYard/ecto_fixtures) and [this blog post, titled "Fixtures for Ecto"](https://blog.danielberkompas.com/2015/07/16/fixtures-for-ecto/)
[^4]: Anything in the [Ecto.Repo module](https://hexdocs.pm/ecto/3.1.7/Ecto.Repo.html)
