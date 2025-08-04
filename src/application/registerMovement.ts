import { Wallet } from "src/domain/entities/wallet";
import { v4 } from "uuid";
import { IMovement, MovementEnum } from "../domain/entities/movement";
import { ICategoryRepository } from "./ports/categoryRepository";
import { IMovementRepository } from "./ports/movementRepository";
import { IWalletRepository } from "./ports/walletRepository";

interface RegisterMovementInput {
  amount: number;
  type: MovementEnum;
  description: IMovement["description"];
  category: string;
  userId: string;
}

export class RegisterMovement {
  constructor(
    private readonly walletRepository: IWalletRepository,
    private readonly movementRepository: IMovementRepository,
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async execute(input: RegisterMovementInput): Promise<void> {
    const wallet = await this.walletRepository.findByUserId(input.userId);
    if (!wallet) {
      throw new Error(`Wallet not found for userId: ${input.userId}`);
    }

    // TODO: this can be a use case findOrCreate and the logic do not is here
    let category = await this.categoryRepository.findByName(input.category);
    if (!category) {
      category = await this.categoryRepository.create(input.category);
    }

    const walletModel = new Wallet(wallet);
    const strategyMap = {
      [MovementEnum.debit]: walletModel.debit(input.amount),
      [MovementEnum.credit]: walletModel.credit(input.amount),
    };

    strategyMap[input.type];

    const now = new Date();

    this.walletRepository.updateById({
      ...wallet,
      updatedAt: now,
      total: walletModel.getTotal(),
    });

    this.movementRepository.create({
      id: v4(),
      categoryId: category.name,
      walletId: wallet.id,
      amount: input.amount,
      type: input.type,
      description: input.description,
      createdAt: now,
      deletedAt: null,
      updatedAt: now,
    });
  }
}
