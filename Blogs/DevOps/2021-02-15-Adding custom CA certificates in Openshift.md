This post documents quite some research through the honestly quite sad Openshift documentation.
The content below roughly corresponds to Openshift releases 4.4 to 4.7

## How to add custom CAs?

When you Openshift cluster does access external services that use CAs not contained in
CA bundle of the underlying Redhat OS you will see errors like this

    x509: certificate signed by unknown authority

This error will appear when you access the external service using Openshift routes (e.g.
when doing an OAuth flow for login). The error message is from haproxy which serves the
routes and blocks the unknown CA.

The solution is to add your custom CAs. But where?

## Solution 1: Add it to the Redhat OS CA bundle

This is done by providing a `MachineConfig` resource. Here is the [example](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.3/html-single/authentication/index)
from the Redhat documentation:

    apiVersion: machineconfiguration.openshift.io/v1
    kind: MachineConfig
    metadata:
      labels:
        machineconfiguration.openshift.io/role: worker
      name: 50-examplecorp-ca-cert
    spec:
      config:
        ignition:
          version: 2.2.0
        storage:
          files:
          - contents:
              source: data:text/plain;charset=utf-8;base64,LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVORENDQXh5Z0F3SUJBZ0lKQU51bkkwRDY2MmNuTUEwR0NTcUdTSWIzRFFFQkN3VUFNSUdsTVFzd0NRWUQKV1FRR0V3SlZVekVYTUJVR0ExVUVDQXdPVG05eWRHZ2dRMkZ5YjJ4cGJtRXhFREFPQmdOVkJBY01CMUpoYkdWcApBMmd4RmpBVUJnTlZCQW9NRFZKbFpDQklZWFFzSUVsdVl5NHhFekFSQmdOVkJBc01DbEpsWkNCSVlYUWdTVlF4Ckh6QVpCZ05WQkFNTUVsSmxaQ0JJWVhRZ1NWUWdVbTl2ZENCRFFURWhNQjhHQ1NxR1NJYjNEUUVKQVJZU2FXNW0KWGpDQnBURUxNQWtHQTFVRUJoTUNWVk14RnpBVkJnTlZCQWdNRGs1dmNuUm9JRU5oY205c2FXNWhNUkF3RGdZRApXUVFIREFkU1lXeGxhV2RvTVJZd0ZBWURWUVFLREExU1pXUWdTR0YwTENCSmJtTXVNUk13RVFZRFZRUUxEQXBTCkFXUWdTR0YwSUVsVU1Sc3dHUVlEVlFRRERCSlNaV1FnU0dGMElFbFVJRkp2YjNRZ1EwRXhJVEFmQmdrcWhraUcKMHcwQkNRRVdFbWx1Wm05elpXTkFjbVZrYUdGMExtTnZiVENDQVNJd0RRWUpLb1pJaHZjTkFRRUJCUUFEZ2dFUApCRENDQVFvQ2dnRUJBTFF0OU9KUWg2R0M1TFQxZzgwcU5oMHU1MEJRNHNaL3laOGFFVHh0KzVsblBWWDZNSEt6CmQvaTdsRHFUZlRjZkxMMm55VUJkMmZRRGsxQjBmeHJza2hHSUlaM2lmUDFQczRsdFRrdjhoUlNvYjNWdE5xU28KSHhrS2Z2RDJQS2pUUHhEUFdZeXJ1eTlpckxaaW9NZmZpM2kvZ0N1dDBaV3RBeU8zTVZINXFXRi9lbkt3Z1BFUwpZOXBvK1RkQ3ZSQi9SVU9iQmFNNzYxRWNyTFNNMUdxSE51ZVNmcW5obzNBakxRNmRCblBXbG82MzhabTFWZWJLCkNFTHloa0xXTVNGa0t3RG1uZTBqUTAyWTRnMDc1dkNLdkNzQ0F3RUFBYU5qTUdFd0hRWURWUjBPQkJZRUZIN1IKNXlDK1VlaElJUGV1TDhacXczUHpiZ2NaTUI4R0ExVWRJd1FZTUJhQUZIN1I0eUMrVWVoSUlQZXVMOFpxdzNQegpjZ2NaTUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3RGdZRFZSMFBBUUgvQkFRREFnR0dNQTBHQ1NxR1NJYjNEUUVCCkR3VUFBNElCQVFCRE52RDJWbTlzQTVBOUFsT0pSOCtlbjVYejloWGN4SkI1cGh4Y1pROGpGb0cwNFZzaHZkMGUKTUVuVXJNY2ZGZ0laNG5qTUtUUUNNNFpGVVBBaWV5THg0ZjUySHVEb3BwM2U1SnlJTWZXK0tGY05JcEt3Q3NhawpwU29LdElVT3NVSks3cUJWWnhjckl5ZVFWMnFjWU9lWmh0UzV3QnFJd09BaEZ3bENFVDdaZTU4UUhtUzQ4c2xqCjVlVGtSaml2QWxFeHJGektjbGpDNGF4S1Fsbk92VkF6eitHbTMyVTB4UEJGNEJ5ZVBWeENKVUh3MVRzeVRtZWwKU3hORXA3eUhvWGN3bitmWG5hK3Q1SldoMWd4VVp0eTMKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
            filesystem: root
            mode: 0644
            path: /etc/pki/ca-trust/source/anchors/examplecorp-ca.crt

