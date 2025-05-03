---
title: "Why auto-VACUUM is no good..."
---

During the various performance discussions during the last time here and there people 
suggested to run "VACUUM" on the Liferea database once it gets slow. This is in line 
with the sqlite documentation which [says](https://web.archive.org/web/20150619014912/http://sqlite.org/lang_vacuum.html):

<i>When an object (table, index, or trigger) is dropped from the database, it leaves 
behind empty space. This makes the database file larger than it needs to be, but 
can speed up inserts. In time inserts and deletes can leave the database file 
structure fragmented, which slows down disk access to the database contents.

The VACUUM command cleans the main database by copying its contents to a temporary 
database file and reloading the original database file from the copy. This eliminates 
free pages, aligns table data to be contiguous, and otherwise cleans up the database 
file structure.</i>

The problem with it is that <b>it also takes very long</b>. With a 50MB DB file I experienced 
a runtime of over 1 minute. This is why this can be only a tool for experienced users 
that know how to do it manually knowing what to expect. For executing such a long term 
operation automatically on runtime would surely be unacceptable to the unsuspecting user. 
Also there is no good way how to decide when to do a VACUUM to save disk space and 
improve performance. 
