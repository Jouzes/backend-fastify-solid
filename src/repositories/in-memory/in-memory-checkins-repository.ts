import { randomUUID } from "node:crypto";
import type { Prisma, CheckIn } from "../../../prisma/generated/client.js";
import type { CheckInsRepository } from "../checkins-repository.js";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      is_validated: data.is_validated ?? false,
      created_at: new Date()
    };
    this.items.push(checkIn);
    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {

    const checkIn = this.items.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDay = checkInDate.isSame(date, "day");

      return checkIn.user_id == userId && isOnSameDay;
    });
    if (!checkIn) {
      return null;
    }
    return checkIn;
  }
}
