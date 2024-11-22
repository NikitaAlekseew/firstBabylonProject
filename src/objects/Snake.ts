import { BallAndSocketConstraint, PhysicsBody, PhysicsConstraint, PhysicsEngine, PhysicsJoint, Scene, Vector3 } from "@babylonjs/core";
import { Echelon } from "../mesh/Echelon";
import { DragAndDrop } from "../mechanics/DragAndDrop";

export class Snake {

    private echelons: Echelon[] = []


    constructor(
        private echelonCount: number,
        private scene: Scene
    ){
        this.createEchelon()
        this.connectEchelon()
        new DragAndDrop( this.echelons)

    }

    private createEchelon(){
        for( let i = 0; i < this.echelonCount; i++ ) {
            const position = new Vector3(0, 1, i * -4 );
            const echelon = new Echelon(i, position, this.scene);
            this.echelons.push(echelon);
        }
    }

    private connectEchelon(){
        for(let i = 1; i < this.echelons.length; i++){
            
            const current = this.echelons[i - 1].mesh;
            const next = this.echelons[i].mesh;

            const joint = new BallAndSocketConstraint(            
                new Vector3(0, 0, -2),
                new Vector3(0, 0, 2),
                new Vector3(0, 1, 0),
                new Vector3(0, 1, 0),
                this.scene
            );
            current.physicsBody.addConstraint(next.physicsBody, joint)
        }
    }




}