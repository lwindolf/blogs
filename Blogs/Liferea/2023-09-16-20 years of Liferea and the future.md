This project went **20** this year. I do fondly remember having announced the most early 
releases on freshmeat.net which back then was the way to find out about good and active
open source projects. Since those days many awesome contributors helped developing and 
maintaining Liferea to have the extensive feature set it has. For me the contributors
suddenly appearing and without any conditions helping on the project is the most motivating
and amazing thing about developing in open source.

To be honest all the years I've foremost maintained Liferea as a way to read news myself.
The reason I believe why this needs to be done using a feed reader is that you need a
useful interface to efficiently sift through many headlines and at the end to read those
you select as clutter-free as possible. Only then you have the space to actually process
the news content and not to just "consume" it. The web and web browser are just not build
for this use case. They solve the "as visual" as possible and "as much distraction as
possible" use case.

Maintaining this project for so long of course lets you know where the actual cost lies with
the maintenance work. I'm not talking of adding new features or improving performance or
usability, no I'm talking the ugly maintenance work. From a maintainer motivation perspective
it is very important to address this type of work. Be it by automating stuff or simplifying
workflows or choosing SW dependencies that help with this.

Looking back at those 20 years for me the GNOME ecosystem developed in a way that the 
maintenance work was ever increasing. The different aspects of this are the major GTK releases
causing massive refactorings, continuous API deprecations causing compiler noise and work that
does not benefit the features. So every time I was close to dropping the project, the reason
always was the GTK development cycle. I'm not judging here, there is just a mismatch of 
the innovation cycle in the GNOME world and in this feed reader project. This is for example
different with another important library for Liferea: libxml2. The API was practically 95% 
stable for 20 years. Zero maintenance effort!

To be able to continue Liferea for a longer time I therefore aim to have a similar stable
base platform as libxml2. I'm rather convinced that such a stack is found by going downwards
in the average SW stack. Lower SW stack layers tend to be more stable and change more rarely.
Depending on those lowers the maintenance work.

So the question for me is: what is a development platform that will stay the same for... say the 
next 10 years? Which minimizes maintainenance work and allows focussing on features? I believe
one answer is progressive web apps on ES6 without a framework (like React, Vue, ...). With this
in mind and the added advantage of cross-platform support **I plan to prototype a backend-less feed reader
PWA that can succeed my use case of Liferea**.

As for this GTK feed reader project **I promise to keep Liferea up for 2 more years**! I'm pretty sure
about not doing a GTK+4 port anymore. I intend to provide a good migration path to the new PWA and 
I hope to be able to maintain this as long as I've maintained Liferea. BTW it will be as ugly and clumsy
as many people say the Liferea GUI is, but the functionality will be great :-)
