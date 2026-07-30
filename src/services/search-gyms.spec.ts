import {beforeEach, describe, expect, it, vi} from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms.repository.js";
import { SearchGyms } from "./search-gyms.service.js";

let inMemoryGymsRepository: InMemoryGymsRepository;
let searchGyms: SearchGyms;

describe("Search gyms by query", () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    searchGyms = new SearchGyms(inMemoryGymsRepository);
  });

  it("should be able to search gyms by query", async () => {
    await inMemoryGymsRepository.create({
      title: "gym teste",
      description: null,
      phone: null,  
      latitude: -27.7953242,
      longitude: -50.3020
    });
    await inMemoryGymsRepository.create({
      title: "academia",
      description: null,
      phone: null,  
      latitude: -27.7953242,
      longitude: -50.3020
    });

    const {gyms} = await searchGyms.create({
      query: "acadeia",
      page: 1
    });
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({title: "academia"})]);
  });

  it("should be able to search gyms paginated by query", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `gym teste-${i}`,
        description: null,
        phone: null,  
        latitude: -27.7953242,
        longitude: -50.3020
      });
    }

    const {gyms} = await searchGyms.create({
      query: "gym",
      page: 2
    });
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([expect.objectContaining({title: "academia"}), expect.objectContaining({title: "academia"})]);
  });
});
