import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms.repository.js";
import { LocateNearbyGym } from "./locate-nearby-gym.service.js";

let inMemoryGymsRepository: InMemoryGymsRepository;
let locateNearbyGym: LocateNearbyGym;

describe("Locate nearby gyms", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    locateNearbyGym = new LocateNearbyGym(inMemoryGymsRepository);
  });

  it("should be able to locate nearby gyms", async () => {
    await inMemoryGymsRepository.create({
      title: "Nearby gym",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await inMemoryGymsRepository.create({
      title: "Far away gym",
      latitude: -27.3,
      longitude: -49.7,
    });

    const { gyms } = await locateNearbyGym.create({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Nearby gym" })]);
  });

  it("should not locate gyms outside the 10 km radius", async () => {
    await inMemoryGymsRepository.create({
      title: "Far away gym",
      latitude: -27.3,
      longitude: -49.7,
    });

    const { gyms } = await locateNearbyGym.create({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(0);
  });
});
