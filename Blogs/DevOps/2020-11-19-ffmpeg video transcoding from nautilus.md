---
title: "ffmpeg video transcoding from Nautilus"
categories: Scripting
---

I want to share this little video conversion script for the GNOME file manager Nautilus.
As Nautilus supports custom scripts being executed for selected files I wrote a script
to do allow video transcoding from Nautilus.

## How it looks like

Once installed you get a new menu item like this

![Nautilus context menu](/blog/assets/ffmpeg-convert-screenshot1.png)

when you start the script (and have zenity installed) it will prompt you for a 
transcoding profile:

![Nautilus transcoding profile](/blog/assets/ffmpeg-convert-screenshot2.png)

The list of profiles is hard-coded in the script, but should be easy to extend.

## How to install it

Place the following script in `~/.local/share/nautilus/scripts/ffmpeg-convert.sh`
and run `chmod a+x` on it.

    #!/bin/bash
    
    profiles="\
    mp4_h264_400k_aac_128k
    mp4_h264_600k_aac_128k
    mp4_h264_1000k_aac_128k
    mp3_128k"
    
    # If zenity is installed prompt for parameters
    if command -v zenity >/dev/null; then
    	profile=$(zenity --width=480 --title="ffmpeg convert" \
    		--text="Transcoding Profile" \
          		--entry \
          		--entry-text=$profiles
    	)
    	if [ $? -ne 0 ]; then
    		exit	# On Zenity 'Cancel'
    	fi
    fi 
    
    # If zenity failed/missing use default (first option)
    if [ "$profile" = "" ]; then
    	profile=$(echo "$options" | head -1)
    fi
    
    # Build options
    case "$profile" in
    	mp3_128k)
    		options="-vn -acodec mp3 -b:a 128k"
    		extension=mp3
    	;;
    	*)
    		profile="${profile//_/ }"
    		set -- ${profile}
    		options="-vcodec $2 -b:v $3 -acodec $4 -b:a $5"
    		extension=$1
    	;;
    esac
    
    while read file; do
    	output="${file/\.*/.}$extension"
    
    	echo ffmpeg -y -i "$file" $options "$output"
    	if ffmpeg -y -i "$file" $options "$output"; then
    		notify-send "Ready: '$(basename "$output")'"
    	else
    		notify-send "Converting '$file' failed!"
    	fi
    done < <(echo "$NAUTILUS_SCRIPT_SELECTED_FILE_PATHS")


