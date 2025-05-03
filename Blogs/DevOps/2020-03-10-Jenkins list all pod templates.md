---
categories: Jenkins
---

When using the Jenkins kubernetes plugin you can list all active pod templates like this

    import jenkins.model.*
    import org.csanchez.jenkins.plugins.kubernetes.*

    if (Jenkins.instance.clouds) {
       cloud = Jenkins.instance.clouds.get(0) 
       cloud.templates.each { t ->
          println t.getName()
       }
    }
