import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository.js";
import { ValidateCheckInUser } from "./validate-checkIn.service.js";
import { ResourceNotFoundError } from "../errors/resource-not-found.error.js";
import { LateCheckInValidationError } from "../errors/late-checkIn-validation.error.js";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let validateCheckInUser: ValidateCheckInUser;

describe("validate checkIn test", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    validateCheckInUser = new ValidateCheckInUser(inMemoryCheckInsRepository);
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should be able to validate the checkIns", async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });

    const {checkIn} = await validateCheckInUser.create({
      checkInId: createdCheckIn.id
    });
    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckInsRepository.items[0]?.validated_at).toEqual(expect.any(Date));
  });

  it("should be able to not validate the checkIns", async () => {
    await expect(
      validateCheckInUser.create({checkInId: "inexistent id"})
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the checkIn after 20 minutes", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });

    const timer = 1000 * 60 * 21;
    vi.advanceTimersByTime(timer);
    
    await expect(
      validateCheckInUser.create({checkInId: createdCheckIn.id})
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});