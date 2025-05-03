---
categories: Docker
---

When you use Docker's new BuildKit build engine either by

    DOCKER_BUILDKIT=1 docker build ...

or in most recent Docker v19 using the new `buildx` command

    docker buildx build ...

then you won't see any output from your `RUN` steps. For example the following Dockerfile

    FROM alpine

    RUN echo Hello

then you won't see a 'Hello' in the output (produced with docker version 18.09.7):

    $ 
    $ DOCKER_BUILDKIT=1 docker build . --no-cache
    [+] Building 0.7s (6/6) FINISHED                                                
     => [internal] load build definition from Dockerfile                       0.0s
     => => transferring dockerfile: 37B                                        0.0s
     => [internal] load .dockerignore                                          0.0s
     => => transferring context: 2B                                            0.0s
     => [internal] load metadata for docker.io/library/alpine:latest           0.0s
     => CACHED [1/2] FROM docker.io/library/alpine                             0.0s
     => [2/2] RUN echo Hello                                                   0.6s
     => exporting to image                                                     0.0s
     => => exporting layers                                                    0.0s
     => => writing image sha256:ee9833c6e7bfa7e64fa74b1aa5da5a1818dc881929651  0.0s
    $

So while it tells about the `RUN` step, it doesn't give you the output.

Now with BuildKit comes a new option for `docker build` named `--progress` that let's you switch 
between three output modes:

- auto (default)
- plain
- tty

Interestingly there are [sources](https://github.com/moby/buildkit/issues/824)
that say 'tty' is supposed to be the legacy output. But
at least for me it does give no different output then 'auto'. I guess because 'auto'
selects 'tty' and 'tty' is what it is...

So this leave 'plain' which produced a very interesting block output, which actually
lists the `RUN` command result:

    $ DOCKER_BUILDKIT=1 docker build --progress=plain .
    [...]
    
    #5 [2/2] RUN echo Hello
    #5       digest: sha256:a3caaceea4f05ba90a9dea76e435897fe6454097eb90233e58530b6e1e7f7a53
    #5         name: "[2/2] RUN echo Hello"
    #5      started: 2020-03-13 18:52:22.20543247 +0000 UTC
    #5 0.496 Hello
    #5    completed: 2020-03-13 18:52:22.750641665 +0000 UTC
    #5     duration: 545.209195ms
    
    [...]
    
One can argue about usability of this, still this is the way to go to get 
command output when using BuildKit.
