import { ArcRotateCamera, Color3, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, PhysicsImpostor, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";

export class Echelon {

    public mesh: Mesh

    constructor (id: number, position: Vector3, scene: Scene){
        this.mesh= this.CreateNewBox(id, position, scene)     
    }

    private CreateNewBox(id: number, position: Vector3, scene: Scene): Mesh  {

        const box: Mesh = MeshBuilder.CreateBox(`box-${id}`, {width: 3, height: 2, depth: 1.5}, scene);
        
        box.position = position;


        //Create material
        const material = new StandardMaterial(`material-${id}`, scene);
        material.diffuseColor= Color3.Random();
        box.material = material

        //Add physics body
        box.physicsImpostor = new PhysicsImpostor(
            box, 
            PhysicsImpostor.BoxImpostor, 
            { mass: 1, friction: 0.4, restitution: 0.2 },
            scene
        )

        //Add metadate
        box.metadata = { id }

        return box
    }
}