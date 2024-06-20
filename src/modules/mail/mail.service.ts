import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { SendCommercialOfferDto } from '../commercial-offer/dto'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendCommercialOfferMessage(dtoEmail: SendCommercialOfferDto): Promise<void> {
    await this.mailerService.sendMail({
      to: dtoEmail.email,
      subject: 'TEST', // TODO
      template: './commercial-offer',
      context: {
        purchase_name: dtoEmail.purchase_name,
      },
    })
  }
}
