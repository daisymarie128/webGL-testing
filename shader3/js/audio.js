
  // Setting up global audio environment
  var context = new webkitAudioContext();

  // Initialising the Analyser node object
  var analyser = context.createAnalyser();
  var analyser1 = context.createAnalyser();

  // Setting the bin count(bands) of the analyser
  analyser.fftSize = 1024; // Number of bands will be this / 2.
  analyser1.fftSize = 32;

  // creating an Audio object
  var audio0 = new Audio();
  audio0.src = 'assets/ConfessToMe.mp3';
  audio0.controls = true;
  audio0.autoplay = false;
  audio0.loop = true;

  var source;
  // Making the Audio object the source
  source = context.createMediaElementSource(audio0);
  // connecting the source to the analyser
  source.connect(analyser);
  // connecting the source & analyser to the speakers (destination)
  analyser.connect(analyser1);
  analyser1.connect(context.destination);


  // 8 bit unsigned itenger Array, 0-255 values represent -1 to +1 (in audio terms)
  var timeDomainData = new Uint8Array(analyser.frequencyBinCount);
  var frequencyData = new Uint8Array(analyser1.frequencyBinCount);
  // Function that receives & returns the frequencyData
  var getFrequencies = function() {
    // put data from getByteFrequencyData passed in array
    analyser1.getByteFrequencyData(frequencyData);
    return frequencyData;
  }

  var getTimeDomain = function() {
    // put data from getByteFrequencyData passed in array
    analyser.getByteTimeDomainData(timeDomainData);
    return timeDomainData;
  }


