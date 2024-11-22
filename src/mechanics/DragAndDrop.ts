import { Color3, Material, Mesh, PhysicsBody, PhysicsMotionType, PhysicsPrestepType, PhysicsShapeBox, PointerDragBehavior, Quaternion, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { Echelon } from "../mesh/Echelon";

export class DragAndDrop {


    private echelons: Echelon[];
    

    constructor(echelons: Echelon[]){

        this.echelons = echelons
        this.dragAndDrop();
    }

    private dragAndDrop(){
        for( const echelon of this.echelons){
            const dragBehavior = new PointerDragBehavior({
                dragPlaneNormal: new Vector3(1, 0, 0)
            })

            //Add camera drag and drop
            dragBehavior.useObjectOrientationForDragging = false;


            //start drag and drop
            dragBehavior.onDragStartObservable.add(() =>{
                
                //add GUI
                const currentBox = document.querySelector('body');
                if(document.getElementById('GUI')){
                    document.getElementById('GUI').remove()
                }
                const gui = document.createElement('div')
                currentBox.appendChild(gui);
                gui.id = 'GUI';
                const guiInterface = `
                                <button id="change_color">Change color</button>
                                <div id="currentBox">${echelon.mesh.id}</div>`
                gui.innerHTML = guiInterface;

                const button = document.getElementById('change_color');
                button.addEventListener('click', (event) =>{
                    (echelon.mesh.material as StandardMaterial).diffuseColor = Color3.Random()
                })

                // fix physics object
                if(echelon.mesh.physicsBody){
                    const body = echelon.mesh.physicsBody as PhysicsBody;
                    if(body){
                        body.setMotionType(PhysicsMotionType.ANIMATED )
                        console.log(echelon.mesh.physicsBody.getMotionType())
                    }
                }

            })


            // Event drag and drop
            dragBehavior.onDragObservable.add((event) => {

                if(echelon.mesh.physicsBody){
                    echelon.mesh.position.copyFrom(event.dragPlanePoint);
                    echelon.mesh.physicsBody.setPrestepType(PhysicsPrestepType.ACTION)
                    // echelon.boxPhysicsAggregate.transformNode.setAbsolutePosition(event.dragPlanePoint)

                }
            });


            // finish drag and drop
            dragBehavior.onDragEndObservable.add(() =>{
                
                // activate physics body
                if(echelon.mesh.physicsBody){
                    echelon.mesh.physicsBody.setMotionType(PhysicsMotionType.DYNAMIC)
                    echelon.mesh.physicsBody.setPrestepType(PhysicsPrestepType.TELEPORT)
                }
            });

            echelon.mesh.addBehavior(dragBehavior)
        }
    }

   

}