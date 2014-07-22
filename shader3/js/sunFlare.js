function sunFlare() {// Put the main code
  // // to keep track of the mouse position
  // var mouseX = 0, mouseY = 0;

  var container,
  material, camera,
  // 3d objects
  material, mesh, engine = new ParticleEngine(),
  fov = 30,
  // create shader objects
  // create attributes for vertex shader
  attributes = {
    displacement: {
      type: 'f',
      value: []
    }
  },
  //create uniform for fragment shader
  uniforms = {
    red: {
      type: 'f', // a float
      value: 0
    },
    green: {
      type: 'f', // a float
      value: 0
    },
    blue: {
      type: 'f', // a float
      value: 0
    },
    texture1: {type: "t", value: THREE.ImageUtils.loadTexture( "explosion.png" )}
  },
  // may not be used
  volumeMusic = [];

  $(window).ready(function() {
    // grab the container from the DOM
    container = $("#container")[0];

    //3d creation
    // create a scene
    scene = new THREE.Scene();

    // create a camera the size of the browser window
    // and place it 100 units away, looking towards the center of the scene
    camera = new THREE.PerspectiveCamera(
        fov,
        window.innerWidth / window.innerHeight,
        1,
        10000 );
    camera.position.z = 1000;
    camera.target = new THREE.Vector3( 0, 0, 0 );
    scene.add( camera );

    // create a material for globe
    material = new THREE.ShaderMaterial( {
      uniforms: uniforms,
      attributes: attributes,
      vertexShader: $('#vertexShader').text(),
      fragmentShader: $('#fragmentShader').text()
    });
    material.depthTest = false;

    // create a sphere and assign the material
    mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry( 20, 4 ),
        material
    );

    var verts = mesh.geometry.vertices; 

    //create settings for particles
    var settings = {
      //where particles start
      positionStyle    : Type.CUBE,
      positionBase     : new THREE.Vector3( -100, -100, -100 ),//where emitter starts from
      positionSpread   : new THREE.Vector3( 500, 500, 2000 ),//width

      velocityStyle    : Type.CUBE,//this does some weird shit but can effect the speed
      velocityBase     : new THREE.Vector3( 100, 100, 100 ),
      velocitySpread   : new THREE.Vector3( 1000, 1005, 1000 ),
      accelerationBase : new THREE.Vector3( 100, 100, 100 ),

      particleTexture : THREE.ImageUtils.loadTexture( 'images/white.png' ),

      sizeTween    : new Tween( [5], [9] ),//size of particles
      sizeBase    : 0.9,
      sizeSpread  : 0.5,
      colorBase   : new THREE.Vector3(1, 1, 1), // H,S,L
      // colorSpread : new THREE.Vector3(1, 1, 1),
      opacityBase : 1,

      particlesPerSecond : 500,
      particleDeathAge   : 500,
      emitterDeathAge    : 100
     };

    engine.setValues( settings );//starting the particle engine
    engine.initialize();



    // create the renderer and attach it to the DOM
    renderer = new THREE.WebGLRenderer();
    // renderer.shadowMapEnabled = true;
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    container.appendChild( renderer.domElement );
    scene.add( mesh );
    render();

    // function beatDetection() {
        //might be used later
    // };

    function render() {
      //Getting data
      var values = attributes.displacement.value;
      var TimeDomain = getTimeDomain();
      var frequency = getFrequencies();
      var red = frequency[5]/255;
      var green = frequency[7]/255;
      var blue = frequency[10]/255;
      //updating each element
      //engine updater
      engine.update( 0.01 * 1.5 );
      //vertices updater
      attributes.displacement.needsUpdate = true;
      for (var v = 0; v < verts.length; v++) {
        attributes.displacement.value[v] = TimeDomain[(v) % TimeDomain.length];
      }
      //future beat detection particle reactions
      // var currentVolume = _.reduce(TimeDomain.subarray(0,300), function(memo, num) { return memo + num;}, 0)
      // volumeMusic.push(currentVolume);
      // if (volumeMusic.length > 30) volumeMusic.shift();
      // if (_.max(volumeMusic) == currentVolume) {
      //   velocityBase     : new THREE.Vector3( 1000, 1000, 1000 );
      //   accelerationBase : new THREE.Vector3( 1000, 1000, 1000 );
      //   velocityStyle    : 1;
      //   engine.positionSpread.x += 100;
      //   engine.positionSpread.y += 100;
      //   engine.positionSpread.z += 100;
      //   particlesPerSecond : 7000;
      //   particleDeathAge   : 1.0;
      //   emitterDeathAge    : 120;
      // }

      renderer.render( scene, camera );
      requestAnimationFrame( render );
      controls.update();
    }

    var timerId;

    $(document).ready(function() {
      $(".stop").on('click', function() {
        audio0.pause();
        audio0.currentTime = 0;
        // Stops the frequency data from being returned.
        clearInterval(timerId);
      });

      var samplerID = null;
      $(".play").on('click', function() {
        audio0.play();
        beginVisualiser();
        console.log('click');
      });
    });
  } );
}