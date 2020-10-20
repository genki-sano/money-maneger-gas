import { IFormRepository } from '@/applications/repositories/form'
import { IPaymentRepository } from '@/applications/repositories/payment'
import { DeletePaymentInputData } from '@/applications/usecases/deletePayment/request'

export class DeletePaymentUseCase {
  private readonly fromRepository: IFormRepository
  private readonly paymentRepository: IPaymentRepository

  constructor(
    fromRepository: IFormRepository,
    paymentRepository: IPaymentRepository,
  ) {
    this.fromRepository = fromRepository
    this.paymentRepository = paymentRepository
  }

  public deletePayment(req: DeletePaymentInputData): number {
    const cnt = this.paymentRepository.destory(req.id)
    if (cnt > 0) {
      this.fromRepository.deleteResponse(req.id)
    }
    return cnt
  }
}
