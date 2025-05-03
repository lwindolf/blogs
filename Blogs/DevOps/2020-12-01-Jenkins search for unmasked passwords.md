---
title: Jenkins search for unmasked passwords
categories: [ Jenkins ]
---

When you run a larger multi-tenant Jenkins instance you might wonder if everyone
properly hides secrets from logs. The script below needs to be run as admin and
will uncover all unmasked passwords in any pipeline job build:

    for (job in Jenkins.instance.getAllItems()) {
        try {
            if (job.hasProperty("builds")) {
                if (!job.builds.isEmpty()) {
                    for (build in job.builds) {
                        if (build.hasProperty("log")) {
                            if (build.log =~ /password=[^\*]/) {
                                println "Found unmasked password in: ${job.fullName} #${build.id}"
                            }
                        } else {
                            println "No log available for ${job.fullName} #${build.id}"
                        }
                    }
                } else {
                    println "Builds empty for ${job.fullName}"
                }
            } else {
                println "Builds not available for ${job.fullName}"
            }
        } catch (Exception e) {
            println "[ ERROR ] Skipping due to ${e}. Current job: ${job.fullName}"
        }
    }
    
Note that the script can only identify unmasked passwords in pipeline jobs that have
at least one run.
