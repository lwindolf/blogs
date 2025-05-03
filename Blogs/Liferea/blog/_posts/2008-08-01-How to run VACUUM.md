---
title: "How to run VACUUM"
---

As explained in the last post I see no way to automatically run the "VACUUM" command of sqlite which more or less defragments the DB structure. Nonetheless for everyone who wants to run it manually here is how to do it:

1. Shutdown Liferea
2. Start the sqlite client by running: "sqlite3 ~/.liferea_1.4/liferea.db"
3. At the prompt enter: "VACUUM;"
4. Wait until the prompt reappears.
5. Restart Liferea

Situations when you might want to VACUUM

- When the DB file (~/.liferea_1.4/liferea.db) is very large (e.g. >50MB)
- When you have only a few feeds with a low cache setting (e.g. 30 feeds and 100 items) and believe Liferea to be unreasonably slow.
- When you have run Liferea for ages.

If you don't know what this is all about: please do not worry about it. In many cases you might not need to do anything. 
