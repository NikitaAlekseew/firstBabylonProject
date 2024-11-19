import { PhysicsBody, PhysicsEngine, PhysicsJoint, Scene, Vector3 } from "@babylonjs/core";
import { Echelon } from "../mesh/Echelon";

export class Snake {

    private echelons: Echelon[] = []


    constructor(
        private echelonCount: number,
        private scene: Scene
    ){
        this.createEchelon()
        this.connectEchelon()

    }

    private createEchelon(){
        for( let i = 0; i < this.echelonCount; i++ ) {
            const position = new Vector3(0, 1, i * -3);
            const echelon = new Echelon(i, position, this.scene);
            this.echelons.push(echelon);
        }
    }

    private connectEchelon(){
        for(let i = 1; i < this.echelons.length; i++){
            const current = this.echelons[i - 1].mesh;
            const next = this.echelons[i].mesh;

            const joint = new PhysicsJoint(
                 PhysicsJoint.HingeJoint,
                {
                    mainPivot: new Vector3(0, 0, -1),
                    connectedPivot: new Vector3(0, 0, 1),
                    mainAxis: new Vector3(0, 1, 0),
                    connectedAxis: new Vector3(0, 1, 0)
                }
            );
            current.physicsImpostor.addJoint(next.physicsImpostor, joint)
        }
    }




}