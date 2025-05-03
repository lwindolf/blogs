---
layout: default
title: Controlling Liferea via DBUS
parent: Liferea
permalink: /liferea/dbus.htm
grand_parent: Projects
---

# Controlling Liferea via DBUS

Liferea provides the following DBUS interfaces which you
can use to control the program from other program, scripts or
the command line:

## Pinging Liferea

- Service Name: org.gnome.rss.FeedReader
- Object Path: /org/gnome/rss/FeedReader
- Method: Ping()

Example command line call:

    dbus-send --session --dest=org.gnome.feed.Reader \
      --print-reply=literal --type=method_call \
      /org/gnome/feed/Reader \
      org.gnome.feed.Reader.Ping
      
## Adding Subscriptions

- Service Name: org.gnome.rss.FeedReader
- Object Path: /org/gnome/rss/FeedReader
- Method: boolean Subscribe(string)

Example command line call:

    dbus-send --session --dest=org.gnome.feed.Reader \
      /org/gnome/feed/Reader \
      org.gnome.feed.Reader.Subscribe \
      string:http://osnews.com/files/recent.rdf

## Changing the Online State

- Service Name: org.gnome.rss.FeedReader
- Object Path: /org/gnome/rss/FeedReader
- Method: SetOnline(boolean)

Example command line call:

    dbus-send --session --dest=org.gnome.feed.Reader \
      /org/gnome/feed/Reader \
      org.gnome.feed.Reader.SetOnline \
      boolean:false