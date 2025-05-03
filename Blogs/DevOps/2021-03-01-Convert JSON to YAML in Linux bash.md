## Is it possible with bash?

The short and reasonable answer is: <b>no</b>! Bash won't do it in a reliable way for you.

## Basic Linux Tools that convert JSON to YAML

The goal here should be to use standard tools that in the best case you do not need to install.
The basic scripting languages and their standard modules are good candidates. Also `yq` (the YAML
pendant to [jq](/cheat-sheet/jq)) becoming more popular might be soon available in Linux distros.

### Ruby

    ruby -ryaml -rjson -e 'puts YAML.dump(JSON.parse(STDIN.read))' <input.json
    
### Python

    python -c 'import sys, yaml, json; print(yaml.dump(json.loads(sys.stdin.read())))' <input.json

### Perl

    perl -MYAML -MJSON -0777 -wnl -e 'print YAML::Dump(decode_json($_))' input.json

### yq

    yq -oy input.json
        
## jq

A nice jq based solution working for a JSON subset (non-multiline strings) has been posted by Jeff Mercado [here](https://stackoverflow.com/a/53330236):

Place the following into `~/.jq`
    
    def yamlify2:
        (objects | to_entries | (map(.key | length) | max + 2) as $w |
            .[] | (.value | type) as $type |
            if $type == "array" then
                "\(.key):", (.value | yamlify2)
            elif $type == "object" then
                "\(.key):", "    \(.value | yamlify2)"
            else
                "\(.key):\(" " * (.key | $w - length))\(.value)"
            end
        )
        // (arrays | select(length > 0)[] | [yamlify2] |
            "  - \(.[0])", "    \(.[1:][])"
        )
        // .
        ;
        
And convert using 

    jq -r yamlify2 input.json