Using this you can place multiple files at the OS level.

The serious drawback: you have to **reboot all nodes!!!** to make it active (as the CA bundle is compiled on bootup).

## Solution 2: Using the global proxy configuration at runtime

This works well, if you have the global proxy enabled anyway.

    apiVersion: config.openshift.io/v1
    kind: Proxy
    metadata:
      name: cluster
    spec:
      httpProxy: http://<username>:<pswd>@<ip>:<port> 
      httpsProxy: http://<username>:<pswd>@<ip>:<port> 
      noProxy: example.com 
      readinessEndpoints:
      - http://www.google.com 
      - https://www.google.com
      trustedCA:
        name: user-ca-bundle          <---------------

The proxy object has a key to reference a user provided CA bundle config map.
Although this only helps you with the proxy CA certificate, I guess...

The [documentation page](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.7/html/networking/configuring-a-custom-pki#installation-configure-proxy_configuring-a-custom-pki)
for this is actually really bad, giving no indication wether the 3 sections are steps 
to be done together or are configuration alternatives. Given the name of this
page "CONFIGURING A CUSTOM PKI" one would expect an actual useful overview, but
hey...

## Solution 3: Using the global proxy configuration at install time

This is different than above as you can use the "additionalTrustBundle" field
in your `install-config.yaml` to pass extra CA certificates:

    apiVersion: v1
    baseDomain: my.domain.com
    proxy:
      httpProxy: http://<username>:<pswd>@<ip>:<port> 
      httpsProxy: http://<username>:<pswd>@<ip>:<port> 
      noProxy: example.com 
    additionalTrustBundle: | 
        -----BEGIN CERTIFICATE-----
        <MY_TRUSTED_CA_CERT>
        -----END CERTIFICATE-----
        
**Note**: that this does not work without the proxy enabled! Just configuring
additionalTrustBundle creates a config map `user-ca-bundle` which will not be 
used without the proxy.

Why the "additionalTrustBundle" is just a trust bundle for the proxy and not a
global one is (at least for me) not logical, but hey...

## Solution 4: OAuth specific trust bundle

If you use case is a custom CA used by your identity provider you are in luck
and can provide an extra config map in `openshift-config` that provides your
certificates. Please note that this config map uses a different key `ca.crt`
instead of `ca-bundle.crt` as all the other config maps do. Don't worry you
can still pass a bundle there!

Here is the example snippet from the [documentation](https://docs.openshift.com/container-platform/4.6/authentication/identity_providers/configuring-oidc-identity-provider.html#identity-provider-oidc-CR_configuring-oidc-identity-provider):

    apiVersion: config.openshift.io/v1
    kind: OAuth
    metadata:
      name: cluster
    spec:
      identityProviders:
      - name: oidcidp
        mappingMethod: claim
        type: OpenID
        openID:
          clientID: ...
          clientSecret:
            name: idp-secret
          ca: 
            name: ca-config-map          <----------------
          [...]


## Conclusion

To be honest there is no concept, just patch work. Different places with
similar solutions and no comprehensive documentation. You might want to book
some enterprise consultants from IBM here.

Please drop a note in the comments if this helps or my research is missing important parts!

HTH

