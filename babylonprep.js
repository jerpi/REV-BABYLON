      	window.onload = init ;


	function init(){

        	// =============================================
	      	// Création de la structure principale graphique
	      	// =============================================

	      	var canvas = document.getElementById("canvas") ; 
	      	var engine = new BABYLON.Engine(canvas,true) ; 

	      	var scene = createScene(engine) ;
		scene.debugLayer.show() ; 

		scene.activeCamera.attachControl(canvas) ;   


	      	// ====================
	      	// Callback d'affichage
	      	// ====================
	      	engine.runRenderLoop(function(){scene.render();}) ; 

	      	// ======================
	      	// Callback de retaillage
	      	// ======================
	      	window.addEventListener("resize", function (){engine.resize();});
	}



	function createCamera(scene){
		return new BABYLON.FreeCamera("cam",new BABYLON.Vector3(2,2,-5), scene) ;
	}

