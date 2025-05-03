---
layout: post
title:  "Redis list all keys"
categories: Redis
---
If checking a Redis database you can list all entries using

    KEYS <pattern>

where pattern is a Unix glob expression. Here are some examples

    KEYS myprefix*      # All keys starting with 'myprefix'
    KEYS *mysuffix      # All keys ending with 'mysuffix'
    KEYS [a-c]*         # Everything starting with a,b or c

Note: that using "KEYS" is not good when matching a large set of
keys as listing might take a lot of time.

### Listing all hash keys

For hashes you can list there keys using

    HKEYS myhash
