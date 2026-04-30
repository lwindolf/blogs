The Debian/Ubuntu freeplane package is broken with more recent Java version due to Java 
having dropped a security feature. Sadly there is no upstream freeplane release fixing this.

## Hacking the freeplane start script

The `/usr/bin/freeplane` start script has different code paths for JVM selection. The
relevant code is

    if [ -r /usr/lib/java-wrappers/java-wrappers.sh ] 
    then # the Debian method 
            . /usr/lib/java-wrappers/java-wrappers.sh 
            require_java_runtime java8 
    else 
            findjava 
            if [ $? -ne 0 ] 
            then 
                    exit 1 
            fi 
    fi

Above code is the reason why setting  `FREEPLANE_JAVA_HOME` will not work. On Debian only the
java-wrapper is used to select the JVM.

This is why you want to change

    require_java_runtime java8 

to

    require_java_runtime openjdk21

After which freeplane should run again. If you do not have OpenJDK 21 installed use 

    update-java-alternatives --list

to check which versions you have installed.
