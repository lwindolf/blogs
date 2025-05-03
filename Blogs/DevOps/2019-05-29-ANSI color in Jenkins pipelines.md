---
categories: Jenkins
---
In all cases ensure you have the ansi-color plugin installed

## In Declarative Pipelines

You need to add an option for ansiColor()

    pipeline {
      options {
        ansiColor('xterm')
      }
      
      // pipeline goes here
    }


## In Scripted Pipelines

Simply put ansiColor() {} around everything

     ansiColor('xterm') {
        // pipeline goes here
     }
