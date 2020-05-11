import {ActivationType} from "../../../enums/ActivationType";
import {ConnectionType} from "../../../enums/ConnectionType";
import {DropoutNode} from "../../Nodes/DropoutNode";
import {Layer} from "../Layer";

export class DropoutLayer extends Layer {
    constructor(outputSize: number, options: { activationType?: ActivationType, probability?: number } = {}) {
        super(outputSize);

        const activation: ActivationType = options.activationType ?? ActivationType.IdentityActivation;
        const probability: number = options.probability ?? 0.1;

        for (let i: number = 0; i < outputSize; i++) {
            this.inputNodes.add(new DropoutNode(probability).setActivationType(activation));
        }

        this.outputNodes = this.inputNodes;
        this.nodes.push(...Array.from(this.inputNodes));
    }

    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.ONE_TO_ONE;
    }

    public connectionTypeisAllowed(type: ConnectionType): boolean {
        return type === ConnectionType.ONE_TO_ONE;
    }
}
