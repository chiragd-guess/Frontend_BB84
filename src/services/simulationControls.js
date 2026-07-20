import { createInitialSimulation } from "../data/initialstate";


export function updateNoise(setSimulation, value) {

  setSimulation((prev) => ({
    ...prev,

    channel: {
      ...prev.channel,
      noise: value,
    },

  }));

}



export function updateEve(setSimulation, value) {

  setSimulation((prev) => ({
    ...prev,

    channel: {
      ...prev.channel,
      eve: value,
    },

  }));

}



export function resetSimulation(setSimulation) {

  setSimulation(createInitialSimulation());

}