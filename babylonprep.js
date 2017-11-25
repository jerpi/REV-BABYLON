window.onload = init ;

function init(){

    // =============================================
    // Création de la structure principale graphique
    // =============================================
    let canvas = document.getElementById("canvas");
    let engine = new BABYLON.Engine(canvas, true);
    let s = new Scene(engine);
    s.scene.debugLayer.show() ;
    s.scene.activeCamera.attachControl(canvas);

    // ====================
    // Callback d'affichage
    // ====================
    engine.runRenderLoop(() => s.scene.render());

    // ======================
    // Callback de retaillage
    // ======================
    window.addEventListener("resize", () => engine.resize());
}