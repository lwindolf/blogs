---
title: "Using sqlite3 WAL Journaling"
---

Morpheus suggested in a comment to check [recent Mozilla sqlite changes](https://web.archive.org/web/20140112120204/https://bugzilla.mozilla.org/show_bug.cgi?id=573492)
for their places database. They basically switched to the [new WAL journaling](https://web.archive.org/web/20140112120204/http://www.sqlite.org/wal.html)
that is supported since sqlite 3.7. Therefore I performed some measurements on the update behaviour in 
WAL mode with different sqlite page sizes and "PRAGMA synchronous" settings.

## The Results

     FS     Journal Mode  Page Size    Sync Mode  Update Duration
     ext4 	none          1k (default) FULL       59s
     ext4 	WAL           1k           FULL       6,3s
     ext4 	WAL           4k           FULL       6,2s
     ext4 	WAL           8k           FULL       5,9s
     ext4 	WAL           16k          FULL       5,8s
     ext4 	WAL           32k          FULL       6,7s
     ext3 	WAL           32k          FULL       1s
     ext4 	WAL           32k          NORMAL     0,9s
  
According to the sqlite documentation WAL journaling is expected to have a significantly better write-throughput compared to synchronous mode without journaling. The results above confirm this.

When using "PRAGMA synchronous=FULL" the execution time improves to 1/10 of the original 60s. 
With WAL journaling the sqlite documentation recommends to use only "PRAGMA synchronous=NORMAL". 
By doing so we loose the durability guarantee from the ACID criterias, <b>but 1/60 of the original 
execution time might be worth it.</b> The sqlite documentation [says](https://web.archive.org/web/20140112120204/http://www.sqlite.org/pragma.html#pragma_synchronous)

 <i>"There is a very small (though non-zero) chance that a power failure at just the wrong time could corrupt the database in NORMAL mode."</i>

Additionally the page size is said to have an influence on the performance. This isn't the case for Liferea, but to be on the safe side it doesn't hurt increase from the default setting of 1k to 32k which should cost only a bit more memory.

## Disadvantages:

- As already mentioned the chance of data loss will increase...
- Also sqlite3s WAL journal is not supported on network filesystems!

## Fazit

We have to try to switch to WAL mode.There is no guarantee that it will be safe without long term tests, but the immediate performance gain is critical.

I'll create two releases 1.8.3 and 1.9.2 soon and hope you give a lot of feedback! It would be most helpful if you can include the number of feeds, your cache size setting and DB file size. 
