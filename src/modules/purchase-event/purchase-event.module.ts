import { Module } from '@nestjs/common';
import { PurchaseEventService } from './purchase-event.service';
import { PurchaseEventController } from './purchase-event.controller';

@Module({
  controllers: [PurchaseEventController],
  providers: [PurchaseEventService],
})
export class PurchaseEventModule {}
