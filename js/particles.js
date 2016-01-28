function Particles(scale, Color, cubeSpeed)	//recupËre un vector3
{

	//constructor
	var loaded;
	var tick = 0;
	var particleColor = 0x8dc63f; 
	var particleSize = 1;
    var scene;
    var renderer;
    var particleRate = 20;
    var clock = new THREE.Clock(true);
         
      options, spawnerOptions, particleSystem;
	
 	
	//attributes
  
	
	//functions
	this.init = function()
	{
		loaded = false;
	    particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 500
      });
      
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
      
      loaded = true;
    
	};
	
	this.update = function()
	{
		
		//checking if position go outside area
		this.checkBounds();
		
		//deplacement du cube selon son vector deirectionel
		this.cube.position.x += this.directionalVector.x * this.speed;
		this.cube.position.y += this.directionalVector.y * this.speed;
		this.cube.position.z += this.directionalVector.z * this.speed;
				
		//resolve scale changement to progressively reset to 1,1,1
			//	todo : crÈer une fonction permetant de modifier progressivement la scale pour que l'objet reprenne son scale initial 1,1,1 en (- et en +)
	};
	
	this.changeColor = function(color)
	{
		this.particleColor = color;
	};
	
	this.changeDirectionalVector = function(vector)
	{
		this.directionalVector = vector;
	};
	
	this.changeSize = function(scale)
	{
		this.particleSize = scale;
	};
	this.isLoaded = function(loaded)
	{
		return loaded;
	};
	

	
}