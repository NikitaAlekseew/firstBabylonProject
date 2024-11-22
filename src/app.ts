import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";

import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Size, FreeCamera, CannonJSPlugin, PhysicsImpostor, HavokPlugin, PhysicsBody, PhysicsMotionType, PhysicsShapeBox, Quaternion } from "@babylonjs/core";
import { Snake } from "./objects/Snake";

import HavokPhysics from "@babylonjs/havok";




class App {
    constructor() {
        
        function getInitializedHavok() {
            return  HavokPhysics();
          }
        
        
        // create the canvas html element and attach it to the webpage
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas)

        // initialize babylon scene and engine
        const engine = new Engine(canvas, true);
        const scene = new Scene(engine);

        //camera
        const camera: ArcRotateCamera = new ArcRotateCamera( "camera", Math.PI / 2, Math.PI / 4, 20, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        //light
        const light: HemisphericLight = new HemisphericLight("light", new Vector3(0, 2, -10), scene);

        // add physics

        const gravityVector = new Vector3(0, -9.81, 0);
        getInitializedHavok().then(result => scene.enablePhysics(gravityVector, new HavokPlugin(true, result))).then(() =>{

        
        // scene.enablePhysics(gravityVector, new HavokPlugin(true, getInitializedHavok()))


        //add ground

        const ground = MeshBuilder.CreateGround("ground", {
            width: 40,
            height: 50
        }, scene);
        ground.position= new Vector3 (0, -2, 0)
        const groundBody = new PhysicsBody(ground, PhysicsMotionType.STATIC, false, scene)
        const groundShape = new PhysicsShapeBox(new Vector3(), new Quaternion, new Vector3(40, 0, 50), scene)
        groundBody.shape = groundShape
        groundBody.setMassProperties({ mass: 0 });
        //Add parallelogram

        new Snake(4, scene)

    })

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.key === 'i') {
                console.log('hi')
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
        
    }
}
new App();