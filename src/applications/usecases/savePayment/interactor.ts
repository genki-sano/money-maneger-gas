import { IPaymentRepository } from '@/applications/repositories/payment'
import { SavePaymentInputData } from '@/applications/usecases/savePayment/request'
import { Payment } from '@/domains/payment'

export class SavePaymentUseCase {
  private readonly paymentRepository: IPaymentRepository

  constructor(paymentRepository: IPaymentRepository) {
    this.paymentRepository = paymentRepository
  }

  public savePayment(req: SavePaymentInputData): boolean {
    const oldPayment = this.paymentRepository.find(req.id)
    if (!oldPayment) {
      this.paymentRepository.destory(req.id)
    }

    const payment = new Payment(
      req.id,
      req.name,
      req.date,
      req.price,
      req.category,
      req.memo,
    )

    return this.paymentRepository.save(payment)
  }
}
