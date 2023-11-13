---
title: Call for testing `{{ env.SNAP_NAME }}`
labels: testing
---

A new version ({{ env.version }}) of `{{ env.SNAP_NAME }}` was just pushed to the `{{ env.CHANNEL }}` channel [in the snap store](https://snapcraft.io/{{ env.SNAP_NAME }}). The following revisions are available.

| CPU architecture | Revision                 |
|------------------|--------------------------|
| amd64            | {{ env.revision_amd64 }} |
| arm64            | {{ env.revision_arm64 }} |

## How to test it

1. Stop the application if it was already running
1. Upgrade to this version by running

   ```shell
   snap refresh {{ env.SNAP_NAME }} --{{ env.CHANNEL }}
   ```

1. Start the app and test it out.
1. Finally, add a comment below explaining whether this app is working, and **include the output of the following command**.

   ```shell
   snap version; lscpu | grep Architecture; snap info {{ env.SNAP_NAME }} | grep installed
   ```

## How to release it

Maintainers can promote this to stable by commenting `/promote <rev>[,<rev>] stable [done]`.

> For example
>
> * To promote a single revision, run `/promote 34 stable`
> * To promote multiple revisions, run `/promote 34,35 stable`
> * To promote a revision and close the issue, run `/promote 34,35 stable done`
