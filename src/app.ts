import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Size, FreeCamera, CannonJSPlugin, PhysicsImpostor } from "@babylonjs/core";
import { Snake } from "./objects/Snake";
import * as CANNON from "cannon-es";


class App {
    constructor() {
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
        scene.enablePhysics(gravityVector, new CannonJSPlugin(true, 10, CANNON))


        //add ground

        const ground = MeshBuilder.CreateGround("ground", {
            width: 20,
            height: 25
        }, scene);

        ground.physicsImpostor = new PhysicsImpostor(
            ground,
            PhysicsImpostor.BoxImpostor,
            {mass: 0, friction: 0.5, restitution: 0.3},
            scene
        )


        //Add parallelogram

        new Snake(4, scene)

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
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