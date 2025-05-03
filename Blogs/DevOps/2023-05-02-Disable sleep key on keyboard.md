Do you also have this utterly useless "sleep" key on your keyboard right above the keypad? 
At the right upper corner of the keyboard? Right where accidentily hit in the midst of a meeting
when reaching over for something?

I don't know how often I suspended my laptop with this "feature", before I added

     xmodmap -e 'keycode 150='

to my `.bashrc` which disables the key forever. May it rest in pieces :-)
