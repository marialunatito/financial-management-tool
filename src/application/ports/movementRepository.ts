import { IMovement } from "../../domain/entities/movement";

export interface IMovementRepository {
  create(movement: IMovement): Promise<IMovement>;
}
