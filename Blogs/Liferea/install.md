---
layout: default
title: Installation
parent: Liferea
grand_parent: Projects
permalink: /liferea/install.htm
---

# Installation

## Supported Platforms

The following list provides some short notes on the installation of Liferea on different platforms. 
If you have questions or problems with the specific packages please contact the package maintainer.
Thanks to all the packagers for their efforts!

<a href="https://repology.org/project/liferea/versions">
	<img src="https://repology.org/badge/vertical-allrepos/liferea.svg" alt="Packaging status">
</a>

## How to Install Liferea

### From Binary Packages

<table border="0" cellspacing="2px">
	<tr>
		<th>Snap</th>
		<td>You can find a snap package at <a href="https://snapcraft.io/liferea/">Snapcraft</a>
			<pre class="command">snap install liferea</pre>
		</td>
	</tr><tr>
		<th>Flatpak</th>
		<td>
			You can find a flatpak package at <a href="https://flathub.org/apps/details/net.sourceforge.liferea">flathub.org</a>
			<pre class="command">flatpak install flathub net.sourceforge.liferea</pre>	
			and run it with
			<pre class="command">flatpak run net.sourceforge.liferea</pre>
		</td>
	</tr>
</table>

### GNU/Linux Distributions

<table border="0" cellspacing="2px">
	<tr>
		<th>Debian, Ubuntu, Mint</th>
		<td>There are official packages which can be installed by running
		<pre class="command">apt-get install liferea</pre>
		<p>If you are a Ubuntu novice user check out this video on how to install Liferea</p>
		<iframe width="420" height="315" src="http://www.youtube.com/embed/NXdIOBPkDVU" frameborder="0" allowfullscreen></iframe>
		</td>
	</tr>
	<tr>
		<th>Red Hat, CentOS, Fedora</th>
		<td>There are official packages which can be installed like this:
		<pre class="command">yum install liferea</pre>
		</td>
	</tr>
	<tr>
		<th>SUSE</th>
		<td>Since SuSE 10.1 there are official Liferea packages in SuSE. Please use the yast2 package manager to install them.<br />
		Up-to-date SuSE and OpenSuSE packages can also be found <a href="http://packman.links2linux.org/package/liferea">here</a>.
		<pre class="command">yast2 -i liferea</pre>
		</td>
	</tr>
	<tr>
		<th>Gentoo</th>
		<td>There is a package in the <a href="http://packages.gentoo.org/package/net-news/liferea">official portage repository</a> that can be installed with
		<pre class="command">emerge liferea</pre></td>
	</tr>
	<tr>
		<th>Mandriva</th>
		<td>There is an official Mandriva package maintained by Tibor Pittich and Goectz Waschk. To install it execute
		<pre class="command">urpmi liferea</pre></td>
	</tr>
	<tr>
		<th>Zenwalk</th>
		<td>There is an official Zenwalk package maintained by George Vlahavas. To install it execute
		<pre class="command">netpkg liferea</pre></td>
	</tr>
</table>

### Other Unix

<table border="0" cellspacing="2px">
	<tr>
		<th>FreeBSD</th>
		<td>There are always up-to-date Liferea packages (built by Hye-Shik Chang) at <a href="http://www.freshports.org/net/liferea/">http://www.freshports.org/net/liferea/</a>.</td>
	</tr>
</table>

<a name="compiling"/>

## How to Compile Liferea

Please check the instructions at [https://github.com/lwindolf/liferea](https://github.com/lwindolf/liferea).

