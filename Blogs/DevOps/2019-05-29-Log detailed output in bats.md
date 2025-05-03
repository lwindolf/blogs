---
categories: Bash
---
When you unit test your bash scripts with bats and have tests like

     @test "my test" {
         result=$(
              analyze some stuff |\
              sed 's/stuff/otherstuff/' |\
              sort |\
              lot of pipe magic...
         )
         [[ $result =~ pattern ]]
     }

you will get no info if the test fails besides "[[ $result =~ pattern ]]" failed.

Here is a way to still produce some helpful output:

     @test "my test" {
         result=$(
              echo "Here is the output."
         )
         output=$result
         [[ $result =~ pattern ]]
     }
     
     teardown {
         printf "%s\n" "$output"
     }

Now for the failed test you see all the content from $result below the test failed message

    ✗ my test
    (in test file mytest.bats, line 8)
      `[[ $result =~ pattern ]]' failed
     
    Here is the output.
