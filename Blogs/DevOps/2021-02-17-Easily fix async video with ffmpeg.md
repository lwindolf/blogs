## 1. Correcting Audio that is too slow/fast

This can be done using the `-async` parameter of ffmpeg which according to the documentation *"Stretches/squeezes" the audio stream to match the timestamps*. The parameter takes a numeric value for the samples per seconds to enforce.

    ffmpeg -async 25 -i input.mpg <encoding options> -r 25

Try slowly increasing the -async value until audio and video matches.

## 2. Auto-Correcting Time-Shift

### 2.1 Audio is ahead

When audio is ahead of video: As a special case the `-async` switch auto-corrects the start of the audio stream when passed as `-async 1`. So try running

    ffmpeg -async 1 -i input.mpg <encoding options>

### 2.2 Audio lags behind

Instead of using `-async` you need to use `-vsync` to drop/duplicate frames in the video stream. There are two methods in the manual page "-vsync 1" and "-vsync 2" and an method auto-detection with "-vsync -1". But using "-map" it is possible to specify the stream to sync against.

    ffmpeg -vsync 1 -i input.mpg <encoding options>
    ffmpeg -vsync 2 -i input.mpg <encoding options>

Interestingly Google shows people using `-async` and `-vsync` together. So it might be worth experimenting a bit to achieve the intended result :-)

## 3. Manually Correcting Time-Shift

If you have a constantly shifted sound/video track that the previous fix doesn't work with, but you know the 
time shift that needs to be corrected, then you can easily fix it with one of the following two commands:

### 3.1 Audio is ahead
      
Example to shift by 3 seconds:

    ffmpeg -i input.mp4 -itsoffset 00:00:03.0 -i input.mp4 -vcodec copy -acodec copy -map 0:1 -map 1:0 output_shift3s.mp4

Note how you specify your input file 2 times with the first one followed by a time offset. Later in the command there are
two `-map` parameters which tell ffmpeg to use the time-shifted video stream from the first `-i input.mp4` and the audio 
stream from the second one.

I also added `-vcodec copy -acodec copy` to avoid reencoding the video and loose quality. These parameters have to be 
added after the second input file and before the mapping options. Otherwise one runs into mapping errors.
      
### 3.2 Audio lags behind

Again an example to shift by 3 seconds:
      
    ffmpeg -i input.mp4 -itsoffset 00:00:03.0 -i input.mp4 -vcodec copy -acodec copy -map 1:0 -map 0:1 output_shift3s.mp4

Note how the command is nearly identical to the previous command with the exception of the `-map` parameters being switched.
So from the time-shifted first `-i input.mp4` we now take the audio instead of the video and combine it with the normal video.

