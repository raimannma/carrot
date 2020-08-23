import { ActivationType, Logistic } from "activations";
import { ConnectionType, NodeType } from "../../..";
import { Node } from "../../Node";
import { Layer } from "../Layer";

/**
 * Dense layer
 */
export class DenseLayer extends Layer {
  constructor(
    outputSize: number,
    options: {
      /**
       * The activation type for the output nodes of this layer.
       */
      activationType?: ActivationType;
    } = {}
  ) {
    super(outputSize);

    const activation: ActivationType = options.activationType ?? Logistic;

    for (let i = 0; i < outputSize; i++) {
      this.inputNodes.add(new Node(NodeType.HIDDEN).setActivationType(activation));
    }

    this.outputNodes = this.inputNodes;
    this.nodes.push(...Array.from(this.inputNodes));
  }

  /**
   * Checks if a given connection type is allowed on this layer.
   *
   * @return Is this connection type allowed?
   */
  public connectionTypeisAllowed(): boolean {
    return true;
  }

  /**
   * Gets the default connection type for a incoming connection to this layer.
   *
   * @returns the default incoming connection
   */
  public getDefaultIncomingConnectionType(): ConnectionType {
    return ConnectionType.ALL_TO_ALL;
  }
}
