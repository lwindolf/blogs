---
title: HTTP requests from Jenkins pipelines
categories: Jenkins
---

This post provides a summary of the possibilities to perform HTTP requests from a Jenkins pipeline.

## Overview

There are at least the following possibilities

- Just doing a `curl` in a shell
- Using Groovy `URL` object
- Using plain old Java networking methods
- Using a Jenkins plugin like [http_request](https://www.jenkins.io/doc/pipeline/steps/http_request/)

Also security wise to properly handle the Jenkins sandboxing/script approval the call might want to be done

- inline (with code inside the pipeline)
- in a global shared libary

## Sandboxing and Script Approval

In a properly configured Jenkins setup you usually have explicit script approval active and to use
non-default libraries you need to extend the signature whitelist. Alternatively you can provide
the required HTTP request functionality via a plugin or a global shared library, both of which are
not subject to the script approval/signature whitelisting.

Mapping the security configuration impact gives us this matrix:

| Variant | Impact when used inline | Impact when used in plugin/global shared library |
| ------- | ------------- | ----------------------------------- |
| curl    | none | none |
| Groovy `URL` | signature approval needed | none |
| Java networking | signature approval needed | none |
| Plugin  | none | n.a. | 

While using curl or a plugin have no security impact on pipeline development, they both have to be 
provided in terms of setup: curl needs to be installed on Jenkins agents and the plugin has
to be installed and maintained in Jenkins setup, both of which is usually a ITOps/DevOps task
and if you are a pipeline developer might not be an option.

In terms of actively and continuously developing required functionality I believe a global
shared library is the way to go no matter your role (Dev, DevOps, Build Engineer, IT Ops). 
This is both because it can be easily configured and development can happen by testing 
pipelines against new feature branches of the library.

## Examples Snippets

Below you find example snippets for the HTTP request mechanism mentioned above.

### curl

     sh 'curl https://google.com'

### Groovy

From https://stackoverflow.com/questions/34682099/how-to-call-rest-from-jenkins-workflow

     def get = new URL("https://httpbin.org/get").openConnection();
     def getRC = get.getResponseCode();
     println(getRC);
     if(getRC.equals(200)) {
        println(get.getInputStream().getText()); 
     }

### Using Java base libraries

Copied from  

    import java.io.BufferedReader
    import java.io.InputStreamReader
    import java.io.OutputStreamWriter
    import java.net.URL
    import java.net.URLConnection

    def sendPostRequest(urlString, paramString) {
        def url = new URL(urlString)
        def conn = url.openConnection()
        conn.setDoOutput(true)
        def writer = new OutputStreamWriter(conn.getOutputStream())

        writer.write(paramString)
        writer.flush()
        String line
        def reader = new BufferedReader(new InputStreamReader(conn.getInputStream()))
        while ((line = reader.readLine()) != null) {
          println line
        }
        writer.close()
        reader.close()
    }

    sendPostRequest("https://google.com", "")

### Using the http_request plugin

     def response = httpRequest 'http://localhost:8080/jenkins/api/json?pretty=true'
     println("Status: "+response.status)
     println("Content: "+response.content)
