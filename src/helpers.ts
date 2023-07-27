import { validate as isUUID } from 'uuid';
import { BadRequestException } from '@nestjs/common';

export function isValidUUID(id: string) {
  if (!isUUID(id)) {
    throw new BadRequestException('Not UUID type of user id');
  }
}
export function getTimeStamp() {
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();
  return currentTimestamp;
}
