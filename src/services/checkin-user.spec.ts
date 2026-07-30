import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-checkins-repository.js";
import { CheckInUser } from "./checkin-user.service.js";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms.repository.js";
import { Decimal } from "@prisma/client/runtime/client";
import { MaxNumberCheckinsError } from "../errors/max-number-checkins.error.js";
import { MaxDistanceError } from "../errors/max-distance.error.js";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let checkInUser: CheckInUser;
let inMemoryGymsRepository: InMemoryGymsRepository;

describe("CheckIn user test", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    inMemoryGymsRepository = new InMemoryGymsRepository();
    checkInUser = new CheckInUser(inMemoryCheckInsRepository, inMemoryGymsRepository);
    vi.useFakeTimers();

    await inMemoryGymsRepository.create({
      id: "gym-01",
      title: "sla",
      description: "",
      phone: "",
      latitude: new Decimal(-27.7953242),
      longitude: new Decimal(-50.3020)
    });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to checkIn users", async () => {
    vi.setSystemTime(new Date(2003, 7, 14));

    const {checkIn} = await checkInUser.create({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.7953242,
      userLongitude: -50.3020,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to checkIn users in twice in the same day", async () => {
    vi.setSystemTime(new Date(2003, 7, 14));
    await checkInUser.create({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.7953242,
      userLongitude: -50.3020,
    });
    
    await expect(() => checkInUser.create({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.7953242,
      userLongitude: -50.3020,
    })).rejects.toBeInstanceOf(MaxNumberCheckinsError);
  });

  it("should be able to checkIn users in twice but in different days", async () => {
    vi.setSystemTime(new Date(2003, 7, 14));
    await checkInUser.create({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.7953242,
      userLongitude: -50.3020,
    });
    
    vi.setSystemTime(new Date(2003, 7, 15));
    const {checkIn} = await checkInUser.create({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.7953242,
      userLongitude: -50.3020
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to checkin on distant gym", async () => {
    inMemoryGymsRepository.items.push({
      id: "gym-02",
      title: "phd santa catarina",
      description: "",
      phone: "",
      latitude: new Decimal(-27.8325769),
      longitude: new Decimal(-50.3416949)
    });
    
    await expect(() => checkInUser.create({
      gymId: "gym-02",
      userId: "user-01",
      userLatitude: -27.7953242,
      userLongitude: -50.3020
    })).rejects.toBeInstanceOf(MaxDistanceError);
  });
});


// gym 2 -27.8325769,-50.3416949
// gym 1 -27.7953242,-50.3020