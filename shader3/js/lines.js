// Set up the scene, camera, and renderer as global variables.
function lines() {
  // var camera;
  var lines = []; //Global array for animated elements
  var lines2 = []; //Global array for animated elements
  // Sets up the scene.
  function init() {

    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    var mesh;
    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.shadowMapEnabled = true; //Needs to be enabled for shadows
    renderer.setSize(WIDTH, HEIGHT);
    $('#container').empty();
    $('#container').append(renderer.domElement);

    //add fog to the scene. zoom in and out gets brighter and darker. delete if you want
    // scene.fog = new THREE.FogExp2( 0x000000, .0235 );

    // Create a camera, zoom it out from the model a bit, and add it to the scene. .PerspectiveCamera (Feild of view, Aspect Ratio
    // .. Near(start rendering), Far (vanishing point? horizon line?))
    camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 0.1, 20000);
    //.PerspectiveCamera (zoom, )
    camera.position.set(281.5454554532732, 20.717505604326544, 19.709799474934318);
    scene.add(camera);

    // Create an event listener that resizes the renderer with the browser window.
    window.addEventListener('resize', function() {
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Set the background color of the scene.
    // renderer.setClearColorHex(0xfff, 1);

    //making the light factory
    var lightFactory = function(x,y,z) {
      var light = new THREE.SpotLight(0xfffff);
      light.position.set(x,y,z);
      light.castShadow = true;
      scene.add(light);
      return light;
    }

    // Create a light
    // var light1 = lightFactory(0,100,0);
    // var light2 = lightFactory(100,0,0);
    var light3 = lightFactory( 0,100,100);
    // var light3 = lightFactory( 0,0,0);

    var light = new THREE.HemisphereLight(0xfffff, 0xfffff, .5);
    scene.add(light);

    // create lines
    // var line1 = lineFactory();
    // lines.push(line1);


  }

  // Vertices builder x,y,z where y amplitude passed in from frequency
  var verticesFactory = function(x, y) {
    var vertex = new THREE.Vector3(x, y, -100)
    return vertex;
  }

  var lineFactory = function(r, g, b, vertexArray) {
    var lineMaterial = new THREE.LineBasicMaterial({
      // color: "rgb("+r+","+g+","+b+")"
      color: "rgb("+r+","+g+","+b+")",
      linewidth: 0.2
    });

    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices = vertexArray;

    var line = new THREE.Line( lineGeometry, lineMaterial );
    scene.add( line );
    lines.push(line);
    return line;
  }



  // Get data
  var beginVisualiser = function() {
    //lineFactory build at intervals
    var freqPoints = [];
    var freqArray = getTimeDomain();
    // Get data and build vertices
    for (var i = 0; i < freqArray.length; i++) {
      var amplitude = freqArray[i]/8;
      //Don't understand how this is making the default animation change before song starts
      var freqPoint = verticesFactory((i-(freqArray.length)/2)*2, amplitude);
      freqPoints.push(freqPoint)
    }
    lineFactory(random0255(), random0255(), random0255(), freqPoints);
  }

  var cameraCheck = function (){
  if (camera.position.y <= 15.788705886682353){
    camera.position.y = 15.788705886682352;
  }
  if (camera.position.y >= 43.64040775696008){
    camera.position.y = 43.6404077569600;
  }
  if (camera.position.x <= 277.39813827645145){
    camera.position.x = 277.3981382764514;
  }
  if (camera.position.x >= 549.0749218863431){
    camera.position.x = 549.074921886343;
  }
  if (camera.position.z >= 126.61507971732826){
    camera.position.z = 126.6150797173282;
  }
  if (camera.position.z <= -38.54680380116381){
    camera.position.z = -38.5468038011638;
  }

}

  // Renders the scene and updates the render as needed.
  function animate() {
    beginVisualiser();
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    controls.update();
    cameraCheck();


    for ( var i = 0; i< lines.length; i++){
      var line = lines[i];
      line.position.x += 2.1;
      line.position.x += 0.1;
      line.position.z += 1.1;
      // line.position.y += -0.1;
    }

    if(lines.length > 300){
      lastLine = lines.shift();
      scene.remove(lastLine);
    }

  }
  function random0255() {
    return _.random(0,255);
    // return parseInt(result);
  }

  init();
  animate();

}

