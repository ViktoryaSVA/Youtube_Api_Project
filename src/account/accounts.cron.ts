import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AccountService } from "./account.service";

@Injectable()
export class AccountsCron {
    private readonly logger = new Logger(AccountsCron.name);

    constructor(private readonly accountsService: AccountService) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        await this.accountsService.updateAllAccounts();
        this.logger.debug('Called every dat at 00:00');
    }
}
