import { Scene, Vector3 } from "@babylonjs/core";
import { Echelon } from "../mesh/Echelon";

export class Snake {

    private echelons: Echelon[] = []


    constructor(
        private echelonCount: number,
        private scene: Scene
    ){
        this.createEchelon()

    }

    private createEchelon(){
        for( let i = 0; i < this.echelonCount; i++ ) {
            const position = new Vector3(0, 1, i * -3);
            const echelon = new Echelon(i, position, this.scene);
            this.echelons.push(echelon);
        }
    }





}