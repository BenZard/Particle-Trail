<!doctype html>
<html>
  <head>
    <title>load sound</title>
    <meta charset="utf-8">
    
  </head>
<body>
    
  <div id="container"></div>

  <script src="http://mrdoob.github.com/three.js/build/three.min.js"></script>
  <script type="text/javascript">

if (! window.AudioContext) {
        if (! window.webkitAudioContext) {
            alert('no audiocontext found');
        }
        window.AudioContext = window.webkitAudioContext;
    }
var context = new AudioContext();
var source, sourceJs;
var analyser;
var buffer;
var url = 'g-eazy-i-mean-it-ft-remo.mp3';
var array = new Array();

var request = new XMLHttpRequest();
request.open('GET', url, true);
request.responseType = "arraybuffer";


    function getAverageVolume(array) {
        var values = 0;
        var average;
 
        var length = array.length;
 
        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }
 
        average = values / length;
        return average;
    }


request.onload = function() 
{
    context.decodeAudioData(
        request.response,
        function(buffer) {
            if(!buffer) {
                // Error decoding file data
                return;
            }

            sourceJs = context.createJavaScriptNode(2048);
            sourceJs.buffer = buffer;
            sourceJs.connect(context.destination);
            analyser = context.createAnalyser();
            analyser.smoothingTimeConstant = 0.6;
            analyser.fftSize = 512;

            source = context.createBufferSource();
            source.buffer = buffer;

            source.connect(analyser);
            analyser.connect(sourceJs);
            source.connect(context.destination);

            sourceJs.onaudioprocess = function(e) 
            {
                array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                 var average = getAverageVolume(array)
                  console.log(average);
/*                 
                console.log(array);
				array.forEach(function(c){
				console.log(c);
				
				});
*/				
            };

            source.start(0);
            
        },

        function(error) {
            // Decoding error
        }
    );
};
request.send();

  </script>
</body>
</html>