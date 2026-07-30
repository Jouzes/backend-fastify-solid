import {beforeEach, describe, expect, it, vi} from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository.js";
import { GetUserMetrics } from "./get-user-metrics.service.js";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let getUserMetrics: GetUserMetrics;

describe("Get user metrics", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    getUserMetrics = new GetUserMetrics(inMemoryCheckInsRepository);
  });

  it("should be able to get count of all time checkIns", async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });
    await inMemoryCheckInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01"
    });

    const {checkInsCount} = await getUserMetrics.create({userId: "user-01"});
    expect(checkInsCount).toEqual(2);
  });
});

