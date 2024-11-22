import { ArcRotateCamera, Color3, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, PhysicsAggregate, PhysicsBody, PhysicsImpostor, PhysicsMotionType, PhysicsShape, PhysicsShapeBox, Quaternion, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";

export class Echelon {

    public mesh: Mesh
    public boxPhysicsAggregate: PhysicsAggregate

    constructor (id: number, position: Vector3, scene: Scene){
        this.mesh= this.CreateNewBox(id, position, scene);
        this.boxPhysicsAggregate = new PhysicsAggregate(this.mesh, new PhysicsShapeBox(new Vector3(), new Quaternion(), new Vector3(2, 2, 4), scene), { mass: 10, restitution:0.1, friction:1}, scene)
        
    }

    private CreateNewBox(id: number, position: Vector3, scene: Scene): Mesh  {

        const box: Mesh = MeshBuilder.CreateBox(`box-${id}`, {width: 2, height: 2, depth: 4}, scene);
        
        box.position = position;


        //Create material
        const material = new StandardMaterial(`material-${id}`, scene);
        material.diffuseColor= Color3.Random();
        box.material = material

        //Add physics body
        const boxBody = new PhysicsBody(box, PhysicsMotionType.DYNAMIC, false, scene)
        // const boxShape = new PhysicsShapeBox(new Vector3(), new Quaternion(), new Vector3(2, 2, 4), scene)

        // const boxPhysicsAggregate = new PhysicsAggregate(box, boxShape, { mass: 1, restitution:0.1, friction:1}, scene)
        

        //Add metadate
        box.metadata = { id }   
        return box
    }

    
 
}