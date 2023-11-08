---
title: Call for testing `{{ env.SNAP_NAME }}`
labels: testing
---

A new version of `{{ env.SNAP_NAME }}` was just pushed to the `{{ env.CHANNEL }}` channel [in the
snap store](https://snapcraft.io/{{ env.SNAP_NAME }}). Please test it and add a comment to state
whether everything works or not.

You can upgrade to this version by running

```shell
snap refresh {{ env.SNAP_NAME }} --{{ env.CHANNEL }}
```

Maintainers can promote this to stable by commenting `/promote <rev>[,<rev>] stable`.

The `/promote` command must be issued with at least one revision and a channel, for example
`/promote 34 stable`. Multiple revisions can also be promoted at once where required (this is
useful where there are new arm64 and amd64 revisions at the same time), for example `/promote 34,35
stable`.
