import {beforeEach, describe, expect, it, vi} from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository.js";
import { CheckInHistory } from "./checkIn-history.service.js";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let checkInHistory: CheckInHistory;

describe("Fetch user checkIns history", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    checkInHistory = new CheckInHistory(inMemoryCheckInsRepository);
  });

  it("should be able to fetch checkIns history", async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });
    await inMemoryCheckInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01"
    });
    const {checkIns} = await checkInHistory.create({userId: "user-01", page: 1});

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([expect.objectContaining({gym_id: "gym-01"}), expect.objectContaining({gym_id: "gym-02"})]);
  });

  it("should be able to fetch paginated checkIns history", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01"
      });
    }
    const {checkIns} = await checkInHistory.create({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([expect.objectContaining({gym_id: "gym-21"}), expect.objectContaining({gym_id: "gym-22"})]);

  }); 
});
