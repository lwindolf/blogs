Starting with Liferea 1.10 you can use a SOCKS proxy. This is possible because Liferea uses the libproxy support provided by the libsoup networking library since 1.10.

<h2>What is a SOCKS Proxy?</h2>

SOCKS stands for "socket secure" it simply means to use an encrypted connection for whatever you do. Configuring a SOCKS proxy in your desktop environment means that you want all applications to do internet access via an encrypted connection to a safe server you have access to.

<h2>Why Use a SOCKS Proxy for Feed Reading?</h2>

Well, this of course is useful if you are in an environment were you do not want others to see what you are reading. Be it political blogs or private but unencrypted feeds. Also you simply might not want for your employer to know what servers you are polling news feeds from anyway. There are many good and bad reasons.

<h2>How To Use SOCKS Proxy with Liferea and GNOME?</h2>

First please note that Liferea supports using a SOCKS proxy only via the GNOME network preferences. Actually it relies on libsoup using the SOCKS settings from there. 

<h4>Requirements</h4>

<ol>
<li>Liferea 1.10+ with GNOME desktop</li>
<li>You have a private server to use as a proxy</li>
<li>You can connect via SSH to this server</li>
</ol>

<h4>Step 1: Connecting the SOCKS Proxy</h4>

There are many ways to do this and <a href="http://www.catonmat.net/blog/linux-socks5-proxy/">many</a> <a href="http://wiki.vpslink.com/Instant_SOCKS_Proxy_over_SSH">online</a> <a href="http://blog.agdunn.net/?p=107">tutorials</a>. The easiest way is to use SSH like this

<pre>ssh -D 8080 &lt;user>@&lt;private server></pre>

<h4>Step 2: Client Proxy Configuration</h4>

So the first thing to do is to configure Liferea to use the GNOME network settings:

<img src="/images/proxy-autodetect.png"/>

Ensure to set the preferences to proxy auto-detect as shown in the screenshot above. Next go to the GNOME preferences and configure a SOCKS proxy on "localhost" and port "8080" or whatever port you used when you ran the SSH command.

That's it! Try to update feeds in Liferea and watch out for errors in the status line.

<h2>What About Older Liferea Versions?</h2>

If you are running an older version of Liferea have a look at this post about <a href="/liferea/blog/Liferea-SOCKS-Proxy-Workaround">a SOCKS proxy workaround</a> using the tool redsocks.

