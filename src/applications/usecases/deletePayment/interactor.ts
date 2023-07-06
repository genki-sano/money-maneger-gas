import { IPaymentRepository } from '@/applications/repositories/payment'
import { DeletePaymentInputData } from '@/applications/usecases/deletePayment/request'

export class DeletePaymentUseCase {
  private readonly paymentRepository: IPaymentRepository

  constructor(paymentRepository: IPaymentRepository) {
    this.paymentRepository = paymentRepository
  }

  public deletePayment(req: DeletePaymentInputData): number {
    return this.paymentRepository.destory(req.id)
  }
}
