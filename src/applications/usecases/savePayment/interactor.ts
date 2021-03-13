import { IPaymentRepository } from '@/applications/repositories/payment'
import { SavePaymentInputData } from '@/applications/usecases/savePayment/request'
import { Payment } from '@/domains/payment'

export class SavePaymentUseCase {
  private readonly paymentRepository: IPaymentRepository

  constructor(paymentRepository: IPaymentRepository) {
    this.paymentRepository = paymentRepository
  }

  public savePayment(req: SavePaymentInputData): Payment | null {
    const payment = new Payment(
      req.id,
      req.name,
      req.date,
      req.price,
      req.category,
      req.memo,
    )

    return this.paymentRepository.save(payment) ? payment : null
  }
}
