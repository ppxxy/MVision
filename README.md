# MVision

Some notes:
I didn't want to create multiple shader files (.glsl).
For that reason rendering calls do have some uniform variables that aren't always used.

In the thursday morning I noticed that the software is not always responding to mouse events.
I guess one possible reason for that is that some of the resources are loaded
synchronously on the main-thread. This ofcourse is a bad practice but asynchronous
resource loading takes some time to implement with WebGL so I kind of took the short route here.
On my tests Firefox seemed to be responding to mouse events more often.

Also I'm not sure if the issue is caused by mouse event listener
or rendering pipeline. Had no time to investigate further.

Also documentation is lacking here just to save some time. It's not an actual product so I decided
to save some time by leaving it out.
