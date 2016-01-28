  var camera, tick = 0, cubeColor = 0x8dc63f, cubeScale = 1,
      scene, renderer, particleRate = 20, clock = new THREE.Clock(true),
      options, spawnerOptions, particleSystem;

    init();
    animate();

    function init() 
    {


      container = document.createElement('div');
      document.body.appendChild(container);

      camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 100;

      scene = new THREE.Scene();

      // The GPU Particle system extends THREE.Object3D, and so you can use it
      // as you would any other scene graph component.  Particle positions will be
      // relative to the position of the particle system, but you will probably only need one
      // system for your whole scene
      particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 500
      });
      scene.add( particleSystem);


      // options passed during each spawned
      options = 
      {
        position: new THREE.Vector3(),
        positionRandomness: cubeScale,
        velocity: new THREE.Vector3(),
        velocityRandomness: 2.5,
        color: cubeColor,
        colorRandomness: .2,
        turbulence: 4,
        lifetime: 1,
        size: 2,
        sizeRandomness: 1.4
      };

      spawnerOptions = 
      {
        spawnRate: particleRate,
        horizontalSpeed: 0,
        verticalSpeed: 0,
        timeScale: 1
      }

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

  
    }

    function animate()
    {
      requestAnimationFrame(animate);

      var delta = clock.getDelta() * spawnerOptions.timeScale;
      tick += delta/100;

	  console.log(tick);
      if (tick < 0) tick = 0;

      if (delta > 0) 
      {
        options.position.x = Math.sin(2 * spawnerOptions.horizontalSpeed);
        options.position.y = Math.sin(2 * spawnerOptions.verticalSpeed);
        options.position.z = Math.sin(2 * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed);

        for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) 
        {
          // Yep, that's really it.  Spawning particles is super cheap, and once you spawn them, the rest of
          // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
          particleSystem.spawnParticle(options);
        }
      }

      particleSystem.update(tick);

      render();

    }

    function render() {

      renderer.render(scene, camera);

    }