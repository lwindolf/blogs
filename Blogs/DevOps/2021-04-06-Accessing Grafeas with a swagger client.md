This is a short howto on workarounds needed to use the artifact metadata DB Grafeas
(developed by Google and JFrog). While the upstream project does provide Swagger definitions
those do not work out-of-the-box with for example Swagger 2.4. The Grafeas server is being 
implemented in Golang using Protobuf for API bindings, so the offered Swagger bindings are 
not really used and are thus untested.

## Step 1. Fetch Grafeas swagger definitions

    wget https://github.com/grafeas/grafeas/raw/master/proto/v1beta1/swagger/grafeas.swagger.json -O grafeas.swagger.json
    wget https://raw.githubusercontent.com/grafeas/grafeas/master/proto/v1beta1/swagger/project.swagger.json   

## Step 2. Prepare swagger configs

    echo '{
        "projectName": "Grafeas",
        "packageVersion": "v1beta1",
        "packageName": "grafeas",
        "licenseName": "Apache 2.0"
    }' >config.json

    echo '{
        "projectName": "GrafeasProjects",
        "packageVersion": "v1beta1",
        "packageName": "grafeasProjects",
        "licenseName": "Apache 2.0"
    }' >config2.json

## Step 3. Patch swagger definitions

Here is a sed command to perform fixes. Note how the non-working Swagger definition parts can be identified
by looking for curly braces with an `=` sign inside. This syntax is from OpenAPI v3 which is (not yet) 
supported by swagger. As the definition as just further limiting input it is safe to simplify it.

    sed -i \
    -e 's/{parent=projects.*}/{parent}/g' \
    -e 's/{name=projects.*}/{name}/g' *.swagger.json

## Step 4. Produce working bindings

    java -jar ./swagger-codegen-cli.jar generate -i ./grafeas.swagger.json -l python -o ./ -c ./config.json
    java -jar ./swagger-codegen-cli.jar generate -i ./project.swagger.json -l python -o ./ -c ./config2.json
    
Here is a simple test client to test both bindings. It expects a running Grafeas server on http://localhost:8000 and

- creates a new project
- adds a new note to the project
- and finally fetches the note again

Please excuse the hacky python code, it is just for crude testing :-)

    #!/usr/bin/env python3

    from __future__ import print_function
    import time
    import grafeas
    import grafeasProjects

    from grafeas.rest import ApiException
    from pprint import pprint

    # create an instance of the API class
    conf = grafeas.Configuration()
    conf.debug = True
    conf.host = 'http://localhost:8080'
    client = grafeas.ApiClient(conf)

    try:
        # Create new project
        api = grafeasProjects.ProjectsApi(client)
        p = grafeasProjects.ProjectProject()
        p.name = "projects/testProject"
        api_response = api.projects_create_project(p)
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling GrafeasApi->create_project: %s\n" % e)

    try:
        # Creates a new `Note`.
        api = grafeas.GrafeasV1Beta1Api(client)
        n = grafeas.V1beta1Note() # ApiNote | The Note to be inserted
        n.name = 'TestNote1'
        n.short_description = 'Short'
        n.long_description = 'Long'
        n.vulnerability = {
            "details": [
            {
                "package": "libexempi3",
                "cpeUri": "cpe:/o:debian:debian_linux:7",
                "minAffectedVersion": {
                  "name": "2.5.7",
                  "revision": "1",
                  "kind": "NORMAL"
                }
            }]
        }
        n.kind = grafeas.V1beta1NoteKind.VULNERABILITY
        api_response = api.grafeas_v1_beta1_create_note(body=n, parent='projects/testProject', note_id='testNote1')
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling GrafeasApi->create_note: %s\n" % e)

    try:
        api = grafeas.GrafeasV1Beta1Api(client)
        api_response = api.grafeas_v1_beta1_get_note(project='testProject', name='testNote1')
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling GrafeasApi->create_note: %s\n" % e)


    try:
        # Fetch a note
        path_params = {}
        path_params['project'] = 'testProject'
        path_params['name'] = 'testNote1'

        header_params = {}
        header_params['Accept'] = client.select_header_accept(['application/json'])  # noqa: E501
        header_params['Content-Type'] = client.select_header_content_type(['application/json'])  # noqa: E501

        api_response = client.call_api(
                '/v1beta1/projects/{project}/notes/{name}', 'GET',
                path_params,
                header_params,
                response_type='V1beta1Note',  # noqa: E501
                _return_http_data_only=True)

        pprint(api_response)
    except ApiException as e:
        print("Exception when calling API: %s\n" % e)
