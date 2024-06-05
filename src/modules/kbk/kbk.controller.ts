import { Controller } from '@nestjs/common';
import { KbkService } from './kbk.service';

@Controller('kbk')
export class KbkController {
  constructor(private readonly kbkService: KbkService) {}
}
