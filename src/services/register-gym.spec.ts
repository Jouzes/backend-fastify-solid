import {beforeEach, describe, it} from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms.repository.js";
import { RegisterGym } from "./register-gym.service.js";

let gymsRepository: InMemoryGymsRepository;
let registerGym: RegisterGym;

describe("Register gym test", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    registerGym = new RegisterGym(gymsRepository);
  });
  it("should be able to register new gym", async () => {
    const {gym} = await registerGym.create({
      title: "gym teste",
      description: null,
      phone: null,  
      latitude: -27.7953242,
      longitude: -50.3020
    });
    
  });
});
